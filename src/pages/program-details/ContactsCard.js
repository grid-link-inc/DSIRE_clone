import { Card, CardContent, CardHeader, List, ListItem, Divider, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material/index';
import { useTheme } from '@mui/material/styles';

const contactsListItems = (contacts) => {
  if (!contacts) {
    return null;
  }
  return contacts.flatMap((contact, index) => {
    const isLastItem = index === contacts.length - 1;
    return [
      <ListItem key={contact.id}>
        <Stack spacing={0.3}>
          <Typography>
            {contact.first_name} {contact.last_name}
          </Typography>
          <Typography>{contact.organization_name}</Typography>
          <Typography>{formatPhoneNumber(contact.phone)}</Typography>
          {contact.website_url && (
            <Link href={contact.website_url} target="_blank" rel="noopener noreferrer">
              Website
            </Link>
          )}
        </Stack>
      </ListItem>,
      !isLastItem && <Divider key={`divider-${contact.id}`} />
    ];
  });
};

const ContactsCard = (props) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Contact" sx={{ background: theme.palette.primary.main }} />
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
