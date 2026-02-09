import express from 'express'
import ProdutosController from '../controllers/ProdutoControllers.js'

const router = express.Router();

router.get("/", ProdutosController.index)
router.post("/", ProdutosController.store)
router.put("/:id", ProdutosController.update)
router.delete("/:id", ProdutosController.destroyer)

export default router;