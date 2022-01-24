require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});
const cors = require('cors');

const express = require('express');
const app = express();

/*----------------SERVEUR EXPRESS------------------------------*/

app.use(express.json());         //middleware pour PARSER le JSON 
app.use(cors());

app.get('/api', ( _ , res) => {
    res.status(200).json({ success: "API Todos DB v2 " });
});

const todosRoute = require('./routes/todos');
app.use('/api', todosRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

