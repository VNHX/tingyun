//应用一览
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Overview/yyyl.css';
import TimeDrag from 'pages/functionalCom/timeDrag.js';
import { DatePicker, Icon } from 'antd';
const { RangePicker } = DatePicker;
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
 
class Yyyl extends Component{
    componentDidMount() {
        this.props.init();
    }
    componentWillMount() {
        this.props.willMount();
    }
    render() {
        let {yyylList,allTabYyyl,alarmTabYyyl,seriousTabYyyl,alarmFlagYyyl='allTab',showSlideFlag=false,showSlide,slide,slideFlag='left'}=this.props;
        return (
            <div className='content'>
            	<div className='header'>
            		<span className='headerLeft'>应用列表</span>
            		<div className='headerRight'>
            			<span className='oneSection'>分组筛选: </span>
            			<span className='twoSection'>全部</span>
            			<input className='threeSection' />
            			<span className='fourSection' onClick={()=>showSlide(showSlideFlag)}>最近30分钟<Icon type="caret-down" /></span>
                        {
                            showSlideFlag && <div className='timeCom'>
                                <div className='title'>
                                    <span>选择时间</span><span onClick={()=>showSlide(showSlideFlag)} className='close'></span>
                                </div>
                                <div className='slide'>
                                    <span>指定时间</span>
                                    <span className='big' onClick={()=>slide(slideFlag)}>
                                        <span className={slideFlag=='left' ? 'left':'right'}></span>
                                    </span>
                                    <span>最近</span>
                                </div>
                                {
                                    slideFlag=='right' && 
                                    <div style={{height:'350px'}}>
                                        <RangePicker
                                          showTime={{ format: 'HH:mm' }}
                                          format="YYYY-MM-DD HH:mm"
                                          placeholder={['开始时间', '结束时间']}
                                          onChange={this.onChange}
                                          onOk={this.onOk}>
                                        </RangePicker>
                                    </div>
                                }                        
                                {
                                    slideFlag=='left' && 
                                    <div style={{height:'100px',paddingLeft:'30px',paddingTop:'25px'}}>
                                        <TimeDrag/>
                                    </div>
                                }                       
                            </div>
                        }
            		</div>
				</div>
				<table className='yyyl_table' cellSpacing="0" cellPadding='0' width='100%'>
					<thead>
						<tr>
							<th width='55%'></th>
							<th>平均响应时间(ms)</th>
							<th>Apdex</th>
							<th>错误率(%)</th>
							<th>吞吐率(rpm)</th>
                            <th>调用次数</th>
						</tr>
					</thead>
                    <tbody>
                        {
                            yyylList && yyylList.map((value)=>{
                                return(
                                    <tr key={value.appId}>
                                        <td width='55%'><div>{value.applicationName}</div></td>
                                        <td><div>{value.responseTime}</div></td>
                                        <td><div>{value.apdex}</div></td>
                                        <td><div>{value.errPercentage}</div></td>
                                        <td><div>{value.rpm}</div></td>
                                        <td><div>{value.invokeCount}</div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr> 
                            <td width='55%'></td>
                            <td></td>
                            <td></td>
                            <td>注：将24小时内无数据的应用隐藏。</td>
                            <td>隐藏</td>
                        </tr>
                    </tfoot>
				</table>
                <div className='browse'>
                    <div className='title'>最近事件一览(最近2周)</div>
                    <ul>
                        <li><a className={alarmFlagYyyl=='allTab' ? 'active':''} id='allTab' onClick={()=>allTabYyyl()}>所有(0)</a></li>
                        <li><a className={alarmFlagYyyl=='alarmTab' ? 'active':''} id='alarmTab' onClick={()=>alarmTabYyyl()}>警告(0)</a></li>
                        <li><a className={alarmFlagYyyl=='seriousTab' ? 'active':''} id='seriousTab' onClick={()=>seriousTabYyyl()}>严重问题(0)</a></li>
                    </ul> 
                    <div className='alarm'>
                        {
                            alarmFlagYyyl=='allTab' && <div className='alarmContent'>暂无事件</div>
                        }
                        {
                            alarmFlagYyyl=='alarmTab' && <div className='alarmContent'>暂无警告(0)事件</div>
                        }
                        {
                            alarmFlagYyyl=='seriousTab' && <div className='alarmContent'>暂无严重问题(0)事件</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alarmFlagYyyl : state.vars.alarmFlagYyyl,
        slideFlag : state.vars.slideFlag,
        showSlideFlag : state.vars.showSlideFlag,
        yyylList : state.vars.yyylList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        willMount:()=>{
            let obj={
                type: 'get',
                url: 'apm/apmApplicationInfo.pinpoint' ,
                data: '' ,
                dataType: 'json'
            };
            ajax(obj,callback);
            function callback(data){
                console.log(data)
                dispatch(actions.setVars('yyylList',data.objectList))
            }
        },
        init:()=>{
            
        },
        seriousTabYyyl:()=>{            
            dispatch(actions.setVars('alarmFlagYyyl','seriousTab'))
        },
        alarmTabYyyl:()=>{            
            dispatch(actions.setVars('alarmFlagYyyl','alarmTab'))
        },
        allTabYyyl:()=>{            
            dispatch(actions.setVars('alarmFlagYyyl','allTab'))
        },
        slide:(slideFlag)=>{
            if(slideFlag=='left'){
                dispatch(actions.setVars('slideFlag','right'))
            }else{
                dispatch(actions.setVars('slideFlag','left'))
            }
        },
        showSlide:(showSlideFlag)=>{
            dispatch(actions.setVars('showSlideFlag',!showSlideFlag))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Yyyl);