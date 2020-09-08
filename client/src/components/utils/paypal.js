import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    state = { 

    }
    render() { 
        const onSuccess = (payment) => {
            console.log(JSON.stringify(payment))
        }
        const onCancel = (data) => {
            this.props.transactionCancel()
        }
        const onError = (error) => {
            console.log(JSON.stringify(error))
        }
        let env = 'sandbox'
        let currency = 'INR'
        let total = this.props.pay
        let client = {
            sandbox: 'AbdB45al9BEDKSVdzP0Ee-7FFreckoA-prLo2HK87GxA_EpE8xiy8vRcZyiPmgVusaPZGaH32YYZ-4wC',
            production: ''
        }
        return ( 
            <div>
                <PaypalExpressBtn style = {{size: 'large', color: 'blue', shape: 'rect', label: 'checkout'}} onCancel = {onCancel} onSuccess = {onSuccess} onError = {onError} env = {env} client = {client} currency = {currency} total = {total}/>
            </div>
        );
    }
}
 
export default Paypal;