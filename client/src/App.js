import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Auth from './modules/Auth';
import Navigation from './components/Nav';
import UploadList from './components/UploadList';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UploadForm from './components/UploadForm';

class App extends Component{
  constructor(){
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldGoToDash: false,
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
    this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
  }

  handleRegisterSubmit(e, data){
    e.preventDefault();
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({
          user: data
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoToDash: true,
        });
        window.location = '/dash';
      }).catch(err => {
        console.log(err);
      })
  }

  handleLoginSubmit(e, data){
    e.preventDefault();
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
    }).then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoToDash: true,
        });
        window.location = '/dash';
      }).catch(err => {
        console.log(err);
      })
  }

  handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch(err => console.log(err));
  }

  handleRequestSubmit(e, email) {
    const data = { email: email };
    e.preventDefault();
    fetch('/uploads/request_link', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  handleUploadSubmit(e, data) {
    e.preventDefault();

    fetch('/uploads', {
      method: 'POST',
      body: this.buildFormData(data)
    }).then(res => res.json())
      .then(res => {
        window.location = '/dash';
      }).catch(err => {
        console.log(err);
      })
  }

  buildFormData(data) {
    let formData = new FormData();
    formData.append('upload[name]', data.name);
    formData.append('upload[description]', data.description);
    formData.append('upload[file]', data.file);
    formData.append('upload[email]', data.email);
    return formData;
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation handleLogout={this.handleLogout} />
          <hr/>
          <Route exact path="/uploads" render={() =>
            <UploadList/> } />
          <Route exact path="/dash" render={() =>
            <Dashboard handleRequestSubmit={this.handleRequestSubmit} /> } />
          <Route exact path="/register" render={() =>
            <Register handleRegisterSubmit={this.handleRegisterSubmit} /> } />
          <Route exact path="/login" render={() =>
            <Login handleLoginSubmit={this.handleLoginSubmit} />} />
          <Route path="/upload" render={(props) =>
            <UploadForm {...props} handleUploadSubmit={this.handleUploadSubmit} />} />
        </div>
      </Router>
    );
  }
}

export default App;
