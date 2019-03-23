//慢事务追踪
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/slowTransiction.css';
import Slow_sql from 'pages/Application/slow_sql.js';
import Slow_abstract from 'pages/Application/slow_abstract.js';
import Slow_details from 'pages/Application/slow_details';
import { Icon } from 'antd';

class SlowTransiction extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    } 
    render() {
    	let {show1,show2,show3,slowPage='abstract',goback}=this.props;
        return (
            <div className='slowTransiction'>
                <div className='slow_title'>慢事务追踪<span onClick={()=>goback()}>返回<Icon type="rollback" /></span></div>
                <table className='slow_message'>
                    <tbody>
                        <tr><td>应用</td><td>PHP Application</td></tr>
                        <tr><td>事务</td><td>首页</td></tr>
                        <tr><td>追踪时间</td><td>2018</td></tr>
                        <tr><td>服务器响应时间</td><td>2.2（s）</td></tr>
                        <tr><td>实例信息</td><td>PHP:ucd-ty-app-demo-1.ucd.tingyun.com</td></tr>
                    </tbody>
                </table>
                <div className='slow_content'>
                    <div className='slow_content_tab'>
                        <span className={slowPage=='abstract' ? 'active':'normal'} id='abstract' onClick={()=>show1('abstract')}>摘要</span>
                        <span className={slowPage=='details' ? 'active':'normal'} id='details' onClick={()=>show2('details')}>追踪详情</span>
                        <span className={slowPage=='sql' ? 'active':'normal'} id='sql' onClick={()=>show3('sql')}>相关SQL</span>
                    </div>
                    <div className='slow_content_request'>
                        <div className='slow_content_request_title'> 请求信息</div>
                        <table className='slow_content_request_text'>
                            <tbody>
                                <tr><td>请求URl:</td><td>PHP Application</td></tr>
                                <tr><td>线程名称:</td><td>首页</td></tr>
                                <tr><td>HTTP响应:</td><td>2018</td></tr>
                                <tr><td>referer:</td><td>2.2（s）</td></tr>
                                <tr><td>user-agent:</td><td>PHP:ucd-ty-app-demo-1.ucd.tingyun.com</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='slow_content_request2'>
                        <div className='slow_content_request2_title'> 请求参数</div>
                        <table className='slow_content_request2_text'>
                            <tbody>
                                <tr><td>请求URl:</td><td>PHP Application</td></tr>
                                <tr><td>线程名称:</td><td>首页</td></tr>
                                <tr><td>HTTP响应:</td><td>2018</td></tr>
                                <tr><td>referer:</td><td>2.2（s）</td></tr>
                                <tr><td>user-agent:</td><td>PHP:ucd-ty-app-demo-1.ucd.tingyun.com</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='slow_content_text'>
                        {slowPage=='sql' && <Slow_sql/>}
                        {slowPage=='abstract' && <Slow_abstract/>}
                        {slowPage=='details' && <Slow_details/>}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        slowPage:state.vars.slowPage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID)=>{
    		
    	},
    	init:()=>{
    		
    	},
        show1:(page)=>{
            dispatch(actions.setVars('slowPage',page))
        },
        show2:(page)=>{
            dispatch(actions.setVars('slowPage',page))
        },
        show3:(page)=>{
            dispatch(actions.setVars('slowPage',page)) 
        },
        goback:()=>{
            dispatch(actions.setVars('slowTransition',false))
        }        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SlowTransiction);