import { pool } from "../../config/db";

const getTodos = async () => {
  const result = await pool.query(`SELECT * from todos`);
  return result;
};

const postTodos = async (userId: string, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
    [userId, title]
  );
  return result;
};

const updateTodo = async (userId: string, title: string, id: string) => {
  const result = await pool.query(
    `UPDATE todos set user_id=$1, title=$2 WHERE id=$3 RETURNING *`,
    [userId, title, id]
  );
  return result;
};

const deleteTodo = async (id: string) => {
  const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
  return result;
};
export const todoServices = {
  getTodos,
  postTodos,
  updateTodo,
  deleteTodo,
};
