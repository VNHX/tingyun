//警报设置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './jbsz.css';
import NewJb from './NewJb.js';
import { Icon } from 'antd';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Jbsz extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {newJb=false,showNew,jbsz_click=false,displayNone,goAdd}=this.props;
        return (
            <div className='content'>
                <div className='jbsz_title'>                    
                    <div className='jbsz_title_left'>监控对象<input type='text'/></div>
                    <div className='jbsz_title_right' onClick={()=>showNew()}><Icon type="plus" />
                        新建警报                        
                    </div>
                    {
                        jbsz_click && <div className='jbsz_click' onMouseLeave={()=>displayNone()}>
                            <span onClick={()=>goAdd('app')}>Server应用</span>
                            <span onClick={()=>goAdd('transaction')}>Server关键事务</span>
                            <span onClick={()=>goAdd('outService')}>Server外部服务</span>
                        </div>
                    }
                </div>
                <table className='jbsz_table'>
                    <thead>
                        <tr>
                            <th><input type='checkbox'/></th>
                            <th>监控类型</th>
                            <th>监控对象</th>
                            <th>策略名称</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type='checkbox'/></td>
                            <td>（听云server）应用</td>
                            <td>java_demo</td>
                            <td>server策略</td>
                        </tr>
                    </tbody>
                </table>
                {newJb && <NewJb></NewJb>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        newJb:state.vars.newJb,
        jbsz_click:state.vars.jbsz_click,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{

    	},
    	init:()=>{
    		
    	},
        showNew:()=>{
            dispatch(actions.setVars('jbsz_click',true));                       
        },
        displayNone:()=>{
            dispatch(actions.setVars('jbsz_click',false));   
        },
        goAdd:(type)=>{
            dispatch(actions.setVars('newJb',true));
            dispatch(actions.setVars('jbszType',type));  
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Jbsz);