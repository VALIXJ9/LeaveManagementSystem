import "../styles/login.css";

const Login = () => {
    return (
        <div className="wrapper">
            <div className="back">
                {[...Array(10)].map((_, i) => <div key={i}></div>)}
            </div>

            <div className="card p-4 shadow w-100" style={{ maxWidth: "27rem" }}>
                <h4 className="text-center mb-3">Добре дошли!</h4>

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
            </div>
        </div>
    );
};

export default Login;