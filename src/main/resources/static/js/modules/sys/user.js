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
        url: baseURL + 'sys/user/list',
        datatype: "json",
        colModel: [
            {label: '用户ID', name: 'userId', index: "user_id", width: 35,align:'center', key: true},
            {label: '用户名', name: 'username', width: 50,align:'center'},
            {label: '用户全名', name: 'fullname', width: 75,align:'center'},
            {label: '邮箱', name: 'email', width: 90,align:'center'},
            {label: '手机号', name: 'mobile', width: 100,align:'center'},
            {
                label: '状态', name: 'status', width: 80, align:'center',formatter: function (value, options, row) {
                    return value === 0 ?
                        '<span class="label label-danger">禁用</span>' :
                        '<span class="label label-success">正常</span>';
                }
            },
            {label: '创建时间', name: 'createTime', index: "create_time",align:'center', width: 80}
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
});


var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            username: null
        },
        showList: true,
        title: null,
        roleList: {},
        user: {
            // status: 1,
            // roleIdList: []
        },
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
            vm.roleList = {};
            vm.user = {status: 1, roleIdList: []};

            //获取角色信息
            this.getRoleList();

            vm.getdept();
            vm.dept.parentName = "选择部门";
        },
        update: function () {
            var userId = getSelectedRow();
            if (userId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.getUser(userId);
            //获取角色信息
            this.getRoleList();
        },
        del: function () {
            var userIds = getSelectedRows();
            if (userIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
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

            var url = vm.user.userId == null ? "sys/user/save" : "sys/user/update";
            vm.user.deptId = vm.dept.parentId;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.user),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.user.userId == null ? vm.reload(1) : vm.reload($("#jqGrid").jqGrid('getGridParam', 'page'));
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        getUser: function (userId) {
            $.get(baseURL + "sys/user/info/" + userId, function (r) {
                console.log(r)
                vm.user = r.user;
                vm.user.password = null;
                vm.dept.parentName = r.user.deptName;
				vm.dept.parentId = r.user.deptId;
				vm.getdept();
            });
        },
        getRoleList: function () {
            $.get(baseURL + "sys/role/select", function (r) {
                console.log(r.list)
                vm.roleList = r.list;
            });
        },
        getdept: function () {
            //加载菜单树
            $.get(baseURL + "sys/dept/select", function (r) {
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
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
        reload: function (page) {
            vm.showList = true;
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'username': vm.q.username},
                page: page
            }).trigger("reloadGrid");
        },
        validator: function () {
            if (isBlank(vm.user.username)) {
                alert("用户名不能为空");
                return true;
            }

            if (isBlank(vm.user.mobile)) {
                alert("手机号不能为空");
                return true;
            }

            if (vm.user.userId == null && isBlank(vm.user.password)) {
                alert("密码不能为空");
                return true;
            }

            if (isBlank(vm.user.email)) {
                alert("邮箱不能为空");
                return true;
            }

            if (!validator.isEmail(vm.user.email)) {
                alert("邮箱格式不正确");
                return true;
            }
        }
    }
});