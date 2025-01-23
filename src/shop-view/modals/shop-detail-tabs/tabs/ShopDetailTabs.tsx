import { useModal } from '../../../../context/ShopDetailModalContext';
import EventDetailTab from './EventDetailTab';
import ShiftSummaryTab from './ShiftSummaryTab';

export default function ShopDetailTabs() {
  const { assetDetail } = useModal();

  return (
    <>
      <ul className="nav nav-tabs" id="shop-detail-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link tab-link active`}
            id="event-detail-tab"
            data-bs-toggle="tab"
            data-bs-target={"#event-detail-" + assetDetail.unitId}
            type="button"
            role="tab"
          >
            Event Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link tab-link`}
            id="shift-summary-tab"
            data-bs-toggle="tab"
            data-bs-target={"#shift-summary-" + assetDetail.unitId}
            type="button"
            role="tab"
          >
            Shift Summary
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="shop-view-content">
        <div className={`tab-pane fade show active`} id={"event-detail-" + assetDetail.unitId} role="tabpanel">
          <EventDetailTab />
        </div>
        <div className={`tab-pane fade`} id={"shift-summary-" + assetDetail.unitId} role="tabpanel">
          <ShiftSummaryTab />
        </div>
      </div>
    </>
  );
};

