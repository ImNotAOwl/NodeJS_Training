const pool = require("../config/database");

module.exports = {

  call: async (res, callback) => {
    let connexion;

    try {
      connexion = await pool.getConnection();
      callback(connexion);

    } catch (error) {

      return res.status(500).json({ error: error.message });

    } finally {

      if (connexion) connexion.end();
    }
  },
};
