export default function RegisterValidationRules(values) {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'Password must be 4 or more characters';
  }

  if (values.role === "student") {
    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    } else if (values.firstName.length < 4) {
      errors.firstName = 'First Name must be 4 or more characters';
    }

    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    } else if (values.lastName.length < 4) {
      errors.lastName = 'Last Name must be 4 or more characters';
    }

    if (!values.DoB) {
      errors.DoB = 'Date of Birth is required';
    }
  }
  else if (values.role === "company")
    if (!values.companyName) {
      errors.companyName = 'Company Name is required';
    } else if (values.companyName.length < 3) {
      errors.companyName = 'Company Name must be 3 or more characters';
    }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password is required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Those passwords didn’t match. Try again.';
  }

  return errors;
};