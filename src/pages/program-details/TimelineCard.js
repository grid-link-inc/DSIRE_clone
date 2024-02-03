import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// TODO apply sx={{ minWidth: '180px' }} to all Typography components
// TODO apply sx={{ display: 'flex' }} to all ListItem components
const TimelineCard = (props) => {
  return (
    <Card>
      <CardHeader title="Timeline" subheader="The relevant dates for this program." />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <List>
          {props.startDate && (
            <>
              <ListItem>
                <Typography color="textSecondary" sx={{ minWidth: '180px' }}>
                  Start Date:
                </Typography>
                <Typography variant="h5">{props.startDate.toDateString()}</Typography>
              </ListItem>
            </>
          )}
          {props.endDate && (
            <>
              <Divider component="li" />
              <ListItem>
                <Typography color="textSecondary" sx={{ minWidth: '180px' }}>
                  End Date:
                </Typography>
                <Typography variant="h5">{props.endDate.toDateString()}</Typography>
              </ListItem>
            </>
          )}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

TimelineCard.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};

export default TimelineCard;
