import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import initialState from '../mockData';
import { sortMails } from '../actions';

import App from '..';
describe('Mail Demo Test Suite', () => {

  let interTestMailId = null;

  it('Should just pass', () => {
    expect(1).toBe(1);
  });

  it('Should render App component', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('Should render login page when there is no user in session', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('login-page')).toBeInTheDocument();
  });

  it('Should show error if no credentials are provided', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('login-btn'));
    expect(getByTestId('login-error')).toBeInTheDocument();
  });

  it('Should show error if invalid credentials are provided', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('username'), { target: { value: 'abc' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'xyz' } })
    fireEvent.click(getByTestId('login-btn'));
    expect(getByTestId('login-error')).toBeInTheDocument();
  });

  it('Should show landing page if valid credentials are provided', () => {
    const { getByTestId } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();

    //Cleanup - if not done keeps the session active & the landing page will be shown automatically
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should show login page if user logs out', () => {
    const { getByTestId } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('logout-btn'));
    waitForDomChange();
    expect(getByTestId('login-page')).toBeInTheDocument();
  });

  it('Should show login page if user logs out', () => {
    const { getByTestId } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('logout-btn'));
    waitForDomChange();
    expect(getByTestId('login-page')).toBeInTheDocument();
  });

  it('Should show login page if user logs out', () => {
    const { getByTestId } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();
    expect(getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(getByTestId('sidebar-menu-toggle'));
    waitForDomChange();
    expect(getByTestId('sidebar-open')).toBeInTheDocument();

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should show error if subject or to is not provided while composing mail', () => {
    const { getByTestId } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();
    fireEvent.click(getByTestId('compose-mail-btn'));
    waitForDomChange();
    expect(getByTestId('compose-mail-popup')).toBeInTheDocument();

    fireEvent.click(getByTestId('send-mail-btn'));

    expect(getByTestId('mail-compose-error')).toBeInTheDocument();

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should send a new mail & it should appear in the sent mail list', () => {
    // Pre Cleanup
    window.localStorage.removeItem('newEmails');

    const { getByTestId, getByText } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('compose-mail-btn'));
    waitForDomChange();
    // Test popup close button
    fireEvent.click(getByTestId('close-compose-mail'));
    waitForDomChange();
    fireEvent.click(getByTestId('compose-mail-btn'));
    waitForDomChange();

    expect(getByTestId('compose-mail-popup')).toBeInTheDocument();
    const uniqueMailContent = 'Test Mail' + Date.now();
    fireEvent.change(getByTestId('to'), { target: { value: 'a@site.com' } });
    fireEvent.change(getByTestId('cc'), { target: { value: 'b@a.com' } });
    fireEvent.change(getByTestId('subject'), { target: { value: uniqueMailContent } });
    fireEvent.change(getByTestId('body'), { target: { value: 'test body' } });
    fireEvent.click(getByTestId('send-mail-btn'));
    waitForDomChange();

    fireEvent.click(getByTestId('folder-sent'));
    waitForDomChange();
    expect(getByText(uniqueMailContent)).toBeInTheDocument();

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should read a mail clicked upon', () => {
    const { getByTestId, getByText } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();
    fireEvent.click(getByTestId('mail-subject-0'));
    const sortedMails = sortMails(initialState.loggedInUserData.inbox);
    expect(getByText('Content: ' + sortedMails[0].body)).toBeInTheDocument();

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should delete the selected mail', () => {
    const { getByTestId } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();
    const initialMailsCount = getByTestId('mail-container').childNodes.length;
    // Test for toggle
    fireEvent.click(getByTestId('checkmail-0'));
    fireEvent.click(getByTestId('checkmail-0'));
    fireEvent.click(getByTestId('checkmail-0'));
    fireEvent.click(getByTestId('delete-mail'));
    const updatedMailsCount = getByTestId('mail-container').childNodes.length;
    expect(updatedMailsCount).toBe(initialMailsCount - 1);

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should show not supported message if user clicks on folders other than inbox or sent', () => {
    const { getByTestId, getByText } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('folder-trash'));
    expect(getByText('Not Supported Yet (0)')).toBeInTheDocument();

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
  });

  it('Should send a new mail & the reciever should see it in inbox', () => {
    // Pre Cleanup
    window.localStorage.removeItem('newEmails');

    const { getByTestId, getByText } = render(<App />);
    const user = Object.keys(initialState.users)[0];
    const toUser = Object.keys(initialState.users)[1];
    fireEvent.change(getByTestId('username'), { target: { value: user } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[user] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    expect(getByTestId('landing-page')).toBeInTheDocument();

    fireEvent.click(getByTestId('compose-mail-btn'));
    waitForDomChange();
    expect(getByTestId('compose-mail-popup')).toBeInTheDocument();
    const uniqueMailContent = 'Test Mail' + Date.now();
    fireEvent.change(getByTestId('to'), { target: { value: toUser } });
    fireEvent.change(getByTestId('cc'), { target: { value: 'b@a.com' } });
    fireEvent.change(getByTestId('subject'), { target: { value: uniqueMailContent } });
    fireEvent.change(getByTestId('body'), { target: { value: 'test body' } });
    fireEvent.click(getByTestId('send-mail-btn'));
    waitForDomChange();

    fireEvent.click(getByTestId('logout-btn'));
    waitForDomChange();

    fireEvent.change(getByTestId('username'), { target: { value: toUser } });
    fireEvent.change(getByTestId('password'), { target: { value: initialState.userCredenentials[toUser] } })
    fireEvent.click(getByTestId('login-btn'));
    waitForDomChange();
    interTestMailId = uniqueMailContent;
    expect(getByText(uniqueMailContent)).toBeInTheDocument();
    //fireEvent.click(getByTestId('logout-btn'));
  });

  /**
   * To keep session active we are not logging out in previous test case
   */
  it('Should show the landing page with mails loaded from mock & local storage, if session is active', () => {
    const { getByTestId, getByText } = render(<App />);
    
    expect(getByText(interTestMailId)).toBeInTheDocument();

    // Cleanup
    fireEvent.click(getByTestId('logout-btn'));
    interTestMailId = null;
  })

});
