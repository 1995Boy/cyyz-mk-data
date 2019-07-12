//获取页面高度的79%
var windowHeight = parseInt($(document).height()) * 0.81;
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/log/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', width: 30,align:"center", key: true},
            {label: '用户名', name: 'username',align:"center",  width: 50},
            {label: '用户操作', name: 'operation',align:"center",  width: 70},
            {label: '请求方法', name: 'method',align:"center",  width: 150},
            {label: '请求参数', name: 'params',align:"center",  width: 80},
            {label: '执行时长(毫秒)', name: 'time',align:"center",  width: 80},
            {label: 'IP地址', name: 'ip',align:"center",  width: 70},
            {label: '创建时间', name: 'createDate',align:"center", index: 'create_date', width: 90}
        ],
        viewrecords: true,
        height: windowHeight,
        rowNum: 15,
        rowList: [15, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
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
            key: null
        },
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'key': vm.q.key},
                page: 1
            }).trigger("reloadGrid");
        }
    }
});