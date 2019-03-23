import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import { Icon } from 'antd';
import SwChart9 from 'pages/chart/SwChart9.js';
import './nosql_right.css';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
class Nosql_right extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID);
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {sw_back,showAdd,dhs_biao}=this.props;
        return (
            <div className='nosql_content_right_block'>
                <div className='nosql_content_right_block_tab'>
                    <span>性能分解</span><span>错误</span>
                </div>
                <div className='nosql_content_right_block_chart'>
                    <div className="back" onClick={()=>sw_back()}><Icon type="rollback" />返回</div>
                    <div>
                        <div className='header'>
                            <Icon type="question-circle" />
                        	<span> 事务性能分解堆叠图</span>
                            <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                        </div>
                      
                        <div className='header'>
                            <Icon type="question-circle" />
                            <span> 调用者耗时表</span>
                            <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                        </div>
                        <SwChart9 dhs_biao={dhs_biao}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        headerOptionsID:state.vars.headerOptionsID,
        dhs_biao:state.vars.dhs_biao,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID)=>{
            let obj = { //调用者耗时
                type:'get',
                url:'apm/invokeNoSqlTimeCostByRpc.pinpoint',
                data:'appId='+headerOptionsID+'&noSqlType=REDIS'+'&noSqlMethodType='+'SET',
                dataType:'json',
            };
            ajax(obj,callback1);
            function callback1(data){
                    console.log(data,'调用者耗时');
                    let dhs_biao={
                        rpc:[],
                        rpcVisitCount:[],
                        rpcTotalTime:[],
                        nosqlTotalTime:[],
                        noSqlPerInRpc:[],
                        methodInvokeCount:[]
                    };
                    for(let i=0;i<data.objectList.length;i++){
                        dhs_biao.rpc.push(data.objectList[i].rpc);
                        dhs_biao.rpcVisitCount.push(data.objectList[i].rpcVisitCount);
                        dhs_biao.rpcTotalTime.push(data.objectList[i].rpcTotalTime);
                        dhs_biao.nosqlTotalTime.push(data.objectList[i].nosqlTotalTime);
                        dhs_biao.noSqlPerInRpc.push(data.objectList[i].noSqlPerInRpc);
                        dhs_biao.methodInvokeCount.push(data.objectList[i].methodInvokeCount);
                    }
                dispatch(actions.setVars('dhs_biao',dhs_biao))
            };
    	},
    	init:()=>{
    		
    	},
        sw_back:()=>{
            dispatch(actions.setVars('nosql_right',false))
        },
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nosql_right);