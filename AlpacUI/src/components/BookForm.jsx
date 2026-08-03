import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/bookService';

export const BookForm = ({ onSuccess, bookToEdit, onCancel }) => {
    const initialState = {
        title: '', author: '', year: new Date().getFullYear(), genre: 'General', synopsis: '', available: true
    };
    
    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // 🟢 ESTA ES LA CLAVE: Escucha si llega un libro para editar y rellena los campos
    useEffect(() => {
        if (bookToEdit) {
            setFormData(bookToEdit);
        } else {
            setFormData(initialState);
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg(null);

        try {
            const dataToSend = { ...formData, year: parseInt(formData.year) };
            
            // Si estamos editando, hacemos PUT. Si no, hacemos POST.
            if (bookToEdit) {
                await updateBook(bookToEdit.id, dataToSend);
            } else {
                await createBook(dataToSend);
            }
            
            setFormData(initialState);
            onSuccess(); // Refresca la tabla y limpia el estado de edición
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>{bookToEdit ? 'Editar Libro' : 'Registrar Nuevo Libro'}</h3>
            
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <input type="text" name="title" placeholder="Título (Obligatorio)" required value={formData.title} onChange={handleChange} />
    <input type="text" name="author" placeholder="Autor (Obligatorio)" required value={formData.author} onChange={handleChange} />
    <input type="number" name="year" placeholder="Año" required value={formData.year} onChange={handleChange} />
    <input type="text" name="genre" placeholder="Género" value={formData.genre} onChange={handleChange} />
    
    {/* 🟢 NUEVO: Checkbox para controlar la disponibilidad */}
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input 
            type="checkbox" 
            name="available" 
            checked={formData.available} 
            onChange={handleChange} 
        />
        Libro Disponible para préstamo
    </label>
    
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit" disabled={isSubmitting} style={{ flex: '1' }}>
            {isSubmitting ? 'Guardando...' : (bookToEdit ? 'Actualizar' : 'Guardar')}
        </button>
        
        {bookToEdit && (
            <button type="button" onClick={onCancel} style={{ flex: '1', backgroundColor: '#ccc' }}>
                Cancelar
            </button>
        )}
    </div>
</form>
        </div>
    );
};