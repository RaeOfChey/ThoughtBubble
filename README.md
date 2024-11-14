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
7. [Walkthrough](#walkthrough)
8. [License](#license)
9. [Contributing](#contributing)
10. [Tests](#tests)
11. [Questions](#questions)

## Description
ThoughtBubble is a social networking API designed for sharing thoughts, reacting to posts, and building a friend list. Created with Express.js, MongoDB, and Mongoose, this project enables full CRUD operations for users, thoughts, reactions, and friend lists. The API is built with a flexible NoSQL database to handle large, unstructured data efficiently, making it ideal for social media applications. All routes can be tested and demonstrated using Insomnia.

<img width="640" alt="Module 17 Challenge Screenshot - POST Create a User" src="https://github.com/user-attachments/assets/aadcdf50-bc99-4ca0-9ac8-639be402cc43">

Example of adding a new user using a POST request

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

<img width="640" alt="Module 17 Challenge Screenshot - GET Single Thought by ID" src="https://github.com/user-attachments/assets/7a87fe71-38d4-443e-8a96-2b7c496549bc">

Example of viewing a thought by ID using a GET request

<img width="640" alt="Module 17 Challenge Screenshot - DELETE Remove a friend" src="https://github.com/user-attachments/assets/2400e484-2282-43ea-8a4b-415a133f3d01">

Example of deleting a user by ID using a DELETE request

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

## Walkthrough
A complete walkthrough video demonstrating the application, its functionality, and the process of invoking it from Insomnia can be found at the following link: https://drive.google.com/file/d/1_kgtRCab9nvo43mwGyXLhai7EfQ3DOF-/view?usp=sharing

## License
This project is licensed under the MIT License, which allows you to freely use, modify, and distribute this software, provided proper attribution is given.

## Contributing
This project is part of a coding bootcamp assignment and is not open for contributions. To comply with the course requirements, I must complete this project individually without outside assistance. Therefore, pull requests, issues, or other contributions will not be accepted. Thank you for understanding!

## Tests
Currently, this project does not have any automated tests.

## Questions
If you have any questions about the repository, feel free to reach out by opening an issue or contacting me directly at cheyennaraelynn@gmail.com You can also find more of my work on GitHub at https://github.com/RaeOfChey.
