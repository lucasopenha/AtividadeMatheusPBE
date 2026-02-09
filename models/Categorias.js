import pool from "../database/connection.js";

async function getAllCategorias(){

    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
}

async function createCategorias(categorias) {
    const { nome, descricao} = categorias;


const [result] = await pool.query(`INSERT INTO categorias (nome, descricao) VALUES (?, ?)`,
    [
        nome,
        descricao
    ]    
)
return result.insertId;
}

async function updateCategoria(id, Categoria) {
    const { nome, descricao, } = Categoria;
    const [result] = await pool.query(`UPDATE categorias SET 
        nome = ?,
        descricao = ?
        WHERE id = ?
        `, [
            nome, 
            descricao,
            id
        ]
    )
        return result.affectedRows
}

async function deleteCategoria(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id])

    return result.affectedRows;
}

export default { getAllCategorias, createCategorias, updateCategoria, deleteCategoria }