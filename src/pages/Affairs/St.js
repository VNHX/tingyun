//视图
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import Header from 'pages/functionalCom/Header.js';
import 'pages/Affairs/st.css';
import {Icon} from 'antd';
class St extends Component {  
    componentDidMount() {
        this.props.init();
    } 
    render() {
        return (
            <div className='st' id='st'>
                <Header headerFlag={true} optionData={'less'} />
                <div className='st_body'>
                    <div className='header'>
                        <Icon type="question-circle" />
                        <span> Apdex性能全视图</span>
                    </div>
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
        init:()=>{
            let height=$('#st').css('height');
            $('#secondTree').css('height',height);
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(St);