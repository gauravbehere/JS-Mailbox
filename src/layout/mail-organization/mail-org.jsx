import React from 'react';
import './styles.css'

const MailOrganization = (props) => {
  return (
    <div className='mail-org-container'>
      <div data-testid='compose-mail-btn' className='new-email-btn' onClick={props.onEmailCompose}>
        Compose Mail
      </div>

      <div className='folders'>
        <div>FOLDERS</div>
        <div className='folders-container'>
          {
            props.folders.map(folder => {
              let folderDataCount = props[folder.dataKey] ? props[folder.dataKey].length : 0;
              if (folder.dataKey === 'inbox') {
                folderDataCount = props.inbox.filter(mail => mail.unread).length;
              }
              return (
                <div data-testid={'folder-' + folder.dataKey} className='folder-item' onClick={props.setActiveView.bind(this, folder.dataKey)}>
                  <i className={'fas ' + folder.icon}></i>
                  <div className='folder-name'>{folder.name}</div>
                  {folder.badgeClass && <div className={'badge ' + folder.badgeClass}>{folderDataCount}</div>}
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='categories'>
        <div>CATEGORIES</div>
        <div className='categories-container'>
          {
            props.categories.map(category => {
              return (
                <div className='category-item'>
                  <div className='category-color' style={{ backgroundColor: category.color }}></div>
                  <div className='category-name'>{category.key}</div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='labels'>
        <div>LABELS</div>
        <div className='labels-container'>
          {
            props.labels.map(label => {
              return (
                <div className='label-item'>
                  <i class='fas fa-tag'></i>
                  <div className='label-name'>{label}</div>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default MailOrganization;
