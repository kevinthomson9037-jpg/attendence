const form = document.getElementById('signupForm');
const formResult = document.getElementById('formResult');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearErrors();
  formResult.textContent = '';

  const data = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    age: document.getElementById('age').value.trim(),
  };

  const errors = validateForm(data);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  formResult.textContent = 'Form submitted successfully!';
  formResult.classList.add('success');
  form.reset();
});

function validateForm(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  if (!values.email) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Email address is not valid.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!values.age) {
    errors.age = 'Age is required.';
  } else {
    const ageNumber = Number(values.age);
    if (Number.isNaN(ageNumber)) {
      errors.age = 'Age must be a number.';
    } else if (ageNumber < 13) {
      errors.age = 'You must be at least 13 years old.';
    }
  }

  return errors;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showErrors(errors) {
  Object.keys(errors).forEach((fieldName) => {
    const input = document.getElementById(fieldName);
    const errorText = errors[fieldName];
    const messageElement = input.parentElement.querySelector('.error-message');

    input.classList.add('invalid');
    messageElement.textContent = errorText;
  });
}

function clearErrors() {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.classList.remove('invalid');
    const messageElement = input.parentElement.querySelector('.error-message');
    if (messageElement) {
      messageElement.textContent = '';
    }
  });
  formResult.classList.remove('success');
}
