// import "../Shop.css";
// import { Asset } from "../../interfaces/Asset";
// import { formatStatusString } from "../../helpers/AssetHelpers";
// import ShopDetail from "./shop-detail-tabs/ShopDetail";
// import { useAsset } from "../../asset-context/AssetContext";
// import assetServiceInstance from "../../services/asset.service";
// import eventServiceInstance from "../../services/event.service";
// import { useModal } from "../../asset-context/ShopDetailModalContext";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../auth/AuthContext";
// import { Payload } from "../../interfaces/Payload";
// import { useModalDispatch, useModalState } from "../../modals/ModalStateContext";

// export default function ShopDetailsModal() {
//   const { fetchAssetData } = useAsset();
//   const { user } = useAuth();
//   // const { assetDetail } = useModal();
//   const { selectedAsset, showModal } = useModalState();
//   const dispatch = useModalDispatch();

//   const handleSave = async () => {
//     try {
//       // const payload: Payload = {
//       //   data: assetDetail,
//       //   metaData: user,
//       // };
//       // await eventServiceInstance.updateEvent(payload);
//       // fetchAssetData();
//       dispatch({ type: 'CLOSE_MODAL' });
//     } catch (error) {
//       console.error("Error updating asset:", error);
//     }
//   };

//   const handleRelease = async () => {
//     const confirmRelease = window.confirm(
//       "Are you sure you want to release this asset? Ore-Tech will not track event changes for this asset until it is reporting as operational from Minestar/Wenco."
//     );
//     if (confirmRelease) {
//       try {
//         // const payload: Payload = {
//         //   data: asset,
//         //   metaData: user,
//         // };
//         // await assetServiceInstance.releaseAsset(payload);
//         // fetchAssetData();
//         dispatch({ type: 'CLOSE_MODAL' });
//       } catch (error) {
//         console.error("Error encountered while releasing this asset: ", error);
//       }
//     }
//   };

//   if (!selectedAsset) return null;

//   return (
//     <div className={`modal ${showModal ? 'show d-block' : 'fade'}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
//       <div className="modal-dialog modal-xl modal-dialog-centered shop-detail-modal">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h4 className="modal-title fw-bold ps-3">{selectedAsset.unitId}</h4>
//             <div className={`ms-5 secondary-status-chip status-${selectedAsset.status.replace("_", "-")}`}>
//               <p className="mb-0">
//                 {formatStatusString(selectedAsset.status) + " - " + selectedAsset.activeEvent.secondaryStatus}
//               </p>
//             </div>
//             <button type="button" className="btn-close" aria-label="Close" onClick={(e) => dispatch({ type: 'CLOSE_MODAL' })}></button>
//           </div>
//           <div className="modal-body">
//             {/* <ShopDetail /> */}
//             Finally got it to work!
//           </div>
//           <div className="modal-footer d-flex justify-content-between">
//             <button type="button" className="btn btn-inverse" onClick={(e) => dispatch({ type: 'CLOSE_MODAL' })}>
//               Close
//             </button>
//             <div>
//               <button type="button" className="btn btn-inverse me-2" onClick={handleRelease}>
//                 Release
//               </button>
//               <button type="button" className="btn btn-primary" onClick={handleSave}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from 'react';
import "../Shop.css";
import { formatStatusString } from "../../helpers/AssetHelpers";
import { useModalDispatch, useModalState } from '../../modals/ModalStateContext';

const ShopDetailsModal: React.FC = () => {
  const { selectedAsset, showModal } = useModalState();
  const dispatch = useModalDispatch();

  if (!selectedAsset) return null;

  return (
    <div id='shop-details-modal' className={`modal ${showModal ? ' modal-show' : ""}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered shop-detail-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold ps-3">{selectedAsset.unitId}</h4>
            <div className={`ms-5 secondary-status-chip status-${selectedAsset.status.replace("_", "-")}`}>
              <p className="mb-0">
                {formatStatusString(selectedAsset.status) + " - " + selectedAsset.activeEvent.secondaryStatus}
              </p>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}></button>
          </div>
          <div className="modal-body">
            Testing to see if this works
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-inverse" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              Close
            </button>
            <div>
              <button type="button" className="btn btn-inverse me-2" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                Release
              </button>
              <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsModal;
