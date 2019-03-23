import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import { Redirect } from 'react-router-dom';

class Home extends Component { 
	   
    render() {
    	let {loginFlag}=this.props;
        if(loginFlag!=true){
            return <Redirect push to="/login" />;
        }
        return (
            <div>
                <div style={{'height':'400px','lineHeight':'400px','textAlign':'center','fontSize':'30px'}}>
                	欢迎来到听云应用中心!
               	</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loginFlag:state.vars.loginFlag,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{

    	},
    	init:()=>{
    		
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);