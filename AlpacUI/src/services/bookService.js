
const API_URL = 'https://localhost:7058/api/book';

export const getBooks = async (filters = {}) => {
    // URLSearchParams es nativo y muy útil para armar query strings limpios
    const query = new URLSearchParams();
    if (filters.genre) query.append('genre', filters.genre);
    if (filters.available !== '') query.append('available', filters.available);

    const response = await fetch(`${API_URL}?${query.toString()}`);
    if (!response.ok) throw new Error('Error al obtener los libros');
    return await response.json();
};

export const createBook = async (bookData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    });

    if (!response.ok) {
        // Aquí atrapamos el error 400 Bad Request que programaste en el controlador de .NET
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocurrió un problema al registrar el libro.');
    }

    return await response.json();
    
};

export const updateBook = async (id, bookData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al actualizar el libro');
    }
};

export const deleteBook = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar el libro');
};