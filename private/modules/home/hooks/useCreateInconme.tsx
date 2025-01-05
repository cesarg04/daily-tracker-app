import useModal from '@/shared/hooks/useModal';
import React, { useEffect } from 'react';
import CreateIncomeTemplate from '../components/create-income/CreateIncometemplate';

export const useCreateIncome = () => {
  const { modal, onClose, onConfirm } = useModal();

  const createIncome = () => {
    return modal({
      template: <CreateIncomeTemplate />,
    });
  };

  useEffect(() => {}, []);

  return {
    createIncome,
  };
};
