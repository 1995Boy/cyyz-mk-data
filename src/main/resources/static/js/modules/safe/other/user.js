"use strict";

var windowHeight = parseInt($(".main").height()) * 0.82;

function detail(id) {
	vm.toDetail(id);
}
$(function() {
	$("#jqGrid").jqGrid({
		url: baseURL + 'web/user/list',
		datatype: "json",
		colModel: [{
			name: 'tbUserId',
			index: "tb_user_id",
			align: "center",
			width: 30,
			key: true
		}, {
			name: 'tbUserName',
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
			name: 'position',
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

	// $("#modify span.file-input").removeClass("file-input-ajax-new");

	// // $("#file-0,#file-10").on("fileuploaded", function(event, data, previewId, index) {
	// // 	alert("上传成功");
	// // 	vm.singleUser.idCardPositive = data.response.path;
	// // });
	// $("#file-1,#file-11").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.idCardPositive = data.response.path;
	// });
	// $("#file-2,#file-12").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.idCardNegative = data.response.path;
	// });
	// $("#file-3,#file-13").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.licensePositive = data.response.path;
	// });
	// $("#file-4,#file-14").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.licenseNegative = data.response.path;
	// });
	// $("#file-5,#file-15").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.operationCertificatePositive = data.response.path;
	// });
	// $("#file-6,#file-16").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.operationCertificateNegative = data.response.path;
	// });
	// $("#file-7,#file-17").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.driverLicensePositive = data.response.path;
	// });
	// $("#file-8,#file-18").on("fileuploaded", function(event, data, previewId, index) {
	// 	alert("上传成功");
	// 	vm.singleUser.driverLicenseNegative = data.response.path;
	// });
	// $("#file-0").on("filebatchselected", function(event, files) {
	// 	console.log(event, files);
	// });
});
var newUserList = {
	"tbUserId": 0,
	"tbUserName": "",
	"userId": 0,
	"headUrl": "",
	"age": "",
	"degree": "",
	"gender": "",
	"mobile": "",
	"deptId": "",
	"employeeTypeId": "",
	"idCardPositive": "",
	"idCardNegative": "",
	"licensePositive": "",
	"licenseNegative": "",
	"operationCertificatePositive": "",
	"operationCertificateNegative": "",
	"driverLicensePositive": "",
	"driverLicenseNegative": "",
	"positionIdList": []
};
var vm = new Vue({
	el: "#app",
	data: {
		state: 1,
		infor: {
			username: null
		},
		singleUser: JSON.parse(JSON.stringify(newUserList)),
		userTypeList: [],
		userDeptList: [],
		userPosList: [],
		posNameList: [],
		choose1: null,
		choose2: null
	},
	methods: {
		getUser: function getUser() {
			var _this = this;
			$.get(baseURL + 'web/employeeType/list?page=1&limit=20', function(res) {
				_this.userTypeList = res.page.list;
			}).done(function() {
				$.get(baseURL + 'web/department/list?page=1&limit=100', function(res) {
					vm.userDeptList = res.page.list;
				});
			}).done(function() {
				$.get(baseURL + 'web/position/list', function(res) {
					vm.userPosList = res.list;
				});
			});
		},
		reload: function reload(page) {
			this.state = 1;
			$("#jqGrid").jqGrid('setGridParam', {
				postData: {
					'tbUserName': vm.infor.username
				},
				page: page
			}).trigger("reloadGrid");
			this.getUser();
		},
		query: function query() {
			this.reload(1);
		},
		toDetail: function toDetail(id) {
			this.state = 2;
			$.get(baseURL + "web/user/info/" + id, function(res) {
				vm.singleUser = res.user;
				// 更改图片路径
				var arr = res.user.idCardPositive.split("\\");
				var str = arr[arr.length - 1];
				vm.singleUser.idCardPositive = baseURL + "web/user/idCardPositive/" + str + "?token=" + token;
				// 复选框ID转
				for (var i = 0; i < res.user.positionIdList.length; i++) {
					for (var j = 0; j < vm.userPosList.length; j++) {
						if (res.user.positionIdList[i] == vm.userPosList[j].positionId) {
							vm.posNameList.push(vm.userPosList[j].positionName);
						}
					}
				}
			});
		},
		toAdd: function toAdd() {
			this.state = 3;
		},
		add: function add() {
			var num = $('.checkselect:checked').size();
			for (var i = 0; i < num; i++) {
				var posId = $('.checkselect:checked').eq(i).attr('value');
				posId = parseInt(posId);
				vm.singleUser.positionIdList.push(posId);
			}
			$.ajax({
				type: "POST",
				url: baseURL + "web/user/save",
				contentType: "application/json",
				data: JSON.stringify(vm.singleUser),
				success: function success(r) {
					if (r.code == 0) {
						alert('添加成功', function() {
							vm.reload(1);
							vm.singleUser = JSON.parse(JSON.stringify(newUserList));
						});
					} else {
						alert(r.msg);
						vm.singleUser.positionIdList = [];
					}
				}
			});
		},
		toUpdate: function toUpdate() {
			var userIds = $("#jqGrid").jqGrid('getGridParam', 'selarrrow');
			if (userIds.length > 1 || userIds.length == 0) {
				alert("请选择一条信息");
				return;
			} else {
				var id = parseInt(userIds[0]);
				this.state = 4;
				$.ajax({
					type: "get",
					url: baseURL + "web/user/info/" + id,
					success: function success(res) {
						vm.singleUser = res.user;
						for (var i = 0; i < vm.singleUser.positionIdList.length; i++) {
							$("#modify .checkselect").eq(vm.singleUser.positionIdList[i] - 1).attr("checked", "checked");
						};
					}
				}).done(function() {
					vm.singleUser.positionIdList = [];
				});
			}
		},
		update: function update() {
			var num = $('.checkselect:checked').size();
			for (var i = 0; i < num; i++) {
				var posId = $('.checkselect:checked').eq(i).attr('value');
				posId = parseInt(posId);
				vm.singleUser.positionIdList.push(posId);
			}
			$.ajax({
				type: "POST",
				url: baseURL + "web/user/update",
				contentType: "application/json",
				data: JSON.stringify(vm.singleUser),
				success: function success(r) {
					if (r.code == 0) {
						alert('修改成功', function() {
							vm.reload(1);
							vm.singleUser = JSON.parse(JSON.stringify(newUserList));
						});
					} else {
						alert(r.msg);
						vm.singleUser.positionIdList = [];
					}
				}
			});
		},
		del: function del() {
			var userIds = $("#jqGrid").jqGrid('getGridParam', 'selarrrow');
			if (userIds.length == 0) {
				alert('请选择相关信息');
				return;
			}
			confirm('确定要删除选中的记录？', function() {
				$.ajax({
					type: "POST",
					url: baseURL + "web/user/delete",
					contentType: "application/json",
					data: JSON.stringify(userIds),
					success: function success(r) {
						if (r.code == 0) {
							alert('删除成功', function() {
								vm.reload(1);
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
		toContent: function toContent() {
			location.reload();
		}
	},
	created: function created() {
		this.getUser();
	}
});
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

var obj0 = new Config(baseURL + '/web/user/upload/idCardPositive',"添加头像");
var obj1 = new Config(baseURL + '/web/user/upload/idCardPositive',"身份证正面照");
var obj2 = new Config(baseURL + '/web/user/upload/idCardNegative',"身份证背面照");
var obj3 = new Config(baseURL + '/web/user/upload/licensePositive',"进网许可证正面照");
var obj4 = new Config(baseURL + '/web/user/upload/licenseNegative',"进网许可证背面照");
var obj5 = new Config(baseURL + '/web/user/upload/operationCertificatePositive',"特种作业证正面照");
var obj6 = new Config(baseURL + '/web/user/upload/operationCertificateNegative',"特种作业证背面照");
var obj7 = new Config(baseURL + '/web/user/upload/driverLicensePositive',"驾驶证正面照");
var obj8 = new Config(baseURL + '/web/user/upload/driverLicenseNegative',"驾驶证背面照");
var obj10 = new Config(baseURL + '/web/user/upload/idCardPositive',"添加头像", ["<img width='100%' height='100%' class='file-preview-image'>"])
var obj11 = new Config(baseURL + '/web/user/upload/idCardPositive',"身份证正面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj12 = new Config(baseURL + '/web/user/upload/idCardNegative',"身份证背面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj13 = new Config(baseURL + '/web/user/upload/licensePositive',"进网许可证正面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj14 = new Config(baseURL + '/web/user/upload/licenseNegative',"进网许可证背面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj15 = new Config(baseURL + '/web/user/upload/operationCertificatePositive',"特种作业证正面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj16 = new Config(baseURL + '/web/user/upload/operationCertificateNegative',"特种作业证背面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj17 = new Config(baseURL + '/web/user/upload/driverLicensePositive',"驾驶证正面照",["<img width='100%' height='100%' class='file-preview-image'>"]);
var obj18 = new Config(baseURL + '/web/user/upload/driverLicenseNegative',"驾驶证背面照",["<img width='100%' height='100%' class='file-preview-image'>"]);

$("#file-0").fileinput(obj0);
$("#file-1").fileinput(obj1);
$("#file-2").fileinput(obj2);
$("#file-3").fileinput(obj3);
$("#file-4").fileinput(obj4);
$("#file-5").fileinput(obj5);
$("#file-6").fileinput(obj6);
$("#file-7").fileinput(obj7);
$("#file-8").fileinput(obj8);
$("#file-10").fileinput(obj10);
$("#file-11").fileinput(obj11);
$("#file-12").fileinput(obj12);
$("#file-13").fileinput(obj13);
$("#file-14").fileinput(obj14);
$("#file-15").fileinput(obj15);
$("#file-16").fileinput(obj16);
$("#file-17").fileinput(obj17);
$("#file-18").fileinput(obj18);


