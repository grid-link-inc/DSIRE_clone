import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '../../../node_modules/@mui/material/index';

const contactsListItems = (contacts) => {
  if (!contacts) {
    return null;
  }
  return contacts.map((contact) => {
    return (
      <ListItem key={contact.id}>
        <Stack spacing={0}>
          <Typography>
            {contact.first_name} {contact.last_name}
          </Typography>
          <Typography>{contact.organization_name}</Typography>
          <Typography>{contact.phone}</Typography>
          <Link href={contact.website} target="_blank" rel="noreferrer">
            Website
          </Link>
        </Stack>
      </ListItem>
    );
  });
};

const ContactsCard = (props) => {
  console.log('ContactsCard', props);
  return (
    <Card>
      <CardHeader title="Contact" />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <List>{contactsListItems(props.contacts)}</List>
      </CardContent>
    </Card>
  );
};

ContactsCard.propTypes = {
  contacts: PropTypes.array
};

export default ContactsCard;
