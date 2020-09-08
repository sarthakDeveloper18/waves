import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import {update, generateData, isValid} from '../utils/Form/FormActions';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/user_action';
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {
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
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'passwordInput',
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirmPasswordInput',
                    type: 'password',
                    placeholder: 'Enter Confirm Password'
                },
                validation: {
                    required: true,
                    confirm:'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }
    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = generateData(this.state.formData, 'register')
        let formIsValid = isValid(this.state.formData, 'register')
        if(formIsValid){
            this.props.dispatch(registerUser(dataToSubmit)).then(response=>{
                if(response.payload.success){
                    this.setState({formError: false, formSuccess: true})
                    setTimeout(() => {
                        this.props.history.push('/registerLogin')
                    }, 3000);
                }
                else{
                    this.setState({formError: true})
                }
            })
        }
        else{
            this.setState({formError: true})
        }
    }
    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'register')
        this.setState({formData: newFormData, formError: false})
    }
    render() { 
        return ( 
            <div className = 'page_wrapper'>
                <div className = 'container'>
                    <div className = 'register_login_container'>
                        <div className = 'left'>
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
                                <h2>Verify Password</h2>
                                <div className = 'form_block_two'>
                                    <div className = 'block'>
                                        <FormField id = 'password' formData = {this.state.formData.password} change = {(element)=> this.updateForm(element)}/>
                                    </div>
                                    <div className = 'block'>
                                        <FormField id = 'confirmPassword' formData = {this.state.formData.confirmPassword} change = {(element)=> this.updateForm(element)}/>
                                    </div>
                                </div>
                                {
                                    this.state.formError ?
                                        <div className = 'error_label'>
                                            Please check your data
                                        </div>
                                    :null
                                }
                                <button onClick = {(event)=> this.submitForm(event)}>CREATE AN ACCOUNT</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open = {this.state.formSuccess}>
                    <div className = 'dialog_alert'>
                        <div>Congratulation</div>
                        <div>You will be redirecting to the LOGIN in a couple seconds...</div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
 
export default connect()(Register);