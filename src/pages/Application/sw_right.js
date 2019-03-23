//数据库
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import { Icon } from 'antd';
import SwPie from 'pages/chart/swPie.js';
import './sw_right.css';
import myAjax from 'pages/functionalCom/myAjax.js';
import Las from 'pages/functionalCom/as.js';
const ajax=myAjax.myAjax;

class Sw_right extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.sw_rpc);
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
        let {rpcList8,sw_back,showAdd,sw_rightData,rpcList9}=this.props;
        console.log(rpcList9,'swylswylswyl')
        return (
            <div className='sw_content_right_block'>
                <div className='sw_content_right_block_tab'>
                    <span>性能分解</span><span>错误</span>
                </div>
                <div className='sw_content_right_block_chart'>
                    <div className="back" onClick={()=>sw_back()}><Icon type="rollback" />返回</div>
                    <div>
                        <div className='header'>
                            <Icon type="question-circle" />
                        	<span> 事务性能分解堆叠图</span>
                            <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                        </div>
                        <SwPie sw_pieData={rpcList8}/>
                        <div className='header'>
                            <Icon type="question-circle" />
                            <span> 事务分解表格</span>
                        </div>
                        <table style={{width:'100%',marginTop:'10px'}}>
                            <thead>
                                <tr>
                                    <th>代码段</th>
                                    <th>性能分类</th>
                                    <th>耗时百分比（%）</th>
                                    <th>调用次数</th>
                                    <th>平均响应时间（ms）</th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* {
                                rpcList9 && rpcList9.map((value)=>{
                                    return(
                                        <tr key={value.applicationName}>
                                            <td>{value.rpc}</td>
                                            <td>{value.applicationName}</td>
                                            <td>{value.timePer*100}</td>
                                            <td>{value.invokeCount}</td>
                                            <td>{value.avgTime}</td>
                                        </tr>
                                    )
                                })
                            } */}
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
        sw_rpc:state.vars.sw_rpc,
        sw_rightData:state.vars.sw_rightData,
        rpcList9:state.vars.rpcList9,
        swyl:state.vars.swyl,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(sw_rpc)=>{

    	},
    	init:()=>{
    		
    	},
        sw_back:()=>{
            dispatch(actions.setVars('sw_display',false))
        },
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sw_right);