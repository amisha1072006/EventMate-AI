
import React from "react";
const OwnerProfile = () => {
  return (
    <div className="profile-settings-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Profile & Settings
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Manage your personal information and account preferences.
      </p>

      {/* Profile Information */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          maxWidth: 600,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
          Profile Information
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Location
            </label>
            <select
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
              }}
            >
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Lucknow</option>
            </select>
          </div>
          <button
            style={{
              background: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24,
          maxWidth: 600,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Settings</h2>
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>SMS Notifications</span>
            <input type="checkbox" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Marketing Emails</span>
            <input type="checkbox" defaultChecked />
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />
          <button
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
