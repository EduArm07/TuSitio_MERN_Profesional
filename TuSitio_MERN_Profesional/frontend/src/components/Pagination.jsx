export function Pagination({ currentPage, totalPages, goToPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
        ← Anterior
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} className={p === currentPage ? "active" : ""} onClick={() => goToPage(p)}>
          {p}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
        Siguiente →
      </button>
    </div>
  );
}