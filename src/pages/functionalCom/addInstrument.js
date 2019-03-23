import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './addInstrument.css';

class AddInstrument extends Component{
    componentWillMount() {
        this.props.willMount();
    }
    componentWillUpdate() {
        this.props.update();
    }
    render() {
        let {cancel,add=false,showAdd,showGroup,addGroup}=this.props;
        return (
            <div className='addInstrument'>
	            <div className='instrumentbox'>
	            	<div className='addInstrument_header'>
	                	<span>添加自定义仪表盘</span>
	                	<span className='cancel' onClick={()=>cancel()}></span>
	                </div>
                    {
                        add==false && <div className='addInstrument_group'>
                            <span className='addInstrument_group_name'>仪表盘组</span>
                            <select>
                                <option>请选择分组</option>
                                <option>分组1</option>
                            </select>
                            <span className='addInstrument_group_btn' onClick={()=>showAdd()}>新增</span>
                        </div>  
                    }
	                {
                        add==true && <div className='addInstrument_group'>
                            <span className='addInstrument_group_name'>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span>
                            <input />                            
                            <span className='addInstrument_group_btn' onClick={()=>showGroup()}>取消</span>
                            <span className='addInstrument_group_btn' onClick={()=>addGroup()}>确定</span>
                        </div>
                    }
	                <div className='addInstrument_chart'>
	                	<span>图表别名</span>
	                	<input />
	                </div>
	                <div className='addInstrument_btn'>
	                	<span onClick={()=>cancel()}>取消</span><span>立即添加</span>
	                </div>
	            </div>                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        add: state.vars.add
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        update:()=>{
            
        },
        willMount:()=>{
            
        },
        cancel:()=>{
        	dispatch(actions.setVars('addInstrument',false))
        },
        addGroup:()=>{
            dispatch(actions.setVars('add',false))
        },
        showGroup:()=>{
            dispatch(actions.setVars('add',false))
        },
        showAdd:()=>{
            dispatch(actions.setVars('add',true))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInstrument);