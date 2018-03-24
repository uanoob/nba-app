import React, { Component } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import styles from './dashboard.css';
import FormField from '../widgets/FormField/formField';

import { firebaseTeams } from '../../firebase';

class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: '',
    loading: false,
    formdata: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: 'Enter the title',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      body: {
        element: 'texteditor',
        value: '',
        valid: true,
      },
      teams: {
        element: 'select',
        value: '',
        config: {
          name: 'teams_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = (element, content = '') => {
    const newFormdata = {
      ...this.state.formdata,
    };
    const newElement = {
      ...newFormdata[element.id],
    };

    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;

    newFormdata[element.id] = newElement;
    this.setState({
      formdata: newFormdata,
    });
  };

  validate = element => {
    let error = [true, ''];

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
    }
    for (let key in this.state.formdata) {
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    console.log(dataToSubmit);

    if (formIsValid) {
      this.setState({
        loading: true,
        registerError: '',
      });
    } else {
      this.setState({
        postError: 'Something went wrong',
      });
    }
  };

  submitButton = () =>
    this.state.loading ? (
      'loading...'
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );

  showError = () =>
    this.state.postError !== '' ? (
      <div className={styles.error}>{this.state.postError}</div>
    ) : (
      ''
    );

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();
    let rowState = convertToRaw(contentState);
    let html = stateToHTML(contentState);

    this.updateForm({ id: 'body' }, html);
    this.setState({
      editorState,
    });
  };

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once('value').then(snapshot => {
      let teams = [];
      snapshot.forEach(childSnapshot => {
        teams.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city,
        });
      });
      const newFormdata = { ...this.state.formdata };
      const newElement = { ...newFormdata['teams'] };

      newElement.config.options = teams;
      newFormdata['teams'] = newElement;

      this.setState({
        formdata: newFormdata,
      });
    });
  };

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>
          <FormField
            id={'author'}
            formdata={this.state.formdata.author}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'title'}
            formdata={this.state.formdata.title}
            change={element => this.updateForm(element)}
          />
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <FormField
            id={'teams'}
            formdata={this.state.formdata.teams}
            change={element => this.updateForm(element)}
          />
          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default Dashboard;
