import React from 'react';
import Button from '../utils/button';
import Login from '../Register_Login/login'

const RegisterLogin = (props) => {
    return ( 
        <div className = 'page_wrapper'>
            <div className = 'container'>
                <div className = 'register_login_container'>
                    <div className = 'left'>
                        <h1>New Customers</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        <Button type = 'default' title = 'Create Account' linkTo = '/register' addStyles = {{margin: '10px 0 0 0'}}/>
                    </div>
                    <div className = 'right'>
                        <h2>Registerd Customers</h2>
                        <p>If you have an account please Log in</p>
                        <Login {...props}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default RegisterLogin;