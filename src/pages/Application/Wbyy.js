//外部应用
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/wbyy.css';
import Header from 'pages/functionalCom/Header.js';
import SortHeader from 'pages/functionalCom/SortHeader.js';
import Wbyy_right from './wbyy_right.js';
import { Icon } from 'antd';
import TimeConsuming from 'pages/chart/TimeConsuming.js';//最耗时
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Wbyy extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {showAdd,wbyy_right=false,showRight,wbsyl}=this.props;
        let tabData=['响应时间占比','平均响应时间','响应总时间','吞吐率','错误率','top'];
        return (
            <div className='wbyy' id='wbyy'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='wbyy_body'>
                    <SortHeader tabData={tabData}  />
                    <div className='wbyy_content'>
                    	<div className='tab_ul'>
                    		<span>Http</span>
                    		<span>Thrift</span>
                    		<span>Dubbo</span>
                    		<span>Web Service</span>
                    	</div>
                        <div className='wbyy_content_left'>
                            <div className='wbyy_content_left_titlt'>外部应用一览</div>
                            <div className='wbyy_content_left_input'><input/><span>搜索</span></div>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                                {
                                    wbsyl&& wbsyl.map((value,i)=>{
                                        return(
                                            <li key={i} style={{marginBottom:'3px'}} onClick={()=>showRight(value.host)}>
                                                <span style={{width:'146px',height:'22px',float:'left'}}>{value.host}</span>
                                                <span style={{width:'77px',height:'22px',float:'right',textAlign:'center'}}>{value.avgTime}</span>
                                                <span style={{width:'22px',height:'22px',textAlign:'center'}}>{value.invokeCount}</span>
                                            </li>
                                        )
                                    })
                                }                                
                            </ul>
                        </div>
                        <div className='wbyy_content_right'>
                            {wbyy_right && <Wbyy_right/>}
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 最耗时Memcached操作堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <TimeConsuming />
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> Memcached吞吐率堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <TimeConsuming />
                            <div className='header'>
		                        <Icon type="question-circle" />
		                        <span> Memcached响应时间曲线图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
		                    </div>  
		                    <TimeConsuming />                               
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
        wbyy_right:state.vars.wbyy_right,
        wbsyl:state.vars.wbsyl,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
            let obj1={//外部事务一览
                type: 'get',
                url: 'apm/outService.pinpoint' ,
                data: 'type='+'ALL',
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('外部事务一览2',data)
                dispatch(actions.setVars('wbsyl',data.objectList))
            }
    	},
    	init:()=>{
    		let height=$('#wbyy').css('height');
            $('#secondTree').css('height',height);
    	},
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true))
        },
        showRight:(id)=>{
            dispatch(actions.setVars('wbyy_right',true));
            dispatch(actions.setVars('host_right',id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wbyy);