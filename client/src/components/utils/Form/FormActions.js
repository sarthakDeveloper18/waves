export const update = (element, formData, type) => {
    //New Form Data Copy
    const newFormData = {...formData}
    //Email and Password Object Copy
    const newElement = {...newFormData[element.id]}
    newElement.value = element.event.target.value
    if(element.blur){
        let validData = validate(newElement, formData)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]
    }
    newElement.touched = element.blur
    newFormData[element.id] = newElement
    return newFormData
}

export const validate = (element, formData = []) => {
    let error = [true, '']
    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid?  'Mutst be a valid email': ''}`
        error = !valid ? [valid, message] : error
    }
    if(element.validation.required){
        const valid = element.value.trim() !== ''
        const message = `${!valid?  'This Field is required': ''}`
        error = !valid ? [valid, message] : error
    }
    if(element.validation.confirm){
        const valid = element.value.trim() === formData[element.validation.confirm].value
        const message = `${!valid?  'Passwords do not match': ''}`
        error = !valid ? [valid, message] : error
    }
    return error
}

export const generateData = (formData, type) => {
    let dataToSubmit = {}
    for(let key in formData){
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formData[key].value
        }
        dataToSubmit[key] = formData[key].value
    }
    return dataToSubmit
}

export const isValid = (formData, type) => {
    let valid = true
    for(let key in formData){
        valid = formData[key].valid && valid
    }
    return valid
}

export const populateOptionsFields = (formData, list = [], type) => {
    const newArray = []
    const newFormData = {...formData}
    list.forEach(item=>{
        newArray.push({key: item._id, value: item.name})
    })
    newFormData[type].config.options = newArray
    return newFormData
}

export const resetFields = (formData, name) => {
    const newFormData = {...formData}
    for(let key in newFormData){
        if(key === 'images'){
            newFormData[key].value = []
        }
        else{
            newFormData[key].value = ''
        }
        newFormData[key].valid = false
        newFormData[key].touched = false
        newFormData[key].validationMessage = ''
    }
    return newFormData
}

export const populateFields = (formData, userData) => {
    for(let key in formData){
        formData[key].value = userData[key]
        formData[key].valid = true
        formData[key].touched = true
        formData[key].validationMessage = ''
    }
    return formData
}