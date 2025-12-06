"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoServices = void 0;
const db_1 = require("../../config/db");
const getTodos = async () => {
    const result = await db_1.pool.query(`SELECT * from todos`);
    return result;
};
const postTodos = async (payload) => {
    const { user_id, title } = payload;
    const result = await db_1.pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`, [user_id, title]);
    return result;
};
const updateTodo = async (userId, title, id) => {
    const result = await db_1.pool.query(`UPDATE todos set user_id=$1, title=$2 WHERE id=$3 RETURNING *`, [userId, title, id]);
    return result;
};
const deleteTodo = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    return result;
};
exports.todoServices = {
    getTodos,
    postTodos,
    updateTodo,
    deleteTodo,
};
