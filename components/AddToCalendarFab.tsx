import { useState } from 'react';
import { Add, CalendarToday } from '@mui/icons-material';
import { Box, Fab, Menu, MenuItem, Tooltip } from '@mui/material';
import { useCalendar } from '../hooks/useCalendar';
import { EventData } from '../types/events';

export interface AddToCalendarFabProps {
  event: EventData;
  onSelect: (calendarUrl: string) => void;
}

export function AddToCalendarFab({ event, onSelect }: AddToCalendarFabProps) {
  const { googleCalendar, iCalendar } = useCalendar(event);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Add to calendar" arrow>
        <Fab
          color="secondary"
          variant="extended"
          id="add-to-calendar"
          aria-controls={open ? 'add-to-calendar-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ position: 'relative' }}
        >
          <CalendarToday />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            marginTop="-6px"
            marginLeft="-8px"
          >
            <Add sx={{ fontSize: 16 }} />
          </Box>
        </Fab>
      </Tooltip>
      <Menu
        id="add-to-calendar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'add-to-calendar',
        }}
      >
        <MenuItem onClick={() => onSelect(googleCalendar().render())}>
          Google Calendar
        </MenuItem>
        <MenuItem onClick={() => onSelect(iCalendar().render())}>
          iCalendar
        </MenuItem>
      </Menu>
    </div>
  );
}
