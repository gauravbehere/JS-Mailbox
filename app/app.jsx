import React, { Component } from 'react';
import LoginPage from './pages/login-page';
import LandingPage from './pages/landing-page';
import './app-styles.css';
import './common-styles.css';
import ComposeEmail from './organisms/compose-email';
import initialState from './mockData';
import {
  checkForNewMailsInLS, doLogin, toggleComposeEmail, onEmailOpen, deleteMail, sendNewMail, doLogout
} from './actions';

class App extends Component {
  constructor() {
    super();

    // Bind Actions
    this.checkForNewMailsInLS = checkForNewMailsInLS.bind(this);
    this.doLogin = doLogin.bind(this);
    this.toggleComposeEmail = toggleComposeEmail.bind(this);
    this.onEmailOpen = onEmailOpen.bind(this);
    this.deleteMail = deleteMail.bind(this);
    this.sendNewMail = sendNewMail.bind(this);
    this.doLogout = doLogout.bind(this);
    this.loadedMailsFromLS = false;

    // Check if user is in session.
    // Load new mails from local storage
    const initData = { ...initialState };
    const userInSession = window.sessionStorage.getItem('loggedInUser-Sahaj')
    if (userInSession) {
      initData.loggedInUser = userInSession;
      const newMails = this.checkForNewMailsInLS(userInSession);
      if (Array.isArray(newMails) && newMails.length > 0) {
        initData.loggedInUserData.inbox = [...initData.loggedInUserData.inbox, ...newMails];
      }
    }
    this.state = { ...initData, isComposingEmail: false };
  }

  render() {
    return (
      <>
        {
          !this.state.loggedInUser &&
          <LoginPage loginError={this.state.loginError} onLoginClick={this.doLogin.bind(this)}></LoginPage>
        }
        {
          this.state.loggedInUser &&
          <LandingPage {...this.state.loggedInUserData}
            labels={this.state.labels}
            folders={this.state.folders}
            categories={this.state.categories}
            onLogout={this.doLogout.bind(this)}
            onDelete={this.deleteMail.bind(this)}
            onEmailOpen={this.onEmailOpen.bind(this)}
            onEmailCompose={this.toggleComposeEmail.bind(this)}
          >
          </LandingPage>
        }
        {
          this.state.isComposingEmail &&
          <ComposeEmail onClose={() => this.toggleComposeEmail()} onSubmit={this.sendNewMail.bind(this)} />
        }
      </>
    )
  }
}

export default App;
