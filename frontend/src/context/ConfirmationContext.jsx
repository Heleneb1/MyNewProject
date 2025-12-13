import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const ConfirmationContext = createContext();

export const useConfirmation = () => {
  return useContext(ConfirmationContext);
};

export function ConfirmationProvider({ children }) {
  const [confirmation, setConfirmation] = useState(null);

  const confirm = (message, onConfirm) => {
    setConfirmation({ message, onConfirm });
  };

  const cancel = () => {
    setConfirmation(null);
  };

  const handleConfirm = () => {
    if (confirmation && typeof confirmation.onConfirm === 'function') {
      confirmation.onConfirm();
    }
    cancel();
  };

  const value = useMemo(() => ({ confirm, cancel }), [confirm, cancel]);

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      {confirmation && (
        <div className="confirmation-modal">
          <p>{confirmation.message}</p>
          <div className="buttonContainer">
            <button
              type="button"
              className="Changebook"
              onClick={handleConfirm}
            >
              Confirmer
            </button>
            <button type="button" className="Changebook" onClick={cancel}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
}

ConfirmationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
