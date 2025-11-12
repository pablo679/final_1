import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProductPage() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '', // Simplificado, pones la URL de la imagen (ej: images/Silla...png)
        // Inicializamos specs
        specs: { 
            medidas: '', 
            materiales: '',
            acabado: '',
            peso: ''
        }
    });
    const navigate = useNavigate();

    // Manejador genérico para campos simples
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // Manejador separado para el objeto 'specs'
    const handleSpecChange = (e) => {
         const { name, value } = e.target;
         setFormData(prev => ({ 
             ...prev, 
             specs: { ...prev.specs, [name]: value } 
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error('Error al crear el producto');
            
            const newProduct = await response.json();
            alert('¡Producto creado exitosamente!');
            
            // Usamos navigate para redirigir al usuario 
            navigate(`/productos/${newProduct.id}`); 
        } catch (err) {
            alert(err.message);
        }
    };
    
    // Usamos las clases de CSS existentes para mantener el estilo
    return (
        <section className="contact-section">
            <div className="container">
                <div className="contact-header">
                    <h1>Crear Nuevo Producto (Admin)</h1>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Producto</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio (número)</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Ruta de Imagen (ej: images/Silla.png)</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea id="description" name="description" rows="6" value={formData.description} onChange={handleChange} required></textarea>
                    </div>

                    <h4>Especificaciones</h4>
                    <div className="form-group">
                        <label htmlFor="medidas">Medidas</label>
                        <input type="text" id="medidas" name="medidas" value={formData.specs.medidas} onChange={handleSpecChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="materiales">Materiales</label>
                        <input type="text" id="materiales" name="materiales" value={formData.specs.materiales} onChange={handleSpecChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="acabado">Acabado</label>
                        <input type="text" id="acabado" name="acabado" value={formData.specs.acabado} onChange={handleSpecChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="peso">Peso</label>
                        <input type="text" id="peso" name="peso" value={formData.specs.peso} onChange={handleSpecChange} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Crear Producto</button>
                </form>
            </div>
        </section>
    );
}

export default CreateProductPage;