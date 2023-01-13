const express = require('express');
const mongodb = require('mongodb');

const app = express();
const port = 4000;

// Connect to MongoDB
const client = new mongodb.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
client.connect((err) => {
    if (err) {
        console.log('Error connecting to MongoDB:', err);
        process.exit(1);
    }

    // Connect to the "test" collection in the "mydb" database
    const db = client.db('test').collection('TestCollection');

    // Retrieve all documents in the collection and return as JSON
    app.get('/data', (req, res) => {
        db.find({}).toArray((err, docs) => {
            if (err) {
                console.log('Error retrieving data:', err);
                res.status(500).send();
            } else {
                res.json(docs);
            }
        });
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
