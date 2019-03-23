//Sql堆栈情况
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/slowTransiction.css';
import { Icon } from 'antd';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
class Sjkzz extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID,this.props.rpc,this.props.sjk_slowSql1,this.props.sjk_slowSql2);
        console.log(this.props.rpc,'hx100');
        console.log(this.props.sjk_slowSql1,'=apiMetaId');
        console.log(this.props.sjk_slowSql2,'=sqlMetaDataId');
    }
    componentDidMount() {
        this.props.init();
    } 
    render() {
    	let {goback,sjkzztable}=this.props;
        return (
            <div className='slowTransiction'>
                <div className='slow_title'>Sql堆栈情况<span onClick={()=>goback()}>返回<Icon type="rollback" /></span></div>
                <table className='slow_message'>
                    <thead>
                        <tr>
                            <td>完整SQL语句</td>
                            <td>Trace详情</td>
                        </tr>
                        </thead>                         
                    <tbody>
                        {
                            sjkzztable &&sjkzztable.stackList.map((value,i)=>{
                                console.log(i,'as')
                                return(
                                    <tr key={i}>
                                    <td>{sjkzztable.sqlInfo}</td>
                                    <td>{value}</td>
                                    </tr>
                                )
                            })
                            }
                         
                         </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        headerOptionsID : state.vars.headerOptionsID,//默认ID
        rpc : state.vars.rpc,
        sjkzztable:state.vars.sjkzztable,
        sjk_slowSql1:state.vars.sjk_slowSql1,
        sjk_slowSql2:state.vars.sjk_slowSql2,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,rpc,sjk_slowSql2,sjk_slowSql1)=>{
        let obj2={
            type: 'get',
            url: 'apm/sqlTrackInfo.pinpoint' ,
            data: 'rpc='+rpc+'&sqlMetaDataId='+sjk_slowSql1+'&apiMetaId='+sjk_slowSql2,
            dataType: 'json'
        };
        ajax(obj2,callback2);
        function callback2(data){
            console.log('Sql堆栈情况',data)
            dispatch(actions.setVars('sjkzztable',data.obj));
            console.log('Sql堆栈情况',data.obj)
        };
    	},
    	init:()=>{
    	},
        goback:()=>{
            dispatch(actions.setVars('sjkzz',false))
        }        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sjkzz);