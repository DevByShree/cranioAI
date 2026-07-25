import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">

        <div className="breadcrumb">
          <span>Settings</span>
          <span className="breadcrumb-arrow">›</span>
          <span>Profile</span>
        </div>

        <h2>Profile</h2>

        <p>
          Manage your personal information and profile details
        </p>

      </div>

      {/* Main Grid */}
      <div className="profile-grid">

        {/* ================= Sidebar ================= */}

        <div className="profile-sidebar">

          <div className="profile-card">

            {/* Avatar */}

            <div className="profile-avatar">

              <div className="avatar-circle">
                S
              </div>

              <button className="camera-btn">
                📷
              </button>

            </div>

            {/* Name */}

            <h3>Shree Joshi</h3>

            <span className="premium-badge">
              Premium
            </span>

            <p className="member-since">
              Member since May 2024
            </p>

            <hr />

            {/* Contact */}

            <div className="profile-info">

              <div className="info-item">
                📧
                <span>shreejoshi@example.com</span>
              </div>

              <div className="info-item">
                📞
                <span>+91 98765 43210</span>
              </div>

              <div className="info-item">
                📍
                <span>Pune, Maharashtra</span>
              </div>

              <div className="info-item">
                📅
                <span>Joined May 2024</span>
              </div>

            </div>

            <button className="edit-profile-btn">
              Edit Profile
            </button>

          </div>

        </div>

        {/*  Right Side */}

        <div className="profile-content">

          {/* Personal Information */}

          <div className="content-card">

            <h3>Personal Information</h3>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Shree Joshi" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="shree@example.com" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91 98765 43210" />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Pune, Maharashtra" />
              </div>

            </div>

            <div className="form-group">
              <label>Bio</label>

              <textarea
                rows="4"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>

            <button className="save-btn">
              Save Changes
            </button>

          </div>

          {/* Bottom Cards */}

          <div className="bottom-grid">

            {/* Connected Accounts */}

            <div className="content-card">

              <h3>Connected Accounts</h3>

              <div className="account-item">
                <span>Google</span>
                <button>Connected</button>
              </div>

              <div className="account-item">
                <span>Apple</span>
                <button>Connect</button>
              </div>

              <div className="account-item">
                <span>Facebook</span>
                <button>Connect</button>
              </div>

            </div>

            {/* Statistics */}

            <div className="content-card">

              <h3>Account Statistics</h3>

              <div className="stats-item">
                <span>Total Scans</span>
                <strong>24</strong>
              </div>

              <div className="stats-item">
                <span>Reports Generated</span>
                <strong>18</strong>
              </div>

              <div className="stats-item">
                <span>Member Since</span>
                <strong>May 15, 2024</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}