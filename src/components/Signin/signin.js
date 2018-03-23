import React, { Component } from 'react';

import FormField from '../widgets/FormField/formField';
import styles from './signin.css';

class Signin extends Component {
  state = {
    registerError: '',
    loading: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = element => {
    const newFormdata = {
      ...this.state.formdata,
    };
    const newElement = {
      ...newFormdata[element.id],
    };
    newElement.value = element.event.target.value;
    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;

    console.log(newFormdata);

    newFormdata[element.id] = newElement;
    this.setState({
      formdata: newFormdata,
    });
  };

  validate = element => {
    let error = [true, ''];

    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${!valid ? 'Must be valid email' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'Must be greate than 5' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  submitForm = (event, type) => {
    event.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value;
      }
      for (let key in this.state.formdata) {
        formIsValid = this.state.formdata[key].valid && formIsValid;
      }
      if (formIsValid) {
        this.setState({
          loading: true,
          registerError: '',
        });
      }
      if (type) {
        console.log('Log in');
      } else {
        console.log('Register');
      }
    }
  };

  submitButton = () =>
    this.state.loading ? (
      'loading...'
    ) : (
      <div>
        <button onClick={event => this.submitForm(event, false)}>
          Register now
        </button>
        <button onClick={event => this.submitForm(event, true)}>Log in</button>
      </div>
    );

  render() {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={event => this.submitForm(event, null)}>
          <h2>Register / Log in</h2>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />
          {this.submitButton()}
        </form>
      </div>
    );
  }
}

export default Signin;
