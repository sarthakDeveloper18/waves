import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import FormField from '../utils/Form/FormField';
import {update, generateData, isValid, populateOptionsFields, resetFields} from '../utils/Form/FormActions';
import {connect} from 'react-redux';
import {getBrands, getWoods, addProduct, clearProduct} from '../../actions/product_action';
import FileUpload from '../utils/fileUpload';

class AddProduct extends Component {
    state = { 
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product Name',
                    name: 'nameInput',
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product Description',
                    name: 'descriptionInput',
                    type: 'text',
                    placeholder: 'Enter Your Description'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product Price',
                    name: 'priceInput',
                    type: 'number',
                    placeholder: 'Enter Price'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brandInput',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shippingnput',
                    options: [
                        {key: true, value: 'Yes'},
                        {key: false, value: 'No'}
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available in Stock',
                    name: 'availablenput',
                    options: [
                        {key: true, value: 'Yes'},
                        {key: false, value: 'No'}
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood Material',
                    name: 'woodInput',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'fretsInput',
                    options: [
                        {key: 20, value: 20},
                        {key: 21, value: 21},
                        {key: 22, value: 22},
                        {key: 24, value: 24}
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publishInput',
                    options: [
                        {key: true, value: 'Publish'},
                        {key: false, value: 'Hidden'}
                    ],
                },
                validation: {
                    required: true,
                },
                showLabel: true,
                valid: false,
                touched: false,
                validationMessage: '',
            },
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false,
            }
        }
    }
    componentDidMount() {
        const formData = this.state.formData
        this.props.dispatch(getBrands()).then(response=>{
            const newFormData = populateOptionsFields(formData, this.props.products.brands, 'brand')
            this.updateFields(newFormData)
        })
        this.props.dispatch(getWoods()).then(response=>{
            const newFormData = populateOptionsFields(formData, this.props.products.woods, 'wood')
            this.updateFields(newFormData)
        })
    }
    updateFields = (newFormData) => {
        this.setState({formData: newFormData})
    }
    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'products')
        this.setState({formData: newFormData, formError: false})
    }
    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formData, 'products')
        this.setState({formSuccess: true, formData: newFormData})
        setTimeout(() => {
            this.setState({formSuccess: false})
            this.props.dispatch(clearProduct())
        }, 3000);
    }
    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = generateData(this.state.formData, 'products')
        let formIsValid = isValid(this.state.formData, 'products')
        if(formIsValid){
            this.props.dispatch(addProduct(dataToSubmit)).then(()=>{
                if(this.props.products.addProduct.success){
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
    imageHandler = (images) => {
        const newFormData = {...this.state.formData}
        newFormData['images'].value = images
        newFormData['images'].valid = true
        this.setState({formData: newFormData})
    }
    render() {
        return ( 
            <UserLayout>
                <div>
                    <h1>Add Product</h1>
                    <form onSubmit = {(event)=> this.submitForm(event)}>
                        <FileUpload reset = {this.state.formSuccess} imageHandler = {(images)=> this.imageHandler(images)} />
                        <FormField id = 'name' formData = {this.state.formData.name} change = {(element)=> this.updateForm(element)}/>
                        <FormField id = 'description' formData = {this.state.formData.description} change = {(element)=> this.updateForm(element)}/>
                        <FormField id = 'price' formData = {this.state.formData.price} change = {(element)=> this.updateForm(element)}/>
                        <div className = 'form_devider'>
                            <FormField id = 'brand' formData = {this.state.formData.brand} change = {(element)=> this.updateForm(element)}/>
                            <FormField id = 'shipping' formData = {this.state.formData.shipping} change = {(element)=> this.updateForm(element)}/>
                            <FormField id = 'available' formData = {this.state.formData.available} change = {(element)=> this.updateForm(element)}/>
                        </div>
                        <div className = 'form_devider'>
                            <FormField id = 'wood' formData = {this.state.formData.wood} change = {(element)=> this.updateForm(element)}/>
                            <FormField id = 'frets' formData = {this.state.formData.frets} change = {(element)=> this.updateForm(element)}/>
                        </div>
                        <div className = 'form_devider'>
                            <FormField id = 'publish' formData = {this.state.formData.publish} change = {(element)=> this.updateForm(element)}/>
                        </div>
                        {
                            this.state.formError ?
                                <div className = 'error_label'>
                                    Please check your data
                                </div>
                            :null
                        }
                        {
                            this.state.formSuccess ?
                                <div className = 'form_success'>
                                    Success
                                </div>
                            :null
                        }
                        <button onClick = {(event)=> this.submitForm(event)}>ADD PRODUCT</button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

function mapStateToProps(state){
    return {
        products: state.products
    }
}
 
export default connect(mapStateToProps)(AddProduct);