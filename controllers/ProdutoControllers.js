import Produto from '../models/Produto.js'

async function index(req, res){
    try {
        const produtos = await Produto.getAllProducts()
        return res.json(produtos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar produtos" })
    }
}

async function store(req, res) {
    try {
        const produto = req.body;

        await Produto.createProduct(produto);
        res.status(201).json({ message: "Produto cadastrado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar produto" });
    }
}

async function update(req, res) {
    try {
        
        const {id} = req.params
        const produto = req.body

        await Produto.updateProduct(id, produto)
        res.status(201).json({ message: "Produto atualizado com sucesso!"})
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar produto!" })
    }
}

async function destroyer(req, res){
    try {
        const { id } = req.params;
        
        await Produto.deleteProduct(id);
        res.status(200).json({ message: "Produto removido com sucesso!" })
    } catch (error){
        res.json({ message: "Erro ao remover pdroduto!" })
    }
}

export default { index, store, update, destroyer }     