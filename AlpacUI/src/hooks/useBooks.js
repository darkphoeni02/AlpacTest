import { useState, useEffect } from 'react';
import { getBooks } from '../services/bookService';

export const useBooks = () => {
    // 1. Definimos los estados requeridos por la prueba
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Función para cargar los datos
    const fetchBooks = async () => {
        try {
            // Reiniciamos los estados visuales antes de la petición
            setLoading(true);
            setError(null);
            
            // Llamamos al servicio (nuestro puente a .NET)
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            // Atrapamos el error que lanzamos en el bookService
            setError(err.message);
        } finally {
            // Sin importar si falló o tuvo éxito, detenemos el estado de carga
            setLoading(false);
        }
    };

    // 3. Ejecutamos la carga automáticamente al montar el componente
    useEffect(() => {
        fetchBooks();
    }, []);

    // 4. Exponemos lo necesario para la interfaz
    return { 
        books, 
        loading, 
        error, 
        refetch: fetchBooks // Útil por si necesitamos recargar la lista tras crear un libro
    };
};