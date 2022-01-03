const pool = require("../config/database");

// fonction pour interroger la base de données
const requestToDB = async (call) => {
  let connexion;

  try {
    connexion = await pool.getConnection();
    const result = await connexion.query(call);

    return result;

  } catch (error) {
    return res.status(400).json({ error: error.message });
  } finally {
    if (connexion) {
      connexion.end();
    }
  }
};


module.exports = {

    // renvoie toutes les todos de la DB todo_dev
  getAllTodosDB: async (_, res) => {

    const result = await requestToDB('CALL getAllTodos');
    return res.status(200).json({ success: "voici les tâches à faire", result: result[0]});

    // let connexion;

    // try {
    //   connexion = await pool.getConnection();
    //   const result = await connexion.query("CALL getAllTodos");

    //   return res
    //     .status(200)
    //     .json({ success: "voici les resultats", result: result[0] });
    // } catch (error) {
    //   return res.status(400).json({ error: error.message });
    // } finally {
    //   if (connexion) {
    //     connexion.end();
    //   }
    // }

  },

    // Ajoute une nouvelle Tache
  addOneTodoDB: async (req, res) => {
    // let connexion;
    const { task_desc, attribute_to } = req.body;

    await requestToDB(`CALL insertTodo('${task_desc}', '${attribute_to}')`);
    const result = await requestToDB('CALL getAllTodos');
    
    return res.status(200).json({ success: "Tache ajoutée, voici les tâches à faire", result: result[0]});


    // try {
    //   connexion = await pool.getConnection();
    //   await connexion.query(`CALL insertTodo(?,?)`, [task_desc, attribute_to]);
    //   await connexion.query(`CALL insertTodo('${task_desc}', '${attribute_to}')`);
    //   const result = await connexion.query("CALL getAllTodos");

    //   return res
    //     .status(200)
    //     .json({ success: "voici les resultats", result: result[0] });
    // } catch (error) {
    //   return res.status(400).json({ error: error.message });
    // } finally {
    //   if (connexion) {
    //     connexion.end();
    //   }
    // }
  },

  deleteAllTodosDB: async (_, res) => {
    let connexion;

    try {
      connexion = await pool.getConnection();
      const result = await connexion.query("CALL deleteAllTodos()");

      return res
        .status(200)
        .json({ success: "Les todos ont bien été supprimé", result: result });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } finally {
      if (connexion) {
        connexion.end();
      }
    }
  },

  updateAllTodosDB: async (req, res) => {
    let connexion;
    const { task_desc, attribute_to } = req.body;

    try {
      connexion = await pool.getConnection();

      if (task_desc && attribute_to) {
        await connexion.query(`CALL updateAllDesc('${task_desc}')`);
        await connexion.query(`CALL updateAllAttribute('${attribute_to}')`);
        const result = await connexion.query("CALL getAllTodos");

        return res
          .status(200)
          .json({ success: "voici les resultats", result: result[0] });
      } else if (task_desc) {
        await connexion.query(`CALL updateAllDesc('${task_desc}')`);
        const result = await connexion.query("CALL getAllTodos");

        return res
          .status(200)
          .json({ success: "voici les resultats", result: result[0] });
      } else {
        await connexion.query(`CALL updateAllAttribute('${attribute_to}')`);
        const result = await connexion.query("CALL getAllTodos");

        return res
          .status(200)
          .json({ success: "voici les resultats", result: result[0] });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } finally {
      if (connexion) {
        connexion.end();
      }
    }
  },

  getOneTodoDB: async (req, res) => {
    let connexion;
    const { id } = req.params;

    try {
      connexion = await pool.getConnection();
      const result = await connexion.query(`CALL getOneTodoById('${id}')`);

      if (!result[0][0]) {
        return res
          .status(400)
          .json({ error: "la tache recherchée n'existe pas..." });
      } else {
        return res
          .status(200)
          .json({ success: "voici la tache recherchée", result: result[0] });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } finally {
      if (connexion) {
        connexion.end();
      }
    }
  },

  deleteOneTodoDB: async (req, res) => {
    let connexion;
    const { id } = req.params;

    try {
      connexion = await pool.getConnection();
      const deleteTodo = await connexion.query(`CALL deleteTodoById('${id}')`);
      const result = await connexion.query("CALL getAllTodos");

      if (deleteTodo.affectedRows != 0) {
        return res
          .status(200)
          .json({ success: "la tache est supprimé", result: result[0] });
      } else {
        return res
          .status(400)
          .json({
            error: "la tache n'existe pas, impossiblee de la supprimer...",
          });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } finally {
      if (connexion) {
        connexion.end();
      }
    }
  },

  updateOneTodoDB: async (req, res) => {
    let connexion;
    const { id } = req.params;
    const { task_desc, attribute_to } = req.body;

    try {
      connexion = await pool.getConnection();

      if (task_desc && attribute_to) {
        await connexion.query(`CALL updateDescById(${id}, '${task_desc}')`);
        await connexion.query(
          `CALL updateAttributeById(${id}, '${attribute_to}')`
        );
        const result = await connexion.query(`CALL getAllTodos`);

        return res
          .status(200)
          .json({ success: "voici les résultats", result: result[0] });
      } else if (task_desc) {
        await connexion.query(`CALL updateDescById(${id}, '${task_desc}')`);
        const result = await connexion.query(`CALL getAllTodos`);

        return res
          .status(200)
          .json({ success: "voici les résultats", result: result[0] });
      } else {
        await connexion.query(
          `CALL updateAttributeById(${id}, '${attribute_to}')`
        );
        const result = await connexion.query(`CALL getAllTodos`);

        return res
          .status(200)
          .json({ success: "voici les résultats", result: result[0] });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } finally {
      if (connexion) {
        connexion.end();
      }
    }
  },
};
