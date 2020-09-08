import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormField from '../utils/Form/FormField';
import {update, generateData, isValid} from '../utils/Form/FormActions';
import { loginUser } from '../../actions/user_action';

class Login extends Component {
    state = { 
        formError: false,
        formSuccess: '',
        formData: {
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
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = generateData(this.state.formData, 'login')
        let formIsValid = isValid(this.state.formData, 'login')
        if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response=>{
                if(response.payload.loginSucess){
                    this.props.history.push('/user/dashboard')
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
        const newFormData = update(element, this.state.formData, 'login')
        this.setState({formData: newFormData, formError: false})
    }

    render() { 
        return ( 
            <div>
                <form onSubmit = {(event)=> this.submitForm(event)}>
                    <FormField id = 'email' formData = {this.state.formData.email} change = {(element)=> this.updateForm(element)}/>
                    <FormField id = 'password' formData = {this.state.formData.password} change = {(element)=> this.updateForm(element)}/>
                    {
                        this.state.formError ?
                            <div className = 'error_label'>
                                Please check your data
                            </div>
                        :null
                    }
                    <button onClick = {(event)=> this.submitForm(event)}>LOG IN</button>
                    
                </form>
            </div>
        );
    }
}
 
export default connect()(Login);