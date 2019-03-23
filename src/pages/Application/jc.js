//进程
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/jc.css';
import { Icon } from 'antd';
import Header from 'pages/functionalCom/Header.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax;
import JcEcharss from 'pages/chart/jcEchars.js';
class Jc extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {sjkList,jcID,JcEchars}=this.props;
        return (
            <div className='bb' id='bb'>
            <Header headerFlag={true} optionData={'more'} />
            <div className='cwl_body'>
                <div><span>显示top20 </span><input type='checkbox' /></div>
                <div className='cwl_content'>
                    <div className='cwl_content_left'>
                        <div className='cwl_content_left_titlt'>进程一览</div>
                        <ul style={{width:'100%',listStyle:'none',padding:'0'}}>
                        {
                                    sjkList && sjkList.map((value,i)=>{
                                        return(
                                            <li key={i} style={{marginBottom:'3px'}} onClick={()=>jcID(value.pid)}>
                                                <span style={{width:'87',height:'22px',float:'left',overflow:'hidden'}}>{value.name}</span>
                                                <span style={{width:'58px',height:'22px',marginLeft:'82px',textAlign:'center'}}>{value.avgMemUse}MB</span>
                                            </li>
                                        )
                                    })
                                }             
                        </ul>                            
                    </div>
                    <div className='cwl_content_right'>
                        <div className='header'>
                            <Icon type="question-circle" />
                            <span> TOp5</span>
                            <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                        </div>
                        <JcEcharss JcEchars={JcEchars}/>
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
        sjkList:state.vars.sjkList,
        JcEchars:state.vars.JcEchars,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
            let obj1={//进程一览
                type: 'get',
                url: 'apm/sys/processList.pinpoint' ,
                dataType: 'json',
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('进程一览',data);
                dispatch(actions.setVars('sjkList',data.objectList))
            };

    	},
    	init:()=>{
    		let height=$('#bb').css('height');
            $('#secondTree').css('height',height);
        },
        jcID:(id)=>{
            console.log(id)
            let obj2={//进程一览图表
                type: 'get',
                url: 'apm/sys/changeByPidOrderByTime.pinpoint',
                data:'sectionCount=12&timeSection=2100020'+'&pid='+id,
                dataType: 'json',
            };
            ajax(obj2,callback2);
            function callback2(data){
                console.log('进程一览图表',data);
                dispatch(actions.setVars('JcEchars',data.obj))
            };
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Jc);