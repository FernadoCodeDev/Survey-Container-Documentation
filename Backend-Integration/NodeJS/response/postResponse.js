const express = require('express');
const router = express.Router(); 
const db = require('../../config/db'); // DB
const cors = require('cors'); //  cors

// CORS 
// In Node.js, CORS handling is done through a middleware.

const corsOptions = {
    origin: '*', // Access-Control-Allow-Origin: *
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'], 
    optionsSuccessStatus: 200 
};

// Application of the CORS middleware

router.use(cors(corsOptions));

// OPTIONS request
// The Express 'cors' middleware handles the OPTIONS request

// Middleware for the JSON request
router.use(express.json());

router.post('/', async (req, res) => {

    const data = req.body;

    if (!data.responses || !Array.isArray(data.responses)) {
        return res.status(400).json({ 
            error: 'Se espera un arreglo de respuestas bajo la llave "responses".' 
        });
    }

    const responses = data.responses;
    let connection;
    
    try {
        connection = await db.getConnection(); 
        
        await connection.beginTransaction();

        const sql = "INSERT INTO Response (id, content, questionId) VALUES (?, ?, ?)";
        
        for (const response of responses) {
            
            const responseId = 'id-' + Date.now().toString(36) + Math.random().toString(36).substring(2); 
            
            const content = response.content || '';
            const questionId = response.questionId || '';

            if (!content || !questionId) {
                continue;
            }

            const [result] = await connection.execute(sql, [responseId, content, questionId]);
            
        }

        // If the insertions were successful, then the transaction is confirmed.

        await connection.commit();
        
        res.status(200).json({ success: true, message: 'Respuestas publicadas correctamente.' });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error('Error al publicar respuestas:', error);
        
        res.status(500).json({ 
            error: 'Ocurrió un error al procesar las respuestas en la base de datos.' 
        });
    } finally {
        // release the connection to the pool to prevent the application from failing
        if (connection) {
            connection.release();
        }
    }
});

module.exports = router;