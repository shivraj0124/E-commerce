import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Ap() {
  const data = [
    {
      name: "Jan",
      value: 2321,
    },
    {
      name: "Feb",
      value: 3343,
    },
    {
      name: "Mar",
      value: 3000,
    },
    {
      name: "Apr",
      value: 2455,
    },
    {
      name: "May",
      value: 3500,
    },
    {
      name: "Jun",
      value: 3900,
    },
    {
      name: "Jul",
      value: 3800,
    },
    {
      name: "Aug",
      value: 3700,
    },
    {
      name: "Sep",
      value: 4000,
    },
    {
      name: "Oct",
      value: 5000,
    },
    {
      name: "Nov",
      value: 5790,
    },
    {
      name: "Dec",
      value: 6000,
    },
  ];

  ``;
  return (
    <div style={{ overflowX: "auto" }} className="w-[100%] bg-white">
    <ResponsiveContainer width="100%" height={300}>
    <AreaChart
      data={data}
     
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#2563eb"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}