import Header from './header.jsx';
import MovieList from './list.jsx';

const INITIAL_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Ficção Científica',
    year: '2010',
    cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80',
  },
  {
    id: 2,
    title: 'Interstellar',
    genre: 'Ficção Científica',
    year: '2014',
    cover: '',
  },
];

export default function App() {
  const [movies, setMovies] = React.useState(() => {
    const savedMovies = localStorage.getItem('my_movies_collection');
    if (savedMovies) {
      try {
        return JSON.parse(savedMovies);
      } catch (error) {
        console.error('Erro ao ler localStorage:', error);
      }
    }
    return INITIAL_MOVIES;
  });

  const [title, setTitle] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [year, setYear] = React.useState('');
  const [cover, setCover] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('my_movies_collection', JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !genre.trim() || !year.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
      year: year.trim(),
      cover: cover.trim(),
    };

    setMovies((prev) => [newMovie, ...prev]);

    setTitle('');
    setGenre('');
    setYear('');
    setCover('');
  };

  const handleRemoveMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const genres = Array.from(new Set(movies.map((m) => m.genre))).filter(Boolean);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="app-shell">
      <Header movieCount={movies.length} />

      <main className="content-layout">
        <aside>
          <div className="form-panel">
            <div className="panel-heading">
              <span className="panel-number">01</span>
              <h2>Cadastrar filme</h2>
            </div>

            <form onSubmit={handleAddMovie}>
              <label>
                Título do filme *
                <input
                  type="text"
                  placeholder="Ex: Matrix"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>

              <div className="field-row">
                <label>
                  Gênero *
                  <input
                    type="text"
                    placeholder="Ex: Ação"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                </label>

                <label>
                  Ano *
                  <input
                    type="text"
                    placeholder="2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </label>
              </div>

              <label>
                URL da Capa <span className="optional">(Opcional)</span>
                <input
                  type="url"
                  placeholder="https://..."
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                />
              </label>

              <button className="primary-button" type="submit">
                <span>+</span> Cadastrar Filme
              </button>
            </form>
          </div>

          <div className="aside-note">
            <span>🎬</span>
            <p>Adicione suas histórias favoritas e organize sua coleção pessoal.</p>
            <span>🎬</span>
          </div>
        </aside>

        <section>
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">Catálogo</p>
              <h2>Sua Coleção</h2>
            </div>
            <div className="stats">
              <div>
                <strong>{movies.length}</strong>
                <span>Total</span>
              </div>
              <div>
                <strong>{filteredMovies.length}</strong>
                <span>Exibindo</span>
              </div>
            </div>
          </div>

          <div className="filter-bar">
            <div className="search-field">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="select-field">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">Todos os gêneros</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <span>▾</span>
            </div>
          </div>

          <div className="results-line">
            <span>Exibindo {filteredMovies.length} títulos</span>
            {(search || selectedGenre) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedGenre('');
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>

          <MovieList movies={filteredMovies} onRemove={handleRemoveMovie} />
        </section>
      </main>

      <footer>
        <p>© Coleção de Filmes. Todos os direitos reservados.</p>  
      </footer>
    </div>
  );
}