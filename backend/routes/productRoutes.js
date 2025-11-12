
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // 1. ¡Importamos el modelo!

// 2. Ya no necesitamos importar el JSON
// const products = require('../data/products.json');

// --- ENDPOINTS CRUD ---

// 1. GET /api/productos (Leer TODOS)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los productos: " + err.message });
    }
});

// 2. GET /api/productos/:id (Leer UNO)
router.get('/:id', async (req, res) => {
    try {
        // req.params.id será el _id de MongoDB
        const product = await Product.findById(req.params.id); 
        
        if (product) {
            res.json(product); // Devuelve el producto encontrado
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el producto: " + err.message });
    }
});

// 3. POST /api/productos (Crear UNO)
router.post('/', async (req, res) => {

    try {
        // --- INICIO DE LA SOLUCIÓN DE LÍMITE ---
        const productCount = await Product.countDocuments();
        
        // El límite.
        if (productCount >= 11) {
            return res.status(403).json({ 
                message: "Límite de productos alcanzado. No se pueden agregar más." 
            });
        }
        // --- FIN DE LA SOLUCIÓN DE LÍMITE ---

        // Los datos del nuevo producto vienen en el body (req.body)
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            specs: req.body.specs
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct); // 201 = Creado exitosamente

    } catch (err) {
        // Esto atrapará errores tanto del 'countDocuments' como del 'save'
        res.status(400).json({ message: "Error al crear el producto: " + err.message });
    }
});

// 4. PUT /api/productos/:id (Actualizar UNO)
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // El ID del producto a actualizar
            req.body,      // Los datos nuevos que vienen en el body
            { new: true }  // Esta opción hace que devuelva el documento actualizado
        );
        
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ message: "Error al actualizar el producto: " + err.message });
    }
});

// 5. DELETE /api/productos/:id (Borrar UNO)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (deletedProduct) {
            res.json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el producto: " + err.message });
    }
});

module.exports = router;