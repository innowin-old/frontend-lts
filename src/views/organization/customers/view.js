import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CustomerEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {CertificateIcon, starIcon, EditIcon} from "src/images/icons";

export const CustomerItemWrapper = ({children}) => {
	return <ItemWrapper icon={<CertificateIcon />}>{children}</ItemWrapper>;
};

export class CustomerView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		customer: PropTypes.object.isRequired,
	};

	render() {
		const {customer, showEdit} = this.props;
		return (
			<div className="col-4 text-center container-fluid p-1">
				<div className="row">
					<div className="col customer">
						<div className="content">
							<div className="editButton">
								<div onClick={showEdit}><EditIcon /></div>
							</div>
							<img className="customerImage" alt="" src={customer.picture_media || "/static/media/defaultImg.94a29bce.png"} />
							<h5>{customer.title}</h5>
							<span>&nbsp;</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export class Customer extends Component {
	constructor(props){
		super(props);
		const {customer} = props;
		this.state = {edit: false, customer:customer};
	}
	componentWillReceiveProps(props){
		const {customer} = props;
		this.setState({...this.state, customer:customer})
	}

	static propTypes = {
		updateCustomer: PropTypes.func.isRequired,
		deleteCustomer: PropTypes.func.isRequired,
		customer: PropTypes.object.isRequired,
		updateStateForView:PropTypes.func.isRequired
	};

	showEdit = () => {
		this.setState({edit: true});
	};

	hideEdit = () => {
		this.setState({edit: false});
	};

	updateStateForView = (res, error,isLoading) =>{
		const {updateStateForView} = this.props;
		this.setState({...this.state,customer:res })
	}

	render() {
		const {customer} = this.state;
		if (this.state.edit) {
			return <CustomerItemWrapper>
				<CustomerEditForm
					customer = {customer}
					hideEdit = {this.hideEdit}
					updateStateForView = {this.updateStateForView}
					remove = {this.props.deleteCustomer}
					update = {this.props.updateCustomer}
				/>
			</CustomerItemWrapper>;
		}
		return <CustomerView customer={customer} showEdit={this.showEdit}/>;
	}
}
