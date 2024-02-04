import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LocationCard = (props) => {
  return (
    <Card>
      <CardHeader subheader="Where this program is effective." title="Location" />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <List>
          <ListItem>
            <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
              State:
            </Typography>
            <Typography variant="h5">{props.state}</Typography>
          </ListItem>
          {props.county && (
            <>
              <Divider component="li" />
              <ListItem>
                <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
                  County:
                </Typography>
                <Typography variant="h5">{props.county}</Typography>
              </ListItem>
            </>
          )}
          {props.city && (
            <>
              <Divider component="li" />
              <ListItem>
                <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
                  City:
                </Typography>
                <Typography variant="h5">{props.city}</Typography>
              </ListItem>
            </>
          )}
          {props.zip && (
            <>
              <Divider component="li" />
              <ListItem>
                <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
                  Zip:
                </Typography>
                <Typography variant="h5">{props.zip}</Typography>
              </ListItem>
            </>
          )}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

LocationCard.propTypes = {
  state: PropTypes.string,
  county: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string
};

export default LocationCard;
