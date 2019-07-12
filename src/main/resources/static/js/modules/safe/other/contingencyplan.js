//获取页面高度的79%
var windowHeight = parseInt($(document).height()) * 0.81;
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'web/contingencyPlan/list',
        datatype: "json",
        colModel: [
            {label: '应急预案编号', name: 'planId', index: "plan_id", width: 115, key: true},
            {label: '应急预案类别', name: 'planType', index: "plan_type", width: 120},
            {label: '应急预案等级', name: 'planLevel', index: "plan_level", width: 120},
            {label: '应急预案内容', name: 'planContent', index: 'plan_content', width: 500},
            {label: '创建时间', name: 'createTime', index: 'create_time', width: 115}
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
            planId: null,
            planLevel: null
        },
        showList: true,
        title: null,
        contingencyPlan: {}
    },
    methods: {
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.contingencyPlan = {};
        },
        update: function () {
            var planId = getSelectedRow();
            if (planId == null) {
                return;
            }

            $.get(baseURL + "web/contingencyPlan/info/" + planId, function (r) {
                vm.showList = false;
                vm.title = "修改";
                vm.contingencyPlan = r.contingencyPlan;
            });
        },
        query: function () {
            vm.reload(1);
        },
        del: function () {
            var deptIds = getSelectedRows();
            if (deptIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "web/contingencyPlan/delete",
                    contentType: "application/json",
                    data: JSON.stringify(deptIds),
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

            var url = vm.contingencyPlan.planId == null ? "web/contingencyPlan/save" : "web/contingencyPlan/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.contingencyPlan),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.contingencyPlan.planId == null ? vm.reload(1) : vm.reload($("#jqGrid").jqGrid('getGridParam', 'page'));
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
                postData: {'planLevel': vm.q.planLevel},
                page: page
            }).trigger("reloadGrid");
        },
        validator: function () {
            if (isBlank(vm.contingencyPlan.planLevel)) {
                alert("应急预案等级不能为空");
                return true;
            }

            if (isBlank(vm.contingencyPlan.planType)) {
                alert("应急预案类别不能为空");
                return true;
            }

            if (isBlank(vm.contingencyPlan.planContent)) {
                alert("应急预案内容不能为空");
                return true;
            }
        }
    }
});