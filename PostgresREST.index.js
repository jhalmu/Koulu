const express = require('express')
const bodyParser = require('body-parser')

const query = require('./db/customers')

const app = express();
app.use(bodyParser.json())

const port = 3000;

app.get("/api/customers", query.getAllCustomers);
app.post("/api/customers", query.addCustomer);
app.get("/api/customers/:id", query.getCustomer);
app.delete("/api/customers/:id", query.deleteCustomer);
app.put("/api/customers/:id", query.updateCustomer);


// Log port to server terminal
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});