<h1 align="center">todos</h1>

This ToDo List API allows you to manage your tasks efficiently by providing basic CRUD (Create, Read, Update, Delete) operations. With this API, you can easily create, retrieve, update, and delete tasks in your ToDo list application.

## Authors

- [@bayuaria33](https://github.com/bayuaria33)

## Built with

- NodeJS
- ExpressJS
- PostgreSQL

## Packages used

- "argon2": "^0.30.3"
- "cors": "^2.8.5"
- "dotenv": "^16.0.3"
- "express": "^4.18.2"
- "helmet": "^6.0.1"
- "jsonwebtoken": "^9.0.0"
- "pg": "^8.9.0"
- "uuid": "^9.0.0"
- "xss-clean": "^0.1.1"
- "morgan": "^1.10.0"
## Features

- User authentication, authorization
- CRUD Todos
- HTTP logging

## .env example

```
DB_USER=
DB_PASS=
DB_PORT=
DB_HOST=
DB_NAME=

JWT_ACCESS_KEY=

BASE_URL=
PORT=
```

## Usage

<details>
<summary>Show Endpoints</summary>

- **/GET/todos/my-todo** - Retrieve users todos
- **/POST/todos/add** - Insert todo
- **/PUT/todos/:id** - Update todo
- **/PUT/todos/complete/:id** - Set todo status to completed
- **/DELETE/todos/:id**- Delete todo

- **/POST/users/register** - Register new user
- **/POST/users/login** - User login


</details>

<br></br>

## Examples

<details>
<summary>Show Examples</summary>

## Create a Todo

```
POST/todos/add
{
    "title":"Buy Groceries",
    "description":"Milk, eggs, bread"
}
```

## Update a Todo

```
POST/todos/add
{
    "title":"Buy Groceries",
    "description":"Milk, eggs, bread"
}
```

## Register

```
POST/users/register
{
  "fullname":"Budi Pratama",
  "email":"budi123@email.id",
  "password":"123"
}
```

## Login

```
POST/users/login
{
  "email":"budi123@email.id",
  "password":"123"
}
```
</details>