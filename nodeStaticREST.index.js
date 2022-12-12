const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const port = 3000;

let customers = [
    { id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243' },
    { id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113' },
    { id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176' },
]

//Fetch all customers
app.get("/api/customers", (req, res) => {
    res.json(customers);
})

//Fetch one customer
app.get("/api/customers/:id", (req, res) => {

    const customerID = req.params.id;

    const customer = customers.filter(customer => customer.id === customerID)

    if (customer.length > 0) {
        res.json(customer);
    } else {
        res.status(404).end();
    }
})

//Add new customer
app.post("/api/customers/", (req, res) => {
    // Extract customer from request body & generate id
    const newCustomer = { 'id': Date.now(), ...req.body };

    // Add new customer at the end of customers array
    customers = [...customers, newCustomer]

    res.json(newCustomer);
})

// Update customer
app.put("/api/customers/:id", (req, res) => {

    const customerID = req.params.id;
    const updateCustomer = { 'id': customerID, ...req.body }

    const index = customers.findIndex(customer => customer.id === customerID);
    customers.splice(index, 1, updateCustomer);

    res.json(updateCustomer)
})

//Delete one customer
app.delete("/api/customers/:id", (req, res) => {

    const customerID = req.params.id;

    customers = customers.filter(customer => customer.id !== customerID);


    res.status(204).end();

})

// Log port to server terminal
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});