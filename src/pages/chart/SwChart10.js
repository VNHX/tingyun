import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class SwChart extends Component{
	render() {
		let {Ml3}=this.props;
		console.log(Ml3.xaxisList,'外部事务性能分解堆叠图3')
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
	            categories: Ml3 ? Ml3.xaxisList:'',
	            min:0,
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
	                y: 20
            	}
	        },
	        tooltip: {//hover提示框
	             shared: true,
	        },
	        credits: {
	            enabled: false //不显示highCharts版权信息
	        },
	        plotOptions: {
	            
	        },
	        series: [{
	            name: '平均',
	            data: Ml3 ? Ml3.avgTime:''
			},
			{
	            name: '最大',
	            data: Ml3 ? Ml3.maxTime:''
			},
			{
	            name: '最小',
	            data: Ml3 ? Ml3.minTime:''
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
        NoSQL_tu:state.vars.NoSQL_tu,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SwChart);