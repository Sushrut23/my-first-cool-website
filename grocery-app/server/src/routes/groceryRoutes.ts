import { Router } from 'express';
import { GroceryController } from '../controllers/groceryController';

const router = Router();
const controller = new GroceryController();

router.post('/add-item', (req, res) => controller.addItem(req, res));
router.get('/items-by-date', (req, res) => controller.getItemsByDate(req, res));

export default router;
