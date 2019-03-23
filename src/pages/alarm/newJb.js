//警报设置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import './newJb.css';
import Header from 'pages/functionalCom/Header.js';
import { Icon,Transfer } from 'antd';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax;

class NewJb extends Component{
    state = {
        mockData: [],
        targetKeys: [],
    }
	componentWillMount() {
        this.props.willMount(this.props.headerOptionsID,this.props.clInitData1,this.props.initData1);
        console.log(this.props.headerOptionsID,'报警');
        console.log(this.props.clInitData1,'strategyId');
        console.log(this.props.initData1,'USerID')
    }
    componentDidMount() {
        this.props.init();
        this.getMock();
    }
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }
    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }
    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    render() {
    	let {backJb,jbszType,newjb_mc,clInitData}=this.props;
        return (
            <div className='newJb'>
                <div className='newJb_div'>
                    <div className='newjb_title' onClick={()=>backJb()}><Icon type="rollback" />新建警报</div>
                    {jbszType=='app' && <span>Server应用</span>}
                    {jbszType=='transaction' && <span>Server关键事务</span>}
                    {jbszType=='outService' && <span>Server外部服务</span>}
                    <span className='newJb_btn'>提交</span>
                    {/* <span className='newJb_btn'></span> */}
                </div> 
                <div className='newJb_details'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='newJb_details_first'>监控对象：</td>
                                <td className='newJb_details_second'>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        filterOption={this.filterOption}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.handleChange}
                                        render={item => item.title}
                                    />

                                </td>
                            </tr>
                            <tr>
                                <td className='newJb_details_first'>策略名称：</td>
                                <td className='newJb_details_second'>
                                    <select>
                                        <option>{clInitData.monitorStrategy}</option>
                                        <option></option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className='newJb_details_first'>接收通道：</td>
                                <td className='newJb_details_second'>
                                    <select>
                                        <option>{clInitData.userIds}</option>
                                        <option></option>
                                    </select>
                                </td>
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
        newjb_mc:state.vars.newjb_mc,
        jbszType:state.vars.jbszType,
        clInitData1:state.vars.clInitData1,
        initData1:state.vars.initData1,
        headerOptionsID:state.vars.headerOptionsID,
        clInitData:state.vars.clInitData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(headerOptionsID,clInitData1,initData1)=>{
            let initInfo = {
                type:'get',
                url:'apm/monitor/addMonitorPro.pinpoint',
                data:'appId='+headerOptionsID+'&strategyId='+clInitData1+'&userIds='+initData1,
                dataType:'json',
            };
            // apm/monitor/addMonitorPro.pinpoint?userIds=1,2&appId=tomcatappName1&strategyId=1
            ajax(initInfo,callback3);

            function callback3(data){
                    console.log(data,'添加监控项目')
                dispatch(actions.setVars('clInitData',data.objectList))
            }
          
    	},
    	init:()=>{
    		
    	},
    	backJb:()=>{
    		dispatch(actions.setVars('newJb',false));      
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewJb);