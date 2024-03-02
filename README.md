Project Name: Libary 

Overview

Libary is a web application that allows users to explore a curated collection of books sourced from Amazon via Kaggle. Users can view details about each book, and select favorites. The project is built using React and Tailwind CSS for the frontend, Express.js for the backend, MySQL as the database, and Prisma to facilitate CRUD operations. User authentication and authorization ensure a personalized experience.

Features

Book Catalog: Browse through a diverse catalog of books with detailed information sourced from Amazon.<br/>
User Accounts: Every user must create an account to access the full features of the application.<br/>
Authentication and Authorization: Secure user authentication and authorization mechanisms to protect user data and ensure a personalized experience.<br/>
Favorite book: Users can select their favorite books.<br/>
CRUD Operations: Utilizing Prisma and MySQL for efficient CRUD operations on the book data.<br/>

Tech Stack

Frontend:<br/>
React: A JavaScript library for building user interfaces.<br/>
Tailwind CSS: A utility-first CSS framework for rapid UI development.<br/>

Backend:
Express.js: A web application framework for Node.js, providing a robust set of features.<br/>

Database:<br/>

MySQL: A relational database management system.<br/>

Prisma: A modern database toolkit for Node.js and TypeScript, simplifying database access and operations.<br/>

### **Prerequisites**
**Node.js via Installer**

Download the installer directly through Node.js website: **[Node.js](https://nodejs.org/en/download)**

### **Setup**

**clone the repository**

`git clone https://github.com/MOHAMMAD-ALSUBAIE/Darb-AI.git`

#### **client setup:**

**navigate to repository**

**install dependencies**

`npm install`

**start client**

`npm run dev`

#### **server setup:**

**navigate to repository**

`cd Backend`</br>
`npm install`

**change the name of envExample to .env**</br>
`All the instructions needed to configure the connection to your database can be found in the 'envExample'`

**Migrate the migration folder to your database**</br>
`npx prisma migrate dev`</br>
**Import the Books CSV file into the 'books' table in your database, which you can find inside the BooksCSV folder.**</br>
**Avoid adding the 'SBN' variable to the 'books' table**</br>


![image](https://github.com/MOHAMMAD-ALSUBAIE/Libary/assets/68867495/6a20de44-2605-4def-9fd1-60b21bf7b163)


#### **start the server**
####  `npm run tsc`
Acknowledgments

Data sourced from Kaggle.
Feel free to explore, and enjoy your Library  experience!
