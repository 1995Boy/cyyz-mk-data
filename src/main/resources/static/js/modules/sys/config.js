var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            name: 'name',
            url: "nourl"
        }
    }
};
//获取页面高度的79%
var windowHeight = parseInt($(document).height()) * 0.81;
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/config/list',
        datatype: "json",
        colModel: [{
                label: 'ID',
                name: 'id',
                width: 30,
                key: true,
				align:"center"
            },
            {
                label: '参数名',
                name: 'key',
                width: 60,
				align:"center"
            },
            {
                label: '参数值',
                name: 'value',
                width: 100,
				align:"center"
            },
            {
                label: '数据范围',
                name: 'name',
                width: 100,
				align:"center"
            },
			{
				label: '数据范围ID',
				name: 'deptId',
				width: 100,
				hidden:true,
				align:"center"
			},
            {
                label: '备注',
                name: 'remark',
                width: 80,
				align:"center"
            }
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
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({
                "overflow-x": "hidden"
            });
        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            key: null
        },
        showList: true,
        title: null,
        config: {},
		dept: {
			parentName: null,
			parentId: null
		}
    },
    methods: {
        query: function () {
            vm.reload(1);
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.config = {};
			vm.getdept();
			vm.dept = {parentName: null, parentId: 0};
        },
        update: function () {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }

            $.get(baseURL + "sys/config/info/" + id, function (r) {
                console.log(r)
                vm.showList = false;
                vm.title = "修改";
                vm.config = r.config;
                console.log(r.config)
				vm.dept.parentName = r.config.name;
				vm.dept.parentId = r.config.deptId;
                vm.getdept();
                // console.log(id)
            });
			
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/config/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
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

            var url = vm.config.id == null ? "sys/config/save" : "sys/config/update";
			vm.config.dept_id = vm.dept.parentId;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.config),
                success: function (r) {
                    console.log(r)
                    
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.config.id == null ? vm.reload(1) : vm.reload($("#jqGrid")
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
                    'key': vm.q.key
                },
                page: page
            }).trigger("reloadGrid");
        },
        validator: function () {
            if (isBlank(vm.config.key)) {
                alert("参数名不能为空");
                return true;
            }

            if (isBlank(vm.config.value)) {
                alert("参数值不能为空");
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
    }
});
