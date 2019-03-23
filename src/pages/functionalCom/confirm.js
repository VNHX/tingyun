import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './confirm.css';

class Confirm extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {alertText='确定删除分组吗？',cancel}=this.props;
        return (
            <div className='confirm'>
                <div className='textBox'>
                    <div className='con_header'>
                        温馨提示
                    </div>
                    <div className='con_text'>{alertText}</div>
                    <div className='con_btn'>
                        <span onClick={()=>cancel()}>取消</span><span>确定</span>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        alertText: state.vars.alertText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
    		
    	},
    	init:()=>{
    		
    	},
        cancel:()=>{
            dispatch(actions.setVars('confirm',false))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);