define({ "api": [  {    "type": "POST",    "url": "/api/v1/accounts",    "title": "Create account for an user",    "version": "0.0.1",    "name": "CreateAccount",    "group": "Accounts",    "description": "<p>Create an account for an authenticated user</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Users auth token</p>"          },          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n    \"Authorization\": \"Bearer auth_token_here\"\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of the account</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "ini_bal",            "description": "<p>Initial balance</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Account type [credit, cash]</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "limit",            "description": "<p>Credit account limit (need to specify if the account type is credit, otherwise none required)</p>"          }        ]      }    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Account ID</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "created",            "description": "<p>Date created</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "cur_bal",            "description": "<p>Current balance</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "ini_bal",            "description": "<p>Initial balance</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "limit",            "description": "<p>Credit account limit (not available for cash account type)</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Account name</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "sav_dur",            "description": "<p>Saving account duration</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "sav_itr",            "description": "<p>Saving account interest rate</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Account type</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"id\": 1,\n    \"created\": \"2018-11-28T09:31:35\",\n    \"cur_bal\": 100000,\n    \"ini_bal\": 100000,\n    \"limit\": 10000,\n    \"name\": \"tep_acc1\",\n    \"sav_dur\": null,\n    \"sav_itr\": null,\n    \"status\": \"success\",\n    \"type\": \"credit\"\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -H \"Authorization\": \"Bearer auth_token_here\" -X POST\n    -d '{\"name\": \"tep_acc1\", \"ini_bal\": 100000, \"type\": \"credit\", \"limit\": 10000}' http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts",        "type": "json"      }    ],    "filename": "app/api/v1/account/accounts.py",    "groupTitle": "Accounts"  },  {    "type": "GET",    "url": "/api/v1/accounts",    "title": "Get all accounts of an user",    "version": "0.0.1",    "name": "GetAllAccounts",    "group": "Accounts",    "description": "<p>Get all accounts of an authenticated user (10 accounts per page)</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Users auth token</p>"          },          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n    \"Authorization\": \"Bearer auth_token_here\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "Object[]",            "optional": false,            "field": "accounts",            "description": "<p>List of accounts</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "accounts.id",            "description": "<p>Account ID</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "accounts.created",            "description": "<p>Date created</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "accounts.cur_bal",            "description": "<p>Current balance</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "accounts.ini_bal",            "description": "<p>Initial balance</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "accounts.limit",            "description": "<p>Credit account limit (not available for cash account type)</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "accounts.name",            "description": "<p>Account name</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "accounts.sav_dur",            "description": "<p>Saving account duration</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "accounts.sav_itr",            "description": "<p>Saving account interest rate</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "accounts.status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "accounts.type",            "description": "<p>Account type</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "next",            "description": "<p>Next page</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "previous",            "description": "<p>Previous page</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "total",            "description": "<p>Total number of accounts</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"accounts\": [\n        {\n            \"id\": 1,\n            \"created\": \"2018-11-28T06:11:55\",\n            \"cur_bal\": 100000,\n            \"ini_bal\": 100000,\n            \"limit\": 10000,\n            \"name\": \"tepacc1\",\n            \"sav_dur\": null,\n            \"sav_itr\": null,\n            \"type\": \"credit\"\n        },\n        {\n            \"id\": 2,\n            \"created\": \"2018-11-28T09:45:05\",\n            \"cur_bal\": 100000,\n            \"ini_bal\": 100000,\n            \"limit\": null,\n            \"name\": \"tepacc4\",\n            \"sav_dur\": null,\n            \"sav_itr\": null,\n            \"type\": \"cash\"\n        }\n    ],\n    \"next\": null,\n    \"previous\": null,\n    \"status\": \"success\",\n    \"total\": 2\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Authorization\": \"Bearer auth_token_here\" http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/accounts",        "type": "json"      }    ],    "filename": "app/api/v1/account/accounts.py",    "groupTitle": "Accounts"  },  {    "type": "POST",    "url": "/api/v1/auth/login",    "title": "Login",    "version": "0.0.1",    "name": "Login",    "group": "Authentication",    "description": "<p>Login a user if the supplied credentials are correct.</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password of the user</p>"          }        ]      }    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "String",            "optional": false,            "field": "auth_token",            "description": "<p>Auth token to be used for requesting</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of the user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"auth_token\": \"some random sheet\",\n    \"email\": \"tep@gmail.com\",\n    \"message\": \"Successfully logged in\",\n    \"status\": \"success\"\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/auth/login"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -X POST -d '{\"email\": \"tep@gmail.com\", \"password\": \"password\"}' http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/auth/login",        "type": "json"      }    ],    "filename": "app/api/v1/auth/login.py",    "groupTitle": "Authentication"  },  {    "type": "POST",    "url": "/api/v1/auth/logout",    "title": "Logout",    "version": "0.0.1",    "name": "Logout",    "group": "Authentication",    "description": "<p>Logout a user and blacklist the auth token.</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Users auth token</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n    \"Authorization\": \"Bearer auth_token_here\"\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": ".",            "description": "<p>Nothing is required here</p>"          }        ]      }    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"message\": \"Successfully logged out\",\n    \"status\": \"success\"\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/auth/logout"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -H \"Authorization\": \"Bearer auth_token_here\" -X POST -d '{}' http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/auth/logout",        "type": "json"      }    ],    "filename": "app/api/v1/auth/logout.py",    "groupTitle": "Authentication"  },  {    "type": "POST",    "url": "/api/v1/auth/register",    "title": "Register",    "version": "0.0.1",    "name": "Register",    "group": "Authentication",    "description": "<p>Register a user, generate their token and add them to the database</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password of the user</p>"          }        ]      }    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "String",            "optional": false,            "field": "auth_token",            "description": "<p>Auth token to be used for requesting</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of the user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"auth_token\": \"some random sheet\",\n    \"email\": \"tep@gmail.com\"\n    \"message\": \"Successfully registered\",\n    \"status\": \"success\"\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/auth/register"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -X POST -d '{\"email\": \"tep@gmail.com\", \"password\": \"password\"}' http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/auth/register",        "type": "json"      }    ],    "filename": "app/api/v1/auth/register.py",    "groupTitle": "Authentication"  },  {    "type": "GET",    "url": "/api/v1/categories/:id",    "title": "Get all categories of an account",    "version": "0.0.1",    "name": "GetAllCategories",    "group": "Categories",    "description": "<p>Get all categories of an account (default and user-created categories)</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Users auth token</p>"          },          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n    \"Authorization\": \"Bearer auth_token_here\"\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Account ID</p>"          },          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"expense\"",              "\"income\""            ],            "optional": true,            "field": "type",            "description": "<p>Category type</p>"          }        ]      }    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "Object[]",            "optional": false,            "field": "categories",            "description": "<p>List of categories</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "categories.id",            "description": "<p>Category ID</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "categories.name",            "description": "<p>Name</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "categories.type",            "description": "<p>Type</p>"          },          {            "group": "Success",            "type": "Object[]",            "optional": false,            "field": "categories.subcategories",            "description": "<p>Subcategories</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"categories\": [\n        {\n            \"id\": 1,\n            \"name\": \"Food & Beverage\",\n            \"subcategories\": [\n                {\n                    \"id\": 28,\n                    \"name\": \"Restaurants\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 29,\n                    \"name\": \"Café\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                }\n            ],\n            \"type\": \"expense\"\n        },\n        {\n            \"id\": 2,\n            \"name\": \"Bill & Utilities\",\n            \"subcategories\": [\n                {\n                    \"id\": 30,\n                    \"name\": \"Phone\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 31,\n                    \"name\": \"Water\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 32,\n                    \"name\": \"Electricity\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 33,\n                    \"name\": \"Gas\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 34,\n                    \"name\": \"Television\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 35,\n                    \"name\": \"Internet\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                },\n                {\n                    \"id\": 36,\n                    \"name\": \"Rental\",\n                    \"subcategories\": [],\n                    \"type\": \"expense\"\n                }\n            ],\n            \"type\": \"expense\"\n        }\n    ],\n    \"status\": \"success\"\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -H \"Authorization\": \"Bearer auth_token_here\"\n    http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories/13",        "type": "json"      },      {        "title": "cURL example with params",        "content": "$ curl -H \"Content-Type: application/json\" -H \"Authorization\": \"Bearer auth_token_here\"\n    http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/categories/13?type=expense",        "type": "json"      }    ],    "filename": "app/api/v1/category/categories.py",    "groupTitle": "Categories"  },  {    "type": "POST",    "url": "/api/v1/transactions",    "title": "Create transaction for an account",    "version": "0.0.1",    "name": "CreateTransaction",    "group": "Transactions",    "description": "<p>Create a transaction for an account</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Users auth token</p>"          },          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n    \"Authorization\": \"Bearer auth_token_here\"\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "acc_id",            "description": "<p>Account ID</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "cat_id",            "description": "<p>Category ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "created_at",            "description": "<p>Create time</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "note",            "description": "<p>Note</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>Amount</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "{\n    \"acc_id\": 13,\n    \"cat_id\": 20,\n    \"created_at\": \"2018-12-14T03:55\",\n    \"note\": \"note\",\n    \"amount\": 60000000\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "String",            "optional": false,            "field": "created_at",            "description": "<p>Date created</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "pre_bal",            "description": "<p>Pre-transaction balance</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "post_bal",            "description": "<p>Post-transaction balance</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "category",            "description": "<p>Category</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "note",            "description": "<p>Note</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>Amount</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "String",            "allowedValues": [              "\"expense\"",              "\"income\""            ],            "optional": false,            "field": "type",            "description": "<p>Transaction type</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"amount\": 60000000,\n    \"category\": \"Salary\",\n    \"created_at\": \"2018-12-14T03:55:00\",\n    \"note\": \"note\",\n    \"pre_bal\": 40000,\n    \"post_bal\": 60040000,\n    \"status\": \"success\",\n    \"type\": \"income\"\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/transactions"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -H \"Authorization\": \"Bearer auth_token_here\" -X POST\n    -d '{\"acc_id\": 13, \"cat_id\": 20, \"note\": \"note\", \"amount\": 60000000}'\n    http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/transactions",        "type": "json"      }    ],    "filename": "app/api/v1/transaction/transactions.py",    "groupTitle": "Transactions"  },  {    "type": "GET",    "url": "/api/v1/transactions/:id",    "title": "Get all transactions of an account",    "version": "0.0.1",    "name": "GetAllTransactions",    "group": "Transactions",    "description": "<p>Get all transactions of an account (10 transactions per page)</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>Users auth token</p>"          },          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-Type",            "defaultValue": "application/json",            "description": "<p>Content-Type (should be application/json for every post requests)</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n    \"Authorization\": \"Bearer auth_token_here\"\n}",          "type": "json"        }      ]    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Account ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success": [          {            "group": "Success",            "type": "Object[]",            "optional": false,            "field": "transactions",            "description": "<p>List of transactions</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "transactions.created_at",            "description": "<p>Date created</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "transactions.amount",            "description": "<p>Amount (in VND)</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "transactions.category",            "description": "<p>Category</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "transactions.note",            "description": "<p>Note</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "transactions.pre_bal",            "description": "<p>Pre-transaction balance</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "transactions.post_bal",            "description": "<p>Post-transaction balance</p>"          },          {            "group": "Success",            "type": "String",            "allowedValues": [              "\"expense\"",              "\"income\""            ],            "optional": false,            "field": "transactions.type",            "description": "<p>Transaction type</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "next",            "description": "<p>Next page</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "previous",            "description": "<p>Previous page</p>"          },          {            "group": "Success",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>Status</p>"          },          {            "group": "Success",            "type": "Number",            "optional": false,            "field": "total",            "description": "<p>Total number of transactions</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.0 200 OK\n{\n    \"next\": null,\n    \"previous\": null,\n    \"status\": \"success\",\n    \"total\": 2,\n    \"transactions\": [\n        {\n            \"amount\": 60000,\n            \"category\": \"Bill & Utilities\",\n            \"created_at\": \"2018-12-12T17:38:47\",\n            \"note\": \"note\",\n            \"pre_bal\": 100000,\n            \"post_bal\": 160000,\n            \"type\": \"expense\"\n        },\n        {\n            \"amount\": 60000000,\n            \"category\": \"Salary\",\n            \"created_at\": \"2018-12-12T17:40:38\",\n            \"note\": \"note\",\n            \"pre_bal\": 40000,\n            \"post_bal\": 60040000,\n            \"type\": \"income\"\n        }\n    ]\n}",          "type": "json"        }      ]    },    "sampleRequest": [      {        "url": "http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/transactions"      }    ],    "examples": [      {        "title": "cURL example",        "content": "$ curl -H \"Content-Type: application/json\" -H \"Authorization\": \"Bearer auth_token_here\"\n    http://ec2-35-153-68-36.compute-1.amazonaws.com/api/v1/transactions/13",        "type": "json"      }    ],    "filename": "app/api/v1/transaction/transactions.py",    "groupTitle": "Transactions"  }] });
