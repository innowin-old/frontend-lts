import React,{Component} from 'react';
import BasicInformation from './organization/Basic_Information';
import Certificates from './organization/Certificates';
import Customers from './organization/Customers';
import Posts from './organization/Posts';
import Products from './organization/Products';
import {Link , Route , Switch} from 'react-router-dom';
import Skills from './organization/Skills';
import Social from './organization/Social';

class Organization extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		const {match} = this.props;
		const {path, url} = match;
		return (
				<div>
					<div>
						{/* TODO : side bar component should be placed here*/}
					</div>
					<div>
						<Link to={`${url}/Basic_Information`}>Basic Information</Link>
						<Link to={`${url}/Products`}>Products</Link>
						<Link to={`${url}/Posts`}>Posts</Link>
						<Link to={`${url}/Customers`}>Customers</Link>
						<Link to={`${url}/Social_connections`}>Social connections</Link>
						<Link to={`${url}/Skills`}>Skills</Link>
						<Link to={`${url}/Certificates`}>Certificates</Link>
						<Switch>
							<Route path={`${path}/Basic_Information`} component={BasicInformation}/>
							<Route path={`${path}/Products`} component={Products}/>
							<Route path={`${path}/Posts`} component={Posts}/>
							<Route path={`${path}/Customers`} component={Customers}/>
							<Route path={`${path}/Social_Connections`} component={Social}/>
							<Route path={`${path}/Skills`} component={Skills}/>
							<Route path={`${path}/Certificates`} component={Certificates}/>
						</Switch>
					</div>
					<div>
						{/* TODO : char bar component should be placed here*/}
					</div>
				</div>
		)
	}
}

export default Organization;