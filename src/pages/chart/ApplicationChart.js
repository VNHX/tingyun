import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class ApplicationChart extends Component{
	render() {
		let {Datachar1} =this.props;
		console.log(Datachar1,'sss')
    	let configPie = {
            chart: {
	            type: 'line',
	            height:365,
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
	            categories: Datachar1 ? Datachar1.x:'',
	            tickLength: 0,
	            tickmarkPlacement: 'on',
	            startOnTick :false,
	            gridLineWidth: 1,
	            gridLineDashStyle: 'longdash',
	            min:0,
	        },
	        yAxis: {
	        	gridLineDashStyle: 'longdash',
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
	                y: 20
            	}
	        },
	        tooltip: {//hover提示框
	            shared: true,
	            valueSuffix: 's'
	        },
	        credits: {
	            enabled: false //不显示highCharts版权信息
	        },
	        plotOptions: {
	            
	        },
	        series: [{
	            name: 'Memcached响应时间',
	            data: Datachar1 ? Datachar1.y:''
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationChart);