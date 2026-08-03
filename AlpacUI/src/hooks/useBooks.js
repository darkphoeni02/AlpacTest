import { useState, useEffect, useCallback } from 'react';
import { getBooks } from '../services/bookService';

export const useBooks = (filters = {}) => { // Aseguramos un valor por defecto
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getBooks(filters);
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters.genre, filters.available]); // 🟢 CLAVE: React observa estas dos variables

    // 🟢 CLAVE: El useEffect debe ejecutarse cada vez que fetchBooks cambie
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]); 

    return { books, loading, error, refetch: fetchBooks };
};