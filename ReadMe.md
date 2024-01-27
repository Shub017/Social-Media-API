**Social Media Backend REST-API Overview**

This project is a robust social media backend REST API designed to empower users in various aspects such as posting, commenting, liking, sending friend requests, and resetting passwords using OTP for enhanced security. The implementation utilizes Node.js, ExpressJS, and MongoDB for efficient data handling and routing control.

**Table of Contents**
1. Features
2. Installation
3. Usage
4. API Endpoints
5. Contributing
6. License

**Features**

- **RESTful Architecture:**
  - Developed using Node.js, ExpressJS, and MongoDB for efficient data handling and routing control.


- **Code Modularity:**
  - Organized code using ES6 Modules for maintainability and modularity.


- **User Authentication:**
  - Implemented a user authentication system with features like signup, login, and logout.
  - Advanced feature: Ability to log out from all devices by storing each login token in an additional array field within the user's document.
  - Registration includes user details such as name, email, password, and gender.


- **Post Management:**
  - CRUD operations for posts, including fields like caption and an image URL.
  - Each post references the user who created it.
  - Posts can be updated or deleted only by the post owner.


- **Comment System:**
  - Developed a comment system that allows users to add, update, and delete comments on posts.
  - Comments can be updated or deleted only by the post owner or the commenter.


- **Like Functionality:**
  - Implemented a like system for posts using MongoDB and population of documents.
  - Display counts of likes and comments on posts.
  - Populate user information (id, name, and email) for likes, comments, and posts.


- **Friendship Features:**
  - Implemented a friendship system with features like getting user friends, managing pending friend requests, toggling friendships, and accepting/rejecting friend requests.


- **User Profile Updates:**
  - Enabled users to update their profiles, including fields like name, gender, or avatar.
  - Implemented avatar uploads for user profiles.


- **OTP-Based Password Reset:**
  - Implemented OTP-based password reset feature using controllers, models, and repositories.
  - Used the Nodemailer library for email communication.
