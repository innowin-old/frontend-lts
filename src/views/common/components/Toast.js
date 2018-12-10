// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {TickSvgIcon, CloseIconSvg, InformationIcon} from "src/images/icons";
import constants from "src/consts/constants";
import type {toastType} from "src/consts/flowTypes/toast";

type ToastProps = {
  toast: toastType,
  removeToast: Function,
}

type ToastState = {
  show: boolean,
}

class Toast extends React.Component <ToastProps, ToastState> {

  componentDidMount(): void {
    const {removeToast, toast} = this.props
    setTimeout(() => removeToast(toast.id), 5000)
  }

  render() {
    const {toast, removeToast} = this.props
    const {type, content} = toast
    return (
        <div className='toast-child-container'>
          <div className={type === constants.TOAST_TYPE.SUCCESS ? 'image-type-container success-image-container'
              : type === constants.TOAST_TYPE.INFO ? 'image-type-container info-image-container'
                  : type === constants.TOAST_TYPE.ERROR ? 'image-type-container error-image-container'
                      : type === constants.TOAST_TYPE.REMOVE ? 'image-type-container remove-image-container'
                          : 'image-type-container'}>
            {type === constants.TOAST_TYPE.SUCCESS ? <TickSvgIcon className='image-type'/>
                : type === constants.TOAST_TYPE.INFO ? <InformationIcon className='image-type'/>
                    : type === constants.TOAST_TYPE.ERROR ? <CloseIconSvg className='image-type'/>
                        : type === constants.TOAST_TYPE.REMOVE ? <TickSvgIcon className='image-type'/>
                            : ''
            }
          </div>
          <div className='content-container'>
            <p className='content-text'>{content.text}</p>
            <button className='close-button-container pulse' onClick={() => removeToast(toast.id)}>
              <CloseIconSvg className='close-button'/>
            </button>
          </div>
        </div>
    )
  }
}

Toast.propTypes = {
  toast: PropTypes.object.isRequired,
  removeToast: PropTypes.func.isRequired,
}
export default Toast