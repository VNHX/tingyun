//仪表盘
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Overview/ybp.css';
import data from './data.js';//假数据
class Ybp extends Component{
    
    render() {
    	let {add,showConfirm}=this.props;
        return (
            <div className='content'>
                <div className='header'>
                	<div className='button' onClick={()=>add()}>新增仪表盘</div>
                </div>
                <div className='ybp_body'>
                	{
                        data.data.ybp.map((value)=>{
                            return(
                                <div className='ybp_box' key={value.name}>
                                    <div className='ybp_box_color'></div>
                                    <div className='ybp_box_btn' onClick={()=>showConfirm()}></div>
                                    <div className='ybp_box_name'>{value.name}</div>
                                    <div className='ybp_box_time'>{value.time}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        add:state.vars.add,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        add:()=>{
        	$('#newPanel').css('display','block');
        	$('#newBox').css('display','block');
        },
        showConfirm:()=>{
            dispatch(actions.setVars('confirm',true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Ybp);