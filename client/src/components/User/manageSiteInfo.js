import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import {update, generateData, isValid, populateFields} from '../utils/Form/FormActions';
import {connect} from 'react-redux';
import { getSiteData, updateSiteData } from '../../actions/site_action';

class ManageSiteInfo extends Component {
    state = { 
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'addressInput',
                    type: 'text',
                    placeholder: 'Enter Address'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Hours',
                    name: 'hoursInput',
                    type: 'text',
                    placeholder: 'Enter Hours'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone',
                    name: 'phoneInput',
                    type: 'text',
                    placeholder: 'Enter Phone'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'emailInput',
                    type: 'text',
                    placeholder: 'Enter Email'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }
    componentDidMount() {
        this.props.dispatch(getSiteData()).then(()=>{
            const newFormData = populateFields(this.state.formData, this.props.site.siteData[0])
            this.setState({formData: newFormData})
        })
    }
    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = generateData(this.state.formData, 'site_info')
        let formIsValid = isValid(this.state.formData, 'site_info')
        if(formIsValid){
            this.props.dispatch(updateSiteData(dataToSubmit)).then(()=>{
                this.setState({formSuccess: true}, ()=>{
                    setTimeout(() => {
                        this.setState({formSuccess: false})
                    }, 2000);
                })
            })
        }
        else{
            this.setState({formError: true})
        }
    }
    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'site_info')
        this.setState({formData: newFormData, formError: false})
    }
    render() { 
        return ( 
            <div>
                <form onSubmit = {(event)=> this.submitForm(event)}>
                    <h1>Site Info</h1>
                    <FormField id = 'address' formData = {this.state.formData.address} change = {(element)=> this.updateForm(element)}/>
                    <FormField id = 'phone' formData = {this.state.formData.phone} change = {(element)=> this.updateForm(element)}/>
                    <FormField id = 'hours' formData = {this.state.formData.hours} change = {(element)=> this.updateForm(element)}/>
                    <FormField id = 'email' formData = {this.state.formData.email} change = {(element)=> this.updateForm(element)}/>
                    {
                        this.state.formSuccess ?
                        <div className = 'form_success'>
                            Success
                        </div>
                        : null
                    }
                    {
                        this.state.formError ?
                            <div className = 'error_label'>
                                Please check your data
                            </div>
                        :null
                    }
                    <button onClick = {(event)=> this.submitForm(event)}>UPDATE</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        site: state.site
    }
}
 
export default connect(mapStateToProps)(ManageSiteInfo);