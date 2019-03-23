//事务流
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Overview/swl.css';
import data from './data.js';//假数据
class Swl extends Component {    
    render() {
        return (
            <div className='content'>
                <div className='swl_header'></div>
                <div className='swl_body'>
                	{
                		data.data.swl.map((value)=>{
                			return(
                				<div className='swl_box' key={value.name}>
                					<div className='swl_box_color'></div>
                					<div className='swl_box_name'>{value.name}</div>
                					<div className='swl_box_time'>{value.time}</div>
                				</div>
                			)
                		})
                	}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Swl);