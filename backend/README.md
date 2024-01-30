# API Endpoints

## User

### Signup: Create a new user
hello world

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