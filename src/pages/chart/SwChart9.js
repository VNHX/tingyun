import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');
		
class SwChart extends Component{	
	render() {
		let {dhs_biao}=this.props;
		console.log(dhs_biao,'12')
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
				name: dhs_biao ? dhs_biao.rpc:'',
				data: dhs_biao ? dhs_biao.rpcVisitCount:''
			},
			{
				name: dhs_biao ? dhs_biao.rpc:'',
				data: dhs_biao ? dhs_biao.nosqlTotalTime:''
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