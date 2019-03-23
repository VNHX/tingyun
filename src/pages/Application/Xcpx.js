//线程剖析
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'pages/Application/xcpx.css';
import Header from 'pages/functionalCom/Header.js';
import { Icon ,message,Button,Input} from 'antd';
import actions from 'actions';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
let infotime2;
class Htrw extends Component{  
	componentWillMount() {
		this.props.willMount();
    }
    componentDidMount() {
		this.props.init();
	}
	componentWillUnmount () {
		clearInterval(infotime2)//停止定时器
	}
	
    render() {
    	let {kaishi,opt,kaishi1,timeOut,ks,rd,tz,dd,ko,delete1,delete2,ko_id,tiao}=this.props;
        return (
            <div className='xcpx' id='xcpx'>
                <Header optionData={'more'} />
                <div className='xcpx_body'>
                	<div className='xcpx_body_left'>
                		<div className='xcpx_start'>
                			<table>
                				<thead>
								<tr>
                                <td className='xcpx_start_example'>选择时长：</td>
								<td>
                                    <select id='kkk' >
                                       	<option>选择分钟</option>
                                        <option value='1'>1分钟</option>
										<option value='2'>2分钟</option>
										<option value='3'>3分钟</option>
										<option value='4'>4分钟</option>
										<option value='5'>5分钟</option>
										<option value='6'>6分钟</option>
										<option value='7'>7分钟</option>
										<option value='8'>8分钟</option>
										<option value='9'>9分钟</option>
										<option value='10'>10分钟</option> 
										</select>
                                </td>
                            </tr>
                				</thead>
                			</table>
							<Button className='xcpx_start_title'   onClick={()=>kaishi(opt,rd)}>线程剖析</Button>
							<p id='timer'></p>
							<Button className='xcpx_start_title' onClick={()=>kaishi1()}>停止线程剖析</Button>
                		</div>
                		<div className='xcpx_ahout'>
                			<div className='xcpx_ahout_title'>关于听云线程剖析</div>
                			<div className='xcpx_ahout_text'>听云线程剖析在不影响用户体验的情况下，以非常低的系统开销采集线程状态。剖析完成后，显示代码消耗时间。</div>
                		</div>
                	</div>
                	<div className='xcpx_body_right'>
                		<div className='xcpx_body_right_title'>线程剖析列表</div>
						<Button className='xcpx_body_right_title' id='allInner' onClick={()=>delete2(ko_id)}>清空</Button>
                		<table style={{width:'100%'}}>
                			<thead>
                				<tr>
                					<th><input  type="checkbox" className="selectAll" /></th>
                					<th>时间</th>
                					<th>持续时间(min)</th>
									<th>编辑</th>
                				</tr>
                			</thead>
                			<tbody>
                			{
								ko && ko.map((val,l)=>{
									return(
										<tr key={l} >
											<td><input type="checkbox" className='check'/></td>
											<td onClick={()=>tiao(val.id)}>{val.date}</td>
											<td>{val.time}</td>
											<td onClick={()=>delete1(val)}><Button>删除</Button></td> 
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
		opt:state.vars.opt,
		syu:state.vars.syu,
		ks:state.vars.ks,
		tz:state.vars.tz,
		dd:state.vars.dd,
		rd:state.vars.rd,
		ko:state.vars.ko,
		ko_id:state.vars.ko_id,
		tiao:state.vars.tiao,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
			let obj5={ //查看线程剖析列表
				type: 'get',
                url: 'apm/thread/list.pinpoint' ,
                data: '',
                dataType: 'json'
			}
			ajax(obj5,callback5);
            function callback5(data){
				console.log('查看线程剖析列表',data);
				dispatch(actions.setVars('ko',data.objectList));
				// var ko_id={
				// 	id:[]
				// };
				var ko_id=[]
				for(var i=0;i<data.objectList.length;i++){
					ko_id.push(data.objectList[i].id);
					// ko_id=new Array(data.objectList[i].id);;
				console.log(ko_id);
				}
				dispatch(actions.setVars('ko_id',ko_id))
				console.log(ko_id,'全部ID');
			};
			
    	},
    	init:()=>{
    		let height=$('#xcpx').css('height');
			$('#secondTree').css('height',height);
			$("#kkk").change(function(){
				var opt=$("#kkk").val();
				console.log(opt,'ss')
				dispatch(actions.setVars('opt',opt))
			});
			$(".selectAll").on("click",function(){
				if(this.checked){
					$(".check").prop("checked",true);
				}else{
					$(".check").prop("checked",false);
				}
			});
		
	
		},
		  kaishi:(opt,rd)=>{
			// console.log(opt,'KFC分钟');
                // document.getElementById("timer").innerHTML = timeOut;
				let obj1={//开始线程剖析
					type: 'get',
					url: 'apm/thread/startUp.pinpoint' ,
					data: 'ms='+opt,
					dataType: 'json'
				};
				ajax(obj1,callback1);
				function callback1(data){
					console.log('开始线程剖析',data);
					// let timeOut = null;
					// let timeOut = window.setTimeout(function(){
					// 		console.log("time out..."+timeOut);
					// 		document.getElementById("timer").innerHTML = timeOut;
					// 	},1000);
				};
			let obj2={//等剖析结束
                type: 'get',
                url: 'apm/thread/listLast.pinpoint' ,
                data: '',
                dataType: 'json'
            };
            ajax(obj2,callback2);
            function callback2(data){
				dispatch(actions.setVars('ko',data.objectList))
                console.log('等剖析结束',data)
			};
			let obj4={//剖析剩余时间
							type: 'get',
							url: 'apm/thread/left.pinpoint' ,
							data: '',
							dataType: 'json'
						};
						ajax(obj4,callback4);
						function callback4(data){
							console.log('剖析剩余时间',data)
							console.log('剖析剩余时间',data.obj)
						}
				// function getbaomenu(){
				// 		let obj4={//剖析剩余时间
				// 			type: 'get',
				// 			url: 'apm/thread/left.pinpoint' ,
				// 			data: '',
				// 			dataType: 'json'
				// 		};
				// 		ajax(obj4,callback4);
				// 		function callback4(data){
				// 			console.log('剖析剩余时间',data)
				// 			console.log('剖析剩余时间',data.obj)
				// 		}
				// }
				// getbaomenu();
				// infotime2 = setInterval(()=>{
				//   getbaomenu();
				// },5000)
		  },
		  kaishi1:()=>{
			console.log("timeCut:"+timeOut);
			window.clearTimeout(timeOut);
			let obj3={//停止线程剖析
                type: 'get',
                url: 'apm/thread/stop.pinpoint' ,
                data: '',
                dataType: 'json'
            };
            ajax(obj3,callback3);
            function callback3(data){
				console.log(' 停止线程剖析',data)
				dispatch(actions.setVars('ko',data.objectList))
			}
		  },
		  delete1:(val)=>{//删除
			var id=new Array(val.id);
			let obj6={ //删除线程剖析列表
				type: 'post',
                url: 'apm/thread/del.pinpoint?ids='+id ,
                data: '',
                dataType: 'json',
			}
			ajax(obj6,callback6);
            function callback6(data){
				message.success('删除成功')
				console.log('删除线程剖析列表',data);
				dispatch(actions.setVars('ko',data.objectList))
			};
		  },
		  delete2:(ko_id)=>{
					let obj8={ //删除线程剖析列表
						type: 'post',
						url: 'apm/thread/del.pinpoint?ids='+ko_id ,
						data: '',
						dataType: 'json',
					}
					ajax(obj8,callback8);
					function callback8(data){
							message.success('删除成功')
						console.log('删除全部',data);
						dispatch(actions.setVars('ko',data.objectList))
					};
		  },
		  tiao:(id)=>{
				dispatch(actions.setVars('id',id));
				dispatch(actions.setVars('xcpx_right',true))
		  },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Htrw);