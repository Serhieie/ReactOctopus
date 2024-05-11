import css from './DatePickerCustom.module.scss';

import * as React from 'react';
import { createSvgIcon } from '@mui/material/utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { color } from '@mui/system';

const FlightLandIcon = createSvgIcon(
  <path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z" />,
  'FlightLandIcon'
);

function MuiIcon() {
  return (
    <img src="/static/logo.svg" alt="Date picker opening icon" width={32} />
  );
}

export default function CustomOpeningIcon() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker
          // Using an SVG component from `@mui/icons-material`
          slots={{ openPickerIcon: ExpandMoreIcon }}
          slotProps={{
            textField: {
              inputVariant: 'filled',
              inputProps: {
                disableUnderline: true,
                style: { color: 'green', border: 'none' }, // Set text color to white
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
