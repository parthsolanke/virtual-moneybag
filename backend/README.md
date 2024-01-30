# API Documentation

This repository contains the API documentation for a digital wallet system designed for user transactions. Below are the details of various endpoints available in the API.

## User

### Signup: Create a new user

Create a new user account with the provided information.

- **URL:** `/api/v1/user/signup`
- **Method:** `POST`
- **Request Body:**
  
  ```json
  {
      "username": "email",
      "password": "password",
      "firstName": "firstName",
      "lastName": "lastName"
  }
  ```

- **Response:**

  ```json
  {
      "message": "User created successfully",
      "token": "JWT token"
  }
  ```

  - Note: During signup, an account is created with a random balance between 1000 to 10000, and the account is linked to the user with a one-to-one relationship.

### Signin: Login user

Authenticate and login a user with the provided credentials.

- **URL:** `/api/v1/user/signin`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
      "username": "email",
      "password": "password"
  }
  ```

- **Response:**

  ```json
  {
      "message": "User signed in successfully",
      "token": "JWT token"
  }
  ```

### User metadata update

Update user metadata with the specified information.

- **URL:** `/api/v1/user/update`
- **Method:** `PUT`
- **Request Body:**

  ```json
  {
      "firstName": "firstName",
      "lastName": "lastName"
  }
  ```

- **Request Headers:**

  - Authorization: Bearer JWT-token

- **Response:**

  ```json
  {
      "message": "User updated successfully"
  }
  ```

### Update user password

Update the user password.

- **URL:** `/api/v1/user/update/password`
- **Method:** `PUT`
- **Request Body:**

  ```json
  {
      "oldPassword": "oldPassword",
      "newPassword": "newPassword"
  }
  ```

- **Request Headers:**

  - Authorization: Bearer JWT-token

- **Response:**

  ```json
  {
      "message": "Password updated successfully"
  }
  ```

### Get Users by filter

Retrieve users based on specified filters.

- **URL:** `/api/v1/user/bulk?filter=filter`
- **Method:** `GET`
- **Query Params:** filter="" || filter=firstName || filter=lastName || filter=username

- **Request Headers:**

  - Authorization: Bearer JWT-token

- **Response:**

  ```json
  {
      "users": [
          {
              "_id": "id",
              "username": "email",
              "firstName": "firstName",
              "lastName": "lastName"
          }
      ]
  }
  ```

  - Note: Filter search is non-case sensitive.