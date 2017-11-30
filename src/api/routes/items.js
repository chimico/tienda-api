import Router from 'express';
import ItemService from '../services/ItemService.js';

const router = Router();
const itemService = new ItemService();

router.get('', (req, res) => {
  return res.json(itemService.list(req.query));
});

router.post('', (req, res) => {
  return res.json({
    id: itemService.save(req.body),
  });
});

router.patch('/:id', (req, res) => {
  const item = req.body;
  item.id = Number.parseInt(req.params.id, 10);
  return res.json(itemService.save(item));
});

router.delete('/:id', (req, res) => {
  return res.json(itemService.erase(req.params.id));
});

export default router;
