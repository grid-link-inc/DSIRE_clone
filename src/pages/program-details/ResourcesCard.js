import { Card, CardContent, CardHeader, Link, List, ListItem, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const documentsSection = (docs) => {
  if (docs.length === 0) {
    return null;
  }

  const documentsList = docs.map((doc) => {
    const docElement = doc.website ? (
      <Link href={doc.website} target="_blank" rel="noreferrer">
        {doc.code}
      </Link>
    ) : (
      doc.code
    );
    return (
      <ListItem key={doc.id}>
        <Typography color="textSecondary" sx={{ minWidth: '150px' }}>
          {docElement}:
        </Typography>
        {/* TODO add rest of authority fields: 
          effective, effectivetext, enacted, enactedtext, expired, expiredtext, file_key, file_name
        */}
      </ListItem>
    );
  });

  return (
    <>
      <Divider component="li" />
      <ListItem key="documents-header">
        <Typography variant="h6">Program Documents</Typography>
      </ListItem>
      <ListItem key="documents">
        <Stack spacing={0}>{documentsList}</Stack>
      </ListItem>
    </>
  );
};

const ResourcesCard = (props) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Resources" sx={{ background: theme.palette.primary.main }} />
      <CardContent sx={{ padding: 0 }}>
        <List sx={{ padding: 0 }}>
          {props.programWebsite && (
            <>
              <Divider component="li" />
              <ListItem>
                <Link href={props.programWebsite} target="_blank" rel="noopener noreferrer">
                  Program Website
                </Link>
              </ListItem>
            </>
          )}
          {documentsSection(props.authorities)}
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
  utilityName: PropTypes.string,
  authorities: PropTypes.array
};

export default ResourcesCard;
