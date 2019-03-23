//慢事务，sql组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './slow_sql.css';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class Slow_sql extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID,this.props.transactionId);
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
    	let {sw_sqlData}=this.props;
        return (
            <div className='sw_sql'>
            	<table>
            		<thead>
            			<tr>
            				<th>SQL操作</th><th>调用次数</th><th>总耗时（s）</th>
            			</tr>
            		</thead>
            		<tbody>
            			{
            				sw_sqlData && sw_sqlData.map((value)=>{
            					return(
            						<tr key={value.sql.sqlId}>
            							<td>{value.sql.sqlInfo}</td>
            							<td>{value.sqlCount}</td>
            							<td>{value.totalSqlTime}</td>
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
        sw_sqlData : state.vars.sw_sqlData,
        transactionId : state.vars.transactionId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,transactionId)=>{
    		let obj1={//sql
                type: 'get',
                url: 'apm/sqlDetailByTranIdAndAppId.pinpoint' ,
                data: 'appId='+headerOptionsID+'transactionId='+transactionId,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log('sql',data)
                dispatch(actions.setVars('sw_sqlData',data.objectList))
            }
    	},
    	init:()=>{
    		
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Slow_sql);