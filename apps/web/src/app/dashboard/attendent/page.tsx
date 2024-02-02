'use client';

import { Table } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import SidebarPromoter from '../component/SidebarDashboard';

const Attendees = () => {
  return (
    <div className="flex w-full">
      <SidebarPromoter activeLink={'attendees'} />

      <div className="bg-white p-20 w-full">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 leading-tight text-gray-600">
          Attendance
        </h1>
        <div className="mt-4 flex mb-10">
          <div className="flex-1">
            <label htmlFor="search-attendees" className="sr-only">
              Search attendees
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
                name="search-attendees"
                id="search-attendees"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Find Something"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  cucibubur@gmail.com
                </Table.Cell>
                <Table.Cell>Transaction Failed</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-[#ff4b00] hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  cuciberas@gmail.com
                </Table.Cell>
                <Table.Cell>Transaction Succed</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-[#ff4b00] hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Attendees;