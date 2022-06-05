import { Router } from 'express';
import {
  findQuestions,
  findQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/question.controller';
import checkAuth from '../middlewares/authenticate';

export default Router()
  .get('/question', findQuestions)
  .get('/question/:id', findQuestionById)
  .post('/question', checkAuth, createQuestion)
  .put('/question/:id', checkAuth, updateQuestion)
  .delete('/question/:id', checkAuth, deleteQuestion);
