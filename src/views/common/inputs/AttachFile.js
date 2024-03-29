import React, {Component} from "react"
import PropTypes from "prop-types"


export default class AttachFile extends Component {
  static defaultProps = {
    className: '',
    customValidate: () => false,
    required: false,
    isLoadingProp: false,
    allowableFormat: [],
  }

  static propTypes = {
    inputId: PropTypes.string.isRequired,
    AttachButton: PropTypes.func.isRequired,
    handleBase64: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    allowableFormat: PropTypes.arrayOf(PropTypes.string),
    isLoadingProp: PropTypes.bool,
    LoadingFile: PropTypes.func,
    required: PropTypes.bool,
    className: PropTypes.string,
    customValidate: PropTypes.func,
    // TODO mohsen: fileSize
  }

  constructor(props) {
    super(props)
    this.state = {isLoadingState: false}
  }

  _getExtension = (fileName) => {
    const parts = fileName.split('.')
    const ext = parts.pop()
    return ext.toLowerCase()
  }

  _validateFile = (file) => {
    const {required, customValidate, allowableFormat, translate: tr} = this.props
    const fileName = file ? file.name : ''
    const fileExtension = this._getExtension(fileName)
    if (required) {
      if (!file) {
        return tr['Required field']
      }
    }
    if (file && allowableFormat.length > 0 && !allowableFormat.includes(fileExtension)) {
      return tr['This format is not allowed']
    }
    return customValidate(file)
  }

  _validate = () => {
    return this._validateFile(this.file)
  }

  _handleChange = (event) => {
    event.preventDefault()
    const {handleBase64, handleError} = this.props
    const file = event.target.files[0]
    const error = this._validateFile(file)
    if (error) return handleError(error)
    if (file && !error) {
      // TODO mohsen: check maximum file-size with attention to fileType
      let reader = new FileReader()
      reader.onloadstart = () => {
        this.setState({...this.state, isLoadingState: true})
      }
      reader.onloadend = () => {
        handleBase64(reader.result)
        this.setState({...this.state, isLoadingState: false})
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    const {isLoadingState} = this.state
    const {isLoadingProp, translate: tr} = this.props
    const isLoading = isLoadingProp || isLoadingState
    const {AttachButton, LoadingFile, inputId, className} = this.props
    if (isLoading) {
      if (LoadingFile)
        return <LoadingFile/>
      else return <span>{tr['Uploading...']}</span>
    }
    return (
      <label className={"attachLabel " + className} htmlFor={inputId}>
        <AttachButton/>
        <input
          type="file"
          className="custom-file-input w-100"
          onChange={this._handleChange}
          onClick={this._onChangeClick}
          id={inputId}
          hidden
        />
      </label>
    )
  }
}