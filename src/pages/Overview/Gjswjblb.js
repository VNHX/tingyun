//关键事务警报列表
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'pages/Overview/gjswjblb.css';
import Header from 'pages/functionalCom/Header.js';
import { Select } from 'antd';
const Option = Select.Option;
import data from './data.js';//假数据
class Gjswjblb extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {handleChange}=this.props;
        return (
            <div className='gjswjblb'>
                <Header optionData={'less'} />
                <div className='gjswjblb_body'>
                	<div className='gjswjblb_select_div'>
                		<span>类型 </span>
                		<select defaultValue='全部'>
                			<option>全部</option>
                			<option>Apdex</option>
                			<option>应用响应时间</option>
                			<option>错误率</option>
                		</select>
                	</div>
                	<div className='gjswjblb_table_div'>
                		<table>
                			<thead>
                				<tr>
                					<th style={{width:'14%'}}>严重程度</th>
                					<th style={{width:'30%'}}>警报内容</th>
                					<th style={{width:'14%'}}>开始时间</th>
                					<th style={{width:'14%'}}>结束时间</th>
                					<th style={{width:'14%'}}>持续时间</th>
                					<th style={{width:'14%'}}>警报状态</th>
                				</tr>
                			</thead>
                			<tbody>
                			{
                				data.data.yyjblb.map((value)=>{
                					return(
                						<tr key={value.key}>
		                					<td style={{width:'14%'}}>{value.severity}</td>
		                					<td style={{width:'30%'}}>{value.alertContent}</td>
		                					<td style={{width:'14%'}}>{value.startTime}</td>
		                					<td style={{width:'14%'}}>{value.endTime}</td>
		                					<td style={{width:'14%'}}>{value.duration}</td>
		                					<td style={{width:'14%'}}>{value.alertState}</td>
		                				</tr>
                					)                					
                				})
                			}                				
                			</tbody>
                		</table>
                	</div>
                </div>
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
    	willMount:()=>{
    		console.log('willMount')
    	},
    	init:()=>{
    		console.log('init')
    	},
    	handleChange:(value)=>{
    		console.log(`${value}`);
    	},
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gjswjblb);