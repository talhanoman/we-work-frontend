import React, { useEffect, useState } from 'react';
import StatCard from './overview/StatCard';
import DonutChartCard from './overview/DonutChartCard';
import MultibarChartCard from './overview/StackChartCard';
import { getEventCount } from '@/pages/api/get';

function OverviewTab() {
  const [isClient, setIsClient] = useState(false);
  const [count, setWorkforceCount] = useState([]);
  const [total, setWorkforceTotal] = useState([]);
  const [eventCountDataChart, setEventCount] = useState([]);

  useEffect(() => {
    setIsClient(true);
    getWorkforceData();
    getEventData();
  }, []);

  const getWorkforceData = async () => {        
      const total =
        parseInt(40) +
        parseInt(50) +
        parseInt(78);
      setWorkforceTotal(total);
  };

  const getEventData = async () => {
    let res = await getEventCount();
    let data = res;          
      const eventData = data
        ?.filter((item) => item.Headcount !== 0)
        .map((item) => ({
          name: item.event_name,
          value: item.Headcount,
        }));
      setEventCount(eventData);
    
  };

  return (
    <div className='w-full h-[calc(100vh-203px)] overflow-y-auto rounded-bl-[40px] bg-gray-50 px-8 pt-8 pb-16'>
      <h6 className='font-semibold'>Workforce total</h6>

      {/* Section 1 -> Stat Cards */}
      <div className='flex mt-6 flex-wrap lg:flex-nowrap justify-between'>
        <StatCard
          title={'Contractors'}
          count={40}
          percentage={((parseInt(40) / total) * 100).toFixed(
            2
          )}
        />
        <StatCard
          title={'Volunteers'}
          count={50}
          percentage={((parseInt(50) / total) * 100).toFixed(
            2
          )}
        />
        <StatCard
          title={'Paid Staff'}
          count={78}
          percentage={((parseInt(78) / total) * 100).toFixed(
            2
          )}
        />
      </div>
      {/* Section 2 ->  Donut Charts */}
      <div className='flex mt-6  flex-wrap lg:flex-nowrap justify-between'>
        {/* Card */}
        <DonutChartCard
          title={'Headcount by workforce type'}
          data={[
            { name: 'Contractors', value: 40 },
            { name: 'Volunteers', value: 50 },
            { name: 'Paid Staff', value: 78 },
          ]}
        />
        <DonutChartCard
          title={'Headcount by event'}
          data={eventCountDataChart}
        />
      </div>
      {/* Section 3 -> Multibar Chart */}
      <div className='mt-6'>
        <MultibarChartCard title={'Workforce breakdown'} />
      </div>
    </div>
  );
}

export default OverviewTab;
