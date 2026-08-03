
import { BookList } from './components/BookList';

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Sistema de Gestión de Editorial</h1>
        <hr style={{ maxWidth: '800px', border: '1px solid #eee' }} />
      </header>
      
      <main>
        {/* Aquí renderizamos nuestro componente */}
        <BookList />
      </main>
    </div>
  );
}

export default App;