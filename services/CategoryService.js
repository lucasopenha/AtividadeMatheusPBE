import Categoria from "../models/CategoryModel.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js";

class CategoriaService {
  async listar() {
    return await CategoryRepository.getAllCategorias();
  }

  async criarCategoria(data) {
    const categoria = new Categoria(data);
    console.log(categoria);

    return await CategoryRepository.createCategorias(data);
  }

  async desativar(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID da categoria é obrigatorio");
    }

    const categoria = CategoryRepository.getById(id);

    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }

    await CategoryRepository.uptadeStatus(id, 0);

    await ProdutoRepository.desativarPorCategoria(id);

    return { message: "Categoria e produtos desativos com sucesso!" };
  }

  async atualizar(id, data) {
    if (!id) {
      throw new Error("ID do produto é obrigatorio");
    }

    const categoriaAtual = await CategoryRepository.getById(id);

    if (!categoriaAtual) {
      throw new Error("Produto não encontrado!");
    }

    const categoria = new Categoria(data);
    return await CategoryRepository.updateCategoria(id, data);
  }

  async delete(id) {
    const totalProdutos = await ProdutoRepository.countByCategoria(id);

    if (totalProdutos > 0) {
      throw new Error("Nao e possivel excluir categoria com produtos vinculados");
    }
    

    return await CategoryRepository.deleteCategoria(id);
  }
}
export default new CategoriaService();
