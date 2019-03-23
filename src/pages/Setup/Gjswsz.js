//关键事务设置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import Header from 'pages/functionalCom/Header.js';
import 'pages/Setup/gjswsz.css';
import { Icon } from 'antd';
class Gjswsz extends Component {   
    render() {
        return (
            <div className='gjswsz'>
            	<Header optionData={'less'} />
                <div className='gjswsz_body'>
                	<div className='reason'>
                		<div className='title'>为什么要设置关键事务</div>
                		<div className='text'>
                			在Web应用程序中，有一些事务比其他的事务在商业上更加重要。需要更加精准的监测。它们通常包含在关键的业务过程中（例如：注册或者购买确认），或者从性能角度比较中的操作（例如：搜索或者登陆）。
							你需要密切监测这些事务，当它们的性能表现不佳时，及时获得告警。
						</div>
                	</div>
                	<div className='gjswsz_content'>
                		<div className='gjswsz_content_title'>
                			所属应用
                		</div>
                		<div className='gjswsz_content_text'>
                			<div style={{height:'50px',lineHeight:'20px'}}>PHP Application</div>
                			<div style={{height:'25px',lineHeight:'25px'}}>关键事务名称：</div>
                			<input className='gjswsz_input' />
                		</div>
                		<div className='gjswsz_content_title'>
                			设置ApdexT值
                		</div>
                		<div className='gjswsz_content_text'>
                			<Icon type='question-circle'/> <span style={{marginRight:'100px'}}>ApdexT：</span><input style={{height:'30px'}} /><span>(毫秒)</span>
                		</div>
                	</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Gjswsz);