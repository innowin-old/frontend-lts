import React,{Component} from 'react';
import {Switch ,Link} from 'react-router-dom';
import ExchangeView from './exchange/Exchange_View';
import ExchangeExplorer from './exchange/Exchange_Explorer';
import ExchangePost from './exchange/ExchangeView/post/index';
import PropsRoute from "../consts/PropsRoute";

class Exchange extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		const {match, handleSignOut} = this.props;
		const {path , url} = match;
		return(
			<div>
				<Link to={`${url}/Exchange_Explorer`}>Exchange Explorer</Link>
				<Link to={`${url}`}>Exchange</Link>
				<div>
					<Switch>
						<PropsRoute path={`${path}/Exchange_Explorer`} component={ExchangeExplorer}/>
						<PropsRoute exact path={`${path}/:id`} component={ExchangeView} handleSignOut={handleSignOut}/>
						<PropsRoute exact path={`${path}/:exchangeId/post/:postId`} component={ExchangePost} handleSignOut={handleSignOut}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default Exchange;