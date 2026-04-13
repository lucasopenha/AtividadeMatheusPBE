import ProdutoServices from '../services/ProductService.js';


class ProdutoController {
    async index (req, res, next) {  
        try {
            const produtos = await ProdutoServices.listar();
            return res.json(produtos)
        } catch (error) {
        
            next(error); 
        }
    }

    async store(req, res, next) {
        try {
        await ProdutoServices.criarProduto(req.body);
        res.status(201).json({ message: "Produto cadastrado com sucesso!" });
        } catch (error) {
            next(error)
        }
    }

    async uptade(req, res, next){
        try{
            const {id} = req.params;

        await ProdutoServices.atualizar(id, req.body);
        res.status(201).json({ message: "Produto atualizado com sucesso!"})
    } catch (error) {
       next(error)
     }
     }

     async destroy(req, res, next) {
    try {
        const { id } = req.params;
        
        await ProdutoServices.deletar(id);
        res.status(201).json({ message: "Produto removido com sucesso!"})
    } catch (error) {
       next(error)
    }
 }
}

export default new ProdutoController();
   