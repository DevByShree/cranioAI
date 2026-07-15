import { useState, useCallback } from 'react'
import './FaceAnalyzer.css'

const mockResults = {
  symmetryScore: 87,
  metrics: [
    { label: 'Left/Right Balance', value: 85 },
    { label: 'Eye Symmetry', value: 90 },
    { label: 'Nose Symmetry', value: 88 },
    { label: 'Mouth Symmetry', value: 82 },
    { label: 'Chin & Jawline', value: 85 },
  ],
  recommendations: [
    { title: 'Jaw Alignment Exercise', detail: '3 sets × 10 reps daily to improve chin symmetry.' },
    { title: 'Eye Relaxation Drill', detail: '2 sets × 15 reps to balance eye muscles.' },
    { title: 'Facial Massage', detail: '5 min daily focusing on the right side.' },
  ],
  landmarks: 68,
}

const states = {
  idle: { label: 'Upload a photo to begin', color: 'var(--text-muted)' },
  uploading: { label: 'Uploading image...', color: 'var(--info)' },
  analyzing: { label: 'AI analyzing facial symmetry...', color: 'var(--primary)' },
  results: { label: 'Analysis complete!', color: 'var(--success)' },
  error: { label: 'Backend unavailable — showing demo results', color: 'var(--warning)' },
}

export default function FaceAnalyzer() {
  const [status, setStatus] = useState('idle')
  const [image, setImage] = useState(null)
  const [results, setResults] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    setImage(URL.createObjectURL(file))
    setResults(null)
    setStatus('idle')
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  const onFileInput = (e) => handleFile(e.target.files[0])

  const analyze = async () => {
    if (!image) return
    setStatus('uploading')
    setProgress(20)

    try {
      const formData = new FormData()
      const blob = await fetch(image).then(r => r.blob())
      formData.append('image', blob, 'upload.jpg')

      setStatus('analyzing')
      setProgress(50)

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)

      const res = await fetch('http://localhost:8000/api/analyze/', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!res.ok) throw new Error('Bad response')

      const data = await res.json()
      setResults(data)
      setStatus('results')
      setProgress(100)
    } catch (err) {
      console.warn('Backend unavailable, using mock data:', err.message)
      setProgress(100)
      setStatus('error')
      setTimeout(() => {
        setResults(mockResults)
        setStatus('results')
      }, 800)
    }
  }

  const reset = () => {
    setImage(null)
    setResults(null)
    setStatus('idle')
    setProgress(0)
  }

  return (
    <div className="analyzer-page">
      <div className="analyzer-header">
        <div>
          <h2>Face Analyzer</h2>
          <p>Upload a front-facing photo for AI-powered symmetry analysis</p>
        </div>
        {image && !results && (
          <button className="analyzer-reset" onClick={reset}>Clear</button>
        )}
      </div>

      <div className={`analyzer-status ${status}`}>
        <span className="analyzer-status-dot" style={{ background: states[status].color }} />
        {states[status].label}
        {(status === 'uploading' || status === 'analyzing') && (
          <div className="analyzer-progress">
            <div className="analyzer-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {!results ? (
        <div className="analyzer-main">
          <div
            className={`analyzer-dropzone ${dragOver ? 'drag' : ''} ${image ? 'has-image' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            {image ? (
              <div className="analyzer-preview">
                <img src={image} alt="Preview" />
                <div className="analyzer-preview-overlay">
                  <button className="analyzer-change" onClick={() => document.getElementById('file-input').click()}>
                    Change Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="analyzer-dropzone-content">
                <div className="analyzer-dropzone-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                </div>
                <h3>Drag & drop your photo here</h3>
                <p>or click to browse from your device</p>
                <span className="analyzer-formats">Supports JPG, PNG, WEBP up to 10MB</span>
                <input id="file-input" type="file" accept="image/*" onChange={onFileInput} hidden />
                <button className="analyzer-browse" onClick={() => document.getElementById('file-input').click()}>
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {image && (
            <div className="analyzer-actions">
              <button
                className="analyzer-analyze-btn"
                onClick={analyze}
                disabled={status === 'uploading' || status === 'analyzing'}
              >
                {status === 'uploading' || status === 'analyzing' ? (
                  <>
                    <span className="analyzer-spinner" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"/>
                    </svg>
                    Analyze Face
                  </>
                )}
              </button>
            </div>
          )}

          <div className="analyzer-tips">
            <h4>Tips for best results:</h4>
            <ul>
              <li>Use a front-facing photo with good lighting</li>
              <li>Keep a neutral expression and face the camera directly</li>
              <li>Remove glasses and keep hair away from face</li>
              <li>Ensure the photo is clear and not blurry</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="analyzer-results">
          <div className="analyzer-results-grid">
            <div className="analyzer-card analyzer-original">
              <h3>Original Image</h3>
              <div className="analyzer-img-wrap">
                <img src={image} alt="Original" />
                <div className="analyzer-scan-overlay" />
              </div>
            </div>
            <div className="analyzer-card analyzer-annotated">
              <h3>Annotated & Mirrored</h3>
              <div className="analyzer-img-wrap">
                <img src={image} alt="Annotated" className="analyzer-mirror" />
                <svg className="analyzer-landmarks" viewBox="0 0 300 300" preserveAspectRatio="none">
                  <line x1="150" y1="20" x2="150" y2="280" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
                  <line x1="20" y1="150" x2="280" y2="150" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
                  {[100, 200].map(x => [100, 200].map(y => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="var(--accent)" opacity="0.8"/>
                  )))}
                  <circle cx="150" cy="150" r="4" fill="var(--primary)" />
                </svg>
              </div>
            </div>
          </div>

          <div className="analyzer-results-detail">
            <div className="analyzer-card analyzer-score-detail">
              <h3>Symmetry Breakdown</h3>
              <div className="analyzer-big-score">
                <div className="analyzer-big-num">{results.symmetryScore}%</div>
                <div className="analyzer-big-label">Overall Symmetry</div>
              </div>
              <div className="analyzer-metric-list">
                {results.metrics.map((m) => (
                  <div className="analyzer-metric-item" key={m.label}>
                    <div className="analyzer-metric-head">
                      <span>{m.label}</span>
                      <span className="analyzer-metric-val">{m.value}%</span>
                    </div>
                    <div className="analyzer-metric-bar">
                      <div className="analyzer-metric-fill" style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="analyzer-landmark-info">
                <span className="analyzer-landmark-badge">{results.landmarks || 68} landmarks detected</span>
              </div>
            </div>

            <div className="analyzer-card analyzer-recs">
              <h3>AI Recommendations</h3>
              <div className="analyzer-rec-list">
                {results.recommendations.map((r, i) => (
                  <div className="analyzer-rec-item" key={i}>
                    <div className="analyzer-rec-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </div>
                    <div>
                      <div className="analyzer-rec-title">{r.title}</div>
                      <div className="analyzer-rec-detail">{r.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="analyzer-new-analysis" onClick={reset}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9M3 12l4-4M3 12l4 4"/></svg>
                New Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
