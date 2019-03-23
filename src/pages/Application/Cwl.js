//错误率
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/cwl.css';
import Header from 'pages/functionalCom/Header.js';
import { Icon } from 'antd';
import SwChart6 from 'pages/chart/SwChart6.js';
import data from './data.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
class Cwl extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID);
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {showAdd,cwlbg,sjkList,cwlbgchras,cwyl_tu,tu_1}=this.props;
        let tabData=['top'];
        return (
            <div className='cwl' id='cwl'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='cwl_body'>
                    <div><span>显示top20 </span><input type='checkbox' /></div>
                    <div className='cwl_content'>
                        <div className='cwl_content_left'>
                            <div className='cwl_content_left_titlt'>错误一览</div>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                                {
                                    sjkList && sjkList.map((value,i)=>{
                                        return(
                                            <li key={i} style={{marginBottom:'3px'}} onClick={()=>cwyl_tu()}>
                                                <span style={{width:'100px',height:'22px',float:'left',overflow:'hidden'}}>{value.rpc}</span>
                                                <span style={{width:'58px',height:'22px',float:'right',textAlign:'center'}}>{value.errPer}%</span>
                                                <span style={{width:'50px',height:'22px',float:'right',textAlign:'center'}}>{value.totalMethodCount}</span>
                                                {/* <span style={{width:'50px',height:'22px'}}>{value.transactionErrorVOId}</span> */}
                                            </li>
                                        )
                                    })
                                }                                
                            </ul>                            
                        </div>
                        <div className='cwl_content_right'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 应用错误率</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            {
                                	tu_1 && tu_1=='tu' &&
                                <SwChart6 cwlbgchras={cwlbgchras} />
                            }
                          
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 错误列表</span>
                            </div> 
                            <table style={{width:'100%',marginTop:'10px'}}>
                            	<thead>
                            		<tr>
                            			<th>开始出现时间</th><th>最后发生时间</th>
                            			<th>URL</th><th>错误信息</th>
                                        <th>统计次数</th><th>错误次数</th>
                            		</tr>
                            	</thead>
                            	<tbody>
                                    {
                                        cwlbg && cwlbg.map((value,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td>{value.firstAppear}</td>
                                                    <td>{value.lastAppear}</td>
                                                    <td>{value.rpc}</td>
                                                    <td>{value.errMsg}</td>
                                                    <td>{value.invokeCount}</td>
                                                    <td>{value.errCount}</td>
                                                </tr>
                                            )
                                        })
                                    }
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
        cwlbg:state.vars.cwlbg,
        sjkList:state.vars.sjkList,
        cwlbgchras:state.vars.cwlbgchras,
        tu_1:state.vars.tu_1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID)=>{
            // console.log('错误率一览1',headerOptionsID)
    		let obj1={//错误率一览
                type: 'get',
                url: 'apm/transactionErrPer.pinpoint' ,
                data: 'appId='+headerOptionsID,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('错误率一览3',data)
                dispatch(actions.setVars('sjkList',data.objectList));
                // dispatch(actions.setVars('sjkList',data.objectList))
            };
            let obj2={//错误列表
                type: 'get',
                url: 'apm/errorList.pinpoint' ,
                data: 'appId='+headerOptionsID,
                dataType: 'json'
            };
            ajax(obj2,callback2);
            function callback2(data){
                console.log('错误列表2',data)
                dispatch(actions.setVars('cwlbg',data.objectList))
            };
            let obj3={//应用错误率
                type: 'get',
                url: 'apm/errorByTime.pinpoint' ,
                data: 'transactionErrorVOId='+1,
                dataType: 'json'
            };
            ajax(obj3,callback3);
            function callback3(data){
                console.log('应用错误率2',data);
                let cwlbgchras={
                    rpc:[],
                        errMsg:[],
                        yaxisList:[],
                };
                cwlbgchras.xaxisList=data.obj.xaxisList;
                for(let i=0;i<data.obj.yaxisList.length;i++){
                    cwlbgchras.rpc.push(data.obj.yaxisList[i].rpc);
                    cwlbgchras.errMsg.push(data.obj.yaxisList[i].errMsg);
                }
                console.log('应用错误率3',cwlbgchras);
                dispatch(actions.setVars('cwlbgchras',cwlbgchras))
            }
    	},
    	init:()=>{
    		let height=$('#cwl').css('height');
            $('#secondTree').css('height',height);
        },
        cwyl_tu:()=>{
    		dispatch(actions.setVars('tu_1','tu'))
    	},
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cwl);