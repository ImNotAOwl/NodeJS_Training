const express = require('express');
const fs = require('node:fs');


/* import express from 'express';     fonctionne pas actuellement
   équivalent à :   const express = require('express') */

const app = express();


/*---------------------BASE DE DONNEES-------------------------*/

const todos = [
    { id: 1, texte: "tache 1" },
    { id: 2, texte: "tache 2" },
    { id: 3, texte: "tache 3" }
];

const insertTodo = (todo) => {
    todos.push(todo);
}

const removeTodo = (id) => {
    todos.forEach((item, key) => {
        if (item.id === id) {
            let deleted = todos.splice(key, 1);  //stock l'objet que l'on supprime.
            console.log(deleted);
        }
    });
}

const updateTodo = (id, text) => {
    todos.forEach((item, key) => {
        if (item.id === id) {
            todos[key].texte = text;
        }
    });
}

/*----------------SERVEUR EXPRESS------------------------------*/

app.use(express.json());         //middleware pour PARSER le JSON en méthode POST


app.get("/", (_, res) => {

    fs.readFile('index.html', 'utf-8', (error, content) => {
        if (error) {
            // res.writeHead(500, { "Content-Type": "application/json" });
            // res.end(JSON.stringify(error));

            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(error.message);

        } else {
            res.writeHead(200, { "Content-Type": "text/html"});
            res.end(content);
        }


    });
    
    // res.status(200).json({ success: "Bonjour, vous êtes sur l'API d'entrainement" });

})

    .get("/bonjour/:prenom", (req, res) => {
        // const prenom = req.params.prenom;
        const { prenom } = req.params;

        res.status(200).json({ success: `Bonjour ${prenom}` });

    })

    .post("/inscription", (req, res) => {
        const { userName, email, password, password_repeat } = req.body;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (password === password_repeat && email.match(mailformat)) {

            /* CALL insertUser (username, email, SHA(password)); */

            return res.status(200).json({ success: `${userName} a bien été inscrit`, todos: todos });

        } else if (!email.match(mailformat)) {

            return res.status(400).json({ error: `${email} votre email n'est pas conforme` });

        } else {
            return res.status(400).json({ error: `${userName} votre mot de passe n'est pas confirmer` });
        }

    })

    //affiche toutes les todos
    .get("/todos", (req, res) => {

        const id = req.params.id;

        return res.status(200).json({ success: `voici les taches a faire : `, todos: todos });

    })

    // affiche la tache n°... a faire 
    .get("/todos/:id", (req, res) => {

        const id = req.params.id;

        return res.status(200).json({ success: `voici la tache a faire est : la ${todos[id].texte}` });

    })

    // ajoute un todo
    .post("/todos/addtodo", (req, res) => {

        const { id, texte } = req.body;

        insertTodo({ id, texte });
        return res.status(200).json({ success: `La todo a bien été ajouté`, todos: todos });
    })

    // supprime un todo
    .delete("/todos/removetodo", (req, res) => {

        const { id } = req.body;

        removeTodo(id);
        return res.status(200).json({ success: `La todo a bien été supprimé`, todos: todos });

    })

    // update un todo
    .put("/todos/update", (req, res) => {
        const { id, texte } = req.body;

        if (id > todos.length) {
            insertTodo({id, texte});
            return res.status(400).json({ error: `La todo ${id} vient d'être ajouté`, todos: todos });
        } else {
            updateTodo(id, texte);

            return res.status(200).json({ success: `La todo ${id}, son texte à changer en ${texte}`, todos: todos });
        }
    })


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

