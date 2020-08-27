import React, { useState } from 'react';
import Sidebar from '../../layout/sidebar';
import MailOrganization from '../../layout/mail-organization';
import MailsContainer from '../../layout/mails-container';
import Header from '../../layout/header';
import './styles.css';

const LandingPage = (props) => {

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [activeView, setActiveView] = useState('inbox')

  const checkIfUnreadIsOpen = (view) => {
    setActiveView(view);
    props.onEmailOpen(view)
  }
  return (
    <div data-testid='landing-page' className='page-container'>
      <Sidebar isOpen={sideBarOpen}></Sidebar>
      <div className={sideBarOpen ? 'right-pane open' : 'right-pane'}>
        <Header onMenuToggle={setSideBarOpen.bind(this, !sideBarOpen)} {...props}></Header>
        <div className='content-pane'>
          <MailOrganization {...props} activeView={activeView} setActiveView={setActiveView}></MailOrganization>
          <MailsContainer {...props} activeView={activeView} setActiveView={checkIfUnreadIsOpen}></MailsContainer>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
