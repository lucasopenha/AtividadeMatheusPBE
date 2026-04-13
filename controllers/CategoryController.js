import Categorias from "../services/CategoryService.js";

class CategoryController {
  async index(req, res) {
    try {
      const categoria = await Categorias.listar();
      return res.json(categoria);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  }

  async store(req, res) {
    try {
      const categoria = req.body;

      await Categorias.criarCategoria(categoria);
      res.status(201).json({ message: "Categoria cadastrado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar categoria" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const categoria = req.body;

      await Categorias.atualizar(id, categoria);
      res.status(201).json({ message: "Categoria atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar categoria!" });
    }
  }

  async destroyer(req, res) {
    try {
      const { id } = req.params;
      await Categorias.delete(id);
      res.status(201).json({ message: "Categoria removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover categoria!" });
    }
  }
}
export default new CategoryController();
