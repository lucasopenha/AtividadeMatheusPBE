import pool from "../database/connection.js";

class CategoryRepository {
  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async getAllCategorias() {
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  }

  async createCategorias(categorias) {
    const { nome, descricao } = categorias;

    const [result] = await pool.query(
      `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`,
      [nome, descricao],
    );
    return result.insertId;
  }

  async updateCategoria(id, Categoria) {
    const { nome, descricao } = Categoria;
    const [result] = await pool.query(
      `UPDATE categorias SET 
        nome = ?,
        descricao = ?
        WHERE id = ?
        `,
      [nome, descricao, id],
    );
    return result.affectedRows;
  }

  async deleteCategoria(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id])

    return result.affectedRows;
  }

  async uptadeStatus(id, status) {
    const [rows] = await pool.query(
      "UPTADE categorias SET status = ? WHERE id = ?",
      [status, id],
    );
    return rows;
  }
}

export default new CategoryRepository();
