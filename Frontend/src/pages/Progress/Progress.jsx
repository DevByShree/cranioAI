import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import './Progress.css'

const filters = [
  { key: '30', label: 'Last 30 Days' },
  { key: '90', label: '3 Months' },
  { key: '180', label: '6 Months' },
  { key: 'all', label: 'All Time' },
]

export default function Progress() {
  const [filter, setFilter] = useState('30')

  const dashboard = JSON.parse(localStorage.getItem('dashboardData'));
  const allData = dashboard?.graph || [];

  const data = allData.filter(item => {
    const days = Number(filter);

    if (filter === "all") return true;

    const date = new Date(item.date);
    const cutoff = new Date();

    cutoff.setDate(cutoff.getDate() - days);

    return date >= cutoff;
  });

  const summaryStats = [
    {
      label: "Current Score",
      value: `${dashboard?.stats?.latest_score?.toFixed(1) ?? 0}%`,
      trend: "Latest",
      color: "var(--primary)"
    },
    {
      label: "Average Score",
      value: `${dashboard?.stats?.average_score?.toFixed(1) ?? 0}%`,
      trend: "Average",
      color: "var(--info)"
    },
    {
      label: "Best Score",
      value: `${dashboard?.stats?.best_score?.toFixed(1) ?? 0}%`,
      trend: "Best",
      color: "var(--accent)"
    },
    {
      label: "Total Analyses",
      value: dashboard?.stats?.total_uploads ?? 0,
      trend: "Overall",
      color: "var(--warning)"
    }
  ];


  const history = dashboard?.recent_uploads || [];


  return (
    <div className="progress-page">
      <div className="progress-header">
        <div>
          <h2>Progress Tracking</h2>
          <p>Monitor your facial symmetry improvements over time</p>
        </div>
        <div className="progress-filters">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`progress-filter ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="progress-stats">
        {summaryStats.map((s) => (
          <div className="progress-stat-card" key={s.label}>
            <div className="progress-stat-label">{s.label}</div>
            <div className="progress-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="progress-stat-trend">{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="progress-card progress-chart-card">
        <div className="progress-card-head">
          <h3>Symmetry Score Over Time</h3>
          <span className="progress-chart-tag">Trending Up ↑</span>
        </div>
        <div className="progress-chart">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} domain={[60, 100]} />
              <Tooltip
                contentStyle={{ borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
              <ReferenceLine y={85} stroke="var(--accent)" strokeDasharray="5 5" label={{ value: 'Target: 85%', fill: 'var(--accent)', fontSize: 11 }} />
              <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#areaGrad)" dot={{ fill: 'var(--primary)', r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History Table */}
      <div className="progress-card">
        <div className="progress-card-head">
          <h3>Analysis History</h3>
          <span className="progress-history-count">{history.length} entries</span>
        </div>
        <div className="progress-table">
          <div className="progress-table-head">
            <span>Date</span>
            <span>Score</span>
            <span>Status</span>
          </div>
          {history.map((h) => (
            <div className="progress-table-row" key={h.id}>
              <span className="progress-table-date">{new Date(h.created_at).toLocaleDateString()}</span>
              <span className="progress-table-score">{h.overall_score?.toFixed(2) ?? 0}%%</span>
              <span className={`progress-table-status ${h.overall_score >= 85? "good": h.overall_score >= 70? "average": "starting"}`}>
                {h.overall_score >= 85? "Excellent": h.overall_score >= 70? "Good": "Needs Work"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
