const { removeAllListeners } = require('nodemon');
const db = require('./dbconfig');

// Get ALL customers
const getAllCustomers = (req, res) => {
    db.query('SELECT * FROM customers', (err, result) => {
        if (err)
            console.error(err);
        else
            res.json(result.rows)
    })
}

//GET customer by id
const getCustomer = (req, res) => {
    const query = {
        text: 'SELECT * FROM customers WHERE id = $1',
        values: [req.params.id],
    }

    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else
                res.status(404).end();
        }
    })
}
// Add NEW customer
const addCustomer = (req, res) => {
    // Extract customer from the request body and generate id
    const newCustomer = req.body;

    const query = {
        text: 'INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)',
        values: [newCustomer.firstname, newCustomer.lastname, newCustomer.email, newCustomer.phone],
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })

    res.json(newCustomer);
}

// Delete customer
const deleteCustomer = (req, res) => {
    const query = {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [req.params.id],
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })

    res.status(204).end();
}

// UPDATE customer
const updateCustomer = (req, res) => {
    const editedCustomer = req.body;

    const query = {
        text: 'UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id=$5',
        values: [editedCustomer.firstname, editedCustomer.lastname, editedCustomer.email, editedCustomer.phone, req.params.id],
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })

    res.json(editedCustomer);
}

/////////
/// DELETE ALL

// Delete all customers
// Get ALL customers
const deleteAllCustomers = (req, res) => {
    db.query('DELETE FROM customers RETURNING  *', (err, result) => {
        if (err)
            console.error(err);
        else
            //res.text(result.rows)
            res.json('💀  alles klart 💀 ')
        console.log(' 💀 Customers brutally murdered by you! 💀 \n    List of victims: \n', result.rows)
    })
}


///////////////


module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomer: getCustomer,
    addCustomer: addCustomer,
    deleteCustomer: deleteCustomer,
    updateCustomer: updateCustomer,
    deleteAllCustomers: deleteAllCustomers
}