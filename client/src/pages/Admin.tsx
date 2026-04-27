import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Admin.module.css";

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
        if (!user) {
            navigate("/");
            return;
        }

        if (!user.is_admin) {
            navigate("/employee");
            return;
        }

        setApplications([
            {
                id: 1,
                name: "Ivan Ivanov",
                from: "01.05.2026",
                to: "05.05.2026",
                type: "Платен",
                status: "pending"
            },
            {
                id: 2,
                name: "Ivan Ivanov",
                from: "01.05.2026",
                to: "05.05.2026",
                type: "Платен",
                status: "pending"
            },
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
        <div className={styles.pageWrapper}>

            {/* NAVBAR */}
            <nav className="navbar bg-dark px-3">
                <span className="navbar-brand">
                    <img src="/pics/logo-1.png" className={styles.logo} />
                </span>

                <button className="btn btn-light" onClick={handleLogout}>
                    Изход
                </button>
            </nav>

            {/* MAIN */}
            <div className={`container pt-5 pb-1 ${styles.containerFix}`}>

                <h1 className="text-center mb-5">
                    Администраторски панел на {user?.first_name} {user?.last_name}
                </h1>

                <div className={styles.tableContainer}>
                    <table className={`table table-bordered text-center ${styles.tableFix}`}>

                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Име на служител</th>
                            <th>От</th>
                            <th>До</th>
                            <th>Вид отпуск</th>
                            <th>Статус</th>
                            <th>Действие</th>
                        </tr>
                        </thead>

                        <tbody>
                        {applications.map((app, index) => (
                            <tr key={app.id}>
                                <td className={styles.cell} data-label="#">
                                    {index + 1}
                                </td>

                                <td className={styles.cell} data-label="Име на служител">
                                    {app.name}
                                </td>

                                <td className={styles.cell} data-label="От">
                                    {app.from}
                                </td>

                                <td className={styles.cell} data-label="До">
                                    {app.to}
                                </td>

                                <td className={styles.cell} data-label="Вид отпуск">
                                    {app.type}
                                </td>

                                <td className={styles.cell} data-label="Статус">
                                    {getBadge(app.status)}
                                </td>

                                <td className={styles.cell} data-label="Действие">
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
            </div>

            {/* FOOTER */}
            <footer className={styles.animatedWavesFooter}>
                <div className={styles.waves}>

                    <div className={`${styles.wave} ${styles.wave1}`}>
                        <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                            <path d="M0,100 C600,0 1800,200 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                        </svg>
                        <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                            <path d="M0,100 C600,0 1800,200 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                        </svg>
                    </div>

                    <div className={`${styles.wave} ${styles.wave2}`}>
                        <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                            <path d="M0,100 C600,50 1800,150 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                        </svg>
                        <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                            <path d="M0,100 C600,50 1800,150 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                        </svg>
                    </div>

                    <div className={`${styles.wave} ${styles.wave3}`}>
                        <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                            <path d="M0,100 C600,80 1800,120 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                        </svg>
                        <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                            <path d="M0,100 C600,80 1800,120 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                        </svg>
                    </div>

                </div>

                <div className={styles.footerContent}>
                    <p>© 2026 Всички права запазени.</p>
                </div>
            </footer>

        </div>
    );
};

export default Admin;