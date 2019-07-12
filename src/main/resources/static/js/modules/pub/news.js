//获取页面高度的79%
var windowHeight = parseInt($(document).height()) * 0.81;
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'pub/news/list',
        datatype: "json",
        colModel: [
            {label: '新闻ID', name: 'newsId', index:"news_id",width: 75,align:'center', key: true},
            {label: '新闻类型', name: 'newsType',  width: 35,align:'center',},
            {label: '新闻标题', name: 'title', width: 100,align:'center'},
            {label: '发布日期', name: 'newsBeginDate', width: 75,align:'center'},
            {label: '发布人', name: 'setupPerson', width: 50,align:'center'},
            {label: '截止日期', name: 'newsEndDate', width: 75,align:'center'},
            
        ],
        viewrecords: true,
        height: windowHeight,
        rowNum: 15,
        rowList: [15, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
Simditor.locale = 'zh-CN';//设置中文
var editor = new Simditor({
    textarea: $('#editor'),  //textarea的id
    placeholder: '请输入...',
    toolbar:  ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'], //工具条都包含哪些内容
    pasteImage: true,//允许粘贴图片
    defaultImage: '/res/simditor/images/image.png',//编辑器插入的默认图片，此处可以删除
    upload : {
        url : 'richtext_img_upload.do', //文件上传的接口地址
        params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
        fileKey: 'upload_file', //服务器端获取文件数据的参数名
        connectionCount: 3,
        leaveConfirm: '正在上传文件'
    },
});
vm.editor = editor;

});

var vm = new Vue({
    el: '#rrapp',
    editor:null,
    data: {
        q: {
            title: null,
            // newsType:'新闻',
            // isExpired:'是'
        },

        showList: true,
        title: null,
        news: {},
        news:{
            newsType:'新闻',
            context:null
        },
    },
    methods: {
        query: function () {
            vm.reload(1);
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.news = {};
            vm. news={
                newsType:'新闻'
            },
            vm.editor.setValue("")

        },
        update:function(){
            var newsId = getSelectedRow();
            if (newsId == null) {
                return;
            }
            $.get(baseURL + "pub/news/list?page=1&limit=999&newsId="+newsId+"", function (r) {
                console.log(r)
                vm.showList = false;
                vm.title = "修改";
                vm.news = r.page.list[0];
                vm.editor.setValue(vm.reReplace(vm.news.context));
               
                //  vm.reReplace(vm.editor.setValue(vm.news.context)); 
            });
        },
        del: function () {
            var newsId = getSelectedRows();
            if (newsId == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "pub/news/delete",
                    contentType: "application/json",
                    data: JSON.stringify(newsId),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function () {
                                vm.reload(1);
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        saveOrUpdate: function () {
            if (vm.validator()) {
                return;
            }
           
            vm.news.context = vm.textReplace(vm.editor.getValue());  
            
            var url = vm.news.newsId == null ? "pub/news/save" : "pub/news/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.news),
                success: function (r) {
                    console.log(r)
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.news.newsId == null ? vm.reload(1) : vm.reload($("#jqGrid")
                                .jqGrid('getGridParam', 'page'));
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        reload: function (page) {
            vm.showList = true;
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'title': vm.q.title,
                },
                page: page
            }).trigger("reloadGrid");
        },
        validator: function () {
            if (isBlank(vm.news.title)) {
                alert("标题不能为空");
                return true;
            }
        },
        getdept: function () {
            //加载菜单树
            $.get(baseURL + "sys/dept/permission", function (r) {
                ztree = $.fn.zTree.init($("#deptTree"), setting, r);
                var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
                ztree.selectNode(node);
                vm.dept.parentName = vm.dept.parentName;
            })
        },
        deptTree: function () {
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    vm.dept.parentId = node[0].deptId;
                    vm.dept.parentName = node[0].name;
                    layer.close(index);
                }
            });
        },
        textReplace:function(context){
            return context.replace(/</g, ";lt").replace(/>/g, ';gt').replace(/\//g, ";lg");
        },
        reReplace:function(context){
            return context.replace(/;lt/g, "<").replace(/;gt/g, '>').replace(/;lg/g, "/");
        }
        
    }
});