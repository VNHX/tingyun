import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import {Route, Switch, Link} from 'react-router-dom';
import Bundle from './../../router/Bundle';
import Loading from 'components/Loading/Loading';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Yysz from 'bundle-loader?lazy&name=yysz!./Yysz';
import Kzpz from 'bundle-loader?lazy&name=kzpz!./Kzpz';
import Gjswsz from 'bundle-loader?lazy&name=gjswsz!./Gjswsz';
import 'pages/secondRouter.css';
import config from '../../components/Nav/config.js';

const createComponent = (modFn) => props => (
    <Bundle load={modFn}>
        {
            (WaitingComponent) => WaitingComponent ? <WaitingComponent {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);
 
class Setup extends Component {
    componentWillMount() {
        this.props.willMount();
    }
    componentWillUpdate() {
        this.props.update();
    }
    componentDidMount() {
        this.props.init();
    }
    activeSetup(key) {
        setTimeout(function () {
            $('#setupTree').find('li').eq(key).find('a').css({'background':'#3598db','color':'#ffffff'});
            $('#setupTree').find('li').eq(key).siblings().find('a').css({'background':'#ffffff','color':'#a0a0a0'});
        },200)        
    }
    render() {
    	let {data}=this.props;
        let arr=window.location.pathname.split('/');
        let param=arr[arr.length-1];
        return (        	
            <div className='bodyBox'>
                <div className='secondTree' id='secondTree'>
                    <ul className='leftTree' id='setupTree'>
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
                    <Route exact path="/server/setup/yysz" component={createComponent(Yysz)}/>
                    <Route path="/server/setup/kzpz" component={createComponent(Kzpz)}/>
                    <Route path="/server/setup/gjswsz" component={createComponent(Gjswsz)}/>
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
            
        },
        willMount:()=>{
            
        },
        init:()=>{
            
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);