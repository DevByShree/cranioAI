import './History.css'

const summaryStats = [
  { label: 'Total Analyses', value: '24', icon: 'scan' },
  { label: 'Average Score', value: '83%', icon: 'symmetry' },
  { label: 'Best Score', value: '91%', icon: 'trophy' },
  { label: 'This Month', value: '4', icon: 'clock' },
]

const analyses = [
  { date: 'Jun 30, 2024', time: '14:32', score: 87, status: 'Good', change: '+1%' },
  { date: 'Jun 25, 2024', time: '10:15', score: 86, status: 'Good', change: '+2%' },
  { date: 'Jun 20, 2024', time: '16:48', score: 84, status: 'Average', change: '-1%' },
  { date: 'Jun 15, 2024', time: '09:22', score: 85, status: 'Good', change: '+3%' },
  { date: 'Jun 10, 2024', time: '18:05', score: 82, status: 'Average', change: '+2%' },
  { date: 'Jun 5, 2024', time: '11:40', score: 80, status: 'Average', change: '+2%' },
  { date: 'Jun 1, 2024', time: '15:18', score: 78, status: 'Starting', change: '—' },
  { date: 'May 28, 2024', time: '13:55', score: 76, status: 'Average', change: '+1%' },
]

const iconPaths = {
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"/></>,
  symmetry: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18"/></>,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
}

export default function History() {
  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <h2>Analysis History</h2>
          <p>View all your past facial symmetry analyses</p>
        </div>
        <button className="history-export">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary */}
      <div className="history-stats">
        {summaryStats.map((s) => (
          <div className="history-stat-card" key={s.label}>
            <div className="history-stat-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {iconPaths[s.icon]}
              </svg>
            </div>
            <div>
              <div className="history-stat-label">{s.label}</div>
              <div className="history-stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="history-card">
        <div className="history-card-head">
          <h3>Past Analyses</h3>
          <div className="history-search">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input type="text" placeholder="Search by date..." />
          </div>
        </div>

        <div className="history-table">
          <div className="history-table-head">
            <span>Thumbnail</span>
            <span>Date</span>
            <span>Time</span>
            <span>Score</span>
            <span>Change</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {analyses.map((a, i) => (
            <div className="history-table-row" key={i}>
              <div className="history-thumb">
                <svg viewBox="0 0 40 48" width="40" height="48">
                  <ellipse cx="20" cy="24" rx="15" ry="20" fill="none" stroke="var(--border)" strokeWidth="1.5"/>
                  <circle cx="15" cy="20" r="1.5" fill="var(--text-muted)"/>
                  <circle cx="25" cy="20" r="1.5" fill="var(--text-muted)"/>
                  <path d="M 17 30 Q 20 32 23 30" fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                </svg>
              </div>
              <span className="history-date">{a.date}</span>
              <span className="history-time">{a.time}</span>
              <span className="history-score">{a.score}%</span>
              <span className={`history-change ${a.change.startsWith('+') ? 'up' : a.change.startsWith('-') ? 'down' : ''}`}>
                {a.change}
              </span>
              <span className={`history-status ${a.status.toLowerCase()}`}>{a.status}</span>
              <button className="history-view-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
