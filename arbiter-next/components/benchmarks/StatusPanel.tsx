export default function StatusPanel({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <section className="benchmark-status" role={onRetry ? "alert" : "status"} aria-live="polite">
      <span className="benchmark-status-icon" aria-hidden="true">✦</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && <button className="benchmark-button" type="button" onClick={onRetry}>Retry</button>}
    </section>
  );
}
