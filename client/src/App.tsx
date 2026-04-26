import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/admin" element={<Admin />} />

            {/* ✅ fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;