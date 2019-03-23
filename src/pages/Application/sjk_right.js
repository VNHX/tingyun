//数据库
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/sjk_right.css';
import { Icon } from 'antd';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Sjk_right extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID,this.props.sjk_sqlId);
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {sjk_back,showAdd,sjk_rightData}=this.props;
        return (
            <div className='sjk_right'>
                <div className="back" onClick={()=>sjk_back()}><Icon type="rollback" />返回</div>
                <div className='header'>
                    <Icon type="question-circle" />
                    <span> 数据库响应时间和吞吐率</span>                    
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style={{width:'20%'}}>调用方法</th>
                            <th style={{width:'15%'}}>SQL</th>
                            <th style={{width:'10%'}}>总时间</th>
                            <th style={{width:'15%'}}>最大时间</th>
                            <th style={{width:'15%'}}>最小时间</th>
                            <th style={{width:'10%'}}>调用次数</th>
                            <th style={{width:'15%'}}>平均消耗时间</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        sjk_rightData && <tr>
                            <td style={{width:'20%'}}>{sjk_rightData.dataBaseSqlViewVO.apiInfo}</td>
                            <td style={{width:'15%'}}>{sjk_rightData.dataBaseSqlViewVO.sqlInfo}</td>
                            <td style={{width:'10%'}}>{sjk_rightData.dataBaseSqlViewVO.totalTime}</td>
                            <td style={{width:'15%'}}>{sjk_rightData.maxTime}</td>
                            <td style={{width:'15%'}}>{sjk_rightData.minTime}</td>
                            <td style={{width:'10%'}}>{sjk_rightData.invokeTime}</td>
                            <td style={{width:'15%'}}>{sjk_rightData.avgTime}</td>
                        </tr>
                    }                        
                    </tbody>
                </table>
                <div className='header'>
                    <Icon type="question-circle" />
                    <span> 调用者耗时百分比图</span>
                    <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        sjk_sqlId : state.vars.sjk_sqlId,
        headerOptionsID : state.vars.headerOptionsID,//默认ID
        sjk_rightData : state.vars.sjk_rightData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,sjk_sqlId)=>{
    		let obj1={//数据库响应时间和吞吐率
                type: 'get',
                url: '/apm/theSqlInfo.pinpoint' ,
                data: 'appId='+headerOptionsID+'sqlId='+sjk_sqlId,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('数据库响应时间和吞吐率',data)
                dispatch(actions.setVars('sjk_rightData',data.obj))
            }
    	},
    	init:()=>{
    		
    	},
        sjk_back:()=>{
            dispatch(actions.setVars('sjk_right',false))
        },
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sjk_right);