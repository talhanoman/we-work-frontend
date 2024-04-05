import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Label,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const StackChart = ({ xAxisLabel }) => {
  // Sample data
  const data = [
      { name: 'A', 'Paid Staff': 12, 'Volunteers': 23, 'Contractors': 122 },
      { name: 'B', 'Paid Staff': 22, 'Volunteers': 3, 'Contractors': 73 },
      { name: 'C', 'Paid Staff': 13, 'Volunteers': 15, 'Contractors': 32 },
      { name: 'D', 'Paid Staff': 44, 'Volunteers': 35, 'Contractors': 23 },
      { name: 'E', 'Paid Staff': 35, 'Volunteers': 45, 'Contractors': 20 },
      { name: 'F', 'Paid Staff': 62, 'Volunteers': 25, 'Contractors': 29 },
      { name: 'G', 'Paid Staff': 37, 'Volunteers': 17, 'Contractors': 61 },
      { name: 'H', 'Paid Staff': 28, 'Volunteers': 32, 'Contractors': 45 },
      { name: 'I', 'Paid Staff': 19, 'Volunteers': 43, 'Contractors': 93 },
  ];

 

  return (
    <div className='w-full ' style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} maxBarSize={40}>
          <XAxis dataKey='name'>
            <Label value={xAxisLabel} offset={-2} position='insideBottom' />
          </XAxis>
          <YAxis
            label={{ value: 'Headcount', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend
            verticalAlign='top'
            height={36}
            iconType='circle'
            align='right'
            fontSize={14}
          />
          <CartesianGrid strokeDasharray='3 3' />          
          <Bar
            dataKey='Contractors'
            stackId='a'
            fill='#084dd1'
            radius={[5, 5, 0, 0]}
            fontSize={14}
          />
          <Bar
            dataKey='Volunteers'
            stackId='a'
            fill='#c5ddf8'
            radius={[5, 5, 0, 0]}
            fontSize={14}
          />
          <Bar
            dataKey='Paid Staff'
            stackId='a'
            fill='#5683db'
            radius={[5, 5, 0, 0]}
            fontSize={14}
          />
         
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackChart;
