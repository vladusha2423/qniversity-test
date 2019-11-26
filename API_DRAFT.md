# Domains listing

### User profile

- Accessible by `/users` domain
- List name - `userList`
- Common entity structure:
  ```json
  {
    "userId": 100,
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "email": "ivan@mail.ru"
  }
  ```

### Session

Normally is returned by auth requests

- Accessible by `/security` domain
- List name - `sessionList`
- Common entity structure:
  ```json
  {
    "sessionId": 100,
    "userId": 1,
    "accessToken": "_token_",
    "refreshToken": "_token_",
    "expiresIn": 345345534
  }
  ```

### User subscription

This entity serves as a connection between user and subscription type (per month/all at once).
According to this connection system knows, which modules were bought and to which user has access.
The connection between user and subscription type is m-2-m for future development, when there will be more than one course.

- Accessible by `/user-subscriptions` domain
- List name - `userSubscriptionList`
- Common entity structure:
  ```json
  {
    "userSubscriptionId": 100,
    "status": "active", // active, canceled, fulfilled (all modules purchased)
    "dateNextPayment": 245345234346,
    "modules": [12, 14, 54]
  }
  ```

### Module

- Accessible by `/modules` domain
- List name - `moduleList`
- Common entity structure:
  ```json
  {
    "moduleId": 100,
    "title": "Module 1",
    "description": "Awesome module",
    "chapters": [12, 45, 76],
    "chaptersCount": 3,
    "chaptersPassed": 1,
    "nextChapter": 45,
    "isPurchased": true,
    "isCompleted": false
  }
  ```

### Chapter

- Accessible by `/chapters` domain
- List name - `chapterList`
- Common entity structure:
  ```json
  {
    "chapterId": 100,
    "title": "Chapter 1",
    "fragments": [12, 45, 65],
    "fragmentsCount": 6,
    "fragmentsPassed": 1,
    "nextFragment": 2,
    "isCompleted": false
  }
  ```
- Completed chapter structure:
  ```json
  {
    "chapterId": 100,
    "title": "Chapter 1",
    "fragments": [12, 45, 65],
    "fragmentsCount": 6,
    "fragmentsPassed": 1,
    "nextFragment": 2,
    "isCompleted": true,
    "interestingRate": 3,
    "usefulRate": 4,
    "feedback": "Some user feedback"
  }
  ```

### Fragment

- Accessible by `/fragments` domain
- List name - `fragmentList`
- Common entity structure:
  ```json
  {
    "fragmentId": 100,
    "type": "text", // text, subtitle, task,
    "content": "Some content",
    "character": 234,
    "useUserCharacter": false,
    "isCompleted": false
  }
  ```
- Entity structure for `subtitle` type
  ```json
  {
    "fragmentId": 100,
    "type": "subtitle",
    "content": "Some content"
  }
  ```
- Entity structure for `task` type
  ```json
  {
    "fragmentId": 100,
    "type": "task",
    "content": "Some content",
    "character": null,
    "useUserCharacter": false,
    "isCompleted": false,
    "taskResult": null, // See task result entity
    "taskResponse": null, // See task response entity
    "taskType": "text" // select_single, select_multiple, text, long_text
  }
  ```
- Entity structure for `task` fragment type and `select_*` task type
  ```json
  {
    "fragmentId": 100,
    "type": "task",
    "content": "Some content",
    "character": null,
    "useUserCharacter": false,
    "isCompleted": true,
    "taskResult": 1, // See task result entity
    "taskResponse": null, // See task response entity
    "taskType": "text", // select_single, select_multiple, text, long_text
    "taskOptions": [12, 14],
    "selectedTaskOptions": [12]
  }
  ```

### Character

- List name - `characterList`
- Common entity structure:
  ```json
  {
    "characterId": 100,
    "avatar": "avatar_url", // nullable
    "firstName": "Ivan",
    "lastName": "Ivanov"
  }
  ```

### Task option (for select_single and select_multiple)

- List name - `taskOptionList`
- Common entity structure:
  ```json
  {
    "taskOptionId": 100,
    "content": "option 2"
  }
  ```

### Task response (as user response for `text` and `long_text` or as a response (explanation) for `select_single` and `select_multiple`)

- List name - `taskResponseList`
- Common entity structure:
  ```json
  {
    "taskResponseId": 100,
    "content": "Some user response"
  }
  ```

### Task result

- List name - `taskResultList`
- Common entity structure:
  ```json
  {
    "taskResultId": 100,
    "content": "Some content, describing task result",
    "isCorrect": true
  }
  ```

### Certificate

- Accessible by `/certificates` domain
- List name - `certificateList`
- Common entity structure:
  ```json
  {
    "certificateId": 100,
    "dateCreated": 123534535,
    "module": 56
  }
  ```

# Endpoints list

All endpoints, except listed below require `Authorization` header with access token.

- /security/login
- /security/register
- /security/restore

## 1. Security

### 1.1 Registration

- Request

  ```
  POST /security/register
  ```

  ```json
  {
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "email": "ivan@mail.ru",
    "password": "iVaNtHeBeSt3000"
  }
  ```

- Response
  ```json
  {
    "data": {
      "userList": [
        {
          "userId": 1,
          "firstName": "Ivan",
          "lastName": "Ivanov",
          "email": "ivan@mail.ru"
        }
      ],
      "sessionList": [
        {
          "sessionId": 100,
          "userId": 1,
          "accessToken": "_token_",
          "refreshToken": "_token_",
          "expiresIn": 345345534
        }
      ]
    },
    "meta": {}
  }
  ```

### 1.2 Authorization

- Request

  ```
  POST /security/login
  ```

  ```json
  {
    "email": "ivan@mail.ru",
    "password": "iVaNtHeBeSt3000"
  }
  ```

- Response
  ```json
  {
    "data": {
      "userList": [
        {
          "userId": 1,
          "firstName": "Ivan",
          "lastName": "Ivanov",
          "email": "ivan@mail.ru"
        }
      ],
      "sessionList": [
        {
          "sessionId": 100,
          "userId": 1,
          "accessToken": "_token_",
          "refreshToken": "_token_",
          "expiresIn": 345345534
        }
      ]
    },
    "meta": {}
  }
  ```

### 1.3 Reset password

- Request

  ```
  POST /security/restore
  ```

  ```json
  {
    "email": "ivan@mail.ru"
  }
  ```

- Response

  ```
  HTTP 200
  ```

### 1.4 Logout

- Request

  ```
  POST /security/logout
  ```

- Response
  ```
  HTTP 200
  ```

### 1.5 Refresh token

- Request

  ```
  POST /security/refresh
  ```

  ```json
  {
    "refreshToken": "_token_"
  }
  ```

- Response
  ```json
  {
    "data": {
      "sessionList": [
        {
          "sessionId": 100,
          "userId": 1,
          "accessToken": "_token_",
          "refreshToken": "_token_",
          "expiresIn": 345345534
        }
      ]
    },
    "meta": {}
  }
  ```

## 2. Payment

### 2.1 Successful subscription payment (NEEDS DISCUSSION!!!)

Serves for subscription payment as well as subscription renewal (after cancel). Within the request we select a subscription type to buy (per month/all).

- Request

  ```
  POST /user-subscriptions/buy
  ```

  ```json
  {
    "type": "module" // module, all
  }
  ```

  If `module` - next module will be added to subscription
  If `all` - all remaining modules will be added to subscription

- Response

  ```json
  {
    "data": {
      "userSubscriptionList": [
        {
          "userSubscriptionId": 100,
          "status": "active",
          "dateNextPayment": 245345234346,
          "modules": [12, 14, 54]
        }
      ]
    },
    "meta": {}
  }
  ```

### 2.2 Get user subscription

- Request

  ```
  GET /user-subscriptions
  ```

- Response
  ```json
  {
    "data": {
      "userSubscriptionList": [
        {
          "userSubscriptionId": 100,
          "status": "active",
          "dateNextPayment": 245345234346,
          "modules": [12, 14, 54]
        }
      ],
      "modulesList": [
        {
          "moduleId": 12,
          "title": "Module 1",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "isPurchased": true,
          "isCompleted": true
        },
        {
          "moduleId": 14,
          "title": "Module 1",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "isPurchased": true,
          "isCompleted": true
        },
        {
          "moduleId": 54,
          "title": "Module 1",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "isPurchased": true,
          "isCompleted": false
        }
      ]
    },
    "meta": {}
  }
  ```

### 2.3 Cancel subscription

- Request

  ```
  POST /user-subscriptions/100/cancel
  ```

  ```json
  {
    "reason": "Some reason"
  }
  ```

- Response
  ```json
  {
    "data": {
      "userSubscriptionList": [
        {
          "userSubscriptionId": 100,
          "status": "canceled",
          "dateNextPayment": 245345234346,
          "modules": [12, 14, 54]
        }
      ]
    },
    "meta": {}
  }
  ```

### 2.4 Subscription quiz

- Request

  ```
  POST /user/subscription/1/quiz
  ```

  ```json
  {
    "company": "Apple",
    "position": "CEO",
    "howDidYouLearnAboutCourse": "Some text here",
    "studyObjective": "Some text here too"
  }
  ```

- Response

## 3. Learning

### 3.1 Get course modules

- Request

  ```
  GET /modules
  ```

- Response
  ```json
  {
    "data": {
      "moduleList": [
        {
          "moduleId": 1,
          "title": "Module 1",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "chaptersCount": 3,
          "chaptersPassed": 1,
          "nextChapter": 45,
          "isPurchased": true,
          "isCompleted": false
        },
        {
          "moduleId": 2,
          "title": "Module 2",
          "description": "Awesome module",
          "chapters": [24],
          "chaptersCount": 1,
          "chaptersPassed": 0,
          "nextChapter": 24,
          "isPurchased": false,
          "isCompleted": false
        }
      ],
      "chaptersList": [
        {
          "chapterId": 12,
          "title": "Chapter 1",
          "fragments": [...],
          "isCompleted": false
        },
        {
          "chapterId": 45,
          "title": "Chapter 2",
          "fragments": [...],
          "isCompleted": false
        },
        {
          "chapterId": 76,
          "title": "Chapter 3",
          "fragments": [...],
          "isCompleted": false
        },
        {
          "chapterId": 24,
          "title": "Chapter 1",
          "fragments": [...],
          "isCompleted": false
        }
      ]
    },
    "meta": {}
  }
  ```

### 3.2 Get single module

- Request

  ```
  GET /modules/12
  ```

- Response
  ```json
  {
    "data": {
      "moduleList": [
        {
          "moduleId": 12,
          "title": "Module 1",
          "description": "Awesome module",
          "chapters": [12, 45],
          "chaptersCount": 2,
          "chaptersPassed": 1,
          "nextChapter": 45,
          "isPurchased": true,
          "isCompleted": false
        },
        {
          "moduleId": 2,
          "title": "Module 2",
          "description": "Awesome module",
          "chapters": [24],
          "chaptersCount": 1,
          "chaptersPassed": 0,
          "nextChapter": 24,
          "isPurchased": false,
          "isCompleted": false
        }
      ],
      "chaptersList": [
        {
          "chapterId": 12,
          "title": "Chapter 1",
          "fragments": [...],
          "isCompleted": false
        },
        {
          "chapterId": 45,
          "title": "Chapter 2",
          "fragments": [...],
          "isCompleted": false
        }
      ]
    },
    "meta": {}
  }
  ```

### 3.3 Get single chapter

- Request

  ```
  GET /chapters/123
  ```

- Response
  ```json
  {
    "data": {
      "chaptersList": [
        {
          "chapterId": 1,
          "title": "Chapter 1",
          "fragments": [1, 2, 3, 4, 5, 6],
          "fragmentsCount": 6,
          "fragmentsPassed": 2,
          "nextFragment": 2,
          "isCompleted": false
        }
      ],
      "fragmentList": [
        {
          "fragmentId": 1,
          "type": "text",
          "content": "Some content",
          "character": 234,
          "useUserCharacter": false,
          "isCompleted": true
        },
        {
          "fragmentId": 2,
          "type": "subtitle",
          "content": "Some subtitle"
        },
        {
          "fragmentId": 3,
          "type": "task",
          "content": "Some content",
          "character": null,
          "useUserCharacter": false,
          "taskType": "text",
          "taskResult": null,
          "isCompleted": false
        },
        {
          "fragmentId": 4,
          "type": "text",
          "content": "Some content",
          "character": null,
          "useUserCharacter": true,
          "taskResult": null,
          "isCompleted": false
        },
        {
          "fragmentId": 5,
          "type": "task",
          "content": "Some content",
          "character": null,
          "useUserCharacter": false,
          "taskResult": null,
          "taskType": "text",
          "isCompleted": false
        },
        {
          "fragmentId": 6,
          "type": "task",
          "content": "Some content",
          "character": null,
          "useUserCharacter": false,
          "taskResult": null,
          "taskType": "select_single",
          "taskOptions": [1, 2],
          "isCompleted": false,
          "selectedTaskOptions": []
        }
      ],
      "taskOptionList": [
        {
          "taskOptionId": 1,
          "content": "option 1"
        },
        {
          "taskOptionId": 2,
          "content": "option 2"
        }
      ],
      "characterList": [
        {
          "characterId": 234,
          "avatar": null,
          "firstName": "Ivan",
          "lastName": "Ivanov"
        }
      ]
    },
    "meta": {}
  }
  ```

### 3.4 Commit task

Fragment type should be `task`

- Request

  - For `text` and `long_text` task type

    ```
    POST /fragments/1/commit
    ```

    ```json
    {
      "text": "Some text"
    }
    ```

  - For `select_single` and `select_multiple` task type
    ```
    POST /fragments/1/commit
    ```
    ```json
    {
      "selected": [34, 45, 565, ...],
      "response": "Some explanation"
    }
    ```

- Response

  - For `text` and `long_text` task type

    ```json
    {
      "data": {
        "fragmentList": [
          {
            "fragmentId": 6,
            "type": "task",
            "content": "Some content",
            "character": null,
            "useUserCharacter": false,
            "taskResult": 345,
            "taskType": "text",
            "taskResponse": 33,
            "isCompleted": false
          }
        ],
        "taskResultList": [
          {
            "taskResultId": 345,
            "content": "Some content, describing task result",
            "isCorrect": true
          }
        ],
        "taskResponseList": [
          {
            "taskResponseId": 33,
            "content": "Some user response"
          }
        ]
      },
      "meta": {}
    }
    ```

  - For `select_single` and `select_multiple` task type
    ```json
    {
      "data": {
        "fragmentList": [
          {
            "fragmentId": 6,
            "type": "task",
            "content": "Some content",
            "character": null,
            "useUserCharacter": false,
            "taskResult": 345,
            "taskResponse": 33,
            "taskType": "select_single",
            "taskOptions": [1, 2],
            "isCompleted": false,
            "selectedTaskOptions": []
          }
        ],
        "taskResultList": [
          {
            "taskResultId": 345,
            "content": "Some content, describing task result",
            "isCorrect": true
          }
        ],
        "taskOptionList": [
          {
            "taskOptionId": 1,
            "content": "option 1"
          },
          {
            "taskOptionId": 2,
            "content": "option 2"
          }
        ],
        "taskResponseList": [
          {
            "taskResponseId": 33,
            "content": "Some user response"
          }
        ]
      },
      "meta": {}
    }
    ```

### 3.5 Finish chapter

- Request

  ```
  POST /chapters/1/finish
  ```

  ```json
  {
    "interestingRate": 3,
    "usefulRate": 4,
    "feedback": "Some user feedback"
  }
  ```

- Response

  ```json
  {
    "data": {
      "chapterList": [
        {
          "chapterId": 1,
          "title": "Chapter 1",
          "fragments": [1, 2, 3, 4, 5, 6],
          "fragmentsCount": 6,
          "fragmentsPassed": 2,
          "nextFragment": 2,
          "isCompleted": true
        }
      ]
    },
    "meta": {}
  }
  ```

## 4. Certificates

### 4.1 Get certificates list

- Request

  ```
  GET /certificates
  ```

- Response
  ```json
  {
    "data": {
      "certificateList": [
        {
          "certificateId": 1,
          "dateCreated": 123534535,
          "module": 2
        },
        {
          "certificateId": 2,
          "dateCreated": 123534535,
          "module": 3
        }
      ],
      "moduleList": [
        {
          "moduleId": 2,
          "title": "Module 2",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "chaptersCount": 3,
          "chaptersPassed": 1,
          "nextChapter": 45,
          "isPurchased": true,
          "isCompleted": false
        },
        {
          "moduleId": 3,
          "title": "Module 3",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "chaptersCount": 3,
          "chaptersPassed": 1,
          "nextChapter": 45,
          "isPurchased": true,
          "isCompleted": false
        }
      ]
    },
    "meta": {}
  }
  ```

### 4.2 Get single sertificate

- Request

  ```
  GET /certificates/1
  ```

- Response
  ```json
  {
    "data": {
      "certificateList": [
        {
          "certificateId": 1,
          "dateCreated": 123534535,
          "module": 2
        }
      ],
      "moduleList": [
        {
          "moduleId": 2,
          "title": "Module 2",
          "description": "Awesome module",
          "chapters": [12, 45, 76],
          "chaptersCount": 3,
          "chaptersPassed": 1,
          "nextChapter": 45,
          "isPurchased": true,
          "isCompleted": false
        }
      ]
    },
    "meta": {}
  }
  ```

## 5. Profile

### 5.1 Update profile info

All request fields are optional

- Request

  ```
  PUT /users/1
  ```

  ```json
  {
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "email": "ivan@mail.ru",
    "password": "new_password"
  }
  ```

- Response
  ```json
  {
    "data": {
      "userList": [
        {
          "userId": 100,
          "firstName": "Ivan",
          "lastName": "Ivanov",
          "email": "ivan@mail.ru"
        }
      ]
    },
    "meta": {}
  }
  ```
