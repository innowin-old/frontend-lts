/*global__*/
import React,{Component} from 'react';
import TopBar from '../bars/TopBar';
import ChatBar from '../bars/ChatBar';
import PropTypes from 'prop-types';
import ExchangeViewBar from "../bars/ExchangeViewBar";
import Posts from './cardView/index';

export default class ExchangeView extends Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		handleSignOut: PropTypes.func.isRequired
	};
	
	render (){
		const {handleSignOut} = this.props;
    const {path, url, params} = this.props.match;
    const exchangeId = params.id;
		return (
				<div className="-tabbed-pages -userOrganBackgroundImg">
					<TopBar handleSignOut={handleSignOut}/>
					<main className="row">
						<div className="col-md-3 col-sm-1 -right-sidebar-wrapper">
							<ExchangeViewBar exchangeId={exchangeId}/>
						</div>
						<div className="col-md-7 col-sm-10 -content-wrapper">
							<Posts exchangeId={exchangeId}/>
						</div>
						<div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
							<ChatBar/>
						</div>
					</main>
				</div>
		)
	}
};