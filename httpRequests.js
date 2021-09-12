//seeder add requests
curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z"}' http://localhost:3000/api/v1/payers/add

curl -H "Content-Type: application/json" -X POST -d '{"payer": "UNILEVER", "points": 200, "timestamp": "2020-11-01T14:00:00Z"}' http://localhost:3000/api/v1/payers/add

curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z"}' http://localhost:3000/api/v1/payers/add

curl -H "Content-Type: application/json" -X POST -d '{"payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z"}' http://localhost:3000/api/v1/payers/add

curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z"}' http://localhost:3000/api/v1/payers/add


//balance request
curl -X GET http://localhost:3000/api/v1/payers/balances


//spend request
curl -H "Content-Type: application/json" -X POST -d '{"points": 5000}' http://localhost:3000/api/v1/payers/spend


//spend request tests 
//test 1 - empty body
curl -H "Content-Type: application/json" -X POST -d '{}' http://localhost:3000/api/v1/payers/spend

//test 2 - negative value
curl -H "Content-Type: application/json" -X POST -d '{"points": -5000}' http://localhost:3000/api/v1/payers/spend

//test 3 - float
curl -H "Content-Type: application/json" -X POST -d '{"points": 5000.5}' http://localhost:3000/api/v1/payers/spend

//test 4 - large value
curl -H "Content-Type: application/json" -X POST -d '{"points": 50000}' http://localhost:3000/api/v1/payers/spend

//test 5 - wrong format
curl -H "Content-Type: application/json" -X POST -d '{"points": "50000"}' http://localhost:3000/api/v1/payers/spend


//add request tests
//test 1 - empty body
curl -H "Content-Type: application/json" -X POST -d '{}' http://localhost:3000/api/v1/payers/add

//test 2 - missing payer
curl -H "Content-Type: application/json" -X POST -d '{"points": 123, "timestamp": "2020-11-02T14:00:00Z"}' http://localhost:3000/api/v1/payers/add

//test 3 - missing points
curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "timestamp": "2020-11-02T14:00:00Z"}' http://localhost:3000/api/v1/payers/add

//test 4 - missing timestamp
curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "points": 100}' http://localhost:3000/api/v1/payers/add

//test 5 - wrong data format(payer)
curl -H "Content-Type: application/json" -X POST -d '{"payer": 123, "points": 300, "timestamp": "2020-10-31T10:00:00Z"}' http://localhost:3000/api/v1/payers/add

//test 6 - wrong data format(points)
curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "points": "300", "timestamp": "2020-10-31T10:00:00Z"}' http://localhost:3000/api/v1/payers/add

//test 7 - wrong data format(timestamp)
curl -H "Content-Type: application/json" -X POST -d '{"payer": "DANNON", "points": 300, "timestamp": true}' http://localhost:3000/api/v1/payers/add

