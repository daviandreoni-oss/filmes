import React from 'react';

export const GENRES = [
  'Ação', 'Animação', 'Aventura', 'Comédia', 'Crime', 'Documentário',
  'Drama', 'Fantasia', 'Ficção Científica', 'Guerra', 'História', 'Horror',
  'Musical', 'Mistério', 'Romance', 'Suspense', 'Terror', 'Thriller', 'Western',
];

import ButtonComponent from './button.jsx';

export default function CadastroComponent({ onAdd }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const movie = {
      id: Date.now(),
      title: formData.get('title').trim(),
      genre: formData.get('genre'),
      year: formData.get('year').trim(),
      cover: formData.get('cover').trim(),
    };

    if (!movie.title || !movie.genre || !movie.year) return;
    onAdd(movie);
    event.currentTarget.reset();
  }

  return (
    <div className="form-panel">
      <div className="panel-heading">
        <span className="panel-number">01</span>
        <h2>Cadastrar filme</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Título do filme *<input name="title" type="text" placeholder="Ex: Matrix" required /></label>
        <div className="field-row">
          <label>Gênero *<select name="genre" defaultValue="" required><option value="" disabled>Escolha</option>{GENRES.map((genre) => <option key={genre}>{genre}</option>)}</select></label>
          <label>Ano *<input name="year" type="number" min="1888" max={new Date().getFullYear()} placeholder="2024" required /></label>
        </div>
        <label>URL da capa <span className="optional">(Opcional)</span><input name="cover" type="url" placeholder="https://..." /></label>
        <ButtonComponent type="submit" className="primary-button"><span>+</span> Cadastrar Filme</ButtonComponent>
      </form>
    </div>
  );
}