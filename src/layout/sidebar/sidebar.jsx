import React from 'react';
import './styles.css';

const navItems = [{
  icon: 'fa-th-large',
  text: 'Dashboards'
}, {
  icon: 'fa-gem',
  text: 'Layouts'
}, {
  icon: 'fa-chart-bar',
  text: 'Charts'
}, {
  icon: 'fa-envelope',
  active: true,
  text: 'Mailbox'
}, {
  icon: 'fa-chart-pie',
  text: 'reports'
}, {
  icon: 'fa-flask',
  text: 'Widgets'
}];

const SideBar = ({ isOpen }) => {
  return (
    <div data-testid={isOpen ? 'sidebar-open' : 'sidebar'} className={isOpen ? 'sidebar-container open' : 'sidebar-container'}>
      {
        <div className={'nav-container' + (isOpen ? ' open' : '')}>
          {!isOpen &&
            navItems.map(nav => {
              return (
                <i className={'fas ' + nav.icon + (nav.active ? ' active' : '')}></i>
              )
            })
          }
          {
            isOpen &&
            navItems.map(nav => {
              return (
                <div className={'open-menu-item ' + (nav.active ? 'active' : '')}>
                  <i className={'fas ' + nav.icon}></i>
                  <div className='menu-text'>{nav.text}</div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default SideBar;
