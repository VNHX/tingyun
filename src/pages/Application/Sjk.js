//数据库
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/sjk.css';
import Header from 'pages/functionalCom/Header.js';
import SortHeader from 'pages/functionalCom/SortHeader.js';
import Sjk_right from './sjk_right.js';
import { Icon } from 'antd';
import SwChart from 'pages/chart/SwChart.js';
import SwChart2 from 'pages/chart/SwChart2.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Sjk extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID);
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {showAdd,sjk_right=false,showRight,sjkList,sjk_slowSql,sjk_top}=this.props;
        let tabData=['SQL耗时','平均响应时间','吞吐率','事务响应时间','top'];
        return (
            <div className='sjk' id='sjk'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='sjk_body'>
                    <SortHeader tabData={tabData}  />
                    <div className='sjk_content'>
                        <div className='sjk_content_left'>
                            <div className='sjk_content_left_titlt'>数据库一览</div>
                            <div className='sjk_content_left_input'><input/><span>搜索</span></div>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                                {
                                    sjkList && sjkList.map((value)=>{
                                        return(
                                            <li key={value.sqlId} style={{marginBottom:'3px'}} onClick={()=>showRight(value.sqlId)}>
                                                <span style={{width:'165px',height:'22px',float:'left'}}>{value.rpc}</span>
                                                <span style={{width:'50px',height:'22px',float:'right',textAlign:'center'}}>{value.totalTime}</span>
                                            </li>
                                        )
                                    })
                                }                                
                            </ul>
                        </div>
                        <div className='sjk_content_right'>
                            {
                                sjk_right && <Sjk_right />
                            }
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> TOP5 最耗时事务(墙钟时间比)堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <SwChart swChartData={sjk_top} />
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 数据库响应时间曲线图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <SwChart2 />
                            <div className="sjk_content_right_table">
                                <div>
                                    <div className='header'>
		                                <Icon type="question-circle" />
		                                <span> 慢SQL追踪列表</span>
		                            </div>
                                    <div className='search' style={{marginTop: '20px',marginBottom:'20px'}}>                                        
                                        <span>SQL操作: </span><input />
                                        <button value='查询'>查询</button>
                                    </div>                                    
                                    <table style={{width:'100%'}}>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>SQL操作</th>
                                                <th>追踪次数</th>
                                                <th>平均执行时间(ms)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sjk_slowSql && sjk_slowSql.map((value,key)=>{
                                                    return(
                                                        <tr key={value.dataBaseSqlViewVO.sqlId}>
                                                          <td>{key+1}</td>
                                                            <td>{value.dataBaseSqlViewVO.sqlInfo}</td>
                                                            <td>{value.invokeTime}</td>
                                                            <td>{value.avgTime}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
        sjk_right:state.vars.sjk_right,
        headerOptionsID : state.vars.headerOptionsID,//默认ID
        sjkList : state.vars.sjkList,
        sjk_slowSql : state.vars.sjk_slowSql,
        sjk_top : state.vars.sjk_top,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID)=>{
    		let obj1={//数据库一览
                type: 'get',
                url: 'apm/dbOverview.pinpoint' ,
                data: 'appId='+headerOptionsID,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('数据库一览',data)
                dispatch(actions.setVars('sjkList',data.objectList))
            }

            let obj2={//top5堆叠
                type: 'get',
                url: 'apm/topNExpensiveSql.pinpoint' ,
                data: 'appId='+headerOptionsID,
                dataType: 'json'
            };
            ajax(obj2,callback2);
            function callback2(data){
                console.log('top5堆叠',data);
                let sjk_top={
                    tranName:[],
                    maxTime:[],
                    minTime:[],
                    avgTime:[]
                }
                for(let i=0;i<data.objectList.length;i++){
                    sjk_top.tranName.push(data.objectList[i].dataBaseSqlViewVO.rpc);
                    sjk_top.maxTime.push(data.objectList[i].maxTime);
                    sjk_top.minTime.push(Number(data.objectList[i].minTime));
                    sjk_top.avgTime.push(Number(data.objectList[i].avgTime));
                }
                dispatch(actions.setVars('sjk_top',sjk_top))
            }

            let obj3={//慢sql列表
                type: 'get',
                url: 'apm/traceExpensiveSql.pinpoint' ,
                data: 'appId='+headerOptionsID,
                dataType: 'json'
            };
            ajax(obj3,callback3);
            function callback3(data){
                console.log('慢sql列表',data)
                dispatch(actions.setVars('sjk_slowSql',data.objectList))
            }

            let obj4={//数据库响应时间曲线
                type: 'get',
                url: 'apm/databaseResponse.pinpoint' ,
                data: 'appId='+headerOptionsID+'&sqlCount=100',//加下拉框
                dataType: 'json'
            };
            ajax(obj4,callback4);
            function callback4(data){
                console.log('数据库响应时间曲线',data)
                //dispatch(actions.setVars('sjkList',data.objectList))
            }
    	},
    	init:()=>{
    		let height=$('#sjk').css('height');
            $('#secondTree').css('height',height);
    	},
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true))
        },
        showRight:(id)=>{
            dispatch(actions.setVars('sjk_right',true));
            dispatch(actions.setVars('sjk_sqlId',id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sjk);