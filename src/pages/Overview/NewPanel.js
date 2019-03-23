import React, {Component} from 'react';
import {connect} from 'react-redux';
import './newPanel.css';

class NewPanel extends Component{
    render() {
        let {cancel}=this.props;
        return (
        	<div>
	        	<div className='newPanel' id='newPanel'></div>
	            <div className='newBox' id='newBox'>
	                <div className='header'>
	                    <span className='add'>添加分组</span>
	                    <span className='cancel' onClick={()=>cancel()}></span>
	                </div>
	             	<div className='newName'>
	                    <span>分组名称</span><input />
	                </div>
	                <div className='handle'>
	                    <span id='cancel' onClick={()=>cancel()}>取消</span>
	                    <span id='sure'>确定</span>
	                </div>
	            </div>
	        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cancel:state.vars.cancel,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancel:()=>{
            $('#newPanel').css('display','none');
            $('#newBox').css('display','none');
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPanel);