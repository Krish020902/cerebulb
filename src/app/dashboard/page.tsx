'use client'
import * as React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import ImageComponent from '@/components/dashboard/overview/imagecomponent';

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` };

export default function Page(): React.JSX.Element {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    // Fetch data from localhost API
    axios.get('http://localhost:5000/anode_inventory') // Replace with your actual endpoint
      .then((response) => {

        // Process and set the data
        const fetchedOrders = response.data.data.map((order: any) => ({
          plate_number: order.plate_number,
          cell_number: order.cell_number, // Replace with actual key from your API response
          name: order.name, // Replace with actual key from your API response
          date: order.date, // Replace with actual key from your API response
          grade: order.grade, // Replace with actual key from your API response
        }));

        setOrders(fetchedOrders);

      })
      .catch((error) => {

        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="7475" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="14" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={7} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="₹15k" />
      </Grid>
      <Grid lg={8} xs={12}>
        <ImageComponent />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[5, 10, 25, 60]} labels={['GradeD', 'GradeC', 'GradeB', 'GradeA']} sx={{ height: '100%' }} />
      </Grid>

      <Grid lg={12} md={12} xs={12}>
        <LatestOrders orders={orders} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
