import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { dataList } from './list';

const BarPage = ({ users }: any) => {
  return (
    <div className="p-5">
      <h4 className="text-primary text-center font-extrabold uppercase">
        Grafik User
      </h4>
      <ResponsiveContainer height={400}>
        <BarChart width={730} height={250} data={dataList}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="User" fill="#8884d8" />
          <Bar dataKey="Transaction" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarPage;
