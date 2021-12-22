/*------------ROUTES/TODOS------------------*/

const router = require('express-promise-router')();
const { getAllTodos, deleteAllTodos, updateAllTodos, addTodos, getOneTodo, addOneTodo, deleteOneTodo, updateOneTodo } = require("../controllers/todos");     // déstructuration, on choisi d'importer que la propriété que l'on veut

const { getAllTodosDB, addOneTodoDB, deleteAllTodosDB, updateAllTodosDB, getOneTodoDB, deleteOneTodoDB, updateOneTodoDB } = require("../controllers/todosDb")

router
    .route('/todos')
    .get(getAllTodosDB)
    .delete(deleteAllTodosDB)
    .post(addOneTodoDB)
    .put(updateAllTodosDB);

router
    .route('/todos/:id')
    .get(getOneTodoDB)
    // .post(addOneTodo)
    .delete(deleteOneTodoDB)
    .put(updateOneTodoDB);


module.exports = router;