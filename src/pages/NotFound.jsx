import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NotFound.css';

const LEFT_BOOKS = [
  { id: 'sw', title: 'Ingeniería de Software', code: 'QA-76', variant: 'blue-dark', size: 'tall' },
  { id: 'calc', title: 'Cálculo Integral', code: 'QA-303', variant: 'red', size: 'md' },
  { id: 'db', title: 'Bases de Datos', code: 'QA-78', variant: 'blue', size: 'short' },
  { id: 'hist', title: 'Historia Universal', code: 'D-20', variant: 'red-dark', size: 'tall' }
];

const RIGHT_BOOKS = [
  { id: 'alg', title: 'Algoritmos', code: 'QA-09', variant: 'blue', size: 'lean' },
  { id: 'net', title: 'Redes de Datos', code: 'TK-51', variant: 'red', size: 'tall' },
  { id: 'met', title: 'Metodología', code: 'Q-180', variant: 'blue-dark', size: 'short' },
  { id: 'est', title: 'Tesis y Estadías', code: 'LB-23', variant: 'red-dark', size: 'md' }
];

function getDecodedPath(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const requestedPath = getDecodedPath(location.pathname);

  const handleToggleBook = (book) => {
    setSelectedItem((prev) =>
      prev?.id === book.id
        ? null
        : { id: book.id, code: book.code, title: book.title, type: 'book' }
    );
  };

  const handleToggleMissingSlot = () => {
    setSelectedItem((prev) =>
      prev?.id === 'missing-slot'
        ? null
        : {
            id: 'missing-slot',
            code: '404-EXT',
            title: 'Volumen extraviado o fuera de estantería',
            type: 'missing'
          }
    );
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const renderShelfBook = (book) => {
    const isActive = selectedItem?.id === book.id;
    return (
      <button
        key={book.id}
        type="button"
        className={`nf-book nf-book--${book.variant} nf-book--${book.size}${isActive ? ' nf-book--active' : ''}`}
        onClick={() => handleToggleBook(book)}
        aria-pressed={isActive}
        title={`${book.code} · ${book.title}`}
      >
        <span className="nf-book-code">{book.code}</span>
      </button>
    );
  };

  return (
    <div className="nf-page">
      <div className="nf-bg" aria-hidden="true">
        <div className="nf-bg-grid" />
        <div className="nf-orb nf-orb--blue" />
        <div className="nf-orb nf-orb--red" />
        <span className="nf-particle nf-particle--1" />
        <span className="nf-particle nf-particle--2" />
        <span className="nf-particle nf-particle--3" />
        <span className="nf-particle nf-particle--4" />
        <span className="nf-particle nf-particle--5" />
      </div>

      <main className="nf-card">
        <div className="nf-ribbon" aria-hidden="true" />

        <div className="nf-card-body">
          <div className="nf-badge">
            <span className="nf-badge-dot" aria-hidden="true" />
            <svg
              className="nf-badge-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span>Biblioteca Universitaria · Error 404</span>
          </div>

          <section className="nf-scene" aria-label="Estantería de biblioteca universitaria">
            <div className="nf-floating-book" aria-hidden="true">
              <span className="nf-glyph nf-glyph--1">§</span>
              <span className="nf-glyph nf-glyph--2">✦</span>
              <span className="nf-glyph nf-glyph--3">?</span>

              <div className="nf-book-cover">
                <div className="nf-book-pages">
                  <div className="nf-page-half nf-page-half--left" />
                  <div className="nf-page-half nf-page-half--right" />
                  <div className="nf-page-spine" />
                  <div className="nf-flip-page" />
                  <div className="nf-flip-page nf-flip-page--delayed" />
                </div>
              </div>
              <div className="nf-bookmark" />
            </div>

            <div className="nf-loupe" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="12"
                  fill="rgba(239, 246, 255, 0.72)"
                  stroke="#1d4ed8"
                  strokeWidth="4"
                />
                <path
                  d="M15 15.5C16.5 13.8 18.7 13 21 13"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M29.5 29.5L40 40"
                  stroke="#dc2626"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="20" r="14.5" stroke="#0c2340" strokeOpacity="0.25" />
              </svg>
            </div>

            <div className="nf-shelf-wrap">
              <div className="nf-books-row">
                {LEFT_BOOKS.map(renderShelfBook)}

                <button
                  type="button"
                  className={`nf-missing-slot${selectedItem?.id === 'missing-slot' ? ' nf-missing-slot--active' : ''}`}
                  onClick={handleToggleMissingSlot}
                  aria-pressed={selectedItem?.id === 'missing-slot'}
                  aria-label="Espacio del volumen faltante 404"
                >
                  <span className="nf-slot-tag">404</span>
                  <span className="nf-slot-question" aria-hidden="true">
                    ?
                  </span>
                </button>

                {RIGHT_BOOKS.map(renderShelfBook)}
              </div>
              <div className="nf-shelf-plank" aria-hidden="true" />
            </div>

            <div
              className={`nf-shelf-caption${selectedItem?.type === 'missing' ? ' nf-shelf-caption--missing' : ''}`}
              aria-live="polite"
            >
              {selectedItem ? (
                <>
                  <span className="nf-shelf-caption-code">{selectedItem.code}</span>
                  <span>{selectedItem.title}</span>
                </>
              ) : (
                <span>Explora un tomo del estante o el espacio 404</span>
              )}
            </div>
          </section>

          <div className="nf-code" aria-hidden="true">
            404
          </div>
          <h1 className="nf-title">Volumen no encontrado en el catálogo</h1>
          <p className="nf-subtitle">
            Parece que el ejemplar o la sección académica que intentas consultar fue movida de
            estantería, prestada o no forma parte del acervo actual.
          </p>

          <div className="nf-catalog-card">
            <div className="nf-catalog-info">
              <span className="nf-catalog-label">Signatura / Ruta solicitada</span>
              <code className="nf-catalog-path">{requestedPath}</code>
            </div>
            <span className="nf-stamp">No localizado</span>
          </div>

          <div className="nf-actions">
            <Link to="/" className="nf-btn nf-btn--primary">
              <svg
                className="nf-btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
              </svg>
              <span>Volver a la recepción</span>
            </Link>

            <button type="button" onClick={handleGoBack} className="nf-btn nf-btn--secondary">
              <svg
                className="nf-btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Regresar atrás</span>
            </button>
          </div>

          <nav className="nf-quick-links" aria-label="Accesos rápidos del catálogo">
            <span className="nf-quick-label">Catálogo rápido:</span>
            <Link to="/" className="nf-quick-link">
              Inicio
            </Link>
            <Link to="/Dashboard" className="nf-quick-link">
              Dashboard
            </Link>
            <Link to="/Perfil" className="nf-quick-link">
              Perfil
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
