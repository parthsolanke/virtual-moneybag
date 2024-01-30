# API Endpoints

## User

### Signup: Create a new user
Used ZOD for request body schema validation, JWT and mongoose to connect to database create User model and save data to database along with bcrypt to hash password.

**POST** `/api/v1/user/signup`

**Request Body**

```json
{
    "username": "email",
    "password": "password",
    "firstName": "firstName",
    "lastName": "lastName"
}
```

**Response**

```json
{
    "message": "User created successfully",
    "token": "JWT token"
}
```

note: At the time of signup Account is created with random balance between 1000 to 10000 and the account table is connected to user table with one to one relationship.

### Signin: Login user
Used ZOD for request body schema validation, JWT for authentication and mongoose to connect to database create User model and save data to database along with bcrypt to hash password.

**POST** `/api/v1/user/signin`

**Request Body**

```json
{
    "username": "email",
    "password": "password"
}
```

**Response**

```json
{
    "message": "User signed in successfully",
    "token": "JWT token"
}
```

### User metadata update
ZOD for request schema validation, JWT for authentication and mongoose to connect to database and update user data.

**PUT** `/api/v1/user/update`

**Request Body**

```json
{
    "firstName": "firstName",
    "lastName": "lastName"
}
```

**Request Headeres**

Authorization: Bearer <JWT token>

**Response**

```json
{
    "message": "User updated successfully"
}
```

### Update user password
ZOD for request schema validation, JWT for authentication and mongoose to connect to database and update user password and bcrypt to hash password.

**PUT** `/api/v1/user/update/password`
