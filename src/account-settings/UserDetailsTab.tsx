import { useAuth } from "../auth/AuthContext";

export default function UserDetailsTab() {
  const { user } = useAuth();
  const userFullName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.email;

  const getAccessLevel = () => "All Access";

  return (
    <div className="tab-pane fade show active" id="user-detail" role="tabpanel" aria-labelledby="user-detail-tab"
         style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h5 style={{ marginBottom: '10px' }}>{userFullName}</h5>
      <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
        <p><strong>E-Mail:</strong> {userEmail}</p>
        <p><strong>Access Level:</strong> {getAccessLevel()}</p>
      </div>
    </div>
  );
}
