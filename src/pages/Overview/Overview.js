import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Bundle from './../../router/Bundle';
import Yyyl from 'bundle-loader?lazy&name=yyyl!./Yyyl';
import Gjswyl from 'bundle-loader?lazy&name=gjswyl!./Gjswyl';
import Ybp from 'bundle-loader?lazy&name=ybp!./Ybp';
import Swl from 'bundle-loader?lazy&name=swl!./Swl';
import Yyjblb from 'bundle-loader?lazy&name=yyjblb!./Yyjblb';
import Gjswjblb from 'bundle-loader?lazy&name=gjswjblb!./Gjswjblb';
import Loading from 'components/Loading/Loading';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import 'pages/secondRouter.css';
import config from '../../components/Nav/config.js';

const createComponent = (modFn) => props => (
    <Bundle load={modFn}>
        {
            (WaitingComponent) => WaitingComponent ? <WaitingComponent {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);
class Overview extends Component{
	componentWillMount() {
        this.props.willMount();
    }
    componentWillUpdate() {
        this.props.update();
    }    
    render() {
        let arr=window.location.pathname.split('/');
        let param=arr[arr.length-1];
        return (
            <div className='bodyBox'>
	            <div className='secondTree'>
	            	<ul className='leftTree' id='overviewTree'>
	            	{
	            		config.page[1].sonPage.map((value)=>{
	            			return(
	            				<li className={value.id==param ? 'active':''} key={value.id}><Link to={value.url}>{value.name}</Link></li>
	            			)
	            		})
	            	}
	                </ul>
	            </div>
            	<Switch>
		            <Route exact path="/server/overview/yyyl" component={createComponent(Yyyl)}/>
		            <Route path="/server/overview/gjswyl" component={createComponent(Gjswyl)}/>
		            <Route path="/server/overview/ybp" component={createComponent(Ybp)}/>
		            <Route path="/server/overview/swl" component={createComponent(Swl)}/>
		            <Route path="/server/overview/yyjblb" component={createComponent(Yyjblb)}/>
		            <Route path="/server/overview/gjswjblb" component={createComponent(Gjswjblb)}/>
		        	<Route component={createComponent(NotFound)}/>
		        </Switch>
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
    	update:()=>{
            
        },
        willMount:()=>{
            
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);