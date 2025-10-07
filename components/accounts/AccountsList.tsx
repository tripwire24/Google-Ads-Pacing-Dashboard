
import React, { useRef, useState } from 'react';
import { Account } from '../../types';
import AccountCard from './AccountCard';

interface AccountsListProps {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  selectedAccountId: string | null;
  onSelectAccount: (id: string) => void;
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts, setAccounts, selectedAccountId, onSelectAccount }) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    setTimeout(() => setDragging(true), 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const copyListItems = [...accounts];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setAccounts(copyListItems);
    }
    setDragging(false);
  };
  
  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
    setDragging(false);
  };

  return (
    <div className="bg-gray-200 h-full flex flex-col border-r border-gray-300">
      <div className="sticky top-0 bg-gray-200/80 backdrop-blur-sm p-4 z-10 border-b border-gray-300">
        <h2 className="text-xl font-bold text-gray-700">Accounts</h2>
      </div>
      <div className="overflow-y-auto flex-grow" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {accounts.map((account, index) => (
          <div
            key={account.id}
            className={`
              transition-opacity duration-300 
              ${dragging && dragItem.current === index ? 'opacity-30' : 'opacity-100'}
            `}
            onDragEnter={(e) => handleDragEnter(e, index)}
          >
            <AccountCard
              account={account}
              isSelected={account.id === selectedAccountId}
              onSelect={() => onSelectAccount(account.id)}
              draggableProps={{
                draggable: true,
                onDragStart: (e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, index),
                onDragEnd: handleDragEnd
              }}
            />
            {dragging && dragOverItem.current === index && (
                 <div className="h-16 m-2 bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
