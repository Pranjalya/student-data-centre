For scanning QR codes, laptop uses its webcam (if available), and mobiles use back camera by default.

## Installation

Please install these prerequisites for the project:
- [Node.js](https://nodejs.org/en/) (>=8.9)
- [npm](https://www.npmjs.com/get-npm) version 3+ (or [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) version 1.16+)
- [Git](https://git-scm.com/)

These are some of the extra dependencies which are required:
- [Apache CouchDB](https://couchdb.apache.org)
```
# Linux / Ubuntu
$ sudo apt update
$ sudo apt install couchdb

# Mac (using MacPorts)
$ sudo port install couchdb

OR

# Mac (using HomeBrew) (Make sure you have HomeBrew installed. Visit https://docs.couchdb.org/en/1.6.1/install/mac.html for more detail.)
brew link icu4c
brew link erlang
brew link couchdb
```

After checking the prerequisites, follow these steps to clone the project and start your work:

```
# Clone the repository
$ git clone https://github.com/Pranjalya/student-data-centre.git sdc-project

# Move to your project directory
$ cd sdc-project

```

Then, if you use npm:

```
# Install all the npm packages and plugins
$ npm install --save

# To serve the project
$ npm run serve

# Build for going into production 
$ npm run build

```

If you use yarn:
```
$ yarn install --save

# To serve the project
$ yarn serve

# Build for going into production 
$ yarn build
```

# You liked it?

- Star the GitHub repo ;)
- If you want to work further and update on this, do fork and submit pull requests, I'll definitely take a look at it 
- Enjoy, please! :D

**********************************************************************

## Updates
#### Complaint module added. 
- Users can file a complaint without logging in.
- To view Complaints, check View Complaints section in Dashboard.
- There are cards for different departments to review complaints.
- Once complaint is `Resolved` by clicking on Resolved button for a specific complaint, the complaint goes to Resolved tab, so the complaints can be audited.

#### Email verification added
- Email verification added for scanning of QR
- An automated email is sent to the id of user whose QR code is being scanned.
- It uses SMTP relay.


**NOTE**  
*The QR Scanner is tested in Google Chrome, Mozilla Firefox in Linux and Microsoft Edge, Mozilla Firefox in Microsoft Windows.
