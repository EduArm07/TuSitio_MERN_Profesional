import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home } from "../pages/web";

export function WebRouter() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}