/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {TextInput} from "src/views/common/inputs/TextInput";
import {Confirm} from "../../common/cards/Confirm";
import {FileInput} from "../../common/inputs/FileInput";


export class CertificateForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		certificate: PropTypes.object,
	};

	getValues =  () => {
    const media = this.postPictureInput.getFile();
		const mediaId = media ? media.id : null;
		return {
				title: this.refs.titleInput.getValue(),
				pictureId: mediaId
		};
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
			const {} = this.props;
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
					<FileInput
							label={__('Picture') + ": "}
							mediaId={certificate.picture}
							organization={null}
              ref={postPictureInput => {
                this.postPictureInput = postPictureInput
              }}
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
			const { hideEdit} = this.props;
			return this.props.create(formValues, hideEdit);
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

	save = () => {//(formValues, certificateId, updateStateForView, hideEdit
		const {certificate,updateStateForView,hideEdit} = this.props;
		const certificateId = certificate.id;
		const formValues = this.refs.form.getValues();
		return this.props.update(formValues, certificateId, updateStateForView, hideEdit)
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.save();
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