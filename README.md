# CSV-assert

CSV-assert is server side assert tool. This tool is using Node.js and HTTP request library superagent and mocha and node-csvtojson.
CSV-assert is posted in multipart/form-data basically.

## Installation

node:

  ```
  $ npm install csv-assert
  ```

## To begin example

1. install it:

  ```
  $ npm install csv-assert
  ```
2. make assert csv files:

  ./check/ check.csv

3. write Assert method

  ./check.js

    ```
    exapmle

    /**
    * Assert Space
    */
    //res.statusCode.should.eql(statuscode);
    //assert.equal(res.body.name, field.name, test);
    ```

    !! assert or a should library is recommended as asserting.

4. assert start
  ```
  $ mocha test/chcek.js
  ```

## Check List Parameters

* check: true or false (Only when it's true, this library moves.)
* request: get or post(request method)
* path: request URL
* test: test item (ex. max words length Check)
* session: ON or OFF (cookie registration is needed to use this.)
* cookie: cookie headers
* statsuCode: expect response statusCode
* field: post property(ex. field.name : foo)
* attach: post image(ex. image : /images/main_image.jpg)
* param: param requet parameter(':id'is necessary for an end of path to use this  ex. /login/:id)
* query: query requet parameter
