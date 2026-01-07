import "./App.css";
import logo from "./assets/jazz-logo.png";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <img
        src={logo}
        alt="Youth Sports App logo"
        style={{ width: 360, maxWidth: "90%", height: "auto" }}
      />
    </div>
  );
}