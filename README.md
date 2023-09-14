# GitHub User Repositories App

This is a React application built with TypeScript that retrieves a list of user repositories from the GitHub GraphQL API.

## Features

- Allows users to enter a GitHub username and retrieve a list of repositories associated with that user.
- Displays repository names, descriptions, and other relevant information.
- Provides a responsive and user-friendly interface.

## Technologies

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Apollo Client: A comprehensive GraphQL client for React applications.
- Ant Design: A popular UI library with ready-to-use components.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/github-repositories-app.git
   ```
2. Navigate to the project directory:

    ```bash
    cd github-repositories-app
    ````

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Obtain a GitHub Personal Access Token:

- Go to the GitHub Settings page.
- Generate a new personal access token with the repo scope.
- Copy the access token.
5. Create a .env file in the project root directory and add the following line:

    ```.env
    REACT_APP_ACCESS_TOKEN=YOUR_GITHUB_TOKEN

    Replace `YOUR_GITHUB_TOKEN` with the access token you generated.
    ```

6. Start the development server:

    ```bash
    npm start
    ```

7. Open your browser and visit http://localhost:3000 to see the app in action.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.
```
Note: It's important to include instructions on how to obtain a GitHub Personal Access Token and add it to the `.env` file so that users can authenticate with the GitHub GraphQL API.
```