//后台任务
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/htrw.css';
import Header from 'pages/functionalCom/Header.js';
import SortHeader from 'pages/functionalCom/SortHeader.js';
import { Icon } from 'antd';
import SwChart from 'pages/chart/SwChart.js';
import SwChart2 from 'pages/chart/SwChart2.js';
import data from './data.js';

class Htrw extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {showAdd}=this.props;
        let tabData=['任务耗时','平均时间','执行次数','top'];
        return (
            <div className='htrw' id='htrw'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='htrw_body'>
                    <SortHeader tabData={tabData}  />
                    <div className='htrw_content'>
                        <div className='htrw_content_left'>
                            <div className='htrw_content_left_titlt'>后台任务一览</div>
                        </div>
                        <div className='htrw_content_right'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> TOP5 最耗时后台任务(墙钟时间比)堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <SwChart />
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 后台任务慢追踪</span>
                            </div>
                            <div className='searchBox'>
                            	<span>后台任务: </span><input/><span className='button'>查询</span>
                            </div> 
                            <table style={{width:'100%'}}>
                            	<thead>
                            		<tr>
                                        <th>序号</th>
                            			<th>时间</th>
                                        <th>后台任务</th>
                                        <th>平均响应时间(ms)</th>
                            		</tr>
                            	</thead>
                            	<tbody>

                            	</tbody>
                            </table>                              
                        </div>
                        <div style={{clear:'both'}}></div>
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

    	},
    	init:()=>{
    		let height=$('#htrw').css('height');
            $('#secondTree').css('height',height);
    	},
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Htrw);