import React from 'react';
import './styles.css';
import { useState } from 'react';

const LoginPage = ({ onLoginClick, loginError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div data-testid='login-page' className='login-container'>
      <img src='https://raw.githubusercontent.com/gauravbehere/JS-Mailbox/master/img/e-mail3.png'></img>
      <div>
        <input data-testid='username' type='text' placeholder='Username' value={username} onChange={event => setUsername(event.target.value)}></input>
      </div>
      <div>
        <input data-testid='password' type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)}></input>
      </div>
      {
        loginError && <div data-testid='login-error'>{loginError}</div>
      }
      <div>
        <button data-testid='login-btn' onClick={onLoginClick.bind(this, username, password)}>Submit</button>
      </div>
      <br/><br/><br/><br/>
      <div>
        <div>Use one these credentials to login</div>
        <div>
          <table border='1'>
            <thead>
              <th>Username</th>
              <th>Password</th>
            </thead>
            <tbody>
              <tr>
                <td>admin@site.com</td>
                <td>iamadmin</td>
              </tr>
              <tr>
                <td>hr@site.com</td>
                <td>iamhr</td>
              </tr>
              <tr>
                <td>user@site.com</td>
                <td>iamuser</td>
              </tr>
              <tr>
                <td>abc@site.com</td>
                <td>iamabc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
