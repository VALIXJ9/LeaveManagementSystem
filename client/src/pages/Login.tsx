import { useState } from "react";
import "../styles/login.css";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    // STATE (must be INSIDE component)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // REGISTER
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // FRONTEND VALIDATION
        if (password.length < 6) {
            alert("Паролата трябва да е поне 6 символа");
            return;
        }

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);

        if (!hasLetters || !hasNumbers) {
            alert("Паролата трябва да съдържа букви и цифри");
            return;
        }

        const res = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert("Акаунтът е създаден успешно!");
    };

    // LOGIN
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert("Вход успешен!");
    };

    return (
        <div className="wrapper">
            <div className="back">
                {[...Array(10)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>

            <div className="card p-4 shadow w-100" style={{ maxWidth: "27rem" }}>

                <h4 className="text-center mb-3">
                    {isLogin ? "Добре дошли!" : "Създай акаунт"}
                </h4>

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

                {/* LOGIN FORM (we’ll wire it next) */}
                {isLogin && (
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Имейл</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Парола</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="btn btn-primary w-100">Вход</button>
                    </form>
                )}

                {/* REGISTER FORM */}
                {!isLogin && (
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label">Име</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Фамилия</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Имейл</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Парола</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
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