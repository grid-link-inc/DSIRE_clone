import { Card, CardContent, CardHeader, Link, List, ListItem, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ResourcesCard = (props) => {
  return (
    <Card>
      <CardHeader title="Resources" subheader="Learn more about this program." />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <List>
          {props.programWebsite && (
            <>
              <ListItem>
                <Link href={props.programWebsite} target="_blank" rel="noopener noreferrer">
                  Program Website
                </Link>
              </ListItem>
            </>
          )}
          {props.authorityWebsite && (
            <>
              <Divider component="li" />
              <ListItem>
                <Link href={props.authorityWebsite} target="_blank" rel="noopener noreferrer">
                  Authority Website
                </Link>
              </ListItem>
            </>
          )}
          {props.authorityCode && (
            <>
              <Divider component="li" />
              <ListItem>
                <Typography sx={{ minWidth: '150px' }} color="textSecondary">
                  Authority Code:
                </Typography>
                <Typography variant="h5">{props.authorityCode}</Typography>
              </ListItem>
            </>
          )}
          {props.utilityName && (
            <>
              <Divider component="li" />
              <ListItem>
                <Typography sx={{ minWidth: '150px' }} color="textSecondary">
                  Utiltiy:
                </Typography>
                <Typography variant="h5">{props.utilityName}</Typography>
              </ListItem>
            </>
          )}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

ResourcesCard.propTypes = {
  programWebsite: PropTypes.string,
  authorityCode: PropTypes.string,
  authorityWebsite: PropTypes.string,
  utilityName: PropTypes.string
};

export default ResourcesCard;
