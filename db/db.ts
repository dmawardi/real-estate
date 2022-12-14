import {
  DataTypes,
  Database,
  Model,
  PostgresConnector,
  Relationships,
} from "denoDB";
import Article from "./models/article.ts";
import User from "./models/user.ts";

export interface dbClient {
  client: Database;
  models: {
    Article: typeof Article;
    User: typeof User;
  };
}

// Connection
const connection = new PostgresConnector({
  host: <string>Deno.env.get("DB_HOST"),
  username: <string>Deno.env.get("DB_USERNAME"),
  password: <string>Deno.env.get("DB_PASSWORD"),
  database: "Deno_App",
});

const db = new Database(connection);

// Build relationships from imported models
Relationships.belongsTo(Article, User);

//   Connect to DB using created models
db.link([User, Article]);

//   Create tables: Sync DB and drop if not found
await db.sync({ drop: true });

await db.close();

export default <dbClient>{
  client: db,
  models: {
    Article: Article,
    User: User,
  },
};
