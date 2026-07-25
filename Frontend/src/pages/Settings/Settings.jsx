import "./Settings.css";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiShield,
  FiSliders,
  FiCreditCard,
  FiHelpCircle,
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className="setting-page">

      <div className="setting-header">
        <h2>Settings</h2>
        <p>Manage your account and preferences</p>
      </div>

      <div className="setting-grid">

        {/* Profile Card */}
        <div className="setting-card"
          onClick={() => navigate("/dashboard/settings/profile")}>
          <div className="card-left">
          <div className="card-icon">
            <FiUser />
          </div>

          <div className="card-content">
            <h3>Profile</h3>
            <p>Manage your personal information.</p>
          </div>
        </div>

        <div className="card-arrow">
          <FiChevronRight />
        </div>
      </div>

      {/* Privacy Card */}
      <div className="setting-card">
        <div className="card-left">
          <div className="card-icon">
            <FiShield />
          </div>

          <div className="card-content">
            <h3>Privacy & Security</h3>
            <p>Control your privacy settings and account security.</p>
          </div>
        </div>

        <div className="card-arrow">
          <FiChevronRight />
        </div>
      </div>

      {/* Preferences Card */}
      <div className="setting-card">
        <div className="card-left">
          <div className="card-icon">
            <FiSliders />
          </div>

          <div className="card-content">
            <h3>Preferences</h3>
            <p>Customize your app experience, language, theme, and default settings.</p>
          </div>
        </div>

        <div className="card-arrow">
          <FiChevronRight />
        </div>
      </div>

      {/* Help Card */}
      <div className="setting-card">
        <div className="card-left">
          <div className="card-icon">
            <FiHelpCircle />
          </div>

          <div className="card-content">
            <h3>Help & Support</h3>
            <p>Get help, contact support, and browse FAQs.</p>
          </div>
        </div>

        <div className="card-arrow">
          <FiChevronRight />
        </div>
      </div>

      {/* Subscription Card */}
      <div className="setting-card">
        <div className="card-left">
          <div className="card-icon">
            <FiCreditCard />
          </div>

          <div className="card-content">
            <h3>Subscription & Billing</h3>
            <p>Manage your subscription, payments, and billing history.</p>
          </div>
        </div>

        <div className="card-arrow">
          <FiChevronRight />
        </div>
      </div>

      {/* About Card */}
      <div className="setting-card">
        <div className="card-left">
          <div className="card-icon">
            <FiInfo />
          </div>

          <div className="card-content">
            <h3>About CranioAI</h3>
            <p>Learn more about our mission, technology, and platform.</p>
          </div>
        </div>

        <div className="card-arrow">
          <FiChevronRight />
        </div>
      </div>

    </div>
    </div >
  );
}