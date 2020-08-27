## JavaScript Mailbox Demo
<p align='center'>
    <img src='https://raw.githubusercontent.com/gauravbehere/JS-Mailbox/master/e-mail3.png'></img>
</p>
<hr/>

#### Interview question
Implement a Gmail like email client using localstorage & JavaScript.


#### Problem Statement

- Using the attached screen shot for an admin dashboard, please construct a simple UI that exhibits functionalities listed below in relevant section. Following are few guidelines.
- You are free to use Vanilla javascript / JS Framework of your choice 
- The UI need not have a server back end and you can use Mock Data with CRUD operations on HTML5 Local Storage
- Feel free to select an alternative color theme and assets.
- Please provide Test Coverage
- For the functionality requested please see the images attached.
- A login page with a simple form where the user can enter an email and password as credential. If the credential matches the mock data, the user gets redirected to the Dashboard Page with a list of Emails on his Inbox(Mock Data)
- Compose mail should open a pop up that allows you to write a simple mail with To and CC fields, subject and a body 
- Upon submission, the email should be stored in local storage and should appear in the list of Sent Emails
- If we logout and login with the credentials(email & password) of the user to whom the email was sent, he should be able to see the new email at top of the list on his Inbox
- The user can click on an email to read it and the numbers on unread emails(Mail icon at top right corner of the header) should get updated based on the unread emails on Inbox
- The user should be able to select and delete the emails from his Inbox  
- The menu bar on left can exist in a collapsed or an expanded state as demonstrated in the screenshot
- Rest of the screen can remain non-functional and static as long as look and feel can match

#### Steps to run this project
- Extract the contents into a folder
- Go to root of the folder
- `run npm i`
- `run npm start`
- navigate to http://localhost:5000/
- You will be taken to dummy login screen, use one of these users to login
- Use one of these credentials to login

| username | password |
| --- | --- |
| admin@site.com | iamadmin |
| hr@site.com | iamhr |
| user@site.com | iamuser |
| abc@site.com | iamabc |

#### Running tests
- npm run test
- to check coverage, check icov-report/index.html in the coverage folder generated
