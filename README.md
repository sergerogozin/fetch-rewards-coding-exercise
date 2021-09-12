# fetch-rewards-coding-exercise

In order to run this web service, please follow the steps outlined below: 
1) Download and install Node.js
2) Clone the repository onto your machine 
3) Navigate into the project's root directory using the terminal/command line  
4) Run `npm install` to install the project's dependencies listed in package.json
5) Run `npm run dev` to boot up the project on localhost:3000
* A list of HTTP requests I used to test the service can be found in the httpRequests.js file. 

<br>

The web service accepts the following requests:

1) A GET request sent to /api/v1/payers/balances
- Parameters: none
- Response: an object where the keys (strings) are the names of the payers and the values (numbers) are their total points   

<br>

2) A POST request sent to /api/v1/payers/add
- Parameters: an object with three required fields (payer, points, timestamp) 
  * the payer field holds the name of the company (must be a string)
  * the points field holds the number of points to be added to the payer's overall balance (must be a number, specifically an integer) 
  * the timestamp field holds the date of the transaction (must be a string which can be used to create a Date object)
- Response: none

<br>

3) A POST request sent to /api/v1/payers/spend
- Parameters: an object with a single required key/value pair 
  * the points field holds the number of points to be subtracted from the participating companies (must be a number, specifically an integer, greater than 0 and cannot be larger than all of the participating companies' point balances combined)
- Response: an array of objects, which contain 2 key/value pairs
  * the payer field holds the name of the payer (as a string)
  * the points field contains the sum of points subtracted from the payer (a negative number)



