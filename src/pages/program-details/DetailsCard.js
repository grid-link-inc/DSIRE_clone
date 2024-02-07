import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const detailsListItems = (details) => {
  if (!details) {
    return null;
  }
  return details.map((detail) => {
    if (detail.value === null) {
      return null;
    }
    return (
      <ListItem key={detail.id}>
        <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
          {detail.label}:
        </Typography>
        <Typography variant="h5">{detail.value}</Typography>
      </ListItem>
    );
  });
}

const DetailsCard = (props) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Details" sx={{ background: theme.palette.primary.main }} />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <List>{detailsListItems(props.listOfDetails)}</List>
      </CardContent>
    </Card>
  );
};

DetailsCard.propTypes = {
  listOfDetails: PropTypes.array
};

export default DetailsCard;
