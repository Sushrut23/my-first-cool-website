import { Router } from 'express';
import { GroceryController } from '../controllers/groceryController';

const router = Router();
const controller = new GroceryController();

router.post('/add-item', async (req, res, next) => {
  try {
    await controller.addItem(req, res);
  } catch (err) {
    next(err);
  }
});
router.get('/items-by-date', async (req, res, next) => {
  try {
    await controller.getItemsByDate(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
