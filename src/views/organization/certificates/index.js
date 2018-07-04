/*global __*/
//@flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/organization/certificate.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"

type CertificateContainerProps = {
	certificate:Object,
	organizationId: number,
	updateStateForView: Function,
}
export class CertificateContainer extends React.Component<CertificateContainerProps,{certificate:Object, error:boolean, isLoading:boolean}> {
	constructor(props:CertificateContainerProps){
		super(props);
		this.state = {certificate:{}, error:false, isLoading:false}
	}
	componentWillReceiveProps(props:CertificateContainerProps){
			const {certificate} = props;
			this.setState ({...this.state ,certificate:certificate});
	}
	delete_ = (certificateId:number, hideEdit:Function) => {	
		const {organizationId, updateStateForView} = this.props;
		updateStateForView(null,null,true);
		return deleteCertificate(certificateId, organizationId,()=>{
			updateStateForView(null,false);
		},hideEdit,organizationId);
	};
	update_ = (formValues:Object, certificateId:number, updateStateForView:Function, hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		updateStateForView(null,null,true);
		return updateCertificate(formValues,certificateId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res:Object, error:boolean, isLoading:boolean) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, certificate:res, error:error, isLoading:isLoading});
	};

	render() {
		const {certificate} = this.state;
		return <Certificate
			certificate={certificate}
			updateStateForView={this._updateStateForView}
			deleteCertificate={this.delete_}
			updateCertificate={this.update_}
		/>;
	}
}

type CertificateListProps = {
	hideCreateForm: Function,
	createForm: boolean,
	organizationId: number, 
	updateStateForView: Function,
	certificates: Array<Object>
}
export class CertificateList extends React.Component<CertificateListProps> {

	create = (formValues:Object,hideEdit:Function) => {
			const {organizationId, updateStateForView} = this.props;
			return createCertificate(formValues, updateStateForView, hideEdit, organizationId);
	};

	render() {
		const {  organizationId, createForm, updateStateForView} = this.props;
		let {certificates} = this.props ;
		return <ListGroup>
			{createForm &&
			<CertificateItemWrapper>
					<CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CertificateItemWrapper>}
			{
				certificates.map(cert => <CertificateContainer
					certificate={cert}
					updateStateForView = {updateStateForView}
					organizationId={organizationId}
					key={cert.id}
				/>)
			}
		</ListGroup>;
	}
}

type CertificatesProps = {
	organizationId:number
}
export class Certificates extends React.Component<CertificatesProps,
{certificates:Array<Object>, createForm: boolean, edit:boolean, organization:Object, isLoading:boolean, error:boolean}> {

	constructor(props:CertificatesProps){
		super(props);
		this.state = {organization:{}, certificates:[], createForm: false, edit:false, isLoading:false, error:false};
	}

	componentDidMount(){
		const {organizationId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/certificates/${organizationId}`,
					result: `OrganizationCertificates-get/${organizationId}`,
					token: "",
				}
			);

			socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-Posts-get/${organizationId}`,
          token: TOKEN
        }
			);
			
		};

		emitting();

		socket.on(`UserCertificates-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, certificates: res instanceof Array ? res : [], isLoading: false};
				this.setState(newState);
			}

		});
		socket.on(`organization-Posts-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			} else {
				const newState = {...this.state, organization: res, isLoading: false};
				this.setState(newState);
			}
		});

		
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};
	updateStateForView = (error:boolean,isLoading:boolean) =>{
		this.setState({...this.state, error:error, isLoading:isLoading})
	};

	render() {
		const {  organizationId} = this.props;
		const {createForm, certificates, isLoading, error} = this.state;
		return (
		<VerifyWrapper isLoading={isLoading} error={error}>
			{
				<div>
					<CategoryTitle
						title={__('Certificates')}
						showCreateForm={this.showCreateForm}
						createForm={createForm}
					/>
					<FrameCard>
						<CertificateList
							updateStateForView={this.updateStateForView}
							certificates={certificates}
							organizationId={organizationId}
							createForm={createForm}
							hideCreateForm={this.hideCreateForm}
						/>
					</FrameCard>
				</div>
			}
		</VerifyWrapper>
		)
	}
}
export default Certificates;