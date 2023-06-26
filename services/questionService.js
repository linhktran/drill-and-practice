import { sql } from "../database/database.js";

const addQuestionForTopic = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions(user_id, topic_id, question_text) 
                VALUES (${user_id}, ${topic_id}, ${question_text})`;
};

const listQuestionsOfTopic = async (topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;

    return rows;
};

const listOneQuestion = async (id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${id};`

    return rows;
};

const listAllQuestions = async () => {
    const rows = await sql`SELECT * FROM questions;`

    return rows;
}

const deleteQuestionForTopic = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${id};`
};

export { addQuestionForTopic, listQuestionsOfTopic, listOneQuestion, listAllQuestions, deleteQuestionForTopic }