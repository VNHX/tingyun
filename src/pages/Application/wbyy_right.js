import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import { Icon } from 'antd';
import './wbyy_right.css';
import SwChart7 from 'pages/chart/SwChart7.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
class Wbyy_right extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.host_right);
        console.log('host=',this.props.host_right)
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {sw_back,showAdd,host_right,host_righttu}=this.props;
        return (
            <div className='wbyy_content_right_block'>
                <div className='wbyy_content_right_block_tab'>
                    <span>性能分解</span><span>错误</span>
                </div>
                <div className='wbyy_content_right_block_chart'>
                    <div className="back" onClick={()=>sw_back()}><Icon type="rollback" />返回</div>
                    <div>
                        <div className='header'>
                            <Icon type="question-circle" />
                        	<span> 事务性能分解堆叠图</span>
                            <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                        </div>
                        <SwChart7 host_righttu={host_righttu}/>
                        <div className='header'>
                            <Icon type="question-circle" />
                            <span> 事务分解表格</span>
                            <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                        </div>
                        <table style={{width:'100%',marginTop:'10px'}}>
                            <thead>
                                <tr>
                                    <th>代码段</th>
                                    <th>性能分类</th>
                                    <th>耗时百分比（%）</th>
                                    <th>调用次数</th>
                                    <th>平均响应时间（ms）</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        host_right:state.vars.host_right,
        host_righttu:state.vars.host_righttu,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(host_right)=>{
            console.log(host_right,'=host');
            let obj1={//外部事务性能分解堆叠图
                type: 'get',
                url: 'apm/outServiceByTime.pinpoint' ,
                data: 'host='+host_right,
                dataType: 'json',
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('外部事务性能分解堆叠图2',data);
                let host_righttu={
                    avgTime:[],
                };
                host_righttu.xaxisList=data.obj.xaxisList;
                for(let i=0;i<data.obj.yaxisList.length;i++){
                    host_righttu.avgTime.push(data.obj.yaxisList[i].invokeCount);
                }
                console.log('外部事务性能分解堆叠图4',host_righttu);
                dispatch(actions.setVars('host_righttu',host_righttu))
            }
    	},
    	init:()=>{
    		
    	},
        sw_back:()=>{
            dispatch(actions.setVars('wbyy_right',false))
        },
        showAdd:()=>{
            dispatch(actions.setVars('addInstrument',true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wbyy_right);