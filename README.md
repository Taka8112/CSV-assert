# CSV-assert

CSV-assert is server side assert tool. This tool is using Node.js and HTTP request library superagent and mocha and node-csvtojson.
CSV-assert is posted in multipart/form-data basically.

## Installation

	git clone git://github.com/Taka8112/CSV-assert

## Simple Quick Start

	$ CSV-assert/mocha check.js

## Usage
### check list
Create Assert csv file

	$ CSV-assert/check/

example csv file is post.csv and get.csv

check.js default setting get.csv

### Assert

Assert target csv file  

  ```
 /**
   * Check list 
   */ 
  var source = __dirname + "/check/get.csv";
  ``` 

add assert function

  ```
	  describe('Check',function(){
        properties.forEach(function(property){
          if(property.check.match(/TRUE/i)){
            it(property.test, function(done){
              test(property, cookie , id ,function(res){
              
                //assert.equal(res.statusCode, 200)//assert function
                
                done();
              });
            });
          } else {
            it.skip(property.test, function(done){
              done();
            });
          };
        });
      });
  ```

## Example_server Assert
### Example_server Run
	1. $ CSV-assert/example_server/server/refresh //mongod run 

	2. $ CSV-assert/example_server/server/redis-server　//redis-server run

	3. $ CSV-assert/example_server/server/node app.js　//server run
### CSV-Assert Run
	$ CSV-assert/mocha analysis.js  


# Check List Parameters

* check: true or false (Only when it's true, this library moves.)
* request: get or post(request method)
* path: request URL
* test: test item (ex. max words length Check)
* session: ON or OFF (cookie registration is needed to use this.)
* cookie: cookie headers
* statsuCode: expect response statusCode
* mimetype: mimetype(ex.multipart/form-data)
* field: post property(ex. field.name : foo)
* attach: post image(ex. image : /images/main_image.jpg)
* param: param requet parameter(':id'is necessary for an end of path to use this  ex. /login/:id)
* query: query requet parameter
