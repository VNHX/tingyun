import React, {Component} from 'react';
import {connect} from 'react-redux';
var Highcharts = require('react-highcharts');		
class wlEhars extends Component{
	render() {
		let {cpTable}=this.props;
		console.log('磁盘',cpTable)
    	let configPie = {
            chart: {
				type: 'pie',
				height:200,
				marightLeft:-35,
	        },
	        title: {
	            text: ''
	        },
			tooltip: {
				headerFormat: '',
				pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
				'磁盘总容量: <b>{point.y}G</b><br/>' +'磁盘使用量: <b>{point.z}G</b><br/>'+'磁盘剩余量: <b>{point.x}G</b><br/>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				minPointSize: 10,
				innerSize: '50%',
				zMin: 0,
				name: 'countries',
				data: [{
					name: 'c磁盘容量',
					y:80,
					z: 60,
					x:1
				},{
					name: 'd磁盘容量',
					y:80,
					z: 60,
					x:1
				}]
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

export default connect(mapStateToProps, mapDispatchToProps)(wlEhars);