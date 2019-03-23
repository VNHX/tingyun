//警报
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import {Route, Switch, Link} from 'react-router-dom';
import Bundle from './../../router/Bundle';
import Loading from 'components/Loading/Loading';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Jbsz from 'bundle-loader?lazy&name=jbsz!./Jbsz';
import Clsz from 'bundle-loader?lazy&name=clsz!./Clsz';
import Jstd from 'bundle-loader?lazy&name=jstd!./Jstd';
import 'pages/secondRouter.css';
import config from '../../components/Nav/config.js';


const createComponent = (modFn) => props => (
    <Bundle load={modFn}>
        {
            (WaitingComponent) => WaitingComponent ? <WaitingComponent {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);

class Alarm extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    } 
    render() {
    	let {}=this.props;
        let arr=window.location.pathname.split('/');
        let param=arr[arr.length-1];
        return (
            <div className='bodyBox'>
                <div className='secondTree' id='secondTree'>
                    <ul className='leftTree' id='applicationTree'>
                    {
                        config.page[4].sonPage.map((value)=>{
                            return(
                                <li className={value.id==param ? 'active':''} key={value.id}><Link to={value.url}>{value.name}</Link></li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div id='secondContent'>
                    <Switch>
                        <Route path="/server/alarm/jbsz" component={createComponent(Jbsz)}/>
                        <Route path="/server/alarm/clsz" component={createComponent(Clsz)}/>
                        <Route path="/server/alarm/jstd" component={createComponent(Jstd)}/>                       
                        <Route component={createComponent(NotFound)}/>
                    </Switch>
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
    	willMount:()=>{
    		
    	},
    	init:()=>{
    		
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alarm);