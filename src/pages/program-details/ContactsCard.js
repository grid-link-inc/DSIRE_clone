import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '../../../node_modules/@mui/material/index';

const contactsListItems = (contacts) => {
  if (!contacts) {
    return null;
  }
  return contacts.flatMap((contact, index) => {
    const isLastItem = index === contacts.length - 1;
    return [
      <ListItem key={contact.id}>
        <Stack spacing={0.2}>
          <Typography>
            {contact.first_name} {contact.last_name}
          </Typography>
          <Typography>{contact.organization_name}</Typography>
          <Typography>{formatPhoneNumber(contact.phone)}</Typography>
          <Link href={contact.website} target="_blank" rel="noreferrer">
            Website
          </Link>
        </Stack>
      </ListItem>,
      !isLastItem && <Divider key={`divider-${contact.id}`} />
    ];
  });
};

const ContactsCard = (props) => {
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

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumberString;
}

ContactsCard.propTypes = {
  contacts: PropTypes.array
};

export default ContactsCard;
