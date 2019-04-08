# stack-api
“STACK” is a backend API which is aim to develop for manage users in a school website. 


Installing and Running the server:
npm install
nodemon index.js
API Endpoints:
User Login:
URL: http://localhost:8080/auth/login
Method: POST
Headers:
Content-Type: application/json
Body:
{
"username": "kithmi",
"password": "1234"
}
User Registration:
URL: http://localhost:8080/auth/register
Method: POST
Headers:
Content-Type: application/json
Body:
{
"title": "Ms",
"username": "k",
"password": "189","firstname": "kithmi",
"lastname": "ranaweera",
"enableflag": 1
} L
ogout User:
URL: http://localhost:8080/auth/logout
Method: POST
Retrieve all data of users:
URL: http://localhost:8080/auth/register
Method: POST
Headers:
Content-Type: application/json
Authorization: Bearer <token>
Body:
{
"title": "Ms",
"username": "kithmi123",
"password": "123",
"firstname": "Kithmi",
"lastname": "Ranaweera",
"enableflag": 1
}Edit User Details:
URL: http://localhost:8080/users/5c9f53df8ac39d2d1421dade
Method: PUT
Headers:
Content-Type: application/json
Authorization: Bearer <token>
Body:
{
"title": "Ms",
"username": "k",
"password": "189",
"firstname": "kithmi",
"lastname": "ranaweera",
"enableflag": 1
}
User Delete:
URL: http://localhost:8080/users/5c9f53df8ac39d2d1421dade
Method: DELETE
Headers:
Content-Type: application/json
Authorization: Bearer <token>Reset Password:
URL: http://localhost:8080/auth/resetpassword
Method: POST
Headers:
Content-Type: application/json
Body:
{
"username":"kithmi",
"old_password":"4321",
"new_password":"1234"
}
Check Username existence:
URL: http://localhost:8080/auth/checkusername
Method: POST
Headers:
Content-Type: application/json
Body:
{
"username": "abc"
} C
reate a new post:
URL: http://localhost:8080/auth/checkusername
Method: POST
Headers:
Content-Type: application/json
Authorization: Bearer <token>Body:
{
"title": "title",
"content": "content",
"categoryID": "1",
"remarks": "example",
"publish": true
}
Edit post:
URL: http://localhost:8080/posts/5caa38305e94e62c2c11302a
Method: PUT
Headers:
Content-Type: application/json
Authorization: Bearer <token>
Body:
{
"title": "title",
"content": "content",
"categoryID": "1",
"remarks": "example2",
"publish": true
}Delete post:
URL: http://localhost:8080/posts/5caa1cce81d1d41b44f1e1c0
Method: DELETE
Headers:
Content-Type: application/json
Authorization: Bearer <token>
