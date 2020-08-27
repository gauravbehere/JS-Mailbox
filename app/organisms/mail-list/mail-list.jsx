import React from 'react';
import moment from 'moment';
import './styles.css';
import { sortMails } from '../../actions';

const MailList = ({ mails, toggleCheckMail, categories, setActiveView }) => {

  return (
    <>
      {mails && Array.isArray(mails) &&
        sortMails(mails).map((mail, i) => {
          const isMailUnRead = mail.unread;
          return (
            <div key={i} className={isMailUnRead ? 'mail-item unread' : 'mail-item'}>
              <div className='mail-item-checkbox'>
                <label class='container'>
                  <input type='checkbox' />
                  <span class='checkmark' data-testid={'checkmail-' + i} onClick={toggleCheckMail.bind(this, mail.id)}></span>
                </label>
              </div>
              <div className='mail-sender'>{mail.from.name}</div>
              <div className='mail-category-container'>
                {
                  mail.category &&
                  <div className='mail-category' style={{ backgroundColor: categories.filter((c) => c.key === mail.category)[0].color }}>{mail.category}</div>
                }
              </div>
              <div data-testid={'mail-subject-' + i} className='mail-subject' onClick={setActiveView.bind(this, mail.id)}>{mail.subject}</div>
              <div className='mail-attachment'>
                {
                  mail.attachments && mail.attachments.length > 0 &&
                  <i class='fas fa-paperclip'></i>
                }
              </div>
              <div className='mail-time'>
                {moment(mail.timestamp).format('LT')}
              </div>
            </div>
          )
        })
      }
      {
        mails && !Array.isArray(mails) &&
        <div className='mail-open'>
          <div>Subject: {mails.subject}</div>
          <div>From: {mails.from.name}, {mails.from.email}</div>
          <div>Content: {mails.body}</div>
        </div>
      }
    </>
  )
}

export default MailList;
