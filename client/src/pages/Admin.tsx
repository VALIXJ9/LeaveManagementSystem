import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Application = {
    id: number;
    name: string;
    from: string;
    to: string;
    type: string;
    status: string;
};

const Admin = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        // 🔒 PROTECTION
        if (!user) {
            navigate("/");
            return;
        }

        if (!user.is_admin) {
            navigate("/employee");
            return;
        }

        // fake data for now (later from backend)
        setApplications([
            {
                id: 1,
                name: "Ivan Ivanov",
                from: "01.05.2026",
                to: "05.05.2026",
                type: "Платен",
                status: "pending"
            }
        ]);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const updateStatus = (id: number, newStatus: string) => {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
    };

    const getBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <span className="badge bg-success">Одобрено</span>;
            case "rejected":
                return <span className="badge bg-danger">Отказано</span>;
            default:
                return <span className="badge bg-warning text-dark">В очакване</span>;
        }
    };

    return (
        <div className="container py-5">
            <h2>Админ панел: {user?.email}</h2>

            <button className="btn btn-danger mb-3" onClick={handleLogout}>
                Изход
            </button>

            <table className="table table-bordered text-center">
                <thead className="table-primary">
                <tr>
                    <th>#</th>
                    <th>Име</th>
                    <th>От</th>
                    <th>До</th>
                    <th>Вид</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
                </thead>

                <tbody>
                {applications.map((app, index) => (
                    <tr key={app.id}>
                        <td>{index + 1}</td>
                        <td>{app.name}</td>
                        <td>{app.from}</td>
                        <td>{app.to}</td>
                        <td>{app.type}</td>
                        <td>{getBadge(app.status)}</td>
                        <td>
                            {app.status === "pending" ? (
                                <>
                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => updateStatus(app.id, "approved")}
                                    >
                                        Одобри
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => updateStatus(app.id, "rejected")}
                                    >
                                        Откажи
                                    </button>
                                </>
                            ) : (
                                "Обработено"
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;