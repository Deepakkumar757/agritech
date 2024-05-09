import knex, { Knex } from "knex";
import { mockData } from "./mockData";

class Db {
  db: Knex | null = null;
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      this.db = knex({
        client: "mysql2",
        connection: {
          host: "localhost",
          port: 3306,
          user: "root",
          password: "Deepak@123",
          database: "dteagritech",
        },
        debug: true,
      });
      await this.db.raw("Select 1+1;");
      if (
        !(await this.db("questions").count("questionId", { as: "total" }))[0][
          "total"
        ]
      ) {
        console.log("Hello all");
        this.insertSampleData();
      }
      console.log("connection estalished");
    } catch (err) {
      console.log("Connection error", err);
    }
  }

  async insertSampleData() {
    try {
      await this.db?.transaction(async (trx) => {
        for (const data of mockData["options"]) {
          await trx("options").insert(data);
        }
        for (const data of mockData["questions"]) {
          await trx("questions").insert(data);
        }
      });
    } catch (error) {}
  }

  async getQuestionAndOptions() {
    try {
      const questions = await this.db?.select("*").from("questions");
      const options = await this.db?.select("*").from("options");
      return { questions, options };
    } catch (error) {
      console.error(error);
      return { questions: [], options: [] };
    }
  }
}

const Init = new Db();

export default Init;
