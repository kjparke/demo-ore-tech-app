import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Login from "../auth/Login";
import ShopView from "../shop-view/ShopView";
import AssetView from "../asset-view/AssetView";
import AHSCalibrationsView from "../ahs-calibrations/AHSCalibrationsView";
import AccountSettingsView from "../account-settings/AccountSettingsView";
import HistoryView from "../history-view/HistoryView";
import ShiftSummaryView from "../shift-summary/ShiftSummaryView";
import ReportsView from "../reports/ReportsView";

const Routes = () => {
  const { token } = useAuth();

  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      { token ? (
        <>
          <Route path="/" element={<ShopView />} />
          <Route path="/assets" element={<AssetView />} />
          <Route path="/ahs-calibrations" element={<AHSCalibrationsView />} />
          <Route path="/account-settings" element={<AccountSettingsView />} />
          <Route path="/history" element={<HistoryView />} />
          <Route path="/shift-summary" element={<ShiftSummaryView />} />
          <Route path="/reports" element={<ReportsView />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
    </ReactRoutes>
  );
};

export default Routes;
