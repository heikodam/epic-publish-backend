const formInputTemplate = {
    name: '',
    elType: 'input',
    elConfig: {
        type: 'text',
        placeholder: ''
    },
    value: '',
    validation: {
        required: false,
        minLength: null,
        maxLength: null,
        isEmail: null,
        isNumeric: null
    },
    valid: true,
    touched: false
};

export default formInputTemplate;