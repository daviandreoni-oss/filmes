export default function Header({ movieCount }) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true">F</span>
        <div>
          <p className="eyebrow">Minha coleção</p>
          <h1>Filmes em cartaz</h1>
        </div>
      </div>
      <div className="header-count" aria-label={`${movieCount} filmes cadastrados`}>
        <strong>{String(movieCount).padStart(2, '0')}</strong>
        <span>títulos salvos</span>
      </div>
    </header>
  );
}