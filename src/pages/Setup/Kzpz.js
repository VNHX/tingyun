//扩展配置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import Header from 'pages/functionalCom/Header.js';
import 'pages/Setup/kzpz.css';

class Kzpz extends Component {     
    render() {
    	console.log('参数',this.props)
        return (
            <div className='kzpz'>
            	<Header optionData={'more'} />
            	<div className='kzpz_table'>
            		<table className='kzpz_table1'>
            			<tbody>
            				<tr>
            					<td colSpan="5"><input type='checkbox'/> <span>启用资源保护</span></td>
            				</tr>
            				<tr>
            					<td style={{width:'60px'}}>保护区间</td>
            					<td style={{width:'68px'}}>最小值：</td>
            					<td style={{width:'250px'}} className='text_input'><input /></td>
            					<td style={{width:'68px'}}>最大值：</td>
            					<td style={{width:'250px'}} className='text_input'><input /></td>
            				</tr>
            				<tr>
            					<td style={{width:'60px'}}></td>
            					<td style={{width:'68px'}}></td>
            					<td className='text_notes' style={{width:'626px'}} colSpan="3">随着CPU使用率或内存使用率在此区间，Agent会根据实际的使用量调整资源保护的强度，输入的值必须是整数，1-99</td>
            				</tr>
            				<tr>
            					<td style={{width:'60px'}} colSpan="2">安全阈值：</td>
            					<td className='text_input' style={{width:'250px'}} colSpan="3"><input /></td>
            				</tr>
            				<tr>
            					<td style={{width:'60px'}}></td>
            					<td style={{width:'68px'}}></td>
            					<td className='text_notes' style={{width:'626px'}} colSpan="3">当CPU使用率或内存使用率大于此阈值，Agent会暂时停止工作，输入的值必须是整数，1-99</td>
            				</tr>
            			</tbody>
            		</table>
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
export default connect(mapStateToProps, mapDispatchToProps)(Kzpz);