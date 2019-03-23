//事务
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/sw.css';
import Header from 'pages/functionalCom/Header.js';
import SortHeader from 'pages/functionalCom/SortHeader.js';
import Sw_right from './sw_right.js';
import { Icon } from 'antd';
import SwChart from 'pages/chart/SwChart.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
import Las from 'pages/functionalCom/as.js';
class Sw extends Component{  
	componentWillMount() {
        let {}=this.props;
        this.props.willMount();
    }
    componentDidMount() {
    
        this.props.init();
    }
    formatDateTime(inputTime) {  //转化时间戳  
        var date = new Date(inputTime);  
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    }; 
    render() {
        let {rpcList,headerOptionsID,active,rpcList8,rpcList9,swTable,swyl,showAdd,sw_display=false,show_sw,sw_back,jump,swChartData}=this.props;
        console.log(rpcList,'rpcList')
        let tabData=['耗时百分比','响应时间','调用次数'];
        return (
            <div className='sw' id='sw'>
                <Header headerFlag={true} optionData={'more'} />
                <div className='sw_body'>
                    <SortHeader tabData={tabData}/>
                    <div className='sw_content'>
                        <div className='sw_content_left'>
                            <div className='sw_content_left_titlt' >事务一览</div>
                            <div className='sw_content_left_input'><input/><span>搜索</span></div>
                            <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                                {
                                    swyl && swyl.map((value,key)=>{
                                        return(
                                            <li key={key} style={{marginBottom:'3px'}} onClick={()=>show_sw(value.rpc,value.avgTransactionTime)}>
                                                <span style={{width:'165px',height:'22px',float:'left'}}>{value.rpc}</span>
                                                <span style={{width:'50px',height:'22px',float:'right',textAlign:'center'}}>{value.avgTransactionTime}</span>
                                            </li>
                                        )
                                    })
                                }                                
                            </ul>
                        </div>
                        <div className='sw_content_right'>
                            {
                                sw_display && <Sw_right rpcList8={rpcList8&&rpcList8} rpcList9={rpcList9&&rpcList9}/>
                            }
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> TOP5 最耗时事务(墙钟时间比)堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <SwChart swChartData={rpcList&&rpcList} />
                            <div className="sw_content_right_table">
                                <div style={{margin: '20px'}}>
                                    <div><span style={{fontSize: '16px'}}>慢事务追踪列表 </span> <Icon type="question-circle" /></div>
                                    <div className='search' style={{marginTop: '20px',marginBottom:'20px'}}>
                                        <span>事务: </span><input style={{width: '10%'}} />
                                        <span>最大响应时间: </span><input />
                                        <span>最小响应时间: </span><input />
                                        <span>参数名: </span><input />
                                        <span>参数值: </span><input />
                                        <button value='查询'>查询</button>
                                    </div>
                                    <div style={{fontSize: '12px',color: '#999',marginBottom:'10px'}}>提示：如根据参数搜索，参数名和参数值必须同时填写，或同时为空</div>
                                    <table style={{width:'100%'}}>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>时间</th>
                                                <th>事务</th>
                                                <th>服务器响应时间(ms)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                swTable && swTable.map((value,key)=>{
                                                    return(
                                                        <tr key={key} onClick={()=>jump(value.transactionId)}>
                                                            <td>{key+1}</td>
                                                            <td>{this.formatDateTime(Number(value.startTime))}</td>
                                                            <td>{value.rpc}</td>
                                                            <td>{value.elapsed}</td>
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
        sw_display: state.vars.sw_display,
        swyl : state.vars.swyl,
        swTable : state.vars.swTable,
        headerOptionsID : state.vars.headerOptionsID,//默认ID
        swChartData : state.vars.swChartData,
        active : state.vars.active,
        rpcList: state.vars.rpcList,
        rpcList8: state.vars.rpcList8,
        rpcList9: state.vars.rpcList9,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
         
    	},
    	init:()=>{
    		let height=$('#sw').css('height');
            $('#secondTree').css('height',height);
            $('.ant-select-selection-selected-value').text();
           
            let obj={
                appName:'tomcatappName1',
                timeSection:'',
                order:'',
            }
            $.ajax({
                async:true,
                type:'get',
                url:Las.getTransactionList,
                data:obj,
                dataType:'json',
                contentType:'application/json',
                success:function(sdData){
                        console.log(sdData,'成功');
                        dispatch(actions.setVars('swyl',sdData))
                        var kkrpc=sdData.slice(1,4);
                        let kkrpcList=[];
                        for(var i=0;i<kkrpc.length;i++){
                            kkrpcList.push(kkrpc[i].rpc)
                        }
                        let obj2={"rpc":kkrpcList,'timeSection':5}
                        console.log(obj2,'222222')
                        $.ajax({
                            async:true,
                            type:'get',
                            url:Las.getTransChart,
                            traditional: true,
                            data:obj2,
                            dataType:'json',
                            contentType: "application/json",
                            success:function(sdData2){
                                    console.log(sdData2,'成功');
                        dispatch(actions.setVars('rpcList',sdData2))

                            },
                            error:function(data){
                                console.log("失败",data)
                            }
                        })
                },
                error:function(data){
                    console.log("失败",data)
                }
            });
         
    	},
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true))
        },
        show_sw:(valrpc,keiD)=>{
            dispatch(actions.setVars('sw_display',true));
            dispatch(actions.setVars('sw_rpc',valrpc));
            let obj2={"rpc":valrpc,'timeSection':''}
            $.ajax({
                async:true,
                type:'get',
                url:Las.getSpanChart,
                data:obj2,
                dataType:'json',
                contentType: "application/json",
                success:function(sdData2){
                        console.log(sdData2,'成功');
                        dispatch(actions.setVars('rpcList8',sdData2))
                },
                error:function(data){
                    console.log("失败",data)
                }
            });
            let obj3={"rpc":valrpc}
            $.ajax({
                async:true,
                type:'get',
                url:Las.getSpanStack,
                data:obj3,
                dataType:'json',
                contentType: "application/json",
                success:function(sdData2){
                        console.log(sdData2,'成功');
                        dispatch(actions.setVars('rpcList9',sdData2))
                },
                error:function(data){
                    console.log("失败",data)
                }
            })

        },
        jump:(id)=>{
            dispatch(actions.setVars('slowTransition',true));
            dispatch(actions.setVars('transactionId',id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sw);