//慢事务，详情组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './slow_details.css';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Slow_sql extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID,this.props.transactionId);
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
    	let {slow_detailsData}=this.props;
        return (
            <div className='slow_details'>
            	
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        headerOptionsID : state.vars.headerOptionsID,//默认ID
        transactionId : state.vars.transactionId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,transactionId)=>{
    		let obj1={//sql
                type: 'get',
                url: 'apm/tracedetail.pinpoint' ,
                data: 'appId='+headerOptionsID+'transactionId='+transactionId,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('slow_detailsData',data)
                //dispatch(actions.setVars('slow_detailsData',data.objectList))
            }
    	},
    	init:()=>{
    		
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Slow_sql);