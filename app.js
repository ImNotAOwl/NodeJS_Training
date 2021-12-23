const express = require('express');

/* import express from 'express';     fonctionne pas actuellement
   équivalent à :   const express = require('express') */

const app = express();

/*----------------SERVEUR EXPRESS------------------------------*/

app.use(express.json());         //middleware pour PARSER le JSON 

app.get('/api', ( _ , res) => {
    res.status(200).json({ success: "API Todos DB v2 " });
});

const todosRoute = require('./routes/todos');
app.use('/api', todosRoute);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

