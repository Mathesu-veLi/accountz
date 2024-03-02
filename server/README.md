
## API Reference

### User

#### Create user

```http
  POST /users
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `body`    | `object` | **Required**. User data |


```typescript
{
    "name": string,
    "email": string,
    "password": string
}
```


| Response  |  Description                                                                                                        |
| :------------------- | :------------------------------------------------------------------ |
| `400 Bad Request` | Your body doesn't meet the requirements *(see message array)* |
| `409 Conflict`    | User already registered                                                                           |

#### Get all users

```http
  GET /users
```


#### Get user

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

| Response        | Description     |
| :-------------- | :-------------- |
| `404 Not Found` | User not exists |

#### Update user

```http
  PATCH /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

| Response           | Description                             |
| :----------------- | :-------------------------------------- |
| `404 Not Found`    | User not exists                         |
| `401 Unauthorized` | Unauthorized route due to lack of token |


#### Delete user

```http
  DELETE /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |


| Response           | Description                             |
| :----------------- | :-------------------------------------- |
| `404 Not Found`    | User not exists                         |
| `401 Unauthorized` | Unauthorized route due to lack of token |

### Token

#### Create Token

```http
  POST /token
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body`    | `object` | **Required**. User data |

```typescript
{
    "email": string,
    "password": string
}
```

| Response  |  Description                                                                                                        |
| :------------------- | :------------------------------------------------------------------ |
| `400 Bad Request` | Your body doesn't meet the requirements *(see message array)* |
| `404 Not Found`    | User not exists                         |
| `401 Unauthorized` | Incorrect password |


### Account

#### Save account

```http
  POST /accounts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body`    | `object` | **Required**. Account data |


```typescript
{
    "website": string,
    "websiteUrl": string,
    "username": string,
    "email": string,
    "password": string
}
```


| Response          | Description                |
| :---------------- | :------------------------- |
| `409 Conflict`    | Account already registered |

#### Get all accounts

```http
  GET /accounts
```


#### Get account

```http
  GET /accounts/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of account to fetch |

| Response        | Description        |
| :-------------- | :----------------- |
| `404 Not Found` | Account not exists |

#### Update account

```http
  PATCH /accounts/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of account to fetch |

| Response        | Description        |
| :-------------- | :----------------- |
| `404 Not Found` | Account not exists |


#### Delete account

```http
  DELETE /accounts/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of account to fetch |

| Response        | Description        |
| :-------------- | :----------------- |
| `404 Not Found` | Account not exists |
