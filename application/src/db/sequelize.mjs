import { Sequelize, DataTypes } from "sequelize";
import {
  db_dialect,
  db_host,
  database,
  db_logs,
  db_password,
  db_port,
  db_user,
} from "../config.mjs";

//Info de connection à la DB
const sequelize = new Sequelize(database, db_user, db_password, {
  host: db_host,
  port: db_port,
  dialect: db_dialect,
  logging: db_logs,
});

let initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    console.log("La base de données db_livres_295 a bien été synchronisée");
  });
};

export { sequelize, initDb };
