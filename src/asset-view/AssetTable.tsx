import React from "react";
import { Asset } from "../interfaces/Asset";
import AssetTableHeader, { SortColumn } from "./AssetTableHeader";
import { Note } from "../interfaces/Note";
import { useModalDispatch } from "../modals/ModalStateContext";
import EventDetailModal from "../modals/event-detail-modal/EventDetailModal";
import { AssetTableRow } from "./AssetTableRow";

interface AssetTableProps {
  assets: { asset: Asset; latestNote: Note }[];
  refreshData: () => void;
  sortColumns: SortColumn[];
  onSort: (column: string) => void;
  onRemoveSort: (column: string) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ assets = [], sortColumns, refreshData, onSort, onRemoveSort }) => {
  const dispatch = useModalDispatch();

  const handleOpenEventDetailModal = (asset: Asset) => {
    dispatch({ type: "OPEN_MODAL", payload: asset });
  };

  return (
    <div>
      <table className="table table-striped table-bordered table-hover mt-2">
        <AssetTableHeader sortColumns={sortColumns} onSort={onSort} onRemoveSort={onRemoveSort} />
        <tbody>
          {assets.length > 0 ? (
            assets.map(({ asset, latestNote }) =>
              asset.activeEvent ? (
                <AssetTableRow
                  key={asset._id}
                  asset={asset}
                  latestNote={latestNote}
                  onOpenEventDetailModal={handleOpenEventDetailModal}
                />
              ) : null
            )
          ) : (
            <tr>
              <td colSpan={13}>No assets available</td>
            </tr>
          )}
        </tbody>
      </table>
      <EventDetailModal onClose={refreshData} />
    </div>
  );
};
export default AssetTable;
