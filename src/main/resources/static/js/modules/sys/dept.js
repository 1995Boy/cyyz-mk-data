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
var ztree;

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        dept: {
            parentName: null,
            parentId: 0
        }
    },
    methods: {
        getdept: function () {
            //加载菜单树
            $.get(baseURL + "sys/dept/select", function (r) {
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
                var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
                ztree.selectNode(node);

                vm.dept.parentName = node.name;
            })
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.dept = {parentName: null, parentId: 0};
            vm.getdept();
        },
        update: function () {
            var deptId = getdeptId();
            if (deptId == null) {
                return;
            }

            $.get(baseURL + "sys/dept/info/" + deptId, function (r) {
               console.log(r)
                vm.showList = false;
                vm.title = "修改";
                vm.dept = r.dept;

                vm.getdept();
            });
        },
        del: function () {
            var deptId = getdeptId();
            if (deptId == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/dept/delete",
                    data: "deptId=" + deptId,
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function () {
                                vm.reload();
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

            var url = vm.dept.deptId == null ? "sys/dept/save" : "sys/dept/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.dept),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
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
                    //选择上级部门
                    vm.dept.parentId = node[0].deptId;
                    vm.dept.parentName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            dept.table.refresh();
        },
        validator: function () {
            if (isBlank(vm.dept.parentId)) {
                if (isBlank(vm.dept.orgCode)) {
                    alert("组织不能为空");
                    return true;
                }
            }
            if (isBlank(vm.dept.name)) {
                alert("部门名称不能为空");
                return true;
            }
        }
    }
});


var dept = {
    id: "deptTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
dept.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '部门ID', field: 'deptId', visible: false, align: 'center', valign: 'middle', width: '60px'},
        {title: '组织编码', field: 'orgCode', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '部门名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '260px'},
        {title: '上级部门', field: 'parentName', align: 'center', valign: 'middle', sortable: true, width: '150px'}]
    return columns;
};


function getdeptId() {
    var selected = $('#deptTable').bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        alert("请选择一条记录");
        return false;
    } else {
        return selected[0].id;
    }
}


$(function () {
    var colunms = dept.initColumn();
    var table = new TreeTable(dept.id, baseURL + "sys/dept/list", colunms);
    table.setExpandColumn(2);
    table.setIdField("deptId");
    table.setCodeField("deptId");
    table.setParentCodeField("parentId");
    table.setExpandAll(false);
    table.init();
    dept.table = table;
});
