import React from "react";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        height: "82vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div className="col-md-4">
        <div>
          <h3 style={{ textAlign: "center" }}>
            Your access to this demonstration has expired
          </h3>
          <p style={{ textAlign: "center" }}>
            Please contact the person who had shared this demo with you for
            renewed access
          </p>
        </div>
      </div>
    </div>
  );
}
