import { Request, Response } from 'express';
import Category from '../models/Category.model';

export const findCategories = async (req: Request, res: Response) => {
  try {
    let categories:any;

    if(req.query.name == '' || req.query.name == undefined){
      categories = await Category.findAll();
    } else {
      categories = await Category.findByName(req.query.name as string);
    }
    
    if (categories == undefined || categories.length < 1 )
    {
      return res.status(404).send();
    }
    res.send({
      data: categories,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};

export const findCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send({
        message: 'Not found',
      });
    }

    res.send({
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Server error',
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description
    });
    res.send({
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
      error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.send({
      data: category[0],
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const rows = await Category.destroy({ where: { id: req.params.id }});
    res.send({
      data: rows,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
    });
  }
};
