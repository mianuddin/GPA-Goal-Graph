import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const ClassCard = props => (
  <Card className="LocationCard">
    <CardTitle title=`Class ${props.classNumber}` />
    <CardText>
      <TextField
        hintText="5"
        floatingLabelText="Credits"
      />
      <TextField
        hintText="A"
        floatingLabelText="Grade"
      />
    </CardText>
    <CardActions>
      <FlatButton
        label="Remove"
        onClick={props.onRemove.bind(this, props.location.id)}
      />
    </CardActions>
  </Card>
);

LocationCard.propTypes = {
  classNumber: React.PropTypes.number,
  onRemove: React.PropTypes.func,
};

export default LocationCard;
