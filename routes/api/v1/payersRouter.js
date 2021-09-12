import express from "express";

const payersRouter = new express.Router();
const db = {
  transactions: []
}


payersRouter.get("/balances", (req, res) => {
  let balances = getBalances();
  res.status(200).json(balances)
})


payersRouter.post("/spend", (req, res) => {
    let points = req.body.points;

    if (!fieldIsValid(points, "integer")) {
      res.status(422).send({error: "Value of points needs to be a valid integer"});
    } else if (points <= 0) {
      res.status(422).send({error: "Points must be an integer larger than 0"})
    } else {
      let balances = getBalances();
      let sumOfPoints = 0;

      for (let payer in balances) {
        sumOfPoints += balances[payer]
      }

      if (points > sumOfPoints) {
        res.status(422).send({error: "Value of points cannot be greater than the sum of all payers' points"})
      } else {
        let orderedByDate = db.transactions.slice();
        orderedByDate.sort((x,y) => {
          return Date.parse(x.timestamp) - Date.parse(y.timestamp);
        })

        let spendResult = {};
        let index = 0;
        while (points > 0) {
          let transactionObj = orderedByDate[index];
          let newTransaction = {
            "payer": transactionObj.payer,
            "timestamp": Date()
          }

          if (points <= transactionObj.points) {
            if (transactionObj.payer in spendResult) {
              spendResult[transactionObj.payer] -= points;
            } else {
              spendResult[transactionObj.payer] = -points;
            }
            newTransaction.points = -points;
            points = 0;
          } else {
            if (transactionObj.payer in spendResult) {
              spendResult[transactionObj.payer] -= transactionObj.points;
            } else {
              spendResult[transactionObj.payer] = -transactionObj.points;
            }
            points -= transactionObj.points;
            newTransaction.points = -transactionObj.points;
          }
          index++;
          db.transactions.push(newTransaction);
        }

        let keys = Object.keys(spendResult);
        let result = keys.map(key => {
          return {
            "payer": key,
            "points": spendResult[key]
          }
        })

        res.status(201).json(result);
      }
    }
})


payersRouter.post('/add', (req, res) => {
  let { payer, points, timestamp } = req.body;
  let errors = [];

  if (!fieldIsValid(payer, "string")) {
    errors.push("payer");
  }
  if (!fieldIsValid(points, "integer")) {
    errors.push("points");
  }
  if (!fieldIsValid(timestamp, "date")) {
    errors.push("timestamp");
  }

  if (errors.length > 0) {
    res.status(422).send({error: `Wrong format and/or missing parameter(s): ${errors.join(", ")}`});
  } else {
    let newTransaction = { payer, points, timestamp };
    db.transactions.push(newTransaction);
    res.status(201).send("message: Resource Created");
  }
});


function fieldIsValid(field, type) {
  if (!field) {
    return false;
  } else {
    if (type === "string") {
      return typeof field === "string";
    } else if (type === "integer") {
      return typeof field === "number" && Number.isInteger(field);
    } else {
      return typeof field === "string" && new Date(field) !== "Invalid Date";
    }
  }
}

function getBalances() {
  let balances = {};
  for (let transaction of db.transactions) {
    if (transaction.payer in balances) {
      balances[transaction.payer] += transaction.points; 
    } else {
      balances[transaction.payer] = transaction.points; 
    }
  }

  return balances;
}



export default payersRouter;