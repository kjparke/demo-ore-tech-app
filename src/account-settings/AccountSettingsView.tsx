import ChangePassword from "./ChangePasswordTab";
import UserDetailsTab from "./UserDetailsTab";

export default function AccountSettingsView() {
  return (
    <div className="container mt-4">
      <div className="card col-md">
        <div className="card-body">
          <h5 className="account-settings-header mb-3">Account Settings</h5>
          <div className="d-flex align-items-start">
            <div
              className="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link active"
                id="user-detail-tab"
                data-bs-toggle="pill"
                data-bs-target="#user-detail"
                type="button"
                role="tab"
                aria-controls="user-detail"
                aria-selected="true"
              >
                User Details
              </button>
              <button
                className="nav-link"
                id="change-password-tab"
                data-bs-toggle="pill"
                data-bs-target="#change-password"
                type="button"
                role="tab"
                aria-controls="change-password"
                aria-selected="false"
              >
                Change Password
              </button>
            </div>
            <div className="tab-content w-50" id="v-pills-tabContent">
              <UserDetailsTab />
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
