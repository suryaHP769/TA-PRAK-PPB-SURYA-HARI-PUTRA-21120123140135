export const LoadingState = ({ label = 'Memuat data...' }: { label?: string }) => (
  <div className="section-card empty-state">{label}</div>
)

export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="section-card empty-state">
    <p>{message}</p>
    {onRetry ? (
      <button type="button" className="btn-primary" onClick={onRetry}>
        Coba Lagi
      </button>
    ) : null}
  </div>
)
