//磁盘
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { Icon } from 'antd';
import 'pages/Application/cp.css';
import Header from 'pages/functionalCom/Header.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax;
import CpEchrs from 'pages/chart/cpEchrs.js';
import Cpbt from 'pages/chart/cpbt.js'
class Cp extends Component {
    componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
        let { cpTable, cptableEchas, cpTableEch } = this.props;
        return (
            <div className='bb' id='bb'>
                <Header headerFlag={false} optionData={'more'} />
                <div className='cp_body'>
                    <div><span>显示top20 </span><input type='checkbox' /></div>
                    <div className='cp_content'>
                        <div className='cp_content_left'>                              <div className='cp_content_left_titlt'>磁盘使用情况</div>
                        </div>
                        <div className='cp'>
                            <Cpbt cpTable={cpTable} />
                            {/* <table style={{width:'100%',marginTop:'10px'}}>
                            <thead>
                                <tr>
                                    <th>磁盘</th>
                                    <th>接收速率(bytes/s)</th>
                                    <th>发送速率(bytes/s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                 cpTable && cpTable.map((val,i)=>{
                                     return(
                                        <tr key={i} onClick={()=>cptableEchas(val.devName)}>
                                          <td>{val.devName}</td>
                                          <td>{val.totalSize}</td>
                                          <td>{val.usedSize}</td>
                                        </tr>
                                     )
                                 })   
                                }
                            </tbody>
                        </table> */}
                        </div>
                        <div className='cp_top'>
                            <div className='header'>
                                <Icon type="question-circle" />
                                <span> 最耗时Memcached操作堆叠图</span>
                                <span className='add' onClick={() => showAdd()}><Icon type="plus-circle-o" /></span>
                            </div>
                            <CpEchrs cpTableEch={cpTableEch} />
                        </div>
                        <div style={{ clear: 'both' }}></div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cpTable: state.vars.cpTable,
        cpTableEch: state.vars.cpTableEch
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        willMount: () => {
            let obj1 = {//磁盘使用情况
                type: 'get',
                url: 'apm/sys/diskInfo.pinpoint',
                dataType: 'json',
            };
            ajax(obj1, callback1);
            function callback1(data) {
                console.log('磁盘使用情况', data);
                dispatch(actions.setVars('cpTable', data.objectList));
                var koko = data.objectList
                console.log(koko)
                console.log(Math.ceil(data.objectList[0].usedSize / data.objectList[0].totalSize), 'asdada')
            };
        },
        init: () => {
            let height = $('#bb').css('height');
            $('#secondTree').css('height', height);
        },
        cptableEchas: (cpname) => {
            console.log(cpname);
            let obj2 = {//最耗时Memcached操作堆叠图
                type: 'get',
                url: 'apm/sys/diskUseByTime.pinpoint',
                data: 'timeSection=' + 2730026 + '&sectionCount=12' + '&divicesName=' + cpname,
                dataType: 'json',
            };
            ajax(obj2, callback2);
            function callback2(data) {
                console.log('最耗时Memcached操作堆叠图', data);
                dispatch(actions.setVars('cpTableEch', data.obj))
            };
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cp);