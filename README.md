# URL Shortener

## Project Description
URL Shortener is a web application that allows users to shorten long URLs and keep track of their shortened URLs. It provides a simple and convenient way to generate shorter, more manageable URLs for sharing or storing.

## How to Run the Project
To run the project, follow these steps:
1. Clone the project repository.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the command: `npm install`
4. Start the server by running the command: `npm start`
5. Open your web browser and go to `http://localhost:3000` to access the URL Shortener application.

## Dependencies
This project requires the following dependencies:
- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- EJS: Templating engine for generating dynamic web pages
- MongoDB: NoSQL database for storing and retrieving data
- body-parser: Node.js body parsing middleware

You can install these dependencies by running `npm install` in the project directory. The package.json file already includes these dependencies, so they will be installed automatically.

## Internal Working
The URL Shortener application is built using Node.js and Express.js on the server-side, and it uses EJS as the templating engine for generating dynamic web pages. It utilizes a MongoDB database to store and retrieve the shortened URLs and their associated information.

When a user enters a long URL and clicks the "Shorten URL" button, the server generates a unique short code for the URL, stores it in the database along with the original URL and any notes provided by the user. The shortened URL is then displayed to the user.

When a user searches for a URL or notes in the search bar, the server queries the database for matching records and returns the results. Clicks on the shortened URLs are also tracked and stored in the database.

When a user clicks the "View Database" button, the server shows the table containing original URL, shortened URL, notes and clicks.

## Learning Takeaways
Working on this project helped me gain hands-on experience with building a web application using Node.js, Express.js, and MongoDB. I learned how to handle HTTP requests, implement routing, use a database for data storage, and generate dynamic HTML pages using EJS templating. Additionally, I learned about URL shortening techniques and basic web development concepts.

## Resources/References
- [Node.js Documentation](https://nodejs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- Online tutorials and code examples from various web development resources.

# Url-Shortener
