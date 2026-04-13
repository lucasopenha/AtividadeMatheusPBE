import ProdutoModel from "../models/ProductModel.js"
import ProdutoRepository from "../repositories/ProdutoRepository.js"
import CategoriasRepository from "../repositories/CategoryRepository.js";
import { ValidarCamposObrigatorios, validarPreco, validarEstoque } from "../validators/ProdutoValidator.js"

class ProdutoService{
    async listar(){
        return await ProdutoRepository.getAll();
    }

    async   criarProduto(data) {
        ValidarCamposObrigatorios(data)
        validarPreco(data)
        validarEstoque(data)

        let categoria = await CategoriasRepository.getById(data.categoria_id);

        if(!categoria) {
            throw new Error ("Categoria não existe!")
        }

        if(categoria.status === 0) {
            throw new  Error ("Não é possivel cadastrar produto em categoria desativada")
        }

        if (data.destaque) {
            const totalDestaques = await ProdutoRepository.countDestaques();

    if (totalDestaques >= 5) {
        throw new Error("Limite de produtos em destaque foi atingido!")
        }
    }

    // Model -> Cuida da estrutura dos dados
    const produto = new ProdutoModel(data);

    // Repository-> Cuida do banco
    return await ProdutoRepository.createProduct(produto);
    }

    async atualizar(id, data){
        if (!id) {
            throw new Error("ID do produto é obrigatorio")
        }

        const produtoAtual = await ProdutoRepository.getById(id);

        if (!produtoAtual) {
            throw new Error ("Produto não encontrado!")
        }

        if (data.categoria_id) {
            const categoria = await CategoriasRepository.getById(data.categoria_id)

            if(!categoria || categoria.status === 0) {
                throw new Error("Categoria invalida ou desativada!")
            }
        }

        ValidarCamposObrigatorios(data);
        validarPreco(data);
        validarEstoque(data);

        if(data.destaque && !produtoAtual.destaque) {
            const totalDestaques = await ProdutoRepository.countDestaques();

        if (totalDestaques >= 5) {
            throw new Error("Limite de produtos em destaque foi atingido!")
            }
        }

    // Model -> Cuida da estrutura dos dados
    const produto = new ProdutoModel(data);

    // Repository-> Cuida do banco
    return await ProdutoRepository.updateProduct(id, produto);
}

    async deletar(id) {
        if (!id) {
            throw new Error("ID do produto é obrigatorio")
        }

        return await ProdutoRepository.deleteProduct(id)
    }
}

export default new ProdutoService();