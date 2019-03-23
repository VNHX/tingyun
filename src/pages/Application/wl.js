//网络
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/wl.css';
import { Icon } from 'antd';
import Header from 'pages/functionalCom/Header.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax
import Wlecheas from 'pages/chart/wlecheas.js' 
class Wl extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {wlylTable,tableEchas,wlylTable_right}=this.props;
        return (
            <div className='bb' id='bb'>
                       <Header headerFlag={true} optionData={'more'} />
            <div className='cwl_body'>
                <div><span>显示top20 </span><input type='checkbox' /></div>
                <div className='cwl_content'>
                    <div className='cwl_content_left'>
                        <div className='cwl_content_left_titlt'>网络设备一览</div>
                    </div>
                    <div className='wl'>
                        <table style={{width:'100%',marginTop:'10px'}}>
                            <thead>
                                <tr>
                                    <th>网卡名称</th>
                                    <th>接收速率(bytes/s)</th>
                                    <th>发送速率(bytes/s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                 wlylTable && wlylTable.map((val,i)=>{
                                     return(
                                        <tr key={i} onClick={()=>tableEchas(val.netWorkDecivesName)}>
                                          <td>{val.netWorkDecivesName}</td>
                                          <td>{val.avgRxSpeed}</td>
                                          <td>{val.avgTxSpeed}</td>  
                                        </tr>
                                     )
                                 })   
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='wl_top'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 最耗时Memcached操作堆叠图</span>
                                <span className='add' onClick={()=>showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <Wlecheas wlylTable_right={wlylTable_right}/>
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
        wlylTable:state.vars.wlylTable,
        wlylTable_right:state.vars.wlylTable_right,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
            let obj1={//网络一览
                type: 'get',
                url: 'apm/sys/generalNetInfo.pinpoint' ,
                dataType: 'json',
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('网络一览',data);
                dispatch(actions.setVars('wlylTable',data.objectList))
            };
    	},
    	init:()=>{
    		let height=$('#bb').css('height');
            $('#secondTree').css('height',height);
        },
        tableEchas:(tableName)=>{
            console.log(tableName)
            let obj2={//网络一览Eches
                type: 'get',
                url: 'apm/sys/dataByTime.pinpoint',
                data:'timeSection='+2100020+'&divicesName='+tableName,
                dataType: 'json',
            };
            ajax(obj2,callback2);
            function callback2(data){
                console.log('网络一览Eches',data);
                dispatch(actions.setVars('wlylTable_right',data.obj))
            };
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wl);