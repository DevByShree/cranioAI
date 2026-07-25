import './History.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const iconPaths = {
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" /></>,
  symmetry: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18" /></>,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
}

export default function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {

        const access_token = localStorage.getItem('access');

        const response = await axios.get('http://localhost:8000/api/history/', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const summaryStats = [

    {
      label: "Total Analyses",
      value: history.length,
      icon: "scan"
    },

    {
      label: "Average Score",
      value:
        history.length > 0
          ? (
            history.reduce(
              (sum, item) => sum + item.overall_score,
              0
            ) / history.length
          ).toFixed(1) + "%"
          : "0%",
      icon: "symmetry"
    },

    {
      label: "Best Score",
      value:
        history.length > 0
          ? Math.max(
            ...history.map(h => h.overall_score)
          ).toFixed(1) + "%"
          : "0%",
      icon: "trophy"
    },

    {
      label: "This Month",
      value: history.filter(item => {

        const d = new Date(item.created_at);
        const now = new Date();

        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );

      }).length,
      icon: "clock"
    }

  ];


  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <h2>Analysis History</h2>
          <p>View all your past facial symmetry analyses</p>
        </div>
        <button className="history-export">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
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
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
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
            <span>Status</span>
            <span>Action</span>
          </div>
          {history.map((item) => (
            <div className="history-table-row" key={item.id}>
              <div className="history-thumb">
                <img
                  src={`http://127.0.0.1:8000${item.uploaded_image || ''}`}
                  alt="upload"
                />
              </div>
              <span className="history-date">{new Date(item.created_at).toLocaleDateString()}</span>
              <span className="history-time">{new Date(item.created_at).toLocaleTimeString()}</span>
              <span className="history-score">{item.overall_score.toFixed(2)}%%</span>
              <span
                className={`history-status ${item.overall_score >= 85 ? "good" : item.overall_score >= 70 ? "average" : "starting"}`}>
                {item.overall_score >= 85 ? "Excellent" : item.overall_score >= 70 ? "Good" : "Needs Work"}
              </span>
              <button className="history-view-btn"
                onClick={() => console.log(item)}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
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
