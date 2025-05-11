
import { Router } from 'express';

import PiuService from '../services/PiuService';

const piusRouter = Router();

piusRouter.post('/create', (req, res) => {
  const { content, likeN, chatN, date, lastCDate } = req.body;

  if (content.length > 140 || content.length == 0) {
    return res.status(400).json({
      message: 'Número de caracteres precisa estar entre 1 e 140',
    });
  }

  const piu = PiuService.create(content, likeN, chatN, date, lastCDate);
  return res.status(200).json(piu);
});

piusRouter.delete('/delete/:id', (req, res) => {
  const deleted = PiuService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Piu não encontrado' });
  }

  return res.status(200).send(); // Sem conteúdo
});

piusRouter.get('/getAll', (req, res) => {
  const pius = PiuService.listAll();
  return res.json(pius);
});


piusRouter.get('/getById/:id', (req, res) => {
  const piu = PiuService.findById(req.params.id);

  if (!piu) {
    return res.status(404).json({ message: 'Piu não encontrado' });
  }

  return res.json(piu);
});


export default piusRouter;
