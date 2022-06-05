import { Request, Response } from 'express';
import Question from '../models/Question.model';

export const findQuestions = async (_: Request, res: Response) => {
  try {
    const questions = await Question.findAll();
    res.send({
      data: questions,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};

export const findQuestionById = async (req: Request, res: Response) => {
  try {
    let question : any;

    if (req.params.id == 'random'){
      question = await Question.getRandom();
    } else {
      question = await Question.findByPk(req.params.id);
    }
    
    if (!question) {
      return res.status(404).send({
        message: 'Not found',
      });
    }

    res.send({
      data: question,
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Server error',
    });
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { text, answers, categoryId } = req.body;
    const question = await Question.create({
      text,
      answers,
      categoryId,
      creatorId: req.user?.id,
    });
    res.send({
      data: question,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
      error,
    });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.send({
      data: question,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    await Question.destroy({ where: { id: req.params.id }});
    res.send({
      data: {},
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};
