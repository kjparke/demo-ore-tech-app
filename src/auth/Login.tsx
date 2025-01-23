import { useState } from "react";
import "./Auth.css";
import authServiceInstance from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "../images/ore-tech-logo.png";


export default function Login() {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const resp = await authServiceInstance.signIn(email, password);
      setUser({
        id: resp.id, 
        firstName: resp.firstName, 
        lastName: resp.lastName, 
        email: resp.email, 
        accessLevel: resp.accessLevel
      });

      setToken(resp.accessToken);
    } catch (error) {
      alert(`Login failed: ${error}`)
    }

    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card px-5 py-4">
            <div className="text-center">
              <img src={logo} alt="ore-tech-logo" width="84" height="75" />
              <h2 className="text-center mt-2">Welcome to Ore-Tech</h2>
            </div>
            <hr />
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="row justify-content-center">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-primary w-100 mt-4"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
