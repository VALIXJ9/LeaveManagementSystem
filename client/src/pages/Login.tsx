import { useState } from "react";
import "../styles/login.css";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="wrapper">
            <div className="back">
                {[...Array(10)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>

            <div className="card p-4 shadow w-100" style={{ maxWidth: "27rem" }}>

                {/* TITLE */}
                <h4 className="text-center mb-3">
                    {isLogin ? "Добре дошли!" : "Създай акаунт"}
                </h4>

                {/* TOGGLE BUTTONS */}
                <div className="d-flex justify-content-between mb-3">
                    <button
                        type="button"
                        className={`btn w-50 me-1 ${isLogin ? "btn-primary" : "btn-light"}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Вход
                    </button>

                    <button
                        type="button"
                        className={`btn w-50 ms-1 ${!isLogin ? "btn-primary" : "btn-light"}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Регистрация
                    </button>
                </div>

                {/* LOGIN FORM */}
                {isLogin && (
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Имейл</label>
                            <input type="email" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Парола</label>
                            <input type="password" className="form-control" required />
                        </div>

                        <button className="btn btn-primary w-100">Вход</button>
                    </form>
                )}

                {/* REGISTER FORM */}
                {!isLogin && (
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Име</label>
                            <input type="text" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Фамилия</label>
                            <input type="text" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Имейл</label>
                            <input type="email" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Парола</label>
                            <input type="password" className="form-control" required />
                        </div>

                        <button className="btn btn-primary w-100">
                            Регистрация
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;