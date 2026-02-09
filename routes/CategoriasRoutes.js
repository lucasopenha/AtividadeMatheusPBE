import express from 'express'
import CategoriaController from '../controllers/CategoriasControllers.js'

const router = express.Router();

router.get("/", CategoriaController.index)
router.post("/", CategoriaController.store)
router.put("/:id", CategoriaController.update)
router.delete("/:id", CategoriaController.destroyer)

export default router;