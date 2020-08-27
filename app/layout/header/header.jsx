import React from 'react';
import './styles.css';

const Header = ({ onMenuToggle, onLogout, inbox }) => {
  const unReadMails = inbox.filter(mail => mail.unread).length;
  return (
    <div className='header-container'>

      <div className='header-inputs'>
        <div data-testid='sidebar-menu-toggle' className='toggle-menu' onClick={onMenuToggle}>
          <i class='fas fa-bars menu-icon'></i>
        </div>
        <div className='search-container'>
          <input type='text' placeholder='Search for something...'></input>
        </div>
      </div>

      <div className='header-actions'>
        <div className='unread-mails'>
          <i class='fas fa-envelope'></i>
          <span class='badge badge-superscript orange'>{unReadMails}</span>
        </div>

        <div className='notifications'>
          <i class='fas fa-bell'></i>
          <span class='badge badge-superscript green'>3</span>
        </div>

        <div data-testid='logout-btn' onClick={onLogout} className='logout'>
          <i class='fas fa-sign-out-alt'></i>
          Log out
        </div>
      </div>
      
    </div>
  )
}

export default Header;
