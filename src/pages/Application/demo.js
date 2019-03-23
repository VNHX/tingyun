//报表
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/demo.css';
import Header from 'pages/functionalCom/Header.js';
import myAjax from 'pages/functionalCom/myAjax.js';
import piedemo from 'pages/chart/demopie.js';
const ajax = myAjax.myAjax
import { message } from 'antd';
class Demo extends Component {
    componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }

    render() {
        let {bb_tab_flag = 'swbb', bb_body1, bb_body2, bb_body3, chakanjstack, jmap, jstat, jstack, start, jid, deletejstack, detailjstack, ko} = this.props;
        let flag = jstat ? jstat.ec ? true : false : false;
        console.log('shuju', jstat)
        return (
            <div className='bb' id='bb'>
                <Header headerFlag={false} optionData={'more'} />
                <div className='bb_tab'>
                	<span className={bb_tab_flag=='swbb'? 'active':''} onClick={()=>bb_body1()}>标签1</span>
                	<span className={bb_tab_flag=='gjswbb'? 'active':''} onClick={()=>bb_body2()}>标签2</span>
                	<span className={bb_tab_flag=='sjkbb'? 'active':''} onClick={()=>bb_body3()}>标签3</span>
                </div>
                <div className='bb_body'>
                <div className='bb_body1_header'>demo表格</div>
                {
                    bb_tab_flag && bb_tab_flag=='swbb' && 
						<div className='bb_body1'>
                    	<div style={{height:'50px'}}></div>
                        <table style={{width:'100%'}}> 
                            <tbody>
                                <tr>
                                    <td>序号</td>
                                    <td>实例数</td>
                                    <td>大小</td>
                                    <td>类</td>
                                </tr>
                                {
                                        jmap&&jmap.map((value,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td>{i+1}</td>
                                                    <td>{value.instances}</td>
                                                    <td>{value.size}</td>
                                                    <td>{value.className}</td>
                                                </tr>
                               )
                                        })
                                    }
                    
                
                            </tbody>
                        </table>
                        <piedemo />
                    </div>
                    
				}		
                
                {
                	bb_tab_flag && bb_tab_flag=='gjswbb' && 
                	<div className='bb_body2'>
               
                    	<div style={{height:'50px'}}></div>
                    	<table style={{width:'100%'}}>
                    	
                    		<tbody>
                    			<tr>
                                    <td style={{width:'8%'}}>ec</td>
                                    <td style={{width:'8%'}}>eu</td>
                                    <td style={{width:'8%'}}>fgc</td>
                                    <td style={{width:'8%'}}>fgct</td>
                                    <td style={{width:'8%'}}>gct</td>
                                    <td style={{width:'8%'}}>oc</td>
                                    <td style={{width:'8%'}}>ou</td>
                                    <td style={{width:'8%'}}>s0u</td>
                                    <td style={{width:'8%'}}>s1u</td>
                                    <td style={{width:'8%'}}>soc</td>
                                    <td style={{width:'8%'}}>ygc</td>
                                    <td style={{width:'8%'}}>ygct</td>
                                </tr>

                                {jstat&&
                                <tr>
                                    <td style={{width:'8%'}}>{flag&&jstat.ec}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.eu}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.fgc}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.fgct}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.gct}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.oc}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.ou}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.s0u}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.s1u}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.soc}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.ygc}</td>
                                    <td style={{width:'8%'}}>{flag&&jstat.ygct}</td>
                                </tr>
                                }
                    		</tbody>
                    	</table>
                	</div>
                }
                {
                	bb_tab_flag && bb_tab_flag=='sjkbb' &&
                	<div className='bb_body3'>
                    	<div style={{height:'50px'}}></div>
                        <div onClick={()=>start()}>生成jstack</div>
                    	<table style={{width:'100%'}}>
                    		<tbody>
                                <tr>
                                    <td>时间戳</td>
                                    <td>操作</td>
                                    <td>编辑</td>
                                </tr>
                            {
                                        jstack&&jstack.map((value,i)=>{
                                            return(
                    			<tr key={i}>
                    				<td>{value}</td>
                                    <td onClick={()=>detailjstack(value)}>删除</td>
                    				<td onClick={()=>chakanjstack()}>查看</td>
                    			</tr>
                                )
                                        })
                                    }
                    			
                    		</tbody>
                    	</table>
                	</div>
                }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bb_tab_flag: state.vars.bb_tab_flag,
        jmap: state.vars.jmap,
        jstat: state.vars.jstat,
        jstack: state.vars.jstack,
        jid: state.vars.jid,
        ko: state.vars.ko,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        willMount: () => {
            let obj = { //获取jmap
                type: 'get',
                url: 'apm/jmap/jmap.pinpoint',
                data: '',
                dataType: 'json'
            };
            ajax(obj, cakklo);
            function cakklo(data) {
                console.log(data, '获取jmap')
                dispatch(actions.setVars('jmap', data.objectList))
            }
            let obj1 = { //获取jstat
                type: 'get',
                url: 'apm/jstat/jstat.pinpoint',
                data: '',
                dataType: 'json'
            };
            ajax(obj1, cakklo1);
            function cakklo1(data) {
                console.log(data, '获取jstat')
                dispatch(actions.setVars('jstat', data.obj))
            }
            let obj2 = { //查看jstack 列表
                type: 'get',
                url: 'apm/jstack/jstack.pinpoint',
                data: '',
                dataType: 'json'
            };
            ajax(obj2, cakklo2);
            function cakklo2(data) {
                console.log(data, '查看jstack 列表')
                dispatch(actions.setVars('jstack', data.objectList))
            }
        },
        init: () => {
            let height = $('#bb').css('height');
            $('#secondTree').css('height', height);
            $(".selectAll").on("click", function() {
                if (this.checked) {
                    $(".check").prop("checked", true);
                } else {
                    $(".check").prop("checked", false);
                }
            })
        },
        bb_body1:()=>{
    		dispatch(actions.setVars('bb_tab_flag','swbb'))
    	},
    	bb_body2:()=>{
    		dispatch(actions.setVars('bb_tab_flag','gjswbb'))
    	},
    	bb_body3:()=>{
    		dispatch(actions.setVars('bb_tab_flag','sjkbb'))
        },
        detailjstack:(jstack)=>{
            console.log(jstack,'删除jstack')
            let obj3 = { //删除jstack 列表
                type: 'get',
                url: 'apm/jstack/delete.pinpoint',
                data: 'ids='+jstack,
                dataType: 'json'
            };
            ajax(obj3, cakklo3);
            function cakklo3(data) {
                console.log(data,'sss');
                message.success('删除成功')
                dispatch(actions.setVars('jstack', data.objectList))
            }
        },
        chakanjstack:()=>{
            let obj4 = { //查看jstack 列表
                type: 'get',
                url: 'apm/jstack/list.pinpoint',
                data: '',
                dataType: 'json'
            };
            ajax(obj4, cakklo4);
            function cakklo4(data) {
                console.log(data,'ssss')
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);