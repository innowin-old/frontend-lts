/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {MediaUploader} from 'src/views/common/MediaUploader';
import {Confirm} from "../../common/cards/Confirm";


export class CertificateForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		certificate: PropTypes.object,
	};

	getValues = async () => {
		const media = await this.refs.pictureInput.refs.component.getMedia();
		const mediaId = media ? media.id : null;
		const values = {
				title: this.refs.titleInput.getValue(),
				pictureId: mediaId, // TODO use media uploader
		};
		return values
	};

	formValidate = () => {
			let result = true;
			const validates = [
					this.refs.titleInput.validate(),
			];
			for (let i = 0; i < validates.length; i++) {
					if (validates[i]) {
							result = false;
							break;
					}
			}
			return result
	};

	render() {
			const {viewer} = this.props;
			const certificate = this.props.certificate || {picture: null};
			return <form onSubmit={this.props.onSubmit}>
					<div className="row">
							<TextInput
									name="title"
									required
									label={__('Title') + ": "}
									value={certificate.title}
									ref="titleInput"
							/>
							<MediaUploader
									name="picture"
									label={__('Picture') + ": "}
									ref="pictureInput"
									media={certificate.picture}
									organization={null}
							/>
							{this.props.children}
					</div>
			</form>
	}
}


export class CertificateCreateForm extends Component {

	static propTypes = {
			create: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired
	};

	save = async () => {
			const formValues = await this.refs.form.getValues();
			return this.props.create(formValues);
	};

	onSubmit = (e) => {
			e.preventDefault();
			if (this.refs.form.formValidate()) {
					this.save()
							.then(res => {
									this.props.hideEdit();
							})
							.catch(err => {
							});
			}
	};

	render() {
			const {} = this.props;
			return <CertificateForm onSubmit={this.onSubmit} ref="form">
					<div className="col-12 d-flex justify-content-end">
							<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
									{__('Cancel')}
							</button>
							<button type="submit" className="btn btn-success">{__('Create')}</button>
					</div>
			</CertificateForm>;
	}
}
export class CertificateEditForm extends Component {
	state = {
			confirm: false,
	};

	static propTypes = {
			update: PropTypes.func.isRequired,
			remove: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired,
			certificate: PropTypes.object.isRequired,
	};

	showConfirm = () => {
			this.setState({confirm: true})
	};

	cancelConfirm = () => {
			this.setState({confirm: false})
	};

	remove = () => {
			const certificateId = this.props.certificate.id;
			return this.props.remove(certificateId)
	};

	save = async () => {
			const certificateId = this.props.certificate.id;
			const formValues = await this.refs.form.getValues();
			return this.props.update(formValues, certificateId)
	};

	onSubmit = (e) => {
			e.preventDefault();
			this.save()
					.then(res => {
							this.props.hideEdit();
					})
					.catch(err => {
					});
	};

	render() {
			const {confirm} = this.state;
			if (confirm) {
					return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>;
			}

			const {certificate} = this.props;
			return <CertificateForm onSubmit={this.onSubmit} ref="form" certificate={certificate} >
					<div className="col-12 d-flex justify-content-end">
							<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
									{__('Delete')}
							</button>
							<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
									{__('Cancel')}
							</button>
							<button type="submit" className="btn btn-success">{__('Save')}</button>
					</div>
			</CertificateForm>;
	}
}
