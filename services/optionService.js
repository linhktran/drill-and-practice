import { sql } from "../database/database.js";

const addAnswerOptionForQuestion = async (question_id, option_text, is_correct) => {
    await sql`INSERT INTO question_answer_options(question_id, option_text, is_correct)
                VALUES (${question_id}, ${option_text}, ${is_correct});`
};

const deleteAnswerOptionForQuestion = async (id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${id};`
};

const listOptions = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id};`

    return rows;
};

const listCorrectOptions = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id} AND is_correct = true;`

    return rows;
};

const countOptions = async (question_id) => {
    const rows = await sql`SELECT COUNT(*) FROM question_answer_options WHERE question_id = ${question_id};`

    return Number(rows[0].count);
};

const addQuestionAnswer = async (user_id, question_id, question_answer_option_id) => {
    await sql`INSERT INTO question_answers(user_id, question_id, question_answer_option_id)
                VALUES (${user_id}, ${question_id}, ${question_answer_option_id});`
};

const findOptionById = async (id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${id};`

    return rows;
};

export { addAnswerOptionForQuestion, deleteAnswerOptionForQuestion, listOptions, countOptions, addQuestionAnswer, findOptionById, listCorrectOptions }