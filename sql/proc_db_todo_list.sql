use todo_list;

DELIMITER //

-- Selectionne toute les todos
CREATE or replace PROCEDURE getAllTodos ()   
BEGIN
    select * from todos;
END //

-- Insert une todo sans ID comme en auto-increment
CREATE OR REPLACE PROCEDURE insertTodo(IN task VARCHAR(255), name VARCHAR(255))
BEGIN
    INSERT INTO todos(task_desc, attribute_to) VALUES(task, name);
END //

-- Supprime toutes les todos de la DB
CREATE OR REPLACE PROCEDURE deleteAllTodos()
BEGIN
    TRUNCATE todos;
END //

-- Modifie toutes les descriptions des taches
CREATE OR REPLACE PROCEDURE updateAllDesc(IN task VARCHAR(255))
BEGIN
    UPDATE todos SET task_desc = task;
END //

-- Modifie tous les "attribute_to" des taches
CREATE OR REPLACE PROCEDURE updateAllAttribute(IN name VARCHAR(255))
BEGIN
    UPDATE todos SET attribute_to = name;
END //




-- Selectionne une tache par son ID
CREATE OR REPLACE PROCEDURE getOneTodoById(IN id_url INT)
BEGIN
    SELECT * FROM todos WHERE id = id_url;
END //

-- Supprime une tache par son ID
CREATE OR REPLACE PROCEDURE deleteTodoById(IN id_url INT)
BEGIN
    DELETE FROM todos WHERE id = id_url;
END //

-- Modifie une description de tache depuis son ID
CREATE OR REPLACE PROCEDURE updateDescById(IN id_url INT, task VARCHAR(255))
BEGIN
    UPDATE todos SET task_desc = task WHERE id = id_url;
END //

-- Modifie un attribute_to depuis son ID
CREATE OR REPLACE PROCEDURE updateAttributeById(IN id_url INT, name VARCHAR(255))
BEGIN
    UPDATE todos SET attribute_to = name WHERE id = id_url;
END //