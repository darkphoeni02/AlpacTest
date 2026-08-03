// src/components/BookList.jsx
import { useBooks } from '../hooks/useBooks';

export const BookList = () => {
    // Consumimos nuestro Custom Hook limpiamente
    const { books, loading, error } = useBooks();

    // 1. Manejo visible del estado: Cargando
    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Cargando el catálogo de libros...</p>
            </div>
        );
    }

    // 2. Manejo visible del estado: Error
    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
                <p>Ocurrió un problema: {error}</p>
                <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
        );
    }

    // 3. Manejo visible del estado: Vacío
    if (books.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>No hay libros registrados en este momento.</p>
            </div>
        );
    }

    // 4. Manejo visible del estado: Éxito (Renderizado de la tabla)
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h2>Catálogo de Libros</h2>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Título</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Autor</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Año</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Género</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{book.title}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{book.author}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{book.year}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{book.genre}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {book.available ? '🟢 Disponible' : '🔴 Prestado'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};