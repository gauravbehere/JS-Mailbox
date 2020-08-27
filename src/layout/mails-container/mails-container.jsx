import React, { useState } from 'react';
import './styles.css';
import MailList from '../../organisms/mail-list';

const MailsContainer = (props) => {

  const [checkedMails, setCheckedMails] = useState([]);

  let emailsToRender = null;
  let header = null;
  if (props.activeView === 'inbox') {
    emailsToRender = props.inbox;
    header = 'Inbox';
  }
  else if (props.activeView === 'sent') {
    emailsToRender = props.sent;
    header = 'Sent';
  }
  else if (!isNaN(props.activeView)) {
    emailsToRender = props.inbox.filter(mail => mail.id === props.activeView)[0];
    header = 'Read Mail';
  }
  else {
    emailsToRender = [];
    header = 'Not Supported Yet';

  }

  const toggleCheckMail = (mailId) => {
    if (checkedMails.indexOf(mailId) !== -1) {
      setCheckedMails(checkedMails.filter(mail => mail !== mailId))
    }
    else {
      setCheckedMails([...checkedMails, mailId]);
    }
  }

  const deleteCheckedMails = () => {
    props.onDelete(checkedMails);
    setCheckedMails([]);
  }

  return (
    <div className='mails-container'>
      <div className='mails-topbar'>
        <div className='mails-topbar-row'>
          <div className='mails-header-inbox'>{header} {isNaN(props.activeView) ? '(' + emailsToRender.length + ')' : ''}</div>
          <div>
            <input type='text' placeholder='Search email'></input>
            <div className='search-button'>Search</div>
          </div>
        </div>
        <div className='mails-topbar-row'>
          <div className='inbox-controls'>
            <div className='refresh-inbox'>
              <i class='fas fa-sync-alt'></i>
              Refresh
            </div>
            <div>
              <i class='fas fa-eye'></i>
            </div>
            <div>
              <i class='fas fa-exclamation'></i>
            </div>
            <div data-testid='delete-mail' onClick={deleteCheckedMails.bind(this)}>
              <i class='fas fa-trash-alt'></i>
            </div>
          </div>
          <div className='inbox-controls'>
            <div>
              <i class='fas fa-arrow-left'></i>
            </div>
            <div>
              <i class='fas fa-arrow-right'></i>
            </div>
          </div>
        </div>

      </div>

      <div data-testid='mail-container' className='inbox-container'>
        {
          <MailList mails={emailsToRender} setActiveView={props.setActiveView} categories={props.categories} toggleCheckMail={toggleCheckMail} />
        }
      </div>
    </div>
  )
}

export default MailsContainer;
