import React, { useState } from 'react';
import './styles.css';

const ComposeEmail = ({ onClose, onSubmit }) => {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFromError] = useState(null);

  const sendNewEmail = () => {
    if (to === '' || subject === '') {
      setFromError('To & Subject are mandatory fields');
      return;
    }
    onSubmit(to, cc, subject, body);
  };
  return (
    <div data-testid='compose-mail-popup' id='myModal' class='modal'>
      <div class='modal-content'>
        <span data-testid='close-compose-mail' class='close' onClick={onClose}>&times;</span>
        <p>Compose a new mail</p>
        <div>
          <input data-testid='to' required type='email' value={to} onChange={e => setTo(e.target.value)} placeholder='To' />*
        </div>
        <div>
          <input data-testid='cc' type='email' value={cc} onChange={e => setCc(e.target.value)} placeholder='Cc' />
        </div>
        <div>
          <input data-testid='subject' required type='text' value={subject} onChange={e => setSubject(e.target.value)} placeholder='Subject' />*
        </div>
        <div>
          <textarea data-testid='body' type='text' maxLength='255' value={body} onChange={e => setBody(e.target.value)} placeholder='Body' />
        </div>
        <div data-testid='mail-compose-error'>{formError}</div>
        <button data-testid='send-mail-btn' onClick={sendNewEmail}>Send</button>
      </div>
    </div>
  )
}

export default ComposeEmail;
