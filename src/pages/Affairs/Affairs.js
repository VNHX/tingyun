import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import {Route, Switch, Link} from 'react-router-dom';
import Bundle from './../../router/Bundle';
import Loading from 'components/Loading/Loading';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Qbhz from 'bundle-loader?lazy&name=qbhz!./Qbhz';
import St from 'bundle-loader?lazy&name=st!./St';
import 'pages/secondRouter.css';
import config from '../../components/Nav/config.js';

const createComponent = (modFn) => props => (
    <Bundle load={modFn}>
        {
            (WaitingComponent) => WaitingComponent ? <WaitingComponent {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);
class Affairs extends Component {
    componentWillMount() {
        this.props.willMount();
    }
    componentWillUpdate() {
        this.props.update();
    }
    render() {
        let {}=this.props;
        let arr=window.location.pathname.split('/');
        let param=arr[arr.length-1];
        return (
            <div className='bodyBox'>
                <div className='secondTree' id='secondTree'>
                    <ul className='leftTree' id='affairsTree'>
                    {
                        config.page[3].sonPage.map((value)=>{
                            return(
                                <li className={value.id==param ? 'active':''} key={value.id}><Link to={value.url}>{value.name}</Link></li>
                            )
                        })
                    }                        
                    </ul>
                </div>
                <Switch>
                    <Route path="/server/affairs/qbhz" component={createComponent(Qbhz)}/>
                    <Route path="/server/affairs/st" component={createComponent(St)}/>                    
                    <Route component={createComponent(NotFound)}/>
                </Switch>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data:state.vars.data,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        update:()=>{
            dispatch(actions.setVars('data','successes'))
        },
        willMount:()=>{
            
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Affairs);

