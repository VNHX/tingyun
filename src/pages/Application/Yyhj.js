//应用环境
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'pages/Application/yyhj.css';
import actions from 'actions';
import Header from 'pages/functionalCom/Header.js';
import myAjax from 'pages/functionalCom/myAjax.js';
import kkkk from 'pages/functionalCom/as.js';
const ajax = myAjax.myAjax
class Yyhj extends Component{  
	componentWillMount() {
		this.props.willMount(this.props.headerOptionsID,this.props.onChange);
		console.log(this.props.headerOptionsID,'asd');
		console.log(this.props.onChange,'时间')
    }
    componentDidMount() {
        this.props.init();
    }

    render() {
    	let {hxhj,headerOptionsID}=this.props;
        return (
            <div className='yyhj' id='yyhj'>
                <Header optionData={'more'}  headerFlag={true}/>
                <div className='yyhj_body'>
                	<div className='PHP'>
                		<div className='PHP_left'>
						<div style={{width:'40%',fontSize:'16px'}}>agent信息</div>
                			<table>
                				<thead>
                					<tr>
                						<th>applicationName</th>
										<th>agentId</th>
										<th>agentVersion</th>
										<th>hostName</th>
										<th>initialStartTimestamp</th>
										<th>ip</th>
										<th>pid</th>
										<th>ports</th>
										<th>serviceType</th>
										<th>startTimestamp</th>
										<th>vmVersion</th>
                					</tr>
                				</thead>
                				<tbody>
									{
										hxhj  && hxhj.map((value,i)=>{
											console.log(i,'agent信息')
											return(
												<tr key={i}>
													<td style={{width:'40%'}}>{value.applicationName}</td>
													<td style={{width:'20%'}}>{value.agentId}</td>
													<td style={{width:'20%'}}>{value.agentVersion}</td>
													<td style={{width:'20%'}}>{value.hostName}</td>
													<td style={{width:'20%'}}>{value.initialStartTimestamp}</td>
													<td style={{width:'20%'}}>{value.ip}</td>
													<td style={{width:'20%'}}>{value.pid}</td>
													<td style={{width:'20%'}}>{value.ports}</td>
													<td style={{width:'20%'}}>{value.serviceType}</td>
													<td style={{width:'20%'}}>{value.startTimestamp}</td>
													<td style={{width:'40%'}}>{value.vmVersion}</td>
												</tr>
											)
										})
									}
									
									
                				</tbody>
                			</table>
                		</div>
						<div className='PHP_left2'>
						<div style={{width:'40%',fontSize:'16px'}}>服务器信息</div>
						<table>
                				<thead>
                					<tr>
										<th>serverInfo</th>
                					</tr>
                				</thead>
                				<tbody>
	                				{
										hxhj&&hxhj.map((value,k)=>{
											console.log(k,'服务器信息')
											return(
												<tr key={k}>
												<td>{value.serverMetaData.serverInfo}</td>
												</tr>
											)
										})
									}
                				</tbody>
                			</table>
                			
                		</div>
						<div className='PHP_right2'>
						<div style={{width:'83%',fontSize:'16px'}}>jvm参数</div>
                		<table>
                				<thead>
                					<tr>
                						<th>vmArgs</th>
                					</tr>
                				</thead>
                				<tbody>
									{
										hxhj  && hxhj.map((value,i)=>{
											console.log(i,'jvm参数')
											return(
												<tr key={i}>
													<td >{value.serverMetaData.vmArgs}</td>
												</tr>
											)
										})
									}
                				</tbody>
                			</table>
                		</div>
                		<div className='PHP_right'>
						<div style={{width:'83%',fontSize:'16px'}}>jvm概况</div>
							<table>
                				<thead>
                					<tr>
										<th>gcTypeName</th>
										<th>jvmVersion</th>
										<th>version</th>
                					</tr>
                				</thead>
                				<tbody>
	                				{
										hxhj&&hxhj.map((value,y)=>{
											console.log(y,'jvm概况')
											return(
												<tr key={y}>
												<td >{value.jvmInfo.gcTypeName}</td>
												<td>{value.jvmInfo.jvmVersion}</td>
												<td >{value.jvmInfo.version}</td>
												</tr>
											)
										})
									}
                				</tbody>
                			</table>
                		</div>
						<div className='PHP_right3'>
						<div style={{width:'83%',fontSize:'16px'}}>jar包依赖</div>
                			<table>
                				<thead>
                					<tr>
										<th>serviceLibs</th>
                					</tr>
                				</thead>
                				<tbody>
	                				{
										hxhj&&hxhj.map((value,k)=>{
											console.log(k,'jar包依赖')
											return(
												<tr key={k}>
												<td>{value.serverMetaData.serviceInfos[0].serviceLibs}</td>
												{/* <td>{value.serverMetaData.serviceInfos[1].serviceLibs}</td>
												<td>{value.serverMetaData.serviceInfos[2].serviceLibs}</td>
												<td>{value.serverMetaData.serviceInfos[3].serviceLibs}</td>
												<td>{value.serverMetaData.serviceInfos[4].serviceLibs}</td> */}
												<td >{value.serverMetaData.serviceInfos[5].serviceLibs}</td>
												</tr>
											)
										})
									}
                				</tbody>
                			</table>
                		</div>
                	</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
		hxhj:state.vars.hxhj,
		headerOptionsID:state.vars.headerOptionsID,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID)=>{
			console.log('vhu',headerOptionsID)
			$.ajax({
					type: 'get',
					url: kkkk.kkkk,
					data: 'application=vm128appName&from=1522557151546&to=1522557153546',
					dataType: 'json',
					success:function(sss){
						console.log(sss,'你好厉害');
						var s;
						for(s in sss){
							dispatch(actions.setVars('hxhj',sss[s]));
						}
					},
					error:function(){
						alert('你不理我了!')
					}
			});
			
		    	},
    	init:()=>{
    		let height=$('#yyhj').css('height');
            $('#secondTree').css('height',height);
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Yyhj);