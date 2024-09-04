import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

const statusMap = {
  A: { label: 'Grade-A', color: 'success' },  // Green
  B: { label: 'Grade-B', color: 'primary' },  // Blue
  C: { label: 'Grade-C', color: 'warning' },  // Yellow
  D: { label: 'Grade-D', color: 'error' },    // Red
} as const;

export interface Order {
  plate_number: number;
  cell_number: string;
  name: string;
  date: Date;
  grade: 'A' | 'B' | 'C' | 'D';
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Plates Graded" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Plate no.</TableCell>
              <TableCell>Cell no.</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Operator name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              console.log("yup", order)
              console.log("mapper", statusMap[order.grade])
              const { label, color } = statusMap[order.grade] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={order.plate_number}>
                  <TableCell>{order.plate_number}</TableCell>
                  <TableCell>{order.cell_number}</TableCell>
                  <TableCell>{dayjs(order.date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
