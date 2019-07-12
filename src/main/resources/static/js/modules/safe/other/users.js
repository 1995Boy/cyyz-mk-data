var windowHeight = parseInt($(document).height()) * 0.81;
$(function() {
	$("#jqGrid").jqGrid({
		url: baseURL + 'safe/other/user/list',
		datatype: "json",
		colModel: [{
			name: 'awUserId',
			index: "tb_user_id",
			align: "center",
			width: 30,
			key: true
		}, {
			name: 'awUserName',
			width: 50,
			align: "center",
			sortable: false,
		}, {
			name: 'age',
			width: 50,
			align: "center",
			sortable: false,
		}, {
			name: 'degree',
			width: 75,
			align: "center",
			sortable: false,
		}, {
			name: 'positionName',
			width: 90,
			align: "center",
			sortable: false,
		}, {
			name: 'deptName',
			width: 90,
			align: "center",
			sortable: false,
		}, {
			name: 'mobile',
			index: "create_time",
			width: 80,
			align: "center",
			sortable: false,
		}, {
			name: 'status',
			width: 40,
			align: "center",
			formatter: function formatter(value, options, row) {
				return "<button class=\"btn btn-detail\" onclick=\"detail(" + options.rowId + ")\">\u67E5\u770B</button>";
			},
			sortable: false,
		}],
		colNames: ['ID', '姓名', '年龄', '学历', '岗位', '所属项目部', '联系电话', '详情'],
		// viewrecords: true,
		height: windowHeight,
		rowNum: 15,
		rowList: [15, 30, 50],
		// rownumWidth: 25,
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
		gridComplete: function() {
			//隐藏grid底部滚动条
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		},
	});
    
    // tab栏
    var hd = document.getElementById("hd");
    var spans = hd.getElementsByTagName("span");
    var wraps = document.getElementsByClassName('wrap');
    for(var i=0;i<spans.length;i++){
    spans[i].index = i;
    spans[i].onclick = function(){
        for(var i= 0;i<spans.length;i++){
            spans[i].className = "";
        }
        this.className = "current";
        for(var i = 0; i <wraps.length;i++){
            wraps[i].className = "wrap";

        }
        var index = this.index;

        wraps[index].className = "wrap current";
    };
}


$("#modify span.file-input").removeClass("file-input-ajax-new");

	$("#file-0").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.headUrl = data.response.path;
	});
	$("#file-1").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.idCardPositive = data.response.path;
	});
	$("#file-2").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.idCardNegative = data.response.path;
	});
	$("#file-3").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.licensePositive = data.response.path;
	});
	$("#file-4").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.licenseNegative = data.response.path;
	});
	$("#file-5").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.operationCertificatePositive = data.response.path;
	});
	$("#file-6").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.operationCertificateNegative = data.response.path;
	});
	$("#file-7").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.driverLicensePositive = data.response.path;
	});
	$("#file-8").on("fileuploaded", function(event, data, previewId, index) {
		alert("上传成功");
		vm.user.driverLicenseNegative = data.response.path;
	});
	// $("#file-0").on("filebatchselected", function(event, files) {
    //     alert("上传成功");
	// 	console.log(event, files);
	// });
})

// 

var vm = new Vue({
    el:"#user",
    data:{
        q:{
            awUserName:null
        },
        showList:true,
        title:null,
        // 员工类别
        employeeTypeList: {},
        // 项目部
        deptList:{},
        // 岗位类型
        positionList:[],

        user:{positionIdList:[]},

        
    },
    methods: {
        query: function () {
            vm.reload();
        },
        // 增加按钮
        add:function(){
            vm.showList = false;
            vm.title = "新增";
            vm.user={positionIdList:[]};
            vm.employeeTypeList = {}
            vm.deptList = {}
            vm.positionList=[]
            // 获取岗位
            this.getPosition()
            
            // 获取员工类别
            vm.getEmployeeType()
            // 获取项目部
            vm.getDept()
            
        },
        // 修改按钮
        update:function(){
            var awUserId = getSelectedRow();
            if (awUserId == null) {
                return;
            }
            vm.showList=false;
            vm.title="修改";
            vm.getUser(awUserId);
            // console.log(r)
            this.getPosition()
            
        },
        getUser:function(awUserId){
            $.get(baseURL+"safe/other/user/list?page=1&limit=999&awUserId="+awUserId+"",function(r){
                
                vm.user=r.page.list[0]
                vm.user.positionName= vm.user.positionName.split(',');
                console.log(vm.user)
                // 获取员工类别
                vm.getEmployeeType()
                // 获取项目部
                vm.getDept()
            })
        },
        // 返回按钮
        toContent: function toContent() {
			location.reload();
        },
        saveOrUpdate:function(){
            if (vm.validator()) {
                return;
            }
            var url = vm.user.awUserId == null ? "safe/other/user/save" : "safe/other/user/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.user),
                success: function (r) {
                    console.log(r)
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.user.awUserId == null ? vm.reload() : vm.reload($("#jqGrid").jqGrid('getGridParam', 'page'));
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function () {
            var awUserId = getSelectedRows();
            if (awUserId == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "safe/other/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(awUserId),
                    success: function (r) {
                        if (r.code == 0) {
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
        // 员工类别
        getEmployeeType:function(){

            $.get(baseURL + "safe/other/employeeType/list?page=1&limit=999", function (r) {
                console.log(r.page.list)
                vm.employeeTypeList = r.page.list;
            });
        },

        // 获取项目部
        getDept:function(){
            $.get(baseURL + "safe/other/department/list?page=1&limit=999", function (r) {
                console.log(r)
                console.log(r.page.list)
                vm.deptList = r.page.list;
            });
        },

        // 获取岗位
        getPosition:function(){
            $.get(baseURL + "safe/other/position/list", function (r) {
                console.log(r.list)
                vm.positionList=r.list;
                // vm.positionId = r.list.positionId
                console.log(vm.positionList.positionId)
            });
        },
        reload: function (page) {
            $("#jqGrid").jqGrid('setGridParam', {
                url : baseURL + 'safe/other/user/list',
                datatype:'json',
                postData: {'awUserName': vm.q.awUserName},
                page: page
            }).trigger("reloadGrid");
        },
        validator: function () {
            if (isBlank(vm.user.awUserName)) {
                alert("姓名不能为空");
                return true;
            }
            // if (isBlank(vm.user.gender)) {
            //     alert("性别不能为空");
            //     return true;
            // }
            // if (isBlank(vm.user.mobile)) {
            //     alert("手机号不能为空");
            //     return true;
            // }

            // if (isBlank(vm.user.age)) {
            //     alert("年龄不能为空");
            //     return true;
            // }
            // if (isBlank(vm.user.degree)) {
            //     alert("学历不能为空");
            //     return true;
            // }

        }
    }
   

})

function Config(url,title,preview) {
	this.language = 'zh';
	this.allowedFileExtensions = ['jpg', 'jpeg', 'png', 'gif'];
	this.browseClass = "btn btn-default";
	this.maxFileSize = 10240;
	this.maxFilesNum = 1;
	this.enctype = 'multipart/form-data';
	this.autoReplace = true;
	this.msgInvalidFileExtension = "文件格式错误";
	this.browseLabel = "选择文件";
	this.maxFileCount = 1;
	this.msgFilesTooMany = "选择的上传文件个数超出数量";
	this.uploadUrl = url;
	this.dropZoneTitle = title;
	this.initialPreview = preview;
	// this.deleteUrl = 
}

var obj0 = new Config( '/safe/other/user/upload/headUrl',"添加头像");
var obj1 = new Config('/safe/other/user/upload/idCardPositive',"身份证正面照");
var obj2 = new Config('/safe/other/user/upload/idCardNegative',"身份证背面照");
var obj3 = new Config('/safe/other/user/upload/licensePositive',"进网许可证正面照");
var obj4 = new Config('/safe/other/user/upload/licenseNegative',"进网许可证背面照");
var obj5 = new Config('/safe/other/user/upload/operationCertificatePositive',"特种作业证正面照");
var obj6 = new Config('/safe/other/user/upload/operationCertificateNegative',"特种作业证背面照");
var obj7 = new Config('/safe/other/user/upload/driverLicensePositive',"驾驶证正面照");
var obj8 = new Config('/safe/other/user/upload/driverLicenseNegative',"驾驶证背面照");

$("#file-0").fileinput(obj0);
$("#file-1").fileinput(obj1);
$("#file-2").fileinput(obj2);
$("#file-3").fileinput(obj3);
$("#file-4").fileinput(obj4);
$("#file-5").fileinput(obj5);
$("#file-6").fileinput(obj6);
$("#file-7").fileinput(obj7);
$("#file-8").fileinput(obj8);


