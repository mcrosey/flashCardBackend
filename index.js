const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const flashcards = require('./routes/flashcards');
const User = require('./model/user');

connectDB();

app.use(express.json());
app.use('/api/products', flashcards); //product blue

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});