import ManualAssetImportModal from "../modals/manual-import/ManualAssetImportModal";
import { useAuth } from "../auth/AuthContext";

export default function AddAsset() {
  const { user, token } = useAuth();
  return (
    <>
      {user && token && (
        <div>
          <button
            type="button"
            className="btn btn-primary mx-3"
            data-bs-toggle="modal"
            data-bs-target="#manual-asset-import-modal-id"
          >
            <i className="bi bi-plus-square"></i> Add Asset
          </button>
          <ManualAssetImportModal modalId="manual-asset-import-modal-id" />
        </div>
      )}
    </>
  );
}
