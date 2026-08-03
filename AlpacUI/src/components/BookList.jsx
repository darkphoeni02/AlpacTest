import { deleteBook } from '../services/bookService';

export const BookList = ({ books, loading, error, onRefresh, onEdit }) => {

    // Función para manejar la eliminación con confirmación
    const handleDelete = async (id) => {
        // window.confirm es nativo, bloquea la pantalla y retorna true/false
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                await deleteBook(id);
                onRefresh(); // Recargamos la tabla tras eliminar
            } catch (err) {
                alert('No se pudo eliminar: ' + err.message);
            }
        }
    };

    if (loading) return <p>Cargando el catálogo de libros...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (books.length === 0) return <p>No hay libros que coincidan con la búsqueda.</p>;

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#eee', textAlign: 'left' }}>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Género</th>
                    <th>Estado</th>
                    <th>Acciones</th> {/* Nueva columna */}
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.available ? '🟢' : '🔴'}</td>
                        <td>
                            {/* Botones de acción */}
                            <button onClick={() => onEdit(book)} style={{ marginRight: '5px' }}>Editar</button>
                            <button onClick={() => handleDelete(book.id)} style={{ color: 'red' }}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};