//情报汇总
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/qbhz.css';
import Header from 'pages/functionalCom/Header.js';//header组件
import { Select, Icon } from 'antd';
const Option = Select.Option;
import ApplicationChart from 'pages/chart/ApplicationChart.js';//应用服务器响应时间
import Apdexchart from 'pages/chart/Apdexchart.js';
import TimeConsuming from 'pages/chart/TimeConsuming.js';//最耗时
import myAjax from 'pages/functionalCom/myAjax.js';
import Yyfw from 'pages/functionalCom/as.js';
const ajax=myAjax.myAjax;

class Qbhz extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.agentIdS);
        console.log(this.props.agentIdS,'this.props.agentIds')
    }
    componentDidMount() {
        this.props.init();
    };  
    render() {
    	let {showAdd,iconActive='all',iconAll,iconWarn,iconExclama,show_slow,Apdextu,Datachar1}=this.props;
        return (
            <div className='qbhz' id='qbhz'>
                <Header headerFlag={true} optionData={'more'} />
            	<div className='qbhz_body'>
                	<div className='qbhz_body_first'>
                		<div className='left'>
                			<div className='header'>
                				<Icon type="question-circle" />
                				<span> 应用服务器响应时间</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                			</div>
                			<ApplicationChart Datachar1={Datachar1}/>
                		</div>
                		<div className='right'>
                			<div className='header'>
                				<Icon type="question-circle" />
                				<span> Apdex指标</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                			</div>
                            <Apdexchart Apdextu={Apdextu}/>
                		</div>
                        <div style={{clear:'both'}}></div>
                	</div>
                	<div className='qbhz_body_second'>
                        <div className='left secondBox'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 每秒事务数</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <Apdexchart />
                        </div>
                        <div className='middle secondBox'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 活动线程数</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <TimeConsuming />
                        </div>
                        <div className='right secondBox'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 堆内存图JVM</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <Apdexchart />
                        </div>
                        <div style={{clear:'both'}}></div>
                    </div>
                	<div className='qbhz_body_third'>
                        <div className='left thirdBox'>
                            <div className='cpu_box'>
                                <div className='cpu1'>
                                    <div className='header'>
                                        <Icon type="question-circle" />
                                        <span> 应用CPU使用率</span>
                                        <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                                    </div>
                                    <Apdexchart />
                                </div>
                                <div className='cpu2'>
                                    <div className='header'>
                                        <Icon type="question-circle" />
                                        <span> 永久区内存Perm </span>
                                        <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                                    </div>
                                    <Apdexchart />
                                </div>
                            </div>
                        </div>
                        <div className='right thirdBox'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 数据源信息</span>
                            </div>
                            <Apdexchart />
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
        iconActive:state.vars.iconActive,
        agentIdS:state.vars.agentIdS,
        Apdextu:state.vars.Apdextu,
        Datachar1:state.vars.Datachar1
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(agentIdS)=>{
                $.ajax({  //应用服务及其响应时间
                    type:'get',
                    url:Yyfw.yyfw,
                    data:'agentId='+agentIdS+'&from=1523845651000&to=1524018451000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('应用服务及其响应时间:',Datachar1,'成功');
                        dispatch(actions.setVars('Datachar1',Datachar1.charts))
                    },
                    error:function(err){
                        console.log('应用服务及其响应时间:',err,'失败')
                    }
                });
                $.ajax({// 每秒事务数
                    type:'get',
                    url:Yyfw.mmsw,
                    data:'agentId='+agentIdS+'&from=1517032838000&to=1517637638000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('每秒事务数:',Datachar1,'成功');
                    },
                    error:function(err){
                        console.log('每秒事务数:',err,'失败')
                    }
                });
                $.ajax({// CPU图
                    type:'get',
                    url:Yyfw.cpu,
                    data:'agentId='+agentIdS+'&from=1523845651000&to=1524018451000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('CPU 图:',Datachar1,'成功');
                    },
                    error:function(err){
                        console.log('CPU 图:',err,'失败')
                    }
                });
                $.ajax({// 活动线程数
                    type:'get',
                    url:Yyfw.hdxc,
                    data:'agentId='+agentIdS+'&from=1517032838000&to=1517637638000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('活动线程数:',Datachar1,'成功');
                    },
                    error:function(err){
                        console.log('活动线程数:',err,'失败')
                    }
                });
                $.ajax({// 堆内存图JVM
                    type:'get',
                    url:Yyfw.dttu,
                    data:'agentId='+agentIdS+'&from=1517032838000&to=1517637638000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('堆内存图JVM:',Datachar1,'成功');
                    },
                    error:function(err){
                        console.log('堆内存图JVM:',err,'失败')
                    }
                });
                $.ajax({// 永久区内存Perm 
                    type:'get',
                    url:Yyfw.rerm,
                    data:'agentId='+agentIdS+'&from=1517032838000&to=1517637638000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('永久区内存Perm :',Datachar1,'成功');
                    },
                    error:function(err){
                        console.log('永久区内存Perm :',err,'失败')
                    }
                });
                $.ajax({// 数据源信息 
                    type:'get',
                    url:Yyfw.sjxx,
                    data:'agentId='+agentIdS+'&from=1517032838000&to=1517637638000'+'&sampleRate='+'1',
                    dataType:'json',
                    success:function(Datachar1){
                        console.log('数据源信息 :',Datachar1,'成功');
                    },
                    error:function(err){
                        console.log('数据源信息 :',err,'失败')
                    }
                });
            let obj2={  // Apdex 值变化
                type:'get',
                url:'apm/getApdexVOByTime.pinpoint',
                data:'',
                dataType:'json',
            }
            ajax(obj2,callback2);
            function callback2(data){
                let Apdextu={
                    xaxisList:[],
                    yaxisList:[]
                };
                Apdextu.xaxisList=data.obj.xaxisList;
                Apdextu.yaxisList=data.obj.yaxisList;
                dispatch(actions.setVars('Apdextu',Apdextu))
            };
    	},
    	init:()=>{
            let height=$('#qbhz').css('height');
    		$('#secondTree').css('height',height);
    	},
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true));
        },
        iconAll:()=>{
            dispatch(actions.setVars('iconActive','all'))
        },
        iconWarn:()=>{
            dispatch(actions.setVars('iconActive','warning'))
        },
        iconExclama:()=>{
            dispatch(actions.setVars('iconActive','exclamation'))
        },
        show_slow:()=>{
            dispatch(actions.setVars('slowTransition',true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Qbhz);