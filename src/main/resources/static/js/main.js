$(function() {
	var setHeight = $('.emapul').height();
	setHeight = setHeight / $('.emapul li').size();
	$('.emapul li').css('lineHeight', setHeight + "px");
});
var vm = new Vue({
	el: '#main',
	data: {
		orgCode: [],
		errCode: [],
		stopColor: {
			normal: {
				areaColor: 'rgba(187, 186, 186, 0.8)'
			}
		},
		goodColor: {
			normal: {
				areaColor: 'rgba(255,255,255,0.05)' //
			}
		},
		ulListData: {
			planInvestmentAmount: 0, //计划投资金额
			accumulativeAmount: 0, //累计下达金额
			projectNumber: 0, //总项目数
			baleProjectNumber: 0, //打捆项目数
			subprojectNumber: 0, //子项目数
			lineLength: 0, //新建改造10Kv线路长度
			transformerCount: 0, //新建更换变压器台数
			transformerCapacity: 0, //新建变压器容量
		},
		thisselect: null,
	},
	methods: {
		loadingBoxShow: function() {
			//显示loading
			$('#loadingbox').show();
		},
		loadingBoxHide: function() {
			//隐藏loading
			$('#loadingbox').hide();
		},
		getMap: function() {
			var chart = echarts.init(document.getElementById('emap'));
			var option = {
				series: [{
					type: 'map',
					map: '衢州',
					/* selectedMode: 'single', */
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},

					itemStyle: {
						normal: {
							borderColor: '#FFFFFF',
							shadowColor: 'rgba(128, 217, 248, 1)',
							shadowOffsetX: -4,
							shadowOffsetY: 4,
							shadowBlur: 10,
							borderWidth: 2,
							label: {
								show: true,
								textStyle: {
									color: '#fff'
								}
							}
						},
						emphasis: {
							areaColor: 'rgba(32,51,183,0.3)',
							show: true,
							label: {
								show: true,
								textStyle: {
									color: '#fff'
								}
							}
						}
					},
					data: this.orgCode,
				}]
			};
			chart.setOption(option);
			chart.on('click', function(params) {
				for(var j = 0; j < vm.errCode.length; j++) {
					if(params.data.name == vm.errCode[j].name) {
						return true;
					}
				}
				if(vm.thisselect == params.data.name) {
					vm.thisselect = null;
					vm.mapCheck(null);
				} else {
					vm.thisselect = params.data.name;
					vm.mapCheck(params.data.value);
				}
				for(var k = 0; k < vm.orgCode.length; k++) {
					vm.orgCode[k].selected = false;
					if(vm.orgCode[k].name == vm.thisselect) {
						vm.orgCode[k].selected = true;
					}
				}
				chart.setOption(option);
			});
			chart.on("mouseover", function(params) {
				for(var i = 0; i < vm.errCode.length; i++) {
					if(params.data.name == vm.errCode[i].name) {
						chart.dispatchAction({
							type: 'downplay',
							name: vm.errCode[i].name,
						});
					}
				};
			});

		},
		mapCheck: function(id) {
			this.loadingBoxShow();
			var url = baseURL + 'web/index/show?orgCode=' + id + '';
			if(id == null) {
				url = baseURL + 'web/index/show';
			}
			$.get(url, function(r) {
				for(var item in r.date) {
					if(r.date[item] == null) {
						r.date[item] = 0;
					}
				}
				vm.ulListData = r.date;
				vm.getProjectProgress("ehow", r.date.designRate, "设计完工");
				vm.getProjectProgress("ehowa", r.date.startRate, "项目开工");
				vm.getProjectProgress("ehowb", r.date.completeRate, "竣工投产");
				/* vm.getProjectProgress("ehowc",0.2,"形象进度"); */
				vm.getProjectProgress("ehowd", r.date.budgetCompletionRate, "累计支出入账");
				vm.getProjectProgress("ehowe", r.date.cumulativeDisbursementRate, "当年预算");
				vm.getArranged(r.date.materielInfo);
			});
		},
		changeData: function() {
			for(var i = 0; i < dataPermission.length; i++) {
				var obj = new Object();
				obj.name = dataPermission[i].orgName;
				obj.value = dataPermission[i].orgCode;
				obj.selected = false;
				if(dataPermission[i].rights == 1) {
					obj.itemStyle = this.goodColor;
				} else {
					obj.itemStyle = this.stopColor;
					this.errCode.push(obj);
				}
				this.orgCode.push(obj);
			}
			this.getMap();
		},
		getProjectProgress: function(el, val, ename) {
			var ehow = echarts.init(document.getElementById(el));
			var highlight = '#03b7c9';
			var demoData = [{
				name: ename,
				value: val.toFixed(2),
				unit: '%',
				pos: ['50%', '50%'],
				range: [0, 100]
			}];
			var option = {
				series: (function() {
					var result = [];

					demoData.forEach(function(item) {
						result.push(
							// 外围刻度
							{
								type: 'gauge',
								center: item.pos,
								/* radius: '33.33%' , */ // 1行3个
								splitNumber: item.splitNum || 10,
								min: item.range[0],
								max: item.range[1],
								startAngle: 225,
								endAngle: -45,
								axisLine: {
									show: true,
									lineStyle: {
										width: 2,
										shadowBlur: 0,
										color: [
											[1, highlight]
										]
									}
								},
								axisTick: {
									show: true,
									lineStyle: {
										color: highlight,
										width: 1
									},
									length: -5,
									splitNumber: 10
								},
								splitLine: {
									show: true,
									length: -14,
									lineStyle: {
										color: highlight,
									}
								},
								axisLabel: {
									distance: -10,
									textStyle: {
										color: highlight,
										fontSize: '12',
										fontWeight: 'bold'
									}
								},
								pointer: {
									show: 0
								},
								detail: {
									show: 0
								}
							},

							// 内侧指针、数值显示
							{
								name: item.name,
								type: 'gauge',
								center: item.pos,
								/* radius: '30.33%', */
								startAngle: 225,
								endAngle: -45,
								min: item.range[0],
								max: item.range[1],
								axisLine: {
									show: true,
									lineStyle: {
										width: 16,
										color: [
											[1, 'rgba(255,255,255,.1)']
										]
									}
								},
								axisTick: {
									show: 0,
								},
								splitLine: {
									show: 0,
								},
								axisLabel: {
									show: 0
								},
								pointer: {
									show: true,
									length: '105%'
								},
								detail: {
									show: true,
									offsetCenter: [0, '100%'],
									textStyle: {
										fontSize: 20,
										color: '#fff'
									},
									formatter: [
										'{value} ' + (item.unit || ''),
										'{name|' + item.name + '}'
									].join('\n'),
									rich: {
										name: {
											fontSize: 14,
											lineHeight: 30,
											color: '#ddd'
										}
									}
								},
								itemStyle: {
									normal: {
										color: highlight,
									}
								},
								data: [{
									value: item.value
								}]
							}
						);
					});

					return result;
				})()
			};
			ehow.setOption(option);
		},
		getArranged: function(data) {
			data = data.reverse();
			var arranged = echarts.init(document.getElementById('arranged'));
			var XData = [];
			var outData = [];
			var inData = [];
			var reData = [];
			for(var p = 0; p < data.length; p++) {
				XData.push(data[p].year + "-" + data[p].month);
				outData.push(data[p].output)
				inData.push(data[p].input)
				reData.push(data[p].returnBack)
			}
			var option = {
				legend: {
					top: 20,
					textStyle: {
						color: '#fff',
					},
					data: ['入库', '出库', '退料']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},

				tooltip: {
					show: "true",
					trigger: 'axis',
					backgroundColor: 'rgba(0,0,0,0.7)', // 背景
					padding: [8, 10], //内边距
					extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
					axisPointer: {
						type: 'shadow',
						label: {
							backgroundColor: '#000'
						}
					},
				},
				yAxis: {
					type: 'value',
					axisTick: {
						show: false
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#363e83',
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#363e83 ',
						}
					},
					axisLabel: {
						textStyle: {
							color: '#fff',
							fontWeight: 'normal',
							fontSize: '12',
						},
					},
				},
				xAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#363e83',
							}
						},
						axisLabel: {
							inside: false,
							textStyle: {
								color: '#fff',
								fontWeight: 'normal',
								fontSize: '12',
							},
							// formatter:function(val){
							//     return val.split("").join("\n")
							// },
						},
						data: XData
					}, {
						type: 'category',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false
						},
						splitArea: {
							show: false
						},
						splitLine: {
							show: false
						},
						data: XData
					},

				],
				series: [{
						name: '入库',
						type: 'bar',
						itemStyle: {
							normal: {
								show: true,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#96d668'
								}, {
									offset: 1,
									color: '#01babc'
								}]),
								barBorderRadius: 50,
								borderWidth: 0,
							},
						},
						zlevel: 2,
						barWidth: '10%',
						data: inData
					}, {
						name: '出库',
						type: 'bar',
						barWidth: '10%',
						itemStyle: {
							normal: {
								show: true,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#1a98f8'
								}, {
									offset: 1,
									color: '#7049f0'
								}]),
								barBorderRadius: 50,
								borderWidth: 0,
							}
						},
						zlevel: 2,
						barGap: '100%',
						data: outData
					}, {
						name: '退料',
						type: 'bar',
						barWidth: '10%',
						itemStyle: {
							normal: {
								show: true,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#f7734e'
								}, {
									offset: 1,
									color: '#e12945'
								}]),
								barBorderRadius: 50,
								borderWidth: 0,
							},
						},
						zlevel: 2,
						barGap: '100%',
						data: reData
					}

				]
			};

			arranged.setOption(option);
			this.loadingBoxHide();
		}
	},
	created: function() {

	},
	mounted: function() {
		getDataPermission();
		this.changeData();
		this.mapCheck();
		this.loadingBoxShow();
	}
})