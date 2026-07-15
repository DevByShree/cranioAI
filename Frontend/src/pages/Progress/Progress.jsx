import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import './Progress.css'

const dataSets = {
  '30': [
    { date: 'Jun 1', score: 78 }, { date: 'Jun 5', score: 80 }, { date: 'Jun 10', score: 82 },
    { date: 'Jun 15', score: 85 }, { date: 'Jun 20', score: 84 }, { date: 'Jun 25', score: 86 },
    { date: 'Jun 30', score: 87 },
  ],
  '90': [
    { date: 'Apr 1', score: 72 }, { date: 'Apr 15', score: 74 }, { date: 'May 1', score: 76 },
    { date: 'May 15', score: 79 }, { date: 'Jun 1', score: 82 }, { date: 'Jun 15', score: 85 },
    { date: 'Jun 30', score: 87 },
  ],
  '180': [
    { date: 'Jan', score: 65 }, { date: 'Feb', score: 68 }, { date: 'Mar', score: 71 },
    { date: 'Apr', score: 74 }, { date: 'May', score: 78 }, { date: 'Jun', score: 87 },
  ],
  all: [
    { date: 'Aug 23', score: 60 }, { date: 'Oct 23', score: 64 }, { date: 'Dec 23', score: 68 },
    { date: 'Feb 24', score: 72 }, { date: 'Apr 24', score: 78 }, { date: 'Jun 24', score: 87 },
  ],
}

const filters = [
  { key: '30', label: 'Last 30 Days' },
  { key: '90', label: '3 Months' },
  { key: '180', label: '6 Months' },
  { key: 'all', label: 'All Time' },
]

const summaryStats = [
  { label: 'Current Score', value: '87%', trend: '+3%', color: 'var(--primary)' },
  { label: 'Average Score', value: '83%', trend: 'Steady', color: 'var(--info)' },
  { label: 'Best Score', value: '91%', trend: 'Jun 15', color: 'var(--accent)' },
  { label: 'Total Analyses', value: '24', trend: '+4 this month', color: 'var(--warning)' },
]

const history = [
  { date: 'Jun 30, 2024', score: 87, change: '+1%', status: 'Good' },
  { date: 'Jun 25, 2024', score: 86, change: '+2%', status: 'Good' },
  { date: 'Jun 20, 2024', score: 84, change: '-1%', status: 'Average' },
  { date: 'Jun 15, 2024', score: 85, change: '+3%', status: 'Good' },
  { date: 'Jun 10, 2024', score: 82, change: '+2%', status: 'Average' },
  { date: 'Jun 5, 2024', score: 80, change: '+2%', status: 'Average' },
  { date: 'Jun 1, 2024', score: 78, change: '—', status: 'Starting' },
]

export default function Progress() {
  const [filter, setFilter] = useState('30')
  const data = dataSets[filter]

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
            <span>Change</span>
            <span>Status</span>
          </div>
          {history.map((h, i) => (
            <div className="progress-table-row" key={i}>
              <span className="progress-table-date">{h.date}</span>
              <span className="progress-table-score">{h.score}%</span>
              <span className={`progress-table-change ${h.change.startsWith('+') ? 'up' : h.change.startsWith('-') ? 'down' : ''}`}>
                {h.change}
              </span>
              <span className={`progress-table-status ${h.status.toLowerCase()}`}>{h.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
