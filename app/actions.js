import initialState from './mockData';

const checkForNewMailsInLS = function(user) {
  const newEmails = window.localStorage.getItem('newEmails');
  const mailsObject = newEmails ? JSON.parse(newEmails) : {};
  return mailsObject[user];
}

const doLogin = function(username, password) {
  if (this.state.users[username] && this.state.userCredenentials[username] === password) {
    const loggedInUserData = { ...this.state.loggedInUserData };
    const newMails = this.checkForNewMailsInLS(username);
    if (Array.isArray(newMails) && newMails.length > 0) {
      loggedInUserData.inbox = [...loggedInUserData.inbox, ...newMails];
    }
    this.setState({ ...this.state, loggedInUser: username, loginError: null, loggedInUserData: loggedInUserData});
    window.sessionStorage.setItem("loggedInUser-Sahaj", username);
  }
  else {
    this.setState({ ...this.state, loginError: "Unknown username/password combination" });
  }
}

const toggleComposeEmail = function() {
  this.setState({ ...this.state, isComposingEmail: !this.state.isComposingEmail });
}

const onEmailOpen = function(id) {
  const loggedInUserData = this.state.loggedInUserData;
  const mails = loggedInUserData.inbox;
  const modifiedUserData = {
    ...this.state.loggedInUserData,
    inbox: mails.map(mail => {
      if (mail.id === id) {
        mail.unread = false;
      }
      return mail;
    })
  }
  this.setState({ ...this.state, loggedInUserData: modifiedUserData });
}

const deleteMail = function(mailArray){
  // Allowing only inbox mails to be deleted for now
  const loggedInUserData = this.state.loggedInUserData;
  const mails = loggedInUserData.inbox;
  const modifiedUserData = {
    ...this.state.loggedInUserData,
    inbox: mails.filter(mail => mailArray.indexOf(mail.id) == -1)
  };
  this.setState({ ...this.state, loggedInUserData: modifiedUserData });
}

const sendNewMail = function(to, cc, subject, body) {
  const { users } = this.state;
  const newEmail = {
    from: { email: this.state.loggedInUser, name: users[this.state.loggedInUser] },
    to: [{ email: to, name: users[to] }],
    cc: cc ? [{ email: cc, name: users[cc] }] : [],
    subject: subject,
    body: body,
    timestamp: Date.now(),
    unread: false,
    id: Date.now()
  }
  const modifiedUserData = {
    ...this.state.loggedInUserData,
    sent: this.state.loggedInUserData.sent.push(newEmail)
  };
  this.setState({ ...this.state, loggedInUserData: modifiedUserData });
  this.toggleComposeEmail();

  const newEmails = window.localStorage.getItem('newEmails');
  const mailsObject = newEmails ? JSON.parse(newEmails) : {};
  mailsObject[to] = mailsObject[to] || [];
  mailsObject[cc] = mailsObject[cc] || [];
  mailsObject[to].push({ ...newEmail, unread: true });
  mailsObject[cc].push({ ...newEmail, unread: true });
  window.localStorage.setItem('newEmails', JSON.stringify(mailsObject));
}

const doLogout = function(){
  this.setState({ ...this.state, loggedInUser: null, loggedInUserData: initialState.loggedInUserData });
  window.sessionStorage.removeItem("loggedInUser-Sahaj");
}

const sortMails = (mails) => {
  return mails.sort((a, b) => b.timestamp - a.timestamp)
}

export {
  checkForNewMailsInLS, doLogin, toggleComposeEmail, onEmailOpen, deleteMail, sendNewMail, doLogout, sortMails
}
