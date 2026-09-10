const facts = [
  { value: '13', label: 'Service areas' },
  { value: '48″', label: 'Pipeline laying capability' },
  { value: '20+', label: 'Weld procedures' },
  { value: 'On / Off', label: 'Shore operations' },
];
export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-bar__grid">
        {facts.map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-item__value">{s.value}</span>
            <span className="stat-item__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
