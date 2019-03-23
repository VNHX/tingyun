import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class SwChart extends Component{	
	render() {
		let {swChartData}=this.props;
		// console.log(swChartData,'12')
    	let configPie = {
            chart: {
				type: 'bar',
	            height:100,
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
	            categories:[],
	            min:0,
	        },
	        yAxis: {
				title: {
	                 enabled: false
	            },
	            
	        },
	        tooltip: {//hover提示框
				shared: true,
				valueSuffix: 's',
				
	        },
	        credits: {
	            enabled: false //不显示highCharts版权信息
	        },
	        plotOptions: {
	            series: {
					stacking: 'normal'
				}
	        },
	        series: [{
				name: '',
				data: swChartData ? swChartData.endElapsed:''
			}, {
				name: '',
				data: swChartData ? swChartData.methodId:''
			}, {
				name: '',
				data: swChartData ? swChartData.spanEventId:''
			}]
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