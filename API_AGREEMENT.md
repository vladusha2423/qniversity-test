## Common format

API agreement:

1. All requests and responses are being processed in JSON
1. Each response containes normalized lists of models
1. API should conform REST specifications
1. Errors have unified format
1. HTTP status codes
1. Authorization
1. Other agreements

## 1. Handling JSON

Each request, except of sending files, will contain this header: `Content-type: application/json`

## 2. Normalization and response format

Each response has unified format and contains 2 fileds - data and meta. Data contains model lists and meta - some additional information about response.

```json
{
  "data": {...},
  "meta": {...}
}
```

Normalization is about returning lists with plain objects of one nesting level. That means, that child models are extracted to their own lists, replacing model objects with their ids. For example:

```json
{
  "data": {
    "modulesList": [
      {
        "moduleId": 123,
        "title": "Some module",
        "description": "Some module description",
        "chapters": [12, 13]
      },
      {
        "moduleId": 124,
        "title": "Some module",
        "description": "Some module description",
        "chapters": [12, 14]
      }
    ],
    "chaptersList": [
      {
        "chapterId": 12,
        "type": "text",
        "content": "Some content"
      },
      {
        "chapterId": 13,
        "type": "task",
        "content": "Some other content"
      },
      {
        "chapterId": 14,
        "type": "task",
        "content": "Some other content"
      }
    ]
  },
  "meta": {}
}
```

## 3. REST-like API schema

Api consists of a set of domains represented by pathnames (e.g. `/users` for Users domain). Domains are commonly used to manipulate models.

Lets consider `Modules` domain.

### 3.1 CRUD operations

#### 3.1.1 To get a list of modules (READ)

- Request:
  ```
  GET /modules?query=""&limit=10&offset=20
  ```
- Response:
  ```json
  {
    "data": {
      "modulesList": [
        {
          "moduleId": 123,
          "title": "Some module",
          "description": "Some module description",
          "chapters": [12, 13]
        },
        {
          "moduleId": 124,
          "title": "Some module",
          "description": "Some module description",
          "chapters": [12, 14]
        }
      ],
      "chaptersList": [
        {
          "chapterId": 12,
          "type": "text",
          "content": "Some content"
        },
        {
          "chapterId": 13,
          "type": "task",
          "content": "Some other content"
        },
        {
          "chapterId": 14,
          "type": "task",
          "content": "Some other content"
        }
      ]
    },
    "meta": {
      "count": 125,
      "limit": 10,
      "offset": 20
    }
  }
  ```

There are 3 commonly used GET parameters:

- query - search query string
- limit - maximal amount of entities for current response
- offset - offset from start of the entities set

Other parameters are considered to be custom filters for current request.

#### 3.1.2 To get single module (READ)

- Request:
  ```
  GET /modules/1256
  ```
- Response:

  ```json
  {
    "data": {
      "modulesList": [
        {
          "moduleId": 123,
          "title": "Some module",
          "description": "Some module description",
          "chapters": [34]
        }
      ],
      "chaptersList": [
        {
          "chapterId": 34,
          "type": "task",
          "content": "Some other content"
        }
      ]
    },
    "meta": {}
  }
  ```

#### 3.1.3 To create module (CREATE)

- Request:
  ```
  POST /modules
  ```
  ```json
  {
    "title": "some title",
    "description": "some description",
    "chapters": [12, 13, 14]
  }
  ```
- Response:
  ```json
  {
    "data": {
      "modulesList": [
        {
          "moduleId": 2342,
          "title": "some title",
          "description": "some description",
          "chapters": [12, 13, 14]
        }
      ],
      "chaptersList": [...]
    },
    "meta": {}
  }
  ```

#### 3.1.4 To update module (UPDATE)

- Request:
  ```
  PUT /modules/529
  ```
  ```json
  {
    "title": "new title"
  }
  ```
- Response:
  ```json
  {
    "data": {
      "modulesList": [
        {
          "moduleId": 529,
          "title": "new title",
          "description": "some description",
          "chapters": [12, 13, 14]
        }
      ],
      "chaptersList": [...]
    },
    "meta": {}
  }
  ```

#### 3.1.5 To delete single module (DELETE)

- Request:
  ```
  DELETE /modules/34
  ```
- Response:
  ```
  HTTP 200
  ```

#### 3.1.6 To delete list of modules (DELETE)

- Request:
  ```
  DELETE /modules?moduleId[]=12&moduleId[]=13
  ```
- Response:
  ```
  HTTP 200
  ```

### 3.2 Other operations

#### 3.2.1 Actions

When we need to proceed some actions with entities, we should run POST request, specifying action name after domain name. Within body we should transfer data, required for action to proceed.

```
POST /modules/subscribe
POST /modules/234/unsubscribe
```

#### 3.2.2 Child entities (needs discussion)

Normally response should include child entities for one level deep (e.g. all child entities, such as chapters, for requested modules). But if there is considered to be too much child entities, they are not returned within the response. In such a case meta object should contain corresponding info (this moment needs discussion). And then frontend could request child entities by sending request to corresponding domain, specifing parent id as filtering option.

## 4. Errors format

In case of error occured on backend, API should return corresponding http status code and error object, that contains errorCode, errorMessage and meta field. Normally meta field is an object, that contains additional info about error. If there is validation error, there could be a list of fields and errors for them.

A list of `errorCodes` is formed by backend developer and then hardcoded on frontend side in order to differentiate error types.

```json
{
  "errorCode": 30,
  "errorMessage": "Some common message",
  "meta": {
    "fields": [{ "field": "name", "error": "Wrong name" }]
  }
}
```

## 5. HTTP status codes

- 200 - successful response
- 400 - bad request (validation error or missing data)
- 401 - authorization error
- 404 - not found requested endpoint
- 500 - server error

## 6. Authorization (needs discussion)

Authentication and authorization uses JWT. There is an example of auth with JWT:
<https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc>

On each request, except for public endpoints, there will be transferred `Authorization` header with content `Bearer _access_token_`.

## 7. Other agreements

- All dates are returned as UNIX timestamps within GMT timezone
- Default value for any field is `null`
