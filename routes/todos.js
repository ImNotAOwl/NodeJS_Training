/*------------ROUTES/TODOS------------------*/

const router = require('express-promise-router')();
// permet d'utiliser des controllers asynchrone

//const { getAllTodos, deleteAllTodos, updateAllTodos, addTodos, getOneTodo, addOneTodo, deleteOneTodo, updateOneTodo } = require("../controllers/todos");     
// déstructuration, on choisi d'importer que la propriété que l'on veut

/*---- sans la fonction de factorisation du fichier UTILS---- */
// const { getAllTodosDB, addOneTodoDB, deleteAllTodosDB, updateAllTodosDB, getOneTodoDB, deleteOneTodoDB, updateOneTodoDB } = require("../controllers/todosDB")

const { getAllTodosDB, addOneTodoDB, deleteAllTodosDB, updateAllTodosDB, getOneTodoDB, deleteOneTodoDB, updateOneTodoDB } = require("../controllers/todosDB_utils")

router
    .route('/todos')
    .get(getAllTodosDB)
    .delete(deleteAllTodosDB)
    .post(addOneTodoDB)
    .put(updateAllTodosDB);

router
    .route('/todos/:id') // route paramètrer
    .get(getOneTodoDB)
    // .post(addOneTodo)
    .delete(deleteOneTodoDB)
    .put(updateOneTodoDB);


module.exports = router;