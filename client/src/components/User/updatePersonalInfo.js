import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import {update, generateData, isValid, populateFields} from '../utils/Form/FormActions';
import {connect} from 'react-redux';
import { updateData, clearUpdateData } from '../../actions/user_action';

class UpdatePersonalInfo extends Component {
    state = { 
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'nameInput',
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastNameInput',
                    type: 'text',
                    placeholder: 'Enter Your Last Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'emailInput',
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        }
    }
    componentDidMount() {
        const newFormData = populateFields(this.state.formData, this.props.user.userData)
        this.setState({formData: newFormData})
    }
    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = generateData(this.state.formData, 'update_user')
        let formIsValid = isValid(this.state.formData, 'update_user')
        if(formIsValid){
            this.props.dispatch(updateData(dataToSubmit)).then(()=>{
                if(this.props.user.updateUser.success){
                    this.setState({formSuccess: true}, ()=>{
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateData())
                            this.setState({formSuccess: false})
                        }, 2000);
                    })
                }
            })
        }
        else{
            this.setState({formError: true})
        }
    }
    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'update_user')
        this.setState({formData: newFormData, formError: false})
    }
    render() { 
        return ( 
            <div>
                <form onSubmit = {(event)=> this.submitForm(event)}>
                    <h2>Personal Information</h2>
                    <div className = 'form_block_two'>
                        <div className = 'block'>
                            <FormField id = 'name' formData = {this.state.formData.name} change = {(element)=> this.updateForm(element)}/>
                        </div>
                        <div className = 'block'>
                            <FormField id = 'lastname' formData = {this.state.formData.lastname} change = {(element)=> this.updateForm(element)}/>
                        </div>
                    </div>
                    <div>
                        <FormField id = 'email' formData = {this.state.formData.email} change = {(element)=> this.updateForm(element)}/>
                    </div>
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
                    <button onClick = {(event)=> this.submitForm(event)}>Update Personal Info</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}
 
export default connect(mapStateToProps)(UpdatePersonalInfo);