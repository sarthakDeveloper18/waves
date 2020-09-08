import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import {update, generateData, isValid, resetFields} from '../utils/Form/FormActions';
import {connect} from 'react-redux';
import { getBrands, addBrand } from '../../actions/product_action';

class ManageBrands extends Component {
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
                    placeholder: 'Enter Brand Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    }
    componentDidMount() {
        this.props.dispatch(getBrands())
    }
    showCategoryItems = () => (
        this.props.products.brands ?
        this.props.products.brands.map((p,i)=>(
            <div className = 'category_item' key = {p._id}>{p.name}</div>
        )) : null
    )
    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'brands')
        this.setState({formData: newFormData, formError: false})
    }
    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formData, 'products')
        this.setState({formSuccess: true, formData: newFormData})
    }
    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = generateData(this.state.formData, 'brands')
        let formIsValid = isValid(this.state.formData, 'brands')
        if(formIsValid){
            this.props.dispatch(addBrand(dataToSubmit, this.props.products.brands)).then(response=>{
                console.log(response)
                if(response.payload.success){
                    this.resetFieldHandler()
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
    render() { 
        return ( 
            <div className = 'admin_category_wrapper'>
                <h1>Brands</h1>
                <div className = 'admin_two_column'>
                    <div className = 'left'>
                        <div className = 'brands_container'>
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className = 'right'>
                        <form onSubmit = {(event)=> this.submitForm(event)}>
                            <FormField id = 'name' formData = {this.state.formData.name} change = {(element)=> this.updateForm(element)}/>
                            {
                                this.state.formError ?
                                    <div className = 'error_label'>
                                        Please check your data
                                    </div>
                                :null
                            }
                            <button onClick = {(event)=> this.submitForm(event)}>ADD BRAND</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        products: state.products
    }
}
 
export default connect(mapStateToProps)(ManageBrands);