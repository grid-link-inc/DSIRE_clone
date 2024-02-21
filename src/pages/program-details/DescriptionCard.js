import { Card, CardContent, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const cleanHTML = (html) => {
  if (!html) {
    return '';
  }
  return DOMPurify.sanitize(html);
};

const DescriptionCard = (props) => {
  const descriptionHTML = cleanHTML(props.descriptionHTMLString);

  return (
    <Card sx={{ boxShadow: 0 }}>
      <CardContent>
        <Typography variant="h5">Description</Typography>
        <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
      </CardContent>
      <Divider />
    </Card>
  );
};

DescriptionCard.propTypes = {
  descriptionHTMLString: PropTypes.string
};

export default DescriptionCard;
