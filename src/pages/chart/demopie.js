import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
var Highcharts = require('react-highcharts');

class SwPie extends Component {
	render() {
		let {

		} = this.props;
		console.log('sw_pieData', sw_pieData)
		let configPie = {
			chart: {
				type: 'pie',
				height: 300,
			},
			title: {
				text: '2014 某网站上各个浏览器的访问量占比'
			},
			tooltip: {
				headerFormat: '{series.name}<br>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true // 设置饼图是否在图例中显示
				}
			},
			series: [{
				type: 'pie',
				name: '浏览器访问量占比',
				data: [
					['Firefox', 45.0],
					['IE', 26.8], {
						name: 'Chrome',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['Safari', 8.5],
					['Opera', 6.2],
					['其他', 0.7]
				]
			}]
		}
		return (
			<div>
        		<div id="container" style="min-width:400px;height:400px"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SwPie);