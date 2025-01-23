import { FormEvent, useState } from "react";
import API from "../Api";
import { useAuth } from "../auth/AuthContext";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", message: "", isSuccess: true });

  const { user, setUser } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAlert(false);

    if (newPassword === "" || oldPassword === "" || repeatPassword === "") {
      setAlertContent({
        title: "Invalid Form",
        message: "Please fill out all fields of the form.",
        isSuccess: false
      });
      setShowAlert(true);
      return;
    }

    if (newPassword !== repeatPassword) {
      setAlertContent({
        title: "Passwords Do Not Match",
        message: "Please ensure the new passwords match.",
        isSuccess: false
      });
      setShowAlert(true);
      return;
    }

    const email = user ? user.email : "";
    const payload = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await API.patch("/auth/change-password", payload);
      setUser(response.data);
      setAlertContent({
        title: "Success",
        message: "Your password has been changed successfully.",
        isSuccess: true
      });
      setShowAlert(true);
    } catch (error) {
      setAlertContent({
        title: "Error",
        message: "Something went wrong. Please try again. If the issue persists, please contact an administrator.",
        isSuccess: false
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <div className={`alert ${alertContent.isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
          <h4 className="alert-heading">{alertContent.title}</h4>
          <p>{alertContent.message}</p>
        </div>
      )}
      <div className="tab-pane fade" id="change-password" role="tabpanel" aria-labelledby="change-password-tab">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="oldPasswordInput" className="form-label">Old Password</label>
            <input type="password" className="form-control" id="oldPasswordInput" onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="newPasswordInput" className="form-label">New Password</label>
            <input type="password" className="form-control" id="newPasswordInput" onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPasswordInput" className="form-label">Repeat Password</label>
            <input type="password" className="form-control" id="repeatPasswordInput" onChange={(e) => setRepeatPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </>
  );
}
