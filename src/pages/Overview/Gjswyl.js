//关键事务一览
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Overview/gjswyl.css';

class Gjswyl extends Component{
    
    render() {
        let {alarmFlagGjswyl='allTab',allTabGjswyl,alarmTabGjswyl,seriousTabGjswyl}=this.props;
        return (
            <div className='content'>
                <div className='gjswyl'>
                    <div className='header'>
                    	<div>关键事务列表(最近30分钟)</div>
                    	<input />
                    </div>
                    <table style={{width:'100%'}}>
                        <thead>
                            <tr>
                                <th>警报状态</th>
                                <th>关键事务名称</th>
                                <th>所属应用名称</th>
                                <th>响应时间（ms）</th>
                                <th>调用次数</th>
                                <th>错误率（%）</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <div className='browse'>
                        <div className='title'>最近事件一览(最近2周)</div>
                        <ul>
                            <li><a className={alarmFlagGjswyl=='allTab' ? 'active':''} id='allTab' onClick={()=>allTabGjswyl()}>所有(0)</a></li>
                            <li><a className={alarmFlagGjswyl=='alarmTab' ? 'active':''} id='alarmTab' onClick={()=>alarmTabGjswyl()}>警告(0)</a></li>
                            <li><a className={alarmFlagGjswyl=='seriousTab' ? 'active':''} id='seriousTab' onClick={()=>seriousTabGjswyl()}>严重问题(0)</a></li>
                        </ul> 
                        <div className='alarm'>
                            {
                                alarmFlagGjswyl=='allTab' && <div className='alarmContent'>暂无事件</div>
                            }
                            {
                                alarmFlagGjswyl=='alarmTab' && <div className='alarmContent'>暂无警告(0)事件</div>
                            }
                            {
                                alarmFlagGjswyl=='seriousTab' && <div className='alarmContent'>暂无严重问题(0)事件</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alarmFlagGjswyl: state.vars.alarmFlagGjswyl
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        seriousTabGjswyl:()=>{
            dispatch(actions.setVars('alarmFlagGjswyl','seriousTab'))
        },
        alarmTabGjswyl:()=>{
            dispatch(actions.setVars('alarmFlagGjswyl','alarmTab'))
        },
        allTabGjswyl:()=>{
            dispatch(actions.setVars('alarmFlagGjswyl','allTab'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gjswyl);