import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class SwChart extends Component{	
	render() {
		let {cwlbgchras}=this.props;
		console.log(cwlbgchras,'应用错误率4')
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
				categories: cwlbgchras ? cwlbgchras.xaxisList:'',
				// categories:['阿萨德','达到'],
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
					// dataLabels: {
					// 	enabled: true,
					// 	// format: '{point.y:.1f}%'
					// }
				}
	        },
	        series: [{
	            name: 'rpc',
				data: cwlbgchras ? cwlbgchras.rpc:''
				// data:[1,2,]
	        },{
	            name: 'errMsg',
				data: cwlbgchras ? cwlbgchras.errMsg:''
				// data:[3,2,]
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