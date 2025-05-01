//aquí está la logica de cada endpoint
const programasVueloService = require('../services/programasVueloService');

// Endpoint para obtener todos los programas de vuelo
exports.getAllProgramas = async (req, res) => {
    try {
        const programas = await programasVueloService.getAllProgramas();
        res.status(200).json(programas);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo programas de vuelo', error });
    }
};

// Endpoint para obtener un programa de vuelo por ID
exports.getProgramaById = async (req, res) => {
    try {
        const programa = await programasVueloService.getProgramaById(req.params.id);
        if (programa) {
            res.status(200).json(programa);
        } else {
            res.status(404).json({ message: 'Programa de vuelo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo programa de vuelo', error });
    }
};
