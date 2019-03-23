//添加监控策略
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './newCl.css';
import { Icon,message } from 'antd';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
import Las from 'pages/functionalCom/as.js';
class NewCl extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {backCl,productType='app',showApp,showTransaction,showOutService,subCel,clInitData,newJsCl,}=this.props;
        return (
            <div className='newCl'>
                <div className='newCl_div'>
                    <div className='newCl_title' onClick={()=>backCl()}><Icon type="rollback" />新建Server警报策略</div>
                    <span className='newCl_div_btn' onClick={()=>subCel(false,productType)}>提交</span>
                </div>
                <div className='newCl_table'>
                    <table>
                        <tbody>
                            <tr>
                                <td>策略名称：</td>
                                <td><input id='clName' type='text' /></td>
                            </tr>
                            <tr>
                                <td>监控项目：</td>
                                <td className='newCl_btn'>
                                    <span className={productType=='app' ? 'active':''} onClick={()=>showApp()}>应用</span>
                                    <span className={productType=='transaction' ? 'active':''} onClick={()=>showTransaction()}>关键事务</span>
                                    <span className={productType=='outService' ? 'active':''}  onClick={()=>showOutService()}>外部服务</span>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div className='newCl_details' >
                                        <div><span > 响应时间</span></div>
                                        <div>
                                            <span>触发条件：吞吐率>= </span>
                                            <input id='timeRpm'  type='number' placeholder='请输入数字' />rpm
                                        </div>
                                        <div>
                                            <span>持续时间：</span>
                                            <input id='timeTime' type='number' placeholder='请输入数字' />毫秒
                                        </div>
                                        <div>
                                            <span>告警阈值：</span>
                                            <input id='timeThreshold' type='number'  placeholder='请输入数字' />分钟
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            {
                                productType!='outService' && <tr>
                                    <td></td>
                                    <td>
                                        <div className='newCl_details'>
                                            <div>
                                                <span>错误率</span>
                                            </div>
                                            <div>
                                                <span>触发条件：吞吐率>= </span>
                                                <input id='errorRpm'  type='number' placeholder='请输入数字' />rpm
                                            </div>
                                            <div>
                                                <span>持续时间：</span>
                                                <input id='errorTime' type='number' placeholder='请输入数字' />毫秒
                                            </div>
                                            <div>
                                                <span>告警阈值：</span>
                                                <input id='errorThreshold' type='number' placeholder='请输入数字' />分钟
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            }{
                                productType!='outService' && <tr>
                                    <td></td>
                                    <td>
                                        <div className='newCl_details'>
                                            <div><span>Apdex</span></div>
                                            <div>
                                                <span>触发条件：吞吐率>= </span>
                                                <input id='apdexRpm' type='number' placeholder='请输入数字' />rpm
                                            </div>
                                            <div>
                                                <span>持续时间：</span>
                                                <input id='apdexTime' type='number' placeholder='请输入数字' />毫秒
                                            </div>
                                            <div>
                                                <span>告警阈值：</span>
                                                <input id='apdexThreshold' type='number' placeholder='请输入数字' />分钟
                                            </div>
                                        </div>
                                    </td>
                                </tr>   
                            }
                        </tbody>
                    </table>
                </div>
                <div className='wranInfo'>
                    <span style={{color:'#f00',fontSize:'10px'}}>提示：请完整添加响应时间、错误率、Apdex中的一个或多个</span>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        newJsCl:state.vars.newJsCl,
        productType:state.vars.productType,
        clInitData:state.vars.clInitData,
    }
};  

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
           
    	},
    	init:()=>{
    		
    	},
    	backCl:()=>{

    		dispatch(actions.setVars('newJsCl',false));      
    	},
        showOutService:()=>{

            dispatch(actions.setVars('productType','outService'));
        },
        showApp:()=>{

            dispatch(actions.setVars('productType','app'));
        },
        showTransaction:()=>{

            dispatch(actions.setVars('productType','transaction'));
        },
        subCel:(isShow,clType,clType2)=>{
            console.log(clType,'TYpe开始')
            console.log(clType2,'clType2开始')
            let arrTime = [$('#timeRpm').val(),$('#timeTime').val(),$('#timeThreshold').val()]; //响应时间  1
            let arrApdex = [$('#apdexRpm').val(),$('#apdexTime').val(),$('#apdexThreshold').val()];  //Apdex   3
            let arrError = [$('#errorRpm').val(),$('#errorTime').val(),$('#errorThreshold').val()];  //错误率  2
            let rpm = arrTime.join('');
            let time = arrTime.join('');
            let threshold = arrTime.join('');
            let rpm2 = arrApdex.join('');
            let time2 = arrApdex.join('');
            let threshold2 = arrApdex.join('');
            let rpm3 = arrError.join('');
            let time3 = arrError.join('');
            let threshold3 = arrError.join('');
            function isEmpty(arr){

                var n = 0;

                for(let i =0;i<arr.length;i++){

                    if(arr[i]==''){

                        n+=1
                    }
                }

                return n
            }

            if($('#clName').val()==''){

                alert('请输入策略名称')

            }else if(isEmpty(arrTime)==1||isEmpty(arrTime)==2){

                    alert('请输入完整模块')

            }else if(isEmpty(arrApdex)==1||isEmpty(arrApdex)==2){

                    alert('请输入完整模块')

            }else if(isEmpty(arrError)==1||isEmpty(arrError)==2){

                    alert('请输入完整模块')
            }else if(isEmpty(arrError)==3&&isEmpty(arrApdex)==3&&isEmpty(arrTime)==3){

                    alert('请输入完整模块')

            }else{
                let ko={
                    'name':$('#clName').val(),
                    'strategyType':clType,
                    "monitorList":[
                        {
                            "type":'MONITOR_RESPNOSE_TIME',
                            "rpm":rpm ,
                            "time":time,
                            "threshold":threshold,
                        },
                        {
                            "type":'MONITOR_ERROR',
                            "rpm":rpm3,
                            "time":time3,
                            "threshold":threshold3,
                        },
                        {
                            "type":'MONITOR_APDEX',
                            "rpm":rpm2 ,
                            "time":time2,
                            "threshold":threshold2,
                        }
                    ]
                }
                $.ajax({
                    async:true,
                    type:'post',
                    url:Las.llll,
                    data:JSON.stringify(ko),
                    dataType:'json',
                    contentType:'application/json',
                    success:function(sdData){
                        message.success('提交成功')
                            console.log(sdData,'成功');
                            dispatch(actions.setVars('clInitData',sdData.objectList));
                    },
                    error:function(data){
                        console.log("失败",data)
                    }
                })
                dispatch(actions.setVars('newJsCl',isShow));

            }

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCl);