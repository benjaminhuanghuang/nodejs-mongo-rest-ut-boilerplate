# Boilerplate of Node.js RESTful project

  

## Best Practice
  - Use mongodb and mongoose 
    - Split mongoose setup into a separate file, /data/mongoose.js

  - Split app.js from serve.js for convenience of testing
  
  - Use different config and database for different environment: prod, dev, and testing.
    - Ues test_helper in unit test to reset and clear testing environment before testing.
    
  - Use lodash to operate the data
  
  - Use mocha, chai , supertest for unit test
    - http://ricostacruz.com/cheatsheets/chai
    
  
