//新建接收人
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './newJs.css';
import { Icon,message } from 'antd';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class NewJs extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {backJs,addUser,initData,initData1}=this.props;
        return (
            <div className='newJs'>
                <div className='newJs_div'><div className='newJs_title' onClick={()=>backJs()}><Icon type="rollback" />新建接收人</div></div>
                <div className='newJs_table'>
                    <table className='newJs_details'>
                        <tbody>
                            <tr>
                                <td>接收人姓名:</td>
                                <td><input id='userName' type='text'/></td>
                            </tr>
                            <tr>
                                <td>密码:</td>
                                <td><input id='password' type='password'/></td>
                            </tr>
                            <tr>
                                <td>确认密码:</td>
                                <td><input id='isPassword' type='password'/></td>
                            </tr>
                            <tr>
                                <td>E-mail:</td>
                                <td><input id='userEmail'/></td>
                            </tr>
                            <tr>
                                <td>手机号:</td>
                                <td><input id='userPhone' type='number' max={99999999999} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='newJs_add' style={{cursor:'pointer',useSelect:'none'}} onClick={()=>addUser()}>提交</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        newJs:state.vars.newJs,
        initData:state.vars.initData,
        initData1:state.vars.initData1,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{

    	},
    	init:()=>{

    	},
    	backJs:()=>{
    		dispatch(actions.setVars('newJs',false));      
        },
        addUser:(isShow)=>{
            console.log(isShow,'添加')
            let addUserInfo = {
                type:'get',
                url:'apm/addUser.pinpoint?name='+$('#userName').val()+'&pwd='+$('#password').val()+'&phoneNumber='+$('#userPhone').val()+'&email='+$('#userEmail').val(),
                data:'',
                dataType:'json'
            }
            ajax(addUserInfo,callbackT)
            function callbackT (data){
                message.success('添加用户成功');
                dispatch(actions.setVars('newJs',false));
                // dispatch(actions.setVars('initData',data.objectList));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewJs);