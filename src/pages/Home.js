import React from 'react';

import HomeFormContainer from '../components/HomeFormContainer';

import Paper from 'material-ui/lib/paper';
import '../styles/partials/_Home';

const Home = () => (
  <div>
    <div className="row">
      <div className="col-xs-12">
        <Paper zDepth={1} className="PaperContainer">
          <h2>Plan and visualize your GPA goals</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Vivamus et vehicula justo, id elementum est. Suspendisse aliquet luctus iaculis.
           Pellentesque sem felis, tempus tincidunt malesuada id, dignissim id urna.
           Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
           Integer gravida egestas lacus, a suscipit elit condimentum eget.
           In hac habitasse platea dictumst. Sed neque mi, tempor quis enim id.</p>
        </Paper>
      </div>
    </div>
    <HomeFormContainer />
  </div>
);

export default Home;
