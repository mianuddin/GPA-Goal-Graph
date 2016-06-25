import React from 'react';

import HomeFormContainer from '../components/HomeFormContainer';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui';
import '../styles/partials/_Home';

const Home = () => (
  <div>
    <div className="row">
      <div className="col-xs-12">
        <Card>
          <CardMedia
            overlay={<CardTitle title="Plan and achieve your GPA goals." />}
          >
            <img src="http://i.imgur.com/xUsQZXR.jpg" />
          </CardMedia>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus et vehicula justo, id elementum est. Suspendisse aliquet luctus iaculis.
            Pellentesque sem felis, tempus tincidunt malesuada id, dignissim id urna.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Integer gravida egestas lacus, a suscipit elit condimentum eget.
            In hac habitasse platea dictumst. Sed neque mi, tempor quis enim id.
          </CardText>
        </Card>
      </div>
    </div>
    <HomeFormContainer />
  </div>
);

export default Home;
