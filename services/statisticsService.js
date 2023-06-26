import { sql } from "../database/database.js";

const topic_count = async () => {
  const rows = await sql`SELECT COUNT(id) FROM topics`;
  return rows[0].count;
};

const question_count = async () => {
  const rows = await sql`SELECT COUNT(id) FROM questions`;
  return rows[0].count;
};

const answer_count = async () => {
  const rows = await sql`SELECT COUNT(id) FROM question_answers`;
  return rows[0].count;
};

export { topic_count, question_count, answer_count };