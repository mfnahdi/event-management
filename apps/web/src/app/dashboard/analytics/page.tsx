'use client';
import React from 'react';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import SidebarPromoter from '../component/SidebarDashboard';

const dataYear = [
  { date: '2023', ticketsSold: 10000, revenue: 10000 },
  { date: '2023', ticketsSold: 15000, revenue: 15000 },
  { date: '2023', ticketsSold: 2000, revenue: 20000 },
  { date: '2023', ticketsSold: 18000, revenue: 18000 },
  { date: '2023', ticketsSold: 220, revenue: 22000 },
  { date: '2023', ticketsSold: 17000, revenue: 17000 },
  { date: '2023', ticketsSold: 250, revenue: 25000 },
  { date: '2023', ticketsSold: 28000, revenue: 28000 },
];

const dataMonth = [
  { date: 'Jan', ticketsSold: 10, revenue: 1000 },
  { date: 'Feb', ticketsSold: 1000, revenue: 1000 },
  { date: 'Mar', ticketsSold: 100, revenue: 10000 },
  { date: 'Apr', ticketsSold: 8000, revenue: 20000 },
  { date: 'Mei', ticketsSold: 200, revenue: 20000 },
  { date: 'Jun', ticketsSold: 10000, revenue: 1000 },
  { date: 'Jul', ticketsSold: 500, revenue: 1000 },
  { date: 'Aug', ticketsSold: 1000, revenue: 1000 },
  { date: 'Sept',ticketsSold: 20000, revenue: 2000 },
  { date: 'Oct', ticketsSold: 20, revenue: 2000 },
  { date: 'Nov', ticketsSold: 4000, revenue: 4000 },
  { date: 'Dec', ticketsSold: 20000, revenue: 2000 },
];

const dailyData = [
  { date: '1/Jan', ticketsSold: 1000, revenue: 3000 },
  { date: '2/Jan', ticketsSold: 1500, revenue: 5500 },
  { date: '3/Jan', ticketsSold: 2000, revenue: 7000 },
  { date: '4/Jan', ticketsSold: 1800, revenue: 9800 },
  { date: '5/Jan', ticketsSold: 2200, revenue: 8200 },
  { date: '6/Jan', ticketsSold: 17000, revenue: 20700 },
  { date: '7/Jan', ticketsSold: 2500, revenue: 3500 },
  { date: '8/Jan', ticketsSold: 2800, revenue: 1800 },
  { date: '9/Jan', ticketsSold: 2800, revenue: 8800 },
];

const Graphic = () => {
  return (
    <div className="flex w-full">
      <SidebarPromoter activeLink={'analytics'} />

      <div className="bg-white p-20 w-full">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Analytics
        </h1>

        <div className="overflow-x-auto">
          <div>
            <h2 className="text-2xl mb-4">Yearly Statistics</h2>
            <LineChart
              width={600}
              height={300}
              data={dataYear}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="ticketsSold"
                stroke="#8884d8"
                name="Tickets Sold"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                name="Revenue"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
          <div>
            <h3 className="text-2xl mt-8 mb-4">Monthly Statistics</h3>
            <LineChart
              width={600}
              height={300}
              data={dataMonth}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="ticketsSold"
                stroke="#8884d8"
                name="Tickets Sold"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                name="Revenue"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
          <div>
            <h4 className="text-2xl mt-8 mb-4">Daily Statistics</h4>
            <LineChart
              width={600}
              height={300}
              data={dailyData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="ticketsSold"
                stroke="#8884d8"
                name="Tickets Sold"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                name="Revenue"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphic;
