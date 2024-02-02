'use client';
import { FaSearch } from 'react-icons/fa';
import { Button, Modal, Table } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import SidebarPromoter from '../component/SidebarDashboard';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 52,
      customer: 'ALWI',
      event: 'Tarung genggong',
      quantity: 1,
      total: 'Rp.1000',
      status: 'Transaction Success',
    },
    {
        id: 54,
        customer: 'Purwachups',
        event: 'nikahan kucing tetangga',
        quantity: 1,
        total: 'Rp.2000',
        status: 'Waiting Payment',
    },
    {
        id: 55,
        customer: 'Aldi meimei',
        event: 'Festival Dashboard Developer',
        quantity: 1,
        total: '$1.000.000.000',
        status: 'Cancelled Transaction)',
    },
    {
      id: 56,
      customer: 'Abeels AQMAL',
      event: 'Festival Mandi',
      quantity: 3,
      total: 'Rp.120.000',
      status: 'Expired Transaction',
    },
    {
        id: 57,
        customer: 'Anggi',
        event: 'Festival siul',
        quantity: 2,
      total: '$2',
      status: 'Rejected Transaction',
    },
    {
      id: 53,
      customer: 'Baso',
      event: 'Festival mie ayam',
      quantity: 5,
      total: '$5',
      status: 'Waiting Admin Confirmation',
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState<string>('');
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  
  const handleAccept = (transactionId: any) => {
    setSelectedTransactionId(transactionId);
    setModalAction('accept');
    setOpenModal(true);
  };

  const handleDecline = (transactionId: any) => {
    setSelectedTransactionId(transactionId);
    setModalAction('decline');
    setOpenModal(true);
  };

  const confirmDecline = () => {
    console.log('Declined transaction', selectedTransactionId);
    // Update the transactions state with the declined transaction
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === selectedTransactionId
          ? { ...transaction, status: 'Rejected Transaction' }
          : transaction,
      ),
    );
    setOpenModal(false);
  };

  const confirmAccept = () => {
    console.log('Declined transaction', selectedTransactionId);
    // Update the transactions state with the declined transaction
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === selectedTransactionId
          ? { ...transaction, status: 'Transaction Success' }
          : transaction,
      ),
    );
    setOpenModal(false);
  };
  // Determine if the Accept and Decline buttons should be displayed for a transaction
  const shouldShowActions = (status: string) => {
    return ['Waiting Admin Confirmation'].includes(status);
  };

  return (
    <div className="flex w-full ">
      <SidebarPromoter activeLink={'transactions'} />
      <div className="bg-white p-20 w-full">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Transactions
        </h1>
        <div className="mt-4 flex mb-10">
          <div className="flex-1">
            <label htmlFor="search-transactions" className="sr-only">
              Search transactions
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search-transactions"
                id="search-transactions"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for transactions"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Customer</Table.HeadCell>
              <Table.HeadCell>Event</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Total</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Action</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {transactions.map((transaction) => (
                <Table.Row
                  key={transaction.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {transaction.id}
                  </Table.Cell>
                  <Table.Cell>{transaction.customer}</Table.Cell>
                  <Table.Cell>{transaction.event}</Table.Cell>
                  <Table.Cell>{transaction.quantity}</Table.Cell>
                  <Table.Cell>{transaction.total}</Table.Cell>
                  <Table.Cell>{transaction.status}</Table.Cell>
                  <Table.Cell className="flex justify-between">
                    <Button className="font-medium hover:underline ">
                      View
                    </Button>
                    {shouldShowActions(transaction.status) && (
                      <>
                        <Button
                          className="font-medium hover:underline "
                          onClick={() => handleAccept(transaction.id)}
                        >
                          Accept
                        </Button>

                        <Button
                          className="font-medium hover:underline "
                          onClick={() => handleDecline(transaction.id)}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      {openModal && (
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {modalAction === 'accept'
                  ? 'Are you sure you want to accept this transaction?'
                  : 'Are you sure you want to decline this transaction?'}
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color={modalAction === 'accept' ? 'success' : 'failure'}
                  onClick={
                    modalAction === 'accept' ? confirmAccept : confirmDecline
                  }
                >
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Transactions;