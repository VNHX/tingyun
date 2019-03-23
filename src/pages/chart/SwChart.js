import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
let initobj = {
    name: ' ',
    type: 'spline',
    data: []
}	
class SwChart extends Component{	
	render() {
		let {swChartData,sjk_top}=this.props;
		console.log(swChartData,'12')
		let Lobj2=[]
		if(swChartData){
			for(let i in swChartData.YAixs){
				var obj={}
				console.log(swChartData.YAixs[i],'Lobj2')
				// obj=swChartData.YAixs[i]
				Lobj2.push(swChartData.YAixs[i]);
			}
			console.log(Lobj2,'Lobj2')
		}
    	let configPie = {
            chart: {
	            type: 'spline',
	            height:300,
	        },
	        title: {
	            text: ''
	        },
	        legend: {//图例
	            align: 'center',
	            verticalAlign: 'top',
	            x: 0,
	            y: 0,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: '#fff',
	            itemStyle: {
                    fontSize:"12px",
                    fontWeight:"normal",
                    fontFamily:"微软雅黑"
                },
	        },
	        xAxis: {//x坐标
	            categories: swChartData ? swChartData.XAixs:'',
				min:0,
				gridLineWidth: 0,
                tickInterval: 2,
                tickLength: 1,
                gridLineColor: '#174064',
	        },
	        yAxis: {
	            title: {
	                text: '(秒)',
	                align:'high',
	                rotation:0,
	                x:25,
	                y:5,
	            },
	            labels: {
	                align: 'left',
	                x: 0,
	                y: -20
				},
                gridLineWidth: 0,
                gridLineColor: '#174064',
                minorGridLineColor: '#174064',
                minorGridLineWidth: 0,
                minorTickLength: 0,
                minorTickInterval: 'auto',
	        },
			tooltip: {
                shared: true,
                borderColor: '#FCFFC5',
                 style: {  //提示框内容的样式
                        color: '#000',
                        padding: '10px',    //内边距 (这个会常用到)
                        fontSize: '9pt',            
                      },
            },
	        credits: {
	            enabled: false //不显示highCharts版权信息
	        },
			plotOptions: {
                series: {
                    marker: {
                        radius: 0,  //曲线点半径，默认是4，设为0时隐藏点
                        symbol: 'circle',
                        states: {
                            hover: {
                                radius: 4,
                            }
                        },
                    },
                    animation: {
                        duration: 2000
                      }
				},
			},
			colors: ['#058DC7','#50B432','#ED561B','#DDDF00','#24CBE5','#64E572','#FF9655','#FFF263','#6AF9C4'],
	        series:swChartData != undefined ? Lobj2 : initobj
        }
        return (
        	<div>
        		<Highcharts config={configPie}/>
        	</div>        	
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SwChart);