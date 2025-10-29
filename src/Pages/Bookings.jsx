import React, { useEffect, useState } from "react";
import "./Bookings.css";

/**
 * Bookings component: shows booking count and booking details.
 * - Uses /api/bookings/user/details (authenticated) to get full DTOs
 * - Sets "Bookings Made" from the returned details length (authoritative)
 * - Still requests /user/count as a sanity check and logs its value
 * - Sends JWT from localStorage key "token" if present; otherwise uses credentials for session cookies
 */
const Bookings = ({ userId }) => {
  const [details, setDetails] = useState([]);
  const [madeCount, setMadeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Change this if you store JWT under a different key
  const tokenKey = "token";
  const authToken = typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;

  const log = (...args) => {
    console.log("[Bookings DEBUG]", ...args);
  };

  const fetchJsonSafe = async (url, opts = {}) => {
    log("fetch =>", url, opts);
    const res = await fetch(url, opts);
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (e) { /* ignore parse error */ }
    return { ok: res.ok, status: res.status, text, json };
  };

  const fetchDetailsAndCount = async () => {
    setLoading(true);
    try {
      const base = "http://localhost:8080/api/bookings";
      const detailsUrl = userId ? `${base}/user/${userId}/details` : `${base}/user/details`;
      const countUrl = userId ? `${base}/user/${userId}/count` : `${base}/user/count`;

      const headers = { "Content-Type": "application/json" };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      // Fetch details (authoritative data)
      const detailsRes = await fetchJsonSafe(detailsUrl, authToken ? { headers } : { credentials: "include" });
      log("details response:", detailsRes.status, detailsRes.text);
      const detailsData = detailsRes.json ?? [];
      setDetails(Array.isArray(detailsData) ? detailsData : []);

      // Set madeCount from the details array length (authoritative)
      setMadeCount(Array.isArray(detailsData) ? detailsData.length : 0);

      // Optional: sanity-check count endpoint and log it (won't override UI)
      const countRes = await fetchJsonSafe(countUrl, authToken ? { headers } : { credentials: "include" });
      log("count response:", countRes.status, countRes.json ?? countRes.text);
      // If you want server count to be authoritative, uncomment below:
      // if (countRes.ok && countRes.json !== null) setMadeCount(Number(countRes.json));

    } catch (err) {
      console.error("[Bookings DEBUG] fetchDetailsAndCount error:", err);
      setDetails([]);
      setMadeCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsAndCount();
    // if booking creation elsewhere should refresh this list, consider adding a prop or event for refresh
  }, [userId]);

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>

      <div className="bookings-summary-container single">
        <div className="bookings-summary made">
          <h3>Bookings Made</h3>
          <p>{loading ? "..." : madeCount}</p>
        </div>
      </div>

      {loading ? (
        <p className="no-bookings">Loading bookings...</p>
      ) : details && details.length > 0 ? (
        <div className="bookings-list">
          {details.map((d, idx) => (
            <div key={d.hallId ? `${d.hallId}-${idx}` : idx} className="booking-card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", width: "100%" }}>
                <div>
                  <h3 className="booking-event">{d.hallName}</h3>
                  <p className="booking-address">{d.hallAddress}</p>
                  <p className="booking-id"><strong>Hall ID:</strong> {d.hallId}</p>
                </div>
                <div style={{ textAlign: "right", minWidth: "180px" }}>
                  <p className="booking-date"><strong>Booked:</strong></p>
                  <p>{d.bookingDateTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default Bookings;