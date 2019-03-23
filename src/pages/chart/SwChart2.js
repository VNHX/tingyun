import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class SwChart2 extends Component{
	render() {
		let {sjk_qutu}=this.props;
			// console.log(sjk_qutu,'sjk_qutu')		
    	let configPie = {
            chart: {
	            zoomType: 'xy',
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
	            categories: sjk_qutu?sjk_qutu.xaxisList:'',
	            tickLength: 0,
	            tickmarkPlacement: 'on',
	            startOnTick :false,
	            gridLineWidth: 1,
	            gridLineDashStyle: 'longdash',
	            min:0,
	        },
	        yAxis: [{
	        	title: {
	                text: '(秒)',
	                align:'high',
	                rotation:0,
	                x:0,
	                y:5,
	            },
	            labels: {
	                align: 'left',
	                x: 0,
	                y: 20
            	},
				gridLineDashStyle: 'longdash',
	        }],
	        tooltip:{
			
				shared: true,
				// useHTML: true,
				// headerFormat: '<small>请求次数:</small><table>',
				// pointFormat: '<tr><td>总时间:</td>' +'<tr><td>{series.name}:</td>' +
				// '<td style="text-align: right"><b>{point.y}</b></td></tr>',
				// footerFormat: '</table>',
				// valueDecimals: 2
			},
			legend:{
			
			},
	        credits: {
	            enabled: false //不显示highCharts版权信息
	        },
	        plotOptions: {
	            
	        },
	        series: [{
	            name: '平均时间',
	            type: 'spline',
				data: sjk_qutu ? sjk_qutu.avgTime:'',
			},{
	            name: '请求次数',
				data: sjk_qutu ? sjk_qutu.invokeCount:'',
			},{
	            name: '总时间',
				data: sjk_qutu ? sjk_qutu.totalTime:'',
			},
			]
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

export default connect(mapStateToProps, mapDispatchToProps)(SwChart2);
// {
// 	name: '请求次数',
// 	data: sjk_qutu ? sjk_qutu.invokeCount:''
// },{
// 	name: '总时间',
// 	data: sjk_qutu ? sjk_qutu.maxTime:''
// }