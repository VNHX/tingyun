//策略设置
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import NewCl from './newCl.js';
import { Icon } from 'antd';
import './clsz.css';

class Clsz extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {newCl=false,showNewcl}=this.props;
        return (
            <div className='content'>
                <div className='clsz_title'>                    
                    <div className='clsz_title_left'>警报策略</div>
                    <div className='clsz_title_right' onClick={()=>showNewcl()}><Icon type="plus" />新建策略</div>
                </div>
                <table className='clsz_table'>
                    <thead>
                        <tr>
                            <th>策略</th>
                            <th>监控项</th>
                            <th>吞吐率</th>
                            <th>策略摘要</th>
                            <th>关联警报</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>server策略</td>
                            <td>（听云server）应用</td>
                            <td>>=5rpm</td>
                            <td>已包含了错误率</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>server策略</td>
                            <td>（听云server）应用</td>
                            <td>>=5rpm</td>
                            <td>已包含了错误率</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
                {newCl && <NewCl/>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        newCl:state.vars.newCl,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{

    	},
    	init:()=>{
    		
    	},
        showNewcl:()=>{
            dispatch(actions.setVars('newCl',true));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Clsz);