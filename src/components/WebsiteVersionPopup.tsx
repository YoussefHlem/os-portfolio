"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const WEBSITE_URL = "https://youssef-halim-3d-portfolio.vercel.app/";

const WebsiteVersionPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="website-version-overlay" onClick={() => setVisible(false)}>
      <div
        className="website-version-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup-close"
          onClick={() => setVisible(false)}
        >
          <X className="size-4" />
        </button>
        <h3>Website Version Available</h3>
        <p>
          Looking for a more traditional layout? Check out the website version
          of this portfolio for easier navigation and data collection.
        </p>
        <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
          Visit Website Version
        </a>
      </div>
    </div>
  );
};

export default WebsiteVersionPopup;
