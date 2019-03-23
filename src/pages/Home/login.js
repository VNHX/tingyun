//警报设置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import { Redirect } from 'react-router-dom'; 
import './login.css';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Login extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {login,loginFlag=false}=this.props;
        if(loginFlag){
            return <Redirect push to="/server" />;
        }
        return (
            <div className='login'>
                <div className='messageBox'>
                    <div>
                        <lable>用户名：</lable><input/>
                    </div>
                    <div>
                        <lable>密&nbsp;&nbsp;&nbsp;码：</lable><input/>
                    </div>
                    <div className='btn'><button onClick={()=>login()}>登录</button></div>
                </div>
            </div>            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loginFlag:state.vars.loginFlag,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{

    	},
    	init:()=>{
    		
    	},
        login:()=>{
            let obj1={//登录
                type: 'get',
                url: 'apm/checkUser.pinpoint' ,
                data: 'name=hcb&pwd=pp123',
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('登录',data)
                dispatch(actions.setVars('loginFlag',true)); 
            }               
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);