import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Admin.module.css";

const Admin = () => {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [applications, setApplications] = useState<any[]>([]);

    const fetchApplications = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/leaves");
            const data = await res.json();
            setApplications(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        if (!user.is_admin) {
            navigate("/employee");
            return;
        }

        fetchApplications();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/leaves/${id}`, {
    method: "PUT",
        headers: {
    "Content-Type": "application/json"
},
body: JSON.stringify({ status: newStatus })
});

if (!res.ok) throw new Error();

fetchApplications();
} catch {
    alert("Грешка при обновяване");
}
};

const getBadge = (status: string) => {
    switch (status) {
        case "Approved":
            return <span className="badge bg-success">Одобрено</span>;
        case "Rejected":
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
                        <th>Период</th>
                        <th>Вид отпуск</th>
                        <th>Статус</th>
                        <th>Заместващ служител</th>
                        <th>Действие</th>
                    </tr>
                    </thead>

                    <tbody>
                    {applications.map((leave, index) => (
                        <tr key={leave.id}>
                            <td data-label="#"> {index + 1} </td>

                            <td data-label="Име на служител">
                                {leave.user.first_name} {leave.user.last_name}
                            </td>

                            <td data-label="Период">
                                {new Date(leave.from_date).toLocaleDateString("bg-BG")} -{" "}
                                {new Date(leave.to_date).toLocaleDateString("bg-BG")}
                            </td>

                            <td data-label="Вид отпуск">
                                {leave.leave_type}
                            </td>

                            <td data-label="Статус">
                                {getBadge(leave.status)}
                            </td>

                            <td data-label="Заместващ служител">
                                {leave.replacement_employee
                                    ? `${leave.replacement_employee}`
                                    : "Няма"}
                            </td>

                            <td data-label="Действие">
                                {leave.status === "Pending" ? (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => updateStatus(leave.id, "Approved")}
                                        >
                                            Одобри
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => updateStatus(leave.id, "Rejected")}
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