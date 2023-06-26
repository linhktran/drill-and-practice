import { sql } from "../database/database.js";

const listAllTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name;`

    return rows;
};

const addTopic = async (user_id, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${user_id}, ${name});`
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM topics WHERE id = ${id};`
};

const listOneTopic = async (id) => {
    const rows = await sql`SELECT * FROM topics WHERE id = ${id};`

    return rows;
};

export{ addTopic, deleteTopic, listAllTopics, listOneTopic }