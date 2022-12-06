import React from 'react'

declare namespace CH {
  type Client = {
    id: string;
    name: string;
    cpf: string;
    birthdate: string;
    phone?: string;
  };

  type ActionButtons = {
    isLoaded?: Boolean;
    primaryAction?: () => void;
    secondaryAction?: () => void;
  };

  type AlertDialog = {
    text?: string;
    action?: string;
    isOpen: boolean;
    primaryAction?: () => void;
    secondaryAction?: () => void;
    cancelRef: React.RefObject;
  };

  type ClientsLimit = {
    quantity: number;
  };
}

export = CH;
export as namespace CH;
