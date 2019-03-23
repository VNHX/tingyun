//应用拓扑
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/yytp.css';
import Header from 'pages/functionalCom/Header.js';
import data from './data.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;
import Yytptu from 'pages/Application/Yytptu.js';
class Yytp extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID);
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {yytpTable,yytp_page='image',yytp_showImg,yytp_showTab}=this.props;
        return (
            <div className='yytp'>
                <Header headerFlag={true} optionData={'more'}/>
                <div className='yytp_body'>
                    <div className='yytp_body_tab'>
                        <div className={yytp_page=='image' ? 'active':''} onClick={()=>yytp_showImg()}>拓扑图</div>
                        <div className={yytp_page=='table' ? 'active':''} onClick={()=>yytp_showTab()}>拓扑表格</div>
                    </div>
                    {
                        yytp_page=='image' &&  
                        <div className='image_box'>
                            <Yytptu />
                        </div>
                    }
                    {
                        yytp_page=='table' && 
                        <div className='table_box'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>调用者</th>
                                        <th>被调用者</th>
                                        <th>调用者类型</th>
                                        <th>被调用者类型</th>
                                        <th>调用次数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        yytpTable && yytpTable.map((value)=>{
                                            return(
                                                <tr key={value.callerMap.calleeAppId}>
                                                    <td>{value.apperName}</td>
                                                    <td>{value.appeeName}</td>
                                                    <td>{value.apperType}</td>
                                                    <td>{value.appeeType}</td>
                                                    <td>{value.callTimes}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> 
                    }
                    
                    <div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        yytp_page : state.vars.yytp_page,
        yytpTable : state.vars.yytpTable,
        headerOptionsID : state.vars.headerOptionsID,//默认ID
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID)=>{
    		let obj1={
                type: 'get',
                url: 'apm/topologyInfo.pinpoint' ,
                data: 'appId='+headerOptionsID ,
                dataType: 'json'
            };
            ajax(obj1,callback1);
            function callback1(data){
                console.log(data)
                dispatch(actions.setVars('yytpTable',data.objectList))
            }
    	},
    	init:()=>{
    		console.log('init')
    	},
        yytp_showTab:()=>{
            dispatch(actions.setVars('yytp_page','table'))
        },
        yytp_showImg:()=>{
            dispatch(actions.setVars('yytp_page','image'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Yytp);