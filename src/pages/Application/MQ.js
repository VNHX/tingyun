//MQ
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/mq.css';
import Header from 'pages/functionalCom/Header.js';
import SortHeader from 'pages/functionalCom/SortHeader.js';
import { Icon } from 'antd';
// import SwChart10 from 'pages/chart/SwChart10.js';
// import SwChart2 from 'pages/chart/SwChart2.js';
// import data from './data.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax

class MQ extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID);
    }
    componentDidMount() {
        this.props.init();
    }
	
    render() {
        let {mq_page='consumer',mq_showConsumer,mq_showProducer,showAdd,Ml,Ml2,Ml3,swTable1,swTable2}=this.props;
        console.log(mq_page,'ss')
        let tabData=['消息总数','每分钟消息数','平均消息发送时间','总流量','每分钟流量数','top'];
        return (
            <div className='mq' id='mq'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='mq_tab'>
                	<span className={mq_page=='consumer' ? 'active':''} onClick={()=>mq_showConsumer()}>消费者</span>
                    <span className={mq_page=='producer' ? 'active':''} onClick={()=>mq_showProducer()}>生产者</span>
                </div>
                <div className='mq_body'>
                    <SortHeader tabData={tabData}  />
                    <div className='mq_content'>
                    	<div className='tab_ul'>
                    		<span>RabbitMQ</span>
                    		<span>JMS</span>
                    		<span>ActiveMQ</span>
                    		<span>MSMQ</span>
                    	</div>
                        <div className='mq_content_left'>
                            <div className='mq_content_left_titlt'>MQ一览</div>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                                {
                                    mq_page && mq_page=='producer' && Ml && Ml.map((value,i)=>{
                                        console.log(i,'qw')
                                        return(
                                            <li key={i} style={{marginBottom:'3px'}}>
                                                <span style={{width:'165px',height:'22px',float:'left'}}>{value.host}</span>
                                                <span style={{width:'50px',height:'22px',float:'right',textAlign:'center'}}>{value.hostCount}</span>
                                            </li>
                                        )
                                    })
                                }                                
                            </ul>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                                {
                                    mq_page && mq_page=='consumer' && Ml2 && Ml2.map((value,i)=>{
                                        console.log(i,'qw')
                                        return(
                                            <li key={i} style={{marginBottom:'3px'}}>
                                                <span style={{width:'165px',height:'22px',float:'left'}}>{value.host}</span>
                                                <span style={{width:'50px',height:'22px',float:'right',textAlign:'center'}}>{value.hostCount}</span>
                                            </li>
                                        )
                                    })
                                }                                
                            </ul>
                        </div>
                        <div className='mq_content_right'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> Top5 最耗时MQ服务</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            {/* <SwChart10 Ml3={Ml3}/> */}
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> MQ消息堆栈</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <table style={{width:'100%'}}>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>时间</th>
                                                <th>调用次数</th>
                                                <th>事务</th>
                                                <th>服务器响应时间(ms)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                mq_page && mq_page=='consumer' && swTable1 && swTable1.map((value,i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td>{i+1}</td>
                                                            <td>{value.avgTime}</td>
                                                            <td>{value.invokeCount}</td>
                                                            <td>{value.serviceType}</td>
                                                            <td>{value.timePer}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                             {
                                                mq_page && mq_page=='producer' && swTable2 && swTable2.map((value,i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td>{i+1}</td>
                                                            <td>{value.avgTime}</td>
                                                            <td>{value.invokeCount}</td>
                                                            <td>{value.serviceType}</td>
                                                            <td>{value.timePer}</td>
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
        mq_page : state.vars.mq_page,
        Ml: state.vars.Ml,
        Ml2: state.vars.Ml2,
        Ml3:state.vars.Ml3,
        headerOptionsID:state.vars.headerOptionsID,
        swTable1:state.vars.swTable1,
        swTable2:state.vars.swTable2
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,Ml3)=>{
            console.log(headerOptionsID,'headerOptionsID');
            console.log(Ml3,'Ml3')
            let obj1={
                    type: 'get',
					url: 'apm/messageQueueGeneralInfo.pinpoint' ,
					data: 'mqType='+'ACTIVEMQ_CLIENT'+'&productorSelected='+'true',
					dataType: 'json'
            };
            ajax(obj1,mq1);
            function mq1(data){
                console.log(data,'MQ生产者')
                dispatch(actions.setVars('Ml',data.objectList))
            };
            let obj2={
                type: 'get',
                url: 'apm/messageQueueGeneralInfo.pinpoint' ,
                data: 'mqType='+'ACTIVEMQ_CLIENT_INTERNAL'+'&productorSelected='+'false',
                dataType: 'json'
            };
            ajax(obj2,mq2);
            function mq2(data){
                console.log(data,'MQ消费者')
                dispatch(actions.setVars('Ml2',data.objectList))
                // dispatch(actions.setVars('Ml3',data.objectList.queueInfoList))
                // console.log(data.objectList[0].queueInfoList.queueName,'MQ消费者')
            };
            let obj3={
                type: 'get',
                url: 'apm/messageQueueInfoByTime.pinpoint' ,
                data: 'mqType='+'ACTIVEMQ_CLIENT_INTERNAL'+'&appId='+headerOptionsID+'&productorSelected='+'false',
                dataType: 'json'
        };
        ajax(obj3,mq3);
        function mq3(data){
            console.log(data,'MQ消费者tu')
            dispatch(actions.setVars('Ml3',data.obj));
            let Ml3={
                avgTime:[],
                correctCount:[],
                errorCount:[],
                maxTime:[],
                minTime:[]
            };
            // Ml3.xaxisList=data.obj.xaxisList;
            // for(let i=0;i<data.obj.yaxisList.length;i++){
            //     Ml3.avgTime.push(Number(data.obj.yaxisList[i].avgTime));
            //     Ml3.correctCount.push(data.obj.yaxisList[i].correctCount);
            //     Ml3.errorCount.push(data.obj.yaxisList[i].errorCount);
            //     Ml3.maxTime.push(Number(data.obj.yaxisList[i].maxTime));
            //     Ml3.minTime.push(Number(data.obj.yaxisList[i].minTime));
            // }
            // dispatch(actions.setVars("Ml3",Ml3));
        }
        let obj4={
            type: 'get',
            url: 'apm/mqSpanEventInfo.pinpoint' ,
            data: 'mqType='+'ACTIVEMQ_CLIENT_INTERNAL'+'&productorSelected='+'false',
            dataType: 'json'
        };
        ajax(obj4,mq4);
        function mq4(data){
            console.log(data,'MQ消息堆栈')
            dispatch(actions.setVars('swTable1',data.objectList))
        };
        let obj5={
            type: 'get',
            url: 'apm/mqSpanEventInfo.pinpoint' ,
            data: 'mqType='+'ACTIVEMQ_CLIENT'+'&productorSelected='+'true',
            dataType: 'json'
        };
        ajax(obj5,mq5);
        function mq5(data){
            console.log(data,'MQ消息堆栈')
            dispatch(actions.setVars('swTable2',data.objectList))
        };
    	},
    	init:()=>{
    		let height=$('#mq').css('height');
            $('#secondTree').css('height',height);
    	},
        mq_showProducer:()=>{
            dispatch(actions.setVars('mq_page','producer'))
         
        },
        mq_showConsumer:()=>{
            dispatch(actions.setVars('mq_page','consumer'))
        },
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MQ);