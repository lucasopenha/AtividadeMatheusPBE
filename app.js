import express from 'express';
import cors from 'cors';
import ProdutosRoutes from './routes/ProdutosRoutes.js'
import CategoriasRoutes from './routes/CategoriasRoutes.js'
import errorHandler from './middlewares/errorHandler.js';


const app = express();

app.use(cors());
app.use(express.json());

// http://localhost:3306/produtos
app.use("/produtos", ProdutosRoutes);

app.use("/categorias", CategoriasRoutes);

app.use(errorHandler);
export default app;
