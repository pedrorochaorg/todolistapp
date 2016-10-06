define({ "api": [
  {
    "type": "get",
    "url": "/api",
    "title": "Status",
    "name": "Status",
    "description": "<p>Check API Activity status</p> ",
    "group": "API",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\": true,\n      \"message\": \"Doe\",\n      \"data\" : null\n    }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "API",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/todos",
    "title": "Add Todo",
    "name": "Add_Todo",
    "description": "<p>Add a new Todo to the database</p> ",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User id string format</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Task/Text string format</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Verde\"",
              "\"Vermelho\"",
              "\"Azul\""
            ],
            "optional": false,
            "field": "grupo",
            "description": "<p>a string that can contain the words &quot;Verde&quot;,&quot;Vermelho&quot; or &quot;Azul&quot;.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"All Went Fine!\",\n       \"data\": {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"user\": {\n                           \"id\": \"57d1845358c23f41a251e366\",\n                           \"username\": \"sampleuser\",\n                           \"grupo\": \"Verde\"\n                 },\n                 \"text\": \"Task description\",\n                 \"grupo\": \"Verde\",\n                 \"status\": true\n       }\n   }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Todos",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/todos/:todo_id",
    "title": "Delete Todo",
    "name": "Delete_Todo",
    "description": "<p>Delete an existing Todo</p> ",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todo_id",
            "description": "<p>Todo ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"Todo deleted!\",\n       \"data\": { }\n   }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Todos",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/todos/:todo_id",
    "title": "Get Todo",
    "name": "Get_Todo_By_ID",
    "description": "<p>Get Todo By ID</p> ",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todo_id",
            "description": "<p>Todo ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\": true,\n      \"message\": \"All Went Fine!\",\n      \"data\": {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"user\": \"57d1845358c23f41a251e366\",\n                 \"text\": \"Task description\",\n                 \"grupo\": \"Verde\",\n                 \"status\": true\n      }\n    }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Todos",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/todos",
    "title": "List Todos",
    "name": "List_Todos",
    "description": "<p>List all stored todos</p> ",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Filter results based on an user id string</p> "
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "grupo",
            "description": "<p>Filter the result set based on a list of Grupo&#39;s</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "p",
            "description": "<p>Set&#39;s the page from were to list resutls, defaults to page 1, to get all pages set this value to -1</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "itemsPerPage",
            "description": "<p>Set&#39;s the number of items to list in each page</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"All went fine!\",\n       \"data\": {\n         \"todos\": [\n           {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"user\": \"57d1845358c23f41a251e366\",\n                 \"text\": \"Task description\",\n                 \"grupo\": \"Verde\",\n                 \"status\": true\n           },\n           {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"user\": \"57d1845358c23f41a251e366\",\n                 \"text\": \"Task description\",\n                 \"grupo\": \"Verde\",\n                 \"status\": true\n           },\n           ....\n         ],\n         \"totalItems\": 2,\n         \"next\": null,\n         \"previous\": null,\n         \"numPages\": 1\n       }\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Todos",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/todos/:todo_id",
    "title": "Update Todo",
    "name": "Update_Todo",
    "description": "<p>Update an existing Todo</p> ",
    "group": "Todos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Task/Text string format</p> "
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Todo Status</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"Todo updated!\",\n       \"data\": {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"user\": \"57d1845358c23f41a251e366\",\n                 \"text\": \"Task description\",\n                 \"grupo\": \"Verde\",\n                 \"status\": true\n       }\n   }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Todos",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Add User",
    "name": "Add_User",
    "description": "<p>Add a new User or to the database</p> ",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username string format</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password string format</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Verde\"",
              "\"Vermelho\"",
              "\"Azul\""
            ],
            "optional": false,
            "field": "grupo",
            "description": "<p>a string that can contain the words &quot;Verde&quot;,&quot;Vermelho&quot; or &quot;Azul&quot;.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"All Went Fine!\",\n       \"data\": {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"username\": \"sampleuser\",\n                 \"password\": \"Pgo1iEks57d1845358c23f41a251e366\",\n                 \"grupo\": \"Verde\"\n       }\n   }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/users/:user_id",
    "title": "Delete User",
    "name": "Delete_User",
    "description": "<p>Delete an existing User</p> ",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"User deleted!\",\n       \"data\": { }\n   }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/:user_ud",
    "title": "Get User",
    "name": "Get_User_By_ID",
    "description": "<p>Get User By ID</p> ",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\": true,\n      \"message\": \"All Went Fine!\",\n      \"data\": {\n        \"id\": \"57d1845358c23f41a251e366\",\n        \"username\": \"sampleuser\",\n        \"password\": \"Pgo1iEks57d1845358c23f41a251e366\",\n        \"grupo\": \"Verde\"\n      }\n    }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "List Users",
    "name": "List_Users",
    "description": "<p>List all stored users</p> ",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "p",
            "description": "<p>Set&#39;s the page from were to list resutls, defaults to page 1, to get all pages set this value to -1</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "itemsPerPage",
            "description": "<p>Set&#39;s the number of items to list in each page</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"All went fine!\",\n       \"data\": {\n         \"users\": [\n           {\n             \"id\": \"57d1845358c23f41a251e366\",\n             \"username\": true,\n             \"password\": \"Pgo1iEks57d1845358c23f41a251e366\",\n             \"grupo\": \"Verde\"\n           },\n           {\n             \"id\": \"57d1845358c23f41a251e366\",\n             \"username\": true,\n             \"password\": \"Pgo1iEks57d1845358c23f41a251e366\",\n             \"grupo\": \"Verde\"\n           },\n           ....\n         ],\n         \"totalItems\": 2,\n         \"next\": null,\n         \"previous\": null,\n         \"numPages\": 1\n       }\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/users/:user_id",
    "title": "Update User",
    "name": "Update_User",
    "description": "<p>Update an existing User</p> ",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username string format</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password string format</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"Verde\"",
              "\"Vermelho\"",
              "\"Azul\""
            ],
            "optional": false,
            "field": "grupo",
            "description": "<p>a string that can contain the words &quot;Verde&quot;,&quot;Vermelho&quot; or &quot;Azul&quot;.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"status\": true,\n       \"message\": \"User updated!\",\n       \"data\": {\n                 \"id\": \"57d1845358c23f41a251e366\",\n                 \"username\": \"sampleuser\",\n                 \"password\": \"Pgo1iEks57d1845358c23f41a251e366\",\n                 \"grupo\": \"Verde\"\n       }\n   }",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>True or False Boolean value, specifies if the request was successfull .</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Status message about the request, usually contains success or error messages.</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SomethingWentWrong",
            "description": "<p>something happened on the API core.</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "API",
            "description": "<p>Error something happened on the Server.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "SomethingWentWrong-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\" : false,\n      \"message\" : \"Something went wrong!\",\n      \"data\" : null\n    }",
          "type": "json"
        },
        {
          "title": "ServerError-Response:",
          "content": "    HTTP/1.1 503 Bad Gateway\n    NULL",
          "type": "json"
        }
      ]
    }
  }
] });