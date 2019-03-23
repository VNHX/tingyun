import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class SwChart extends Component{	
	render() {
		let {host_righttu}=this.props;
		console.log(host_righttu,'应用错误率4')
    	let configPie = {
            chart: {
				type: 'line',
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
				categories: host_righttu ? host_righttu.xaxisList:'',
	            crosshair: true
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
					borderWidth: 0,
				}
	        },
	        series: [{
	            name: 'errMsg',
				data: host_righttu ? host_righttu.avgTime:''
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