const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput (data) {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";

    // Name checks
    if (Validator.isEmpty(data.first_name)) {
        errors.name = "First Name field is required";
    }

    // Name checks
    if (Validator.isEmpty(data.last_name)) {
        errors.name = "Last Name field is required";
    }

    //Check if its an email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password 1 checks
    if (Validator.isEmpty(data.password1)) {
        errors.password1 = "Password field is required";
    }

    // Password 2 checks
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password field is required";
    }
    // Length checks
    if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
        errors.password1 = "Password must be at least 6 characters";
    }
    // Password Match Checks
    if (!Validator.equals(data.password1, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
}