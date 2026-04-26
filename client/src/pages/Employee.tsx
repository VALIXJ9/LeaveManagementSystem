import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/employee.css";

const Employee = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [leaveType, setLeaveType] = useState("Платен");
    const [returnDate, setReturnDate] = useState("");
    const [replacementEmployee, setReplacementEmployee] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fromDate || !toDate || !returnDate || !replacementEmployee) {
            alert("Моля, попълнете всички полета.");
            return;
        }

        alert("Заявлението е изпратено (fake for now)");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

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
            <div className="container py-5">
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
                                <input type="date" className="form-control"
                                       onChange={(e) => setFromDate(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">До</label>
                                <input type="date" className="form-control"
                                       onChange={(e) => setToDate(e.target.value)} />
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
                                <input type="date" className="form-control"
                                       onChange={(e) => setReturnDate(e.target.value)} />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Заместващ служител</label>
                                <input type="text" className="form-control"
                                       onChange={(e) => setReplacementEmployee(e.target.value)} />
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
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* later dynamic */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <footer className="animated-waves-footer">
                <div className="waves">
                    <svg className="wave wave1" viewBox="0 0 2400 200">
                        <path d="M0,100 C600,0 1800,200 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                    <svg className="wave wave2" viewBox="0 0 2400 200">
                        <path d="M0,100 C600,50 1800,150 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                    <svg className="wave wave3" viewBox="0 0 2400 200">
                        <path d="M0,100 C600,80 1800,120 2400,100 L2400,200 L0,200 Z" fill="#ffffff" />
                    </svg>
                </div>

                <div className="footer-content">
                    <p>© 2025 Всички права запазени.</p>
                </div>
            </footer>

        </div>
    );
};

export default Employee;