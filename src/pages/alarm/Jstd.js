//接收通道
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import NewJs from './newJs.js';
import { Icon,message } from 'antd';
import './jstd.css';
import myAjax from 'pages/functionalCom/myAjax.js';
import { Z_BLOCK } from 'zlib';
const ajax=myAjax.myAjax;
class Jstd extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {newJs=false,showNewjs,cUsername,edit=false,show_edit,qd,qx,deletec}=this.props;
        return (
            <div className='content'>
                <div className='jstd_title'>
                    <div className='jstd_title_left'>警报接收人<input type='text' /></div>
                    <div className='jstd_title_right' onClick={()=>showNewjs()}><Icon type="plus" />新建警报接收人</div>
                </div>
                <table className='jstd_table'>
                    <thead>
                        <tr>
                            <th>接收人姓名</th>
                            <th>邮箱地址</th>
                            <th>手机号码</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cUsername && cUsername.map((val,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.phoneNumber}</td>
                                        <td className='jstd_operation'>
                                        <Icon title='编辑' type="form" onClick={()=>show_edit(val.id)} />
                                        <Icon title='删除' type="delete" onClick={()=>deletec(val.id)}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {newJs && <NewJs/>}
                {
                    edit &&<div className='jstd_edit_box'>
                        <div className='edit_info'>
                            <table>
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
                                <td>E-mail:</td>
                                <td><input id='userEmail'/></td>
                            </tr>
                            <tr>
                                <td>手机号:</td>
                                <td><input id='userPhone' type='number' max={99999999999} /></td>
                            </tr>
                            </tbody>
                            </table>
                            <div style={{display:'inline-block',margin:'1rem 13rem 0rem 4rem',}}>
                                <span onClick={()=>qd()}>确定</span>
                                <span onClick={()=>qx()}>取消</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        newJs:state.vars.newJs,
        edit:state.vars.edit,
        cUsername:state.vars.cUsername,
        usernmae:state.vars.usernmae,
        userID:state.vars.userID,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
            let chank = {
                type:'get',
                url:'apm/userList.pinpoint',
                data:'',
                dataType:'json'
            }
            ajax(chank,chankan)
            function chankan (data){
                console.log(data,'user');
                dispatch(actions.setVars('cUsername',data.objectList))
            }
    	},
    	init:()=>{
    		
    	},
        showNewjs:()=>{
            dispatch(actions.setVars('newJs',true));      
        },
        show_edit:(userID)=>{
            dispatch(actions.setVars('userID',userID));  
            console.log(userID,'id')
            dispatch(actions.setVars('edit',true));    
        },
        qd:(userID)=>{
            console.log(userID,'编辑')
            // let upgai = {
            //     type:'get',
            //     url:'apm/updateUserById.pinpoint?name='+$('#userName').val()+'&pwd='+$('#password').val()+'&phoneNumber='+$('#userPhone').val()+'&email='+$('#userEmail').val(),
            //     data:'id='+userID,
            //     dataType:'json'
            // }
            // ajax(upgai,upgai1)
            // function upgai1 (data){
            //     dispatch(actions.setVars('edit',false));
            // }
            
        },
        qx:()=>{
            dispatch(actions.setVars('edit',false));  
        },
        deletec:(vID)=>{
            let chank = {
                type:'get',
                url:'apm/deleteUserById.pinpoint',
                data:'id='+vID,
                dataType:'json'
            }
            ajax(chank,chankan)
            function chankan (data){
                message.success('删除成功')
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Jstd);