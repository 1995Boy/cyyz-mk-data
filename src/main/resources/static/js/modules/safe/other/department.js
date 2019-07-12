var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            name: 'fullName',
            url: "nourl"
        }
    }
};

//获取页面高度的79%
var windowHeight = parseInt($(document).height()) * 0.81;
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'web/department/list',
        datatype: "json",
        colModel: [
            {label: '项目部编号', name: 'deptId', index: "td.dept_id", width: 115, key: true},
            {label: '项目部名称', name: 'deptName', index: "td.dept_name", width: 180},
            {label: '所属公司', name: 'companyName', index: "sd.fullname", width: 250},
            {label: '管理部门', name: 'managerDeptName', index: 'sde.fullname', width: 230},
            {label: '项目部主管', name: 'deptManagerCount', index: 'tdm.dept_manager_count', width: 100},
            {label: '安全员', name: 'deptSafetyOfficerCount', index: 'tdso.dept_safety_officer_count', width: 100},
            {label: '工作负责人', name: 'deptLeaderCount', index: 'tdl.dept_leader_count', width: 100},
            {label: '工作票签发人', name: 'deptSignerCount', index: 'tds.dept_signer_count', width: 100},
            {label: '工作票许可人', name: 'deptLicensorCount', index: 'tdli.dept_licensor_count', width: 100},
            {label: '质量监督员', name: 'deptSupervisorCount', index: 'tdsu.dept_supervisor_count', width: 100},
            {label: '资料员', name: 'deptDocumenterCount', index: 'tdd.dept_documenter_count', width: 100},
            {label: '材料员', name: 'deptMaterialmanCount', index: 'tdma.dept_materialman_count', width: 100},
            {label: '技工', name: 'deptMechanicCount', index: 'tdme.dept_mechanic_count', width: 100}
        ],
        viewrecords: true,
        height: windowHeight,
        rowNum: 15,
        rowList: [15, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        shrinkToFit: false,
        autoScroll: true,
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
        }
        // gridComplete: function () {
        //     //隐藏grid底部滚动条
        //     $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        // }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            deptId: null,
            deptName: null
        },
        showList: true,
        title: null,
        department: {},
        dept: {
            parentName: null,
            parentId: null
        },
        company: {
            parentName: null,
            parentId: null
        }
    },
    methods: {
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.deptment = {};

            vm.getdept();
            vm.dept.parentName = "选择部门";

            vm.getCompany();
            vm.company.parentName = "选择公司";
        },
        update: function () {
            var deptId = getSelectedRow();
            if (deptId == null) {
                return;
            }

            $.get(baseURL + "web/department/info/" + deptId, function (r) {
                vm.showList = false;
                vm.title = "修改";
                vm.deptment = r.deptment;
            });

            vm.getdept();
            vm.getCompany();
        },
        query: function () {
            vm.reload(1);
        },
        del: function () {
            var planIds = getSelectedRows();
            if (planIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "web/department/delete",
                    contentType: "application/json",
                    data: JSON.stringify(planIds),
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

            var url = vm.deptment.deptId == null ? "web/department/save" : "web/department/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.department),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.department.deptId == null ? vm.reload(1) : vm.reload($("#jqGrid").jqGrid('getGridParam', 'page'));
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
                postData: {'deptId': vm.q.deptId, 'deptName': vm.q.deptName},
                page: page
            }).trigger("reloadGrid");
        },
        getdept: function () {
            //加载菜单树
            $.get(baseURL + "sys/dept/select", function (r) {
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
                var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
                ztree.selectNode(node);
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
                    vm.dept.parentName = node[0].fullName;
                    layer.close(index);
                }
            });
        },
        getCompany: function () {
            //加载菜单树
            $.get(baseURL + "sys/dept/select", function (r) {
                ztree = $.fn.zTree.init($("#companyTree"), setting, r.deptList);
                var node = ztree.getNodeByParam("deptId", vm.company.parentId);
                ztree.selectNode(node);
            })
        },
        companyTree: function () {
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择公司",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    vm.company.parentId = node[0].deptId;
                    vm.company.parentName = node[0].fullName;
                    layer.close(index);
                }
            });
        },
        validator: function () {
            if (isBlank(vm.deptment.deptName)) {
                alert("项目部名称不能为空");
                return true;
            }
        }
    }
});