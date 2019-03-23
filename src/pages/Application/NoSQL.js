//NoSql
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/nosql.css';
import Header from 'pages/functionalCom/Header.js';
import SortHeader from 'pages/functionalCom/SortHeader.js';
import Nosql_right from './nosql_right.js';
import { Icon} from 'antd';
import SwChart8 from 'pages/chart/SwChart8.js';
import TimeConsuming from 'pages/chart/TimeConsuming.js';//最耗时
// import data from './data.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax;
class NoSQL extends Component {
    componentWillMount() {
        this.props.willMount(this.props.headerOptionsID);
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
        let {showAdd,nosql_right = false,showRight,sw,NoQSLtu} = this.props;
        let tabData = ['操作总耗时', '平均响应时间', '吞吐率', 'top'];
        //console.log('111111111111', sw['getCount'])
        return (
            <div className='nosql' id='nosql'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='nosql_body'>
                    <SortHeader tabData={tabData}  />
                    <div className='nosql_content'>
                    	<div className='tab_ul'>
                    		<span>REDIS</span>
                    	</div>
                        <div className='nosql_content_left'>
                            <div className='nosql_content_left_titlt'>REDIS一览</div>
                            <div className='nosql_content_left_input'><input/><span>搜索</span></div>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}} >
                                <li style={{marginBottom:'3px'}} onClick={()=>showRight()}>
                                    <span style={{width:'80px',height:'22px',float:'left'}}>GET</span>
                                    <span style={{width:'16px',height:'22px',textAlign:'center' }}>调用次数:12</span>
                                    <span style={{width:'66px',height:'22px',textAlign:'center'}}>时间(秒):76</span>
                                </li>
                                <li style={{marginBottom:'3px'}} onClick={()=>showRight()}>
                                    <span style={{width:'80px',height:'22px',float:'left'}}>SET</span>
                                    <span style={{width:'16px',height:'22px',textAlign:'center' }}>调用次数:12</span>
                                    <span style={{width:'66px',height:'22px',textAlign:'center'}}>时间(秒):45</span>
                                </li>
                            </ul>
                        </div>
                        <div className='nosql_content_right'>
                            {nosql_right && <Nosql_right/>}
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 最耗时Memcached操作堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <SwChart8 NoQSLtu={NoQSLtu} />
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
        nosql_right: state.vars.nosql_right,
        headerOptionsID: state.vars.headerOptionsID,
        sw: state.vars.sw,
        NoQSLtu: state.vars.NoQSLtu,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        willMount: (headerOptionsID) => {
            let initInfo = {
                type: 'get',
                url: 'apm/noSqlGeneralView.pinpoint',
                data: 'appId=' + headerOptionsID + '&noSqlType=REDIS',
                dataType: 'json',
            };
            ajax(initInfo, callback3);

            function callback3(data) {
                console.log(data, 'noSql概览')
                dispatch(actions.setVars('sw', data.obj))
                    //console.log('这是sw', data.obj)
            };
            let initInfo2 = {
                type: 'get',
                url: 'apm/nosqlCostByTime.pinpoint',
                data: 'appId=' + headerOptionsID + '&nosqlType=' + 'REDIS' + '&sectionCount=' + '12',
                dataType: 'json',
            };
            ajax(initInfo2, callback4);

            function callback4(data) {
                console.log(data, 'noSql随时间变化')
                let NoQSLtu = {
                    avgGetTime: [],
                    avgSetTime: [],
                    getCount: [],
                    maxGetTime: [],
                    maxSetTime: [],
                    minGetTime: [],
                    minSetTime: [],
                    setCount: [],
                    totalGetTime: [],
                    totalSetTime: [],
                    yaxisList: [],
                };
                NoQSLtu.xaxisList = data.obj.xaxisList;
                for (let i = 0; i < data.obj.yaxisList.length; i++) {
                    NoQSLtu.avgGetTime.push(data.obj.yaxisList[i].avgGetTime);
                    NoQSLtu.avgSetTime.push(data.obj.yaxisList[i].avgSetTime);
                    NoQSLtu.getCount.push(data.obj.yaxisList[i].getCount);
                    NoQSLtu.maxGetTime.push(data.obj.yaxisList[i].maxGetTime);
                    NoQSLtu.maxSetTime.push(data.obj.yaxisList[i].maxSetTime);
                    NoQSLtu.minSetTime.push(data.obj.yaxisList[i].minSetTime);
                    NoQSLtu.setCount.push(data.obj.yaxisList[i].setCount);
                    NoQSLtu.totalGetTime.push(data.obj.yaxisList[i].totalGetTime);
                    NoQSLtu.totalSetTime.push(data.obj.yaxisList[i].totalSetTime);
                }
                console.log(NoQSLtu, 'noSql概览2')
                dispatch(actions.setVars('NoQSLtu', NoQSLtu))
            }
        },
        init: () => {
            let height = $('#nosql').css('height');
            $('#secondTree').css('height', height);
        },
        showAdd: () => {
            dispatch(actions.setVars('addInstrument', true))
        },
        showRight: () => {
            dispatch(actions.setVars('nosql_right', true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NoSQL);