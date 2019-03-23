//应用警报列表
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'pages/Overview/yyjblb.css';
import Header from 'pages/functionalCom/Header.js';
import { Select } from 'antd';
const Option = Select.Option;

import data from './data.js';//假数据

class Yyjblb extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
    	let {handleChange}=this.props;
        return (
            <div className='yyjblb'>
                <Header optionData={'more'} />
                <div className='yyjblb_body'>
                	<div className='yyjblb_select_div'>
                		<span>类型 </span>
                		<select defaultValue='全部'>
                			<option>全部</option>
                			<option>Apdex</option>
                			<option>应用响应时间</option>
                			<option>错误率</option>
                			<option>JVM Heap使用率</option>
                			<option>JVM线程数</option>
                			<option>外部服务告警</option>
                		</select>
                	</div>
                	<div className='yyjblb_table_div'>
                		<table>
                			<thead>
                				<tr>
                					<th style={{width:'12%'}}>严重程度</th>
                					<th style={{width:'28%'}}>警报内容</th>
                					<th style={{width:'12%'}}>实例</th>
                					<th style={{width:'12%'}}>开始时间</th>
                					<th style={{width:'12%'}}>结束时间</th>
                					<th style={{width:'12%'}}>持续时间</th>
                					<th style={{width:'12%'}}>警报状态</th>
                				</tr>
                			</thead>
                			<tbody>
                			{
                				data.data.yyjblb.map((value)=>{
                					return(
                						<tr key={value.key}>
		                					<td style={{width:'12%'}}>{value.severity}</td>
		                					<td style={{width:'28%'}}>{value.alertContent}</td>
		                					<td style={{width:'12%'}}>{value.example}</td>
		                					<td style={{width:'12%'}}>{value.startTime}</td>
		                					<td style={{width:'12%'}}>{value.endTime}</td>
		                					<td style={{width:'12%'}}>{value.duration}</td>
		                					<td style={{width:'12%'}}>{value.alertState}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Yyjblb);