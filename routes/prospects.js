import express from 'express';
import Prospect from '../models/prospect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { sortBy = 'score', order = 'desc', page = 1, limit = 10 } = req.query;

    // Validar parámetros
    const validSortFields = ['name', 'email', 'country', 'jobTitle', 'yearsOfExperience', 'industry', 'companySize', 'score'];
    const validOrders = ['asc', 'desc'];

    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({ error: `El campo de ordenamiento "${sortBy}" no es válido. Campos permitidos: ${validSortFields.join(', ')}` });
    }

    if (!validOrders.includes(order)) {
      return res.status(400).json({ error: `El orden "${order}" no es válido. Valores permitidos: asc, desc` });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum <= 0) {
      return res.status(400).json({ error: 'El parámetro "page" debe ser un número mayor que 0.' });
    }

    if (isNaN(limitNum) || limitNum <= 0) {
      return res.status(400).json({ error: 'El parámetro "limit" debe ser un número mayor que 0.' });
    }

    // Calcular opciones de consulta
    const sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
    const skip = (pageNum - 1) * limitNum;

    // Obtener los prospects
    const prospects = await Prospect.find()
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const totalDocuments = await Prospect.countDocuments();

    res.json({
      total: totalDocuments,
      page: pageNum,
      limit: limitNum,
      data: prospects,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los prospects' });
  }
});

export default router;