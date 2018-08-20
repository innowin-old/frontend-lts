import React from 'react'

const renderTextArea = ({
                            input,
                            label,
                            type,
                            placeholder,
                            className,
                            meta: {touched, error}
                        }) => (
    <div className={className}>
        <textarea {...input} className={touched && error ? 'error' : ''}
                  placeholder={placeholder || label}/>
        {(touched && error) && <span className="error-message">{error}</span>}
    </div>
)
export default renderTextArea

