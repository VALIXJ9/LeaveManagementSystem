import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/employee.css";

const Employee = () => {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [leaveType, setLeaveType] = useState("Платен");
    const [returnDate, setReturnDate] = useState("");
    const [replacementEmployee, setReplacementEmployee] = useState("");

    const [leaves, setLeaves] = useState<any[]>([]);

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Pending":
                return "badge bg-warning text-dark";
            case "Approved":
                return "badge bg-success";
            case "Rejected":
                return "badge bg-danger";
            default:
                return "badge bg-secondary";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "Pending":
                return "Изчакване";
            case "Approved":
                return "Одобрено";
            case "Rejected":
                return "Отказано";
            default:
                return status;
        }
    };

    const fetchLeaves = async () => {
        if (!user) return;

        try {
            const res = await fetch(`http://localhost:3000/api/leaves/${user.id}`);
    const data = await res.json();
setLeaves(data);
} catch (err) {
    console.error(err);
}
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromDate || !toDate || !returnDate || !replacementEmployee) {
        alert("Моля, попълнете всички полета.");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/leaves", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                from_date: fromDate,
                to_date: toDate,
                return_date: returnDate,
                leave_type: leaveType,
                replacement_employee: replacementEmployee
            })
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Error");
        }

        alert("Заявлението е записано!");

        // clear form
        setFromDate("");
        setToDate("");
        setReturnDate("");
        setReplacementEmployee("");
        setLeaveType("Платен");

        fetchLeaves();
    } catch (err: any) {
        alert(err.message || "Грешка при запис");
    }
};

const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
};

useEffect(() => {
    if (!user) {
        navigate("/");
    } else {
        fetchLeaves();
    }
}, [user, navigate]);

return (
    <div className="page-wrapper">

        {/* NAVBAR */}
        <nav className="navbar bg-dark px-3">
                <span className="navbar-brand">
                    <img src="../assets/hero.png" className="logo" />
                </span>

            <button className="btn btn-light" onClick={handleLogout}>
                Изход
            </button>
        </nav>

        {/* MAIN */}
        <div className="container pt-5 pb-1">
            <div className="bg-light border rounded p-4 mb-4">

                <h3 className="text-center w-100">
                    Молби за отпуск на: {user ? `${user.first_name} ${user.last_name}` : ""}
                </h3>

                <hr />

                {/* INFO BOXES */}
                <div className="row mb-4 text-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <div className="info-box p-3 border rounded bg-white">
                            <strong className="d-block mb-2">
                                Полагаеми дни отпуск:
                            </strong>
                            <span className="count-number">30</span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="info-box p-3 border rounded bg-white">
                            <strong className="d-block mb-2">
                                Оставащи дни отпуск:
                            </strong>
                            <span className="count-number">30</span>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">От</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">До</label>
                            <input
                                type="date"
                                className="form-control"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Вид отпуск</label>
                            <select
                                value={leaveType}
                                onChange={(e) => setLeaveType(e.target.value)}
                                className="form-select"
                            >
                                <option>Платен</option>
                                <option>Неплатен</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Дата на връщане</label>
                            <input
                                type="date"
                                className="form-control"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Заместващ служител</label>
                            <input
                                type="text"
                                className="form-control"
                                value={replacementEmployee}
                                onChange={(e) => setReplacementEmployee(e.target.value)}
                            />
                        </div>

                        <div className="col-md-12">
                            <button className="btn btn-success">
                                Подай заявление
                            </button>
                        </div>

                    </div>
                </form>

                {/* TABLE */}
                <h5 className="mt-5">Подадени заявления</h5>
                <div className="table-responsive">
                    <table className="table table-bordered bg-white">
                        <thead className="table-light">
                        <tr>
                            <th>Дата</th>
                            <th>От - До</th>
                            <th>Вид</th>
                            <th>Статус</th>
                            <th>Заместващ служител</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave.id}>
                                <td>{new Date(leave.created_at).toLocaleDateString("bg-BG")}</td>
                                <td>
                                    {new Date(leave.from_date).toLocaleDateString("bg-BG")} -{" "}
                                    {new Date(leave.to_date).toLocaleDateString("bg-BG")}
                                </td>
                                <td>{leave.leave_type}</td>
                                <td>
                                            <span className={getStatusClass(leave.status)}>
                                                {getStatusText(leave.status)}
                                            </span>
                                </td>
                                <td>{leave.replacement_employee}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        {/* FOOTER */}
        <footer className="animated-waves-footer">
            <div className="waves">

                <div className="wave wave1">
                    <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                        <path d="M0,100 C600,0 1800,200 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                    <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                        <path d="M0,100 C600,0 1800,200 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div className="wave wave2">
                    <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                        <path d="M0,100 C600,50 1800,150 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                    <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                        <path d="M0,100 C600,50 1800,150 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div className="wave wave3">
                    <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                        <path d="M0,100 C600,80 1800,120 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                    <svg viewBox="0 0 2400 200" preserveAspectRatio="none">
                        <path d="M0,100 C600,80 1800,120 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                </div>

            </div>

            <div className="footer-content">
                <p>© 2026 Всички права запазени.</p>
            </div>
        </footer>

    </div>
);
};

export default Employee;