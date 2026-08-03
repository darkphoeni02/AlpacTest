
const API_URL = 'https://localhost:7058/api/book';

export const getBooks = async () => {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        throw new Error('Error de red al intentar obtener el catálogo de libros.');
    }
    
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