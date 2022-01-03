const { call } = require("../utils/index");

module.exports = {
  getAllTodosDB: async (_, res) => {
    await call(res, async (connexion) => {
      const result = await connexion.query("CALL getAllTodos()");

      if (result[0].length === 0) {
        return res.status(200).json({ success: "La todo liste est vide" });
      } else {
        return res
          .status(200)
          .json({ success: "voici les todos", result: result[0] });
      }
    });
  },

  deleteAllTodosDB: async (_, res) => {
    await call(res, async (connexion) => {
      await connexion.query("CALL deleteAllTodos()");
      return res.status(200).json({ success: "les todos sont supprimés" });
    });
  },

  addOneTodoDB: async (req, res) => {
    const { task_desc, attribute_to } = req.body;

    await call(res, async (connexion) => {
      await connexion.query("CALL insertTodo(?,?)", [task_desc, attribute_to]);
      let result = await connexion.query("CALL getAllTodos()");
      result = result[0][result[0].length - 1];

      return res
        .status(200)
        .json({ success: "la tache à bien été ajoutée ", result: result });
    });
  },

  updateAllTodosDB: async (req, res) => {
    const { task_desc, attribute_to } = req.body;

    if (task_desc && attribute_to) {
      await call(res, async (connexion) => {
        await connexion.query("CALL updateAllDesc(?)", [task_desc]);
        await connexion.query("CALL updateAllAttribute(?)", [attribute_to]);

        return res.status(200).json({
          success: `Les taches de toutes les todos sont changés et attribués à ${attribute_to}`,
        });
      });
    } else if (attribute_to) {
      await call(res, async (connexion) => {
        await connexion.query("CALL updateAllAttribute(?)", [attribute_to]);
        return res.status(200).json({
          success: `Toutes les todos sont attribués à ${attribute_to}`,
        });
      });
    } else {
      await call(res, async (connexion) => {
        await connexion.query("CALL updateAllDesc(?)", [task_desc]);

        return res
          .status(200)
          .json({ success: `Les taches de toutes les todos sont changés` });
      });
    }
  },

  getOneTodoDB: async (req, res) => {
    const { id } = req.params;

    await call(res, async (connexion) => {
      const result = await connexion.query("CALL getOneTodoById(?)", [id]);
      return res.status(200).json({ success: result[0] });
    });
  },

  deleteOneTodoDB: async (req, res) => {
    const { id } = req.params;

    await call(res, async (connexion) => {
      await connexion.query("CALL deleteTodoById(?)", [id]);
      return res.status(200).json({ success: "la tache à bien été supprimée" });
    });
  },

  updateOneTodoDB: async (req, res) => {
    const { id } = req.params;
    const { task_desc, attribute_to } = req.body;

    if (id != 0) {

        if (task_desc && attribute_to) {
            await call(res, async (connexion) => {
                await connexion.query('CALL updateDescById(?,?)', [ id, task_desc ]);
                await connexion.query('CALL updateAttributeById(?,?)', [ id, attribute_to ]);

                const result = await connexion.query('CALL getOneTodoById(?)', [ id ]);

                return res.status(200).json({ success: "voici la tache modifiée", result: result[0] });
            });
        } else if (task_desc) {

            await call (res, async (connexion) => {
                await connexion.query('CALL updateDescById(?,?)', [ id, task_desc ]);
                const result = await connexion.query('CALL getOneTodoById(?)', [ id ]);

                return res.status(200).json({ success: "voici la tache modifiée", result: result[0] });
            })
        } else {
            await call (res, async (connexion) => {
                await connexion.query('CALL updateAttributeById(?,?)', [ id, attribute_to ]);
                const result = await connexion.query('CALL getOneTodoById(?)', [ id ]);

                return res.status(200).json({ success: "voici la tache modifiée", result: result[0] });
            })
        }
    } else {
        return res.status(400).json({ error: "L'ID de la tache ne pas être nulle" });
    }
    
  },
};
