import * as React from 'react';
export const Error = ({ message, visible }) => (<div style={{ position: "fixed", bottom: 0, right: 104 }}>
    {visible &&
    <div style={{ backgroundColor: "#FD5C63", padding: 16, color: "white", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
        <div>Sorry, we encountered an error. <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => window.location.reload(true)}>please refresh</span></div>
        <div>{message}</div>
      </div>}
  </div>);
