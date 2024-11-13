## ThoughtBubble

### Status: In Progress

![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Tools and Technologies](#tools-and-technologies)
6. [Dependencies and Installs](#dependencies-and-installs)
7. [License](#license)
8. [Contributing](#contributing)
9. [Tests](#tests)
10. [Questions](#questions)

## Description
ThoughtBubble is a social networking API designed for sharing thoughts, reacting to posts, and building a friend list. Created with Express.js, MongoDB, and Mongoose, this project enables full CRUD operations for users, thoughts, reactions, and friend lists. The API is built with a flexible NoSQL database to handle large, unstructured data efficiently, making it ideal for social media applications. All routes can be tested and demonstrated using Insomnia.

## Features
- RESTful API for social networking functions.
- CRUD operations for:
  - Users: Create, update, and delete users, including friend lists.
  - Thoughts: Post, update, and delete thoughts shared by users.
  - Reactions: Add and remove reactions to thoughts.
  - Friends: Add or remove friends to a user's friend list.
- Virtual fields for:
  - Friend Count: Counts and displays the number of friends a user has.
  - Reaction Count: Shows the number of reactions each thought has.
- Timestamps on thoughts and reactions, formatted using getter methods.

## Installation
To use the application, follow these steps:

- Step 1: Clone the repository.
- Step 2: Navigate to the project directory by typing `cd thought-bubble`.
- Step 3: Install the required dependencies by running `npm install`.

## Usage
To start the application, run the following command: `npm start`.

Test API routes in Insomnia or a similar tool to verify functionality.
- Users Routes: Create, view, update, and delete users.
- Thoughts Routes: Add, view, update, and delete thoughts.
- Reactions Routes: Add and remove reactions to thoughts.
- Friends Routes: Add and remove friends from a user's friend list.

## Tools and Technologies
**Programming Language**:
- TypeScript

**Libraries & Frameworks**:
- Express.js
- MongoDB
- Mongoose

**Development Environment**:
  - Node.js

## Dependencies and Installs

**NPM Packages**:
- `express` - Handles server-side routing and API requests.
- `mongoose` -  ODM for MongoDB, manages schema and model setup.
- `dotenv` - Loads environment variables from a .env file.

## License
This project is licensed under the MIT License, which allows you to freely use, modify, and distribute this software, provided proper attribution is given.

## Contributing
This project is part of a coding bootcamp assignment and is not open for contributions. To comply with the course requirements, I must complete this project individually without outside assistance. Therefore, pull requests, issues, or other contributions will not be accepted. Thank you for understanding!

## Tests
Currently, this project does not have any automated tests.

## Questions
If you have any questions about the repository, feel free to reach out by opening an issue or contacting me directly at cheyennaraelynn@gmail.com You can also find more of my work on GitHub at https://github.com/RaeOfChey.
