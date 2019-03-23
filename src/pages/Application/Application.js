import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import {Route, Switch, Link} from 'react-router-dom';
import Bundle from './../../router/Bundle';
import Loading from 'components/Loading/Loading';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Bb from 'bundle-loader?lazy&name=Bb!./Bb';
import Cwl from 'bundle-loader?lazy&name=Cwl!./Cwl';
import Htrw from 'bundle-loader?lazy&name=Htrw!./Htrw';
import MQ from 'bundle-loader?lazy&name=MQ!./MQ';
import NoSQL from 'bundle-loader?lazy&name=NoSQL!./NoSQL';
import Qbhz from 'bundle-loader?lazy&name=Qbhz!./Qbhz';
import Sjk from 'bundle-loader?lazy&name=Sjk!./Sjk';
import Sw from 'bundle-loader?lazy&name=Sw!./Sw';
import Wbyy from 'bundle-loader?lazy&name=Wbyy!./Wbyy';
import Xcpx from 'bundle-loader?lazy&name=Xcpx!./Xcpx';
import Yyhj from 'bundle-loader?lazy&name=Yyhj!./Yyhj';
import Yytp from 'bundle-loader?lazy&name=Yytp!./Yytp';
import Demo from 'bundle-loader?lazy&name=demo!./demo';
import Tz from 'bundle-loader?lazy&name=tz!./tz';
import Wl from 'bundle-loader?lazy&name=wl!./wl';
import Jc from 'bundle-loader?lazy&name=jc!./jc';
import Cp from 'bundle-loader?lazy&name=cp!./cp';
import 'pages/secondRouter.css';
import config from '../../components/Nav/config.js';

const createComponent = (modFn) => props => (
    <Bundle load={modFn}>
        {
            (WaitingComponent) => WaitingComponent ? <WaitingComponent {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);

class Application extends Component {
    componentDidMount() {
        this.props.init();
    }
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
                    <ul className='leftTree' id='applicationTree'>
                    {
                        config.page[2].sonPage.map((value)=>{
                            return(
                                <li className={value.id==param ? 'active':''} key={value.id}><Link to={value.url}>{value.name}</Link></li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div id='secondContent'>
                    <Switch>
                        <Route path="/server/application/Bb" component={createComponent(Bb)}/>
                        <Route path="/server/application/Cwl" component={createComponent(Cwl)}/>
                        <Route path="/server/application/Htrw" component={createComponent(Htrw)}/>
                        <Route path="/server/application/MQ" component={createComponent(MQ)}/>
                        <Route path="/server/application/NoSQL" component={createComponent(NoSQL)}/>
                        <Route path="/server/application/Qbhz" component={createComponent(Qbhz)}/>
                        <Route path="/server/application/Sjk" component={createComponent(Sjk)}/>
                        <Route path="/server/application/Sw" component={createComponent(Sw)}/>
                        <Route path="/server/application/Wbyy" component={createComponent(Wbyy)}/>
                        <Route path="/server/application/Xcpx" component={createComponent(Xcpx)}/>
                        <Route path="/server/application/Yyhj" component={createComponent(Yyhj)}/>
                        <Route path="/server/application/Yytp" component={createComponent(Yytp)}/>
                        <Route path="/server/application/demo" component={createComponent(Demo)}/>
                        <Route path="/server/application/tz" component={createComponent(Tz)}/>
                        <Route path="/server/application/jc" component={createComponent(Jc)}/>
                        <Route path="/server/application/cp" component={createComponent(Cp)}/>
                        <Route path="/server/application/wl" component={createComponent(Wl)}/>                           
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
        init:()=>{
            
        },
        update:()=>{
            
        },
        willMount:()=>{
            
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);