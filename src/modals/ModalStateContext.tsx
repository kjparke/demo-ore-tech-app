import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { Asset, defaultAssetPayload } from '../interfaces/Asset';

interface ModalState {
  showModal: boolean;
  showNotesModal: boolean;
  selectedAsset: Asset | null;
}

type ModalAction = 
  | { type: 'OPEN_MODAL'; payload: Asset }
  | { type: 'OPEN_NOTES_MODAL'; payload: Asset }
  | { type: 'CLOSE_MODAL' };

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, showModal: true, showNotesModal: false, selectedAsset: action.payload };
    case 'OPEN_NOTES_MODAL':
      return { ...state, showModal: false, showNotesModal: true, selectedAsset: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false, showNotesModal: false, selectedAsset: null };
    default:
      throw new Error(`Unknown action type`);
  }
};

export const ModalStateContext = createContext<ModalState | undefined>(undefined);
export const ModalDispatchContext = createContext<Dispatch<ModalAction> | undefined>(undefined);

export const ModalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    showModal: false,
    showNotesModal: false,
    selectedAsset: defaultAssetPayload,
  });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModalState = (): ModalState => {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error('useModalState must be used within a ModalProvider');
  }
  return context;
};

export const useModalDispatch = (): Dispatch<ModalAction> => {
  const context = useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error('useModalDispatch must be used within a ModalProvider');
  }
  return context;
};
