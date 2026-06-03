const Spinner = () => (
  <div className="spinner-overlay" role="status" aria-live="polite">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
