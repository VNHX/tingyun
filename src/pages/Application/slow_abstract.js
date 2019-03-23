//慢事务追踪，摘要组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './slow_abstract.css';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Slow_abstract extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID,this.props.transactionId);
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
    	let {sw_abstractData}=this.props;
        return (
            <div className='slow_abstract'>
            	<table>
            		<thead>
            			<tr>
            				<th>最慢组件</th><th>调用次数</th><th>持续时间（s）</th><th>占比（%）</th>
            			</tr>
            		</thead>
            		<tbody>
            			{
            				sw_abstractData && sw_abstractData.map((value)=>{
            					return(
            						<tr key={value.apiId}>
            							<td>{value.apiInfo}</td>
            							<td>{value.invokeCount}</td>
            							<td>{value.totalTime}</td>
            							<td>{value.timePer}</td>
            						</tr>
            					)
            				})
            			}
            		</tbody>
            	</table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        headerOptionsID : state.vars.headerOptionsID,//默认ID
        transactionId : state.vars.transactionId,
        sw_abstractData : state.vars.sw_abstractData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,transactionId)=>{
    		let obj1={//慢组件
                type: 'get',
                url: 'apm/slowestComponentList.pinpoint' ,
                data: 'appId='+headerOptionsID+'transactionId='+transactionId,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('慢组件',data)
                dispatch(actions.setVars('sw_abstractData',data.objectList))
            }

            let obj2={//百分比表格
                type: 'get',
                url: 'apm/tranInvokeTrace.pinpoint' ,
                data: 'appId='+headerOptionsID+'transactionId='+transactionId,
                dataType: 'json'
            };
            ajax(obj2,callback2);
            function callback2(data){
                console.log('百分比表格',data)
                //dispatch(actions.setVars('sw_abstractData',data.objectList))
            }
    	},
    	init:()=>{
    		
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Slow_abstract);