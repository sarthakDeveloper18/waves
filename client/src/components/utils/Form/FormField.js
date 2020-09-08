import React from 'react';

const FormField = ({formData, change, id}) => {
    const showError = () => {
        let errorMessage = null
        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className = 'error_label'>
                    {formData.validationMessage}
                </div>
            )
        }
        return errorMessage
    }
    const renderTemplate = () => {
        let template = null
        switch(formData.element){
            case 'input':
                return template = (
                    <div className = 'formBlock'>
                        {formData.showLabel ? <div className = 'label_inputs'>{formData.config.label}</div>: null}
                        <input {...formData.config} value = {formData.value} onChange = {(event) => change({event, id})} onBlur = {(event)=> change({event, id, blur: true})}/>
                        {showError()}
                    </div>
                )
            case 'select': 
                return template = (
                    <div className = 'formBlock'>
                        {formData.showLabel ? <div className = 'label_inputs'>{formData.config.label}</div>: null}
                        <select value = {formData.value} onChange = {(event) => change({event, id})} onBlur = {(event)=> change({event, id, blur: true})}>
                            <option value = ''>Select One</option>
                            {
                                formData.config.options.map((o,i)=>(
                                    <option key = {o.key} value = {o.key}>{o.value}</option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            case 'textarea':
                return template = (
                    <div className = 'formBlock'>
                        {formData.showLabel ? <div className = 'label_inputs'>{formData.config.label}</div>: null}
                        <textarea {...formData.config} value = {formData.value} onChange = {(event) => change({event, id})} onBlur = {(event)=> change({event, id, blur: true})}/>
                        {showError()}
                    </div>
                )
            default: 
                return template
        }
    }

    return ( 
        <div>
            {renderTemplate()}
        </div>
    );
}
 
export default FormField;