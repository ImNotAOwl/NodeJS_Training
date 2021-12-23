/*------------CONTROLLERS/TODOS------------------*/

let todos = [
    { id: 1, texte: "tache 1" },
    { id: 2, texte: "tache 2" },
    { id: 3, texte: "tache 3" }
];


module.exports = {
    getAllTodos: ( _ , res) => {
        res.status(200).json({ success: todos });
    },

    deleteAllTodos: ( _ , res) => {
        todos.splice(0, todos.length);

        res.status(200).json({
            success: "Toutes les todos ont été supprimées", 
            todos: todos
        });
    },

    updateAllTodos: (req, res) => {
        const { texte } = req.body;

        todos.forEach((item, key) => {
            item.texte = texte;
        });
        res.status(200).json({ success: "Toutes les taches ont été modifiées", todos: todos });
    },

    addTodos: (req, res) => {
        const { newTodos } = req.body;

        todos.splice(0, todos.length);
        // todos = todos.concat(newTodos);    // concatène 2 array

        newTodos.forEach((item, key) => {
            todos.push(item);
        })

        res.status(200).json({ success: "Toutes les taches ont été ajoutées", todos: todos });

    },


    getOneTodo: (req, res) => {
        const id = req.params.id - 1;

        return res.status(200).json({ success: `la tache a faire est N°${todos[id].id}: '${todos[id].texte}'` });
    },

    addOneTodo: (req, res) => {
        const { id } = req.params;
        const { texte } = req.body;

        todos.push({ id, texte });
        return res.status(200).json({ success: `La todo a bien été ajouté`, todos: todos });
    },

    deleteOneTodo: (req, res) => {
        const { id } = req.params;

        todos.forEach((item, key) => {
            if (item.id == id) {
                todos.splice(key, 1);
            }

        });

        return res.status(200).json({ success: `La todo a bien été supprimé`, todos: todos });
    },

    updateOneTodo: (req, res) => {
        const { id } = req.params;
        const { texte } = req.body;

        if (id > todos.length) {
            todos.push({ id, texte });

            return res.status(400).json({ error: `La todo ${id} vient d'être ajouté`, todos: todos });
        } else {
            todos.forEach((item, key) => {
                if (item.id == id) {
                    todos[key].texte = texte;
                }
            });

            return res.status(200).json({ success: `La todo ${id}, son texte à changer en ${texte}`, todos: todos });
        }
    }
};

// module.exports = tab;           export un objet vers un autre fichier
