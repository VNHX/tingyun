//探针
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'pages/Application/tz.css';
import Header from 'pages/functionalCom/Header.js';
import {Icon,message,Button} from 'antd';
import actions from 'actions';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax;
let infotime2;
class Htrw extends Component {
	componentWillMount() {
		this.props.willMount();
	}
	componentDidMount() {
		this.props.init();
	}
	componentWillUnmount() {
		clearInterval(infotime2) //停止定时器
	}

	render() {
		let {kaishi,kaishi1,ko,xaizai} = this.props;
		return (
			<div className='xcpx' id='xcpx'>
                <Header optionData={'more'} />
                <div className='xcpx_body'>
                	<div className='xcpx_body_left'>
                		<div className='xcpx_start'>
                		<h1>新建探针</h1>
                			<table>
                				<thead>
		                            <tr>
			                            <td className='xcpx_start_example'>service name :</td>
			                            <td><input type='text' id='sUSeran'></input></td>
		                            </tr>
		                            <tr>
			                            <td className='xcpx_start_example'>service code :</td>
			                            <td><input type='text' id='sCode'></input></td>
		                            </tr>
		                            <tr>
			                            <td className='xcpx_start_example'>key name :</td>
			                            <td><input type='text' id='sKeyCode'></input></td>
		                            </tr>
		                            <tr>
			                            <td className='xcpx_start_example'>key code :</td>
			                            <td><input type='text' id='sKeyName'></input></td>
		                            </tr>
		                            <tr>
			                            <td className='xcpx_start_example'>埋 点 :</td>
			                            <td><input type='text' id='sdectors'></input></td>
		                            </tr>
                				</thead>
                			</table>
							<Button className='xcpx_start_title'   onClick={()=>kaishi()} >新建探针</Button>
							<Button className='xcpx_start_title' onClick={()=>kaishi1()}>清空数据</Button>
                		</div>
                		<div className='xcpx_ahout'>
                			<div className='xcpx_ahout_title'>关于听云探针</div>
                			<div className='xcpx_ahout_text'>这个部分是关于听云探针的描述。
                				<ul>
                					<li>1. </li>
                					<li>2. </li>
                				</ul>
                			</div>
                		</div>
                	</div>
                	<div className='xcpx_body_right'>
                		<div className='xcpx_body_right_title'>已有探针列表</div>
                		<table style={{width:'100%'}}>
                			<thead>
                				<tr>
									<th>service name</th>
									<th>service code</th>
									<th>key name</th>
									<th>key code</th>
                					<th>探针类别</th>
									<th>编辑</th>
                				</tr>
                			</thead>
                			<tbody>
								{
									ko && ko.map((val,i)=>{
										return(
											<tr key={i}>
												<td>{val.serviceName}</td>
												<td>{val.serviceCode}</td>
												<td>{val.annotationKeyName}</td>
												<td>{val.annotationKeyCode}</td>
												<td>{val.pluginInfo}</td>
												<td><Button onClick={()=>xaizai(val.serviceCode)}>下载</Button></td>
											</tr>
										)
									})
								}
                			</tbody>
                		</table>
                	</div>
                	<div style={{clear:'both'}}></div>
                </div>
            </div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		opt: state.vars.opt,
		syu: state.vars.syu,
		ks: state.vars.ks,
		tz: state.vars.tz,
		dd: state.vars.dd,
		rd: state.vars.rd,
		ko: state.vars.ko,
		ko_id: state.vars.ko_id,
		tiao: state.vars.tiao,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		willMount: () => {
			let obj = { //查看所有的插件
				type: 'get',
				url: 'apm/pluginList.pinpoint',
				dataType: 'json'
			}
			ajax(obj,cokko);
			function cokko(data){
				console.log(data);
				dispatch(actions.setVars('ko', data.objectList));
			}
		},
		init: () => {
			let height = $('#xcpx').css('height');
			$('#secondTree').css('height', height);
			$("#").change(function() {
				var opt = $("#kkk").val();
				console.log(opt, 'ss')
				dispatch(actions.setVars('opt', opt))
			});
			$(".selectAll").on("click", function() {
				if (this.checked) {
					$(".check").prop("checked", true);
				} else {
					$(".check").prop("checked", false);
				}
			})

		},
		kaishi:()=>{
			if($('#sUSeran').val()==''){
				message.error('不能为空')
			}else{
				let obj5 = { //创建插件
					type: 'get',
					url: 'apm/createNewPlugin.pinpoint',
					data: 'serviceName='+$('#sUSeran').val()+'&serviceCode='+$('#sCode').val()+'&annotationKeyCode='+$('#sKeyCode').val()+'&annotriongKeyName='+$('#sKeyName').val()+'&dectors='+$('#sdectors').val(),
					dataType: 'json'
				}
				ajax(obj5, callback5);
				function callback5(data) {
					console.log('asdasd', data);
					message.success('创建插件成功')
					dispatch(actions.setVars('ko', data.objectList));
				};
			}

		},
		kaishi1:()=>{ // 清空 input 的 value 值
			console.log($('input').val(""),0)
			$('input').val("");
			// $('#sCode').val();
		},
		xaizai:(lID)=>{
			if(lID=='null'){
				message.error('下载失败')
			}else{
				window.location.href ='http://192.168.1.144:28080/apm/download.pinpoint?serviceCode='+lID;
				message.success('下载成功')
			}
			// let obj2 = { //下载插件
			// 	type: 'get',
			// 	url: 'apm/download.pinpoint?serviceCode='+lID,
			// 	// data:'serviceCode='+lID,
			// 	dataType: 'json',
			// }
			// ajax(obj2,cokko2);
			// function cokko2(data){
			// 	console.log(data)
				// message.success('下载成功')
			// 	dispatch(actions.setVars('ko', data.objectList));
			// }
		},
		tiao: (id) => {
			dispatch(actions.setVars('id', id));
			dispatch(actions.setVars('xcpx_right', true))
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Htrw);