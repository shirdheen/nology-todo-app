import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CategoryProvider>
    <App />
  </CategoryProvider>
);
