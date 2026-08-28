function MovieCard({ movie, onRemove }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {movie.cover ? (
          <img src={movie.cover} alt={`Capa de ${movie.title}`} />
        ) : (
          <div className="poster-placeholder" aria-label="Filme sem capa">✦</div>
        )}
        <span className="movie-year">{movie.year}</span>
      </div>
      <div className="movie-details">
        <div>
          <p className="movie-genre">{movie.genre}</p>
          <h3>{movie.title}</h3>
        </div>
        <button
          className="remove-button"
          type="button"
          onClick={() => onRemove(movie.id)}
          aria-label={`Remover ${movie.title}`}
          title="Remover filme"
        >
          ×
        </button>
      </div>
    </article>
  );
}

export default function MovieList({ movies, onRemove }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">⌁</span>
        <h3>Nenhum filme encontrado</h3>
        <p>Tente outro título ou gênero, ou cadastre uma nova história.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onRemove={onRemove} />
      ))}
    </div>
  );
}