//应用设置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import Header from 'pages/functionalCom/Header.js';
import 'pages/Setup/yysz.css';
import {Icon} from 'antd';
class Yysz extends Component {
    componentDidMount() {
        this.props.init();
    }    
    render() {
        let {}=this.props;
        return (
            <div className='yysz' id='yysz'>
                <Header optionData={'more'} />
                <div className='yysz_body'>
                	<table className='name'>
                		<tbody>
                			<tr>
                				<td style={{width:'140px',height:'42px'}}><span style={{color:'red'}}>*</span>应用名称</td>
                				<td style={{width:'610px',height:'42px'}}><input className='textInput' /></td>
                			</tr>
                			<tr>
                				<td style={{width:'140px'}}></td>
                				<td className='notes' style={{width:'610px',lineHeight:'25px',}}>您监测的应用依然是“PHP Application”，名称修改仅仅作为更方便的显示。使用字母数字和中文，最长32个字符，请不要使用重复的App名称。</td>
                			</tr>
                		</tbody>
                	</table>
                	<h4>服务器配置</h4>
                	<div className='yysz_content'>
                		<table className='yysz_content_table'>
                			<tbody>
                				<tr>
                					<td className='title'><Icon type="question-circle" /> 服务器端ApdexT：</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>单位为毫秒，缺省值500ms</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />自动命名事务</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>当启用时，应用探针系统根据应用框架和组件来命名事务。当禁用时，则使用Web请求的URI来命名事务。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td><Icon type="question-circle" /></td>
                				</tr>
                				<tr>
                					<td className='title'>分位值：</td>
                					<td><input /><input /><input /><input /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>分位值设定需是1-99的整数值，最多设置4个，最少设置1个，且不可以设置2个相同的数值</td>
                				</tr>
                				<tr>
                					<td className='title'>采集URI列表：</td>
                					<td><textare></textare></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>格式为回车分割的URI正则表达式列表，每行一个正则表达式。缺省值为空。当设定该参数时，该指定应用的应用探针只采集符合列表中规则的URI请求。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />启用事务追踪</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>启用后，应用探针对该应用中响应时间超过指定阈值的事务会保留各种跟踪记录数据，例如代码的调用堆栈和执行时间、HTTP请求参数、查询慢的SQL语句等等</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td>
                						<div className='checkTd'><input type='checkbox' />启用跨应用分析</div>
                						<div style={{paddingLeft:'20px'}}><input className='notes' type='checkbox' />启用Thrift跨应用分析</div>
                						<div className='notes' style={{paddingLeft:'20px'}}>只有勾选启用跨应用分析时，才可启用Thrift选项</div>
                					</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />启用MQ消费端监控</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>启用后，开始采集消费端的action数据。</td>
                				</tr>
                				<tr>
                					<td className='title'>事务跟踪阈值：</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>单位毫秒，缺省值为apdex_f，即4 * 应用的ApdexT值。该选项只有在“启用事务跟踪”选项开启后才有效，当该应用的事务的服务器响应时间大于该阈值时才记录事务跟踪的数据。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />采集URL参数</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>当启用时，在进行事务跟踪过程中，将记录HTTP请求中的URL参数，包括URL中“?”后面的查询参数和简单的POST参数，不支持multipart类型的POST参数。此选项会影响"启用事务跟踪"和"采集错误和异常信息"。</td>
                				</tr>
                				<tr>
                					<td className='title'>忽略URL参数：</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>格式为逗号分割的请求参数列表，“采集URL参数”选项必须开启才可以使用该选项。当设置该选项时，出现在列表中的HTTP参数将不被记录到事务跟踪和错误的数据中。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />采集错误和异常信息</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>开启时，应用探针将采集该应用所有的错误和异常信息。</td>
                				</tr>
                				<tr>
                					<td className='title'>忽略HTTP响应代码：</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>格式为逗号分割的数字HTTP响应代码，当设置该选项时，列表中的响应代码将不被记录为错误。该选项必须在“采集错误和异常信息”选项开启的情况下才生效。</td>
                				</tr>
                				<tr>
                					<td className='title'>SQL查询记录方式：</td>
                					<td>
                						<select>
                							<option>混淆</option>
                							<option>关闭</option>
                							<option>详细</option>
                						</select>
                					</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>关闭：不记录SQL语句</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>混淆：对记录的SQL语句进行混淆：对SQL语句中的数字和字符串值进行混淆操作，以问号“?”替换。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>详细：记录最详细的SQL语句，不进行混淆。</td>
                				</tr>
                				<tr>
                					<td className='title'>混淆SQL字段：</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>格式为逗号分割的字段字符串，缺省值为空。该选项只有当“SQL查询记录方式”设置为“详细”时才起作用。开启该选项时将对记录的SQL语句中的指定字段的值进行混淆。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />启用慢SQL查询跟踪</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>该选项启用时，对超过指定查询响应阈值的SQL语句进行跟踪，记录包括代码调用堆栈和SQL执行计划在内的跟踪数据。</td>
                				</tr>
                				<tr>
                					<td className='title'>慢SQL查询跟踪阈值：</td>
                					<td><input className='textInput'/></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>单位为毫秒，缺省值500ms。该选项只有在“启用慢SQL查询跟踪”开启时才生效。两个选项必须一起使用。当SQL查询的性能大于该阈值的时候，应用探针记录SQL查询跟踪的数据。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' />启用执行计划分析</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>该选项开启时，会对响应时间超过阈值的SQL查询进行执行计划分析。</td>
                				</tr>
                				<tr>
                					<td className='title'>执行计划分析阈值：</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>单位为毫秒，缺省值为500ms。该选项只在“启用执行计划分析”选项开启时才生效。当SQL查询的性能大于该阈值的时候，应用探针对该SQL语句进行执行计划分析。</td>
                				</tr>
                				<tr>
                					<td className='title'>堆栈阈值</td>
                					<td><input className='textInput' /></td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>单位为毫秒，缺省值为500ms。</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='checkTd'><input type='checkbox' /> 记录数据查询错误</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>仅当“采集错误和异常信息”选项开启时生效，开启该选项后，将把数据库查询错误作为应用错误记录。</td>
                				</tr>
                				<tr>
                					<td className='title'>参数命名事务：</td>
                					<td>
                						<div></div>
                					</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>该选项让应用探针可以根据指定的规则对事务进行重命名，以便区分相同URI的事务对不同参数的处理过程，以方便用户的使用。</td>
                				</tr>
                				<tr>
                					<td className='title'>参数命名外部应用：</td>
                					<td>
                						<div></div>
                					</td>
                				</tr>
                				<tr>
                					<td></td>
                					<td className='notes'>该选项让应用探针根据指定的规则对采集到的基于HTTP的外部服务URL进行重写，以区分使用相同URL但是参数不同的Web Service调用性能。</td>
                				</tr>
                			</tbody>
                		</table>
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
        init:()=>{
            let height=$('#yysz').css('height');
            $('#secondTree').css('height',height);
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Yysz);