# Project description

This project is about a simple React App that renders list of repository from user github.

## Technology

In this project, we use:
- TypeScript
- React Hooks/ Custom Hooks
- AntDesign
- Apollo GraphQL

### Set up environment

To use Github GraphQL, you need to be authenticated with Github.
Go to Github > Settings > Developer Settings ? Personal access tokens
Click generate new token, set time expiration to your liking (recommend 7 days for testing), and grant the access to repository.
Copy your new generated token and username to the .env
### How to use

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

All repository of you will be listed in the table, with their name, star and number of forked.
You can search the repository using the search bar above the list.
Click on the repo name will redirect you to the github project.