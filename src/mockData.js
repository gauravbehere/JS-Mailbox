const initialState = {
  loggedInUser: null,
  loginError: null,
  loggedInUserData: {
    sent: [{
      to: [{ email: 'user@site.com', name: 'User' }],
      cc: [{ email: 'hr@site.com', name: 'HR' }],
      from: { email: 'abc@site.com', name: 'ABC' },
      subject: 'First Email',
      body: 'This is the first email',
      timestamp: Date.now(),
      category: 'Clients',
      id: 1,
      unread: false,
    }],
    inbox: [{
      to: [{ email: 'user@site.com', name: 'User' }],
      cc: [{ email: 'hr@site.com', name: 'HR' }],
      from: { email: 'abc@site.com', name: 'ABC' },
      subject: 'Second Email',
      body: 'This is the second email',
      unread: false,
      timestamp: Date.now() - 200000000,
      category: 'Clients',
      id: 2,
      attachments: [2, 3]
    }, {
      to: [{ email: 'user@site.com', name: 'User' }],
      cc: [{ email: 'hr@site.com', name: 'HR' }],
      from: { email: 'abc@site.com', name: 'ABC' },
      subject: 'Re: First Email',
      body: 'This is the reply to first email',
      unread: true,
      timestamp: Date.now() - 2000000000,
      id: 3
    }]
  },
  users: {
    'admin@site.com': 'Admin',
    'hr@site.com': 'HR',
    'user@site.com': 'User',
    'abc@site.com': 'ABC'
  },
  userCredenentials: {
    'admin@site.com': 'iamadmin',
    'hr@site.com': 'iamhr',
    'user@site.com': 'iamuser',
    'abc@site.com': 'iamabc'
  },
  folders: [{
    name: 'Inbox',
    icon: 'fa-inbox',
    dataKey: 'inbox',
    badgeClass: 'orange',
  }, {
    name: 'Sent Mail',
    icon: 'fa-envelope',
    dataKey: 'sent',
    badgeClass: 'orange'
  }, {
    name: 'Important',
    icon: 'fa-certificate',
    dataKey: 'imp'
  }, {
    name: 'Draft',
    icon: 'fa-file-alt',
    dataKey: 'draft',
    badgeClass: 'red',
  }, {
    name: 'Trash',
    icon: 'fa-trash-alt',
    dataKey: 'trash'
  }],
  categories: [{
    key: 'Work',
    color: '#00b493'
  }, {
    key: 'Documents',
    color: '#f1514e'
  }, {
    key: 'Social',
    color: '#0c83c8'
  }, {
    key: 'Advertising',
    color: '#02c7c9'
  }, {
    key: 'Clients',
    color: '#faac50'
  }],
  labels: ['Family', 'Work', 'Home', 'Children', 'Holidays', 'Music', 'Photography', 'Film']
}

export default initialState;
