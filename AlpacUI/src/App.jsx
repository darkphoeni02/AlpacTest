import { useState } from 'react';
import { BookList } from "./components/BookList.jsx";
import { BookForm } from "./components/BookForm.jsx";
import { useBooks } from "./hooks/useBooks.js";
function App() {
  // Estado para los filtros de búsqueda
  const [filters, setFilters] = useState({ genre: '', available: '' });
  
  // Estado para saber si estamos editando un libro
  const [bookToEdit, setBookToEdit] = useState(null);

  const { books, loading, error, refetch } = useBooks(filters);

  const handleFilterChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Sistema de Gestión de Editorial</h1>
      </header>
      
      {/* SECCIÓN DE FILTROS */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <strong>Filtros: </strong>
          <input 
              type="text" name="genre" placeholder="Buscar por género..." 
              value={filters.genre} onChange={handleFilterChange}
              style={{ marginRight: '10px' }}
          />
          <select name="available" value={filters.available} onChange={handleFilterChange}>
              <option value="">Todos (Disponibilidad)</option>
              <option value="true">Disponibles</option>
              <option value="false">Prestados</option>
          </select>
      </div>

      <main style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <section style={{ flex: '1', minWidth: '300px' }}>
            {/* Pasamos el libro a editar y la función onSuccess */}
            <BookForm 
                onSuccess={() => { refetch(); setBookToEdit(null); }} 
                bookToEdit={bookToEdit}
                onCancel={() => setBookToEdit(null)}
            /> 
        </section>

        <section style={{ flex: '2', minWidth: '400px' }}>
            <BookList 
                books={books} loading={loading} error={error} 
                onRefresh={refetch}
                onEdit={(book) => setBookToEdit(book)}
            />
        </section>
      </main>
    </div>
  );
}

export default App;