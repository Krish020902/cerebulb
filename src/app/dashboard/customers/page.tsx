import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import CellTable from '@/components/dashboard/customer/cell-table';
import Timeline from '@/components/dashboard/customer/timeline';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;




export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  // const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack >
      {/* <Stack direction="row" > */}
      {/* <Stack sx={{ flex: '1 1 auto' }}> */}
      <Typography variant="h4" sx={{ marginLeft: 3 }}>East Zone</Typography>
      {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack> */}
      {/* </Stack> */}
      {/* <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div> */}
      {/* </Stack> */}
      {/* <CustomersFilters /> */}
      <CellTable />
      {/* <Timeline plateNumber="03" cards={cardData} /> */}
      {/* <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      /> */}
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
