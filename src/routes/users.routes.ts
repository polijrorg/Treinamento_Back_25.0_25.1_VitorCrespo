/**
 * ================================================================
 * 🌐 HEROES ROUTER
 *
 * Este arquivo define as rotas HTTP para interagir com os heróis.
 *
 * Para que serve?
 * - As rotas recebem as requisições HTTP feitas pelo cliente (ex: frontend, Insomnia, Postman).
 * - Cada rota chama um método do Service, que contém a lógica de negócio.
 *
 * Como se relaciona com os outros arquivos?
 * ➝ Rotas chamam métodos do HeroService
 * ➝ HeroService processa dados e chama o HeroRepository
 * ➝ HeroRepository lida com os dados (array ou banco)
 *
 * 📌 Estrutura geral:
 * - POST    /heroes       → Criar herói
 * - GET     /heroes       → Listar todos os heróis
 * - GET     /heroes/:id   → Buscar herói por ID
 * - PUT     /heroes/:id   → Atualizar herói
 * - DELETE  /heroes/:id   → Remover herói
 * ================================================================
 */

import { Router } from 'express';

import UserService from '../services/UserService';

const usersRouter = Router();


usersRouter.post('/create', (req, res) => {
  const { name, email, passw } = req.body;

  if (!name || !email || !passw) {
    return res.status(400).json({
      message: 'Campos "name", "email" e "passw" são obrigatórios',
    });
  }

  const hero = UserService.create(name, email, passw);
  return res.status(201).json(hero);
});


usersRouter.get('/getAll', (req, res) => {
  const heroes = UserService.listAll();
  return res.json(heroes);
});


usersRouter.get('/getById/:id', (req, res) => {
  const hero = UserService.findById(req.params.id);

  if (!hero) {
    return res.status(404).json({ message: 'User não encontrado' });
  }

  return res.json(hero);
});


usersRouter.put('/update/:id', (req, res) => {
  const { name, email, passw } = req.body;

  if (!name || !email || !passw) {
    return res.status(400).json({
      message: 'Campos "name", "email" e "passw" são obrigatórios',
    });
  }

  const updatedUser = UserService.update(req.params.id, name, email, passw);

  if (!updatedUser) {
    return res.status(404).json({ message: 'User não encontrado' });
  }

  return res.json(updatedUser);
});


usersRouter.delete('/delete/:id', (req, res) => {
  const deleted = UserService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'User não encontrado' });
  }

  return res.status(204).send(); // Sem conteúdo
});


export default usersRouter;
