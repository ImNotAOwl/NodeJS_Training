CREATE
OR REPLACE DATABASE todo_list;

USE todo_list;

CREATE
OR REPLACE TABLE todos (
    id INT AUTO_INCREMENT NOT NULL,
    task_desc VARCHAR (255),
    PRIMARY KEY (id)
);

INSERT INTO
    todos(task_desc)
VALUES
    ('tache 1'),
    ('tache 2'),
    ('tache 3');
    