import React from 'react';
import { FiMoreVertical, FiMenu, FiArrowUp } from 'react-icons/fi';
import {
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Label,
  Cell,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Summer Music Festival', value: 400 },
  { name: 'International Trade Expo', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = [
  '#084CD0',
  '#DEEBFB',
  '#5683DB',
  '#6FAAEB',
  '#9DC8F3',
  '#C5DDF8',
];
export default function DonutChartCard({ event_name }) {
  const centerLabel = (
    <Label
      value={'Events'}
      position='center'
      style={{ fontSize: '18px', fontWeight: 'bold', fill: '#231F20' }}
    />
  );
  return (
    <div className='w-full lg:w-[49.3%] p-6 shadow-sm rounded-lg border border-[#E2E2E2] h-[300px]'>
      <div className='flex justify-between  items-center'>
        <h6 className='font-semibold text-base text-[#231F20]'>Event 1</h6>
        {/* <FiMoreVertical role='button' className='w-5 h-5 text-[#B4B5B6]' /> */}
      </div>
      <ResponsiveContainer>
        <PieChart className='overflow-hidden'>
          <Legend
            iconType='circle'
            layout='vertical'
            verticalAlign='middle'
            align='right'
            iconSize={10}
            height='100%'
            wrapperStyle={{
              display: 'flex',
              alignItems: 'center',
              'overflow-y': 'auto',
              paddingBottom: '16px',
              color: '#979798',
              fontSize:  '14px'
            }}
          />
          <Tooltip />
          <Pie
            data={data}
            cx={'30%'}
            cy={'50%'}
            innerRadius={50}
            outerRadius={90}
            fill='#8884d8'
            paddingAngle={0}
            dataKey='value'
          >
            {centerLabel}
            {data &&
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  color='#979798'
                />
              ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
