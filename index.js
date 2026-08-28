import React from 'react';
import Header from 'Header'; // ou o nome do seu componente de Header[cite: 2]
import MovieList from './MovieList'; //[cite: 5]

export default function App() {
  return (
    <div className="app-shell">
      <Header movieCount={0} />
      <main className="content-layout">
        <MovieList movies={[]} onRemove={() => {}} />
      </main>
    </div>
  );
}