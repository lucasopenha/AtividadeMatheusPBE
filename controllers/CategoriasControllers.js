import Categorias from '../models/Categorias.js';

async function index(req, res){
    try {
        const categoria = await Categorias.getAllCategorias()
        return res.json(categoria);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar categoria" })
    }
}

async function store(req, res) {
    try {
        const categoria = req.body;

        await Categorias.createCategorias(categoria);
        res.status(201).json({ message: "Categoria cadastrado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar categoria" });
    }
}

async function update(req, res) {
    try {
        const {id} = req.params
        const categoria = req.body

        await Categorias.updateCategoria(id, categoria)
        res.status(201).json({ message: "Categoria atualizado com sucesso!"   })
    } catch (error) {
        res.json({ error: "Erro ao atualizar categoria!" })
    }
}

async function destroyer(req, res){
    try {
        const { id } = req.params;
        
        await Categorias.deleteCategoria(id);
        res.status(200).json({ message: "Categoria removido com sucesso!" })
    } catch (error){
        res.json({ message: "Erro ao remover categoria!" })
    }
}

export default { index, store, update, destroyer }