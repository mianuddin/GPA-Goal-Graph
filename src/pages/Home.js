import React from 'react';

import HomeFormContainer from '../components/HomeFormContainer';

import Paper from 'material-ui/lib/paper';
import '../styles/partials/_Home';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Paper zDepth={1} className="PaperContainer">
              <h2>Plan and visualize your GPA goals</h2>
              <p>I know words. I have the best words. He’s not a word hero. He’s a
               word hero because he was captured. I like text that wasn’t captured.
               Lorem Ipsum is unattractive, both inside and out. I fully understand
               why it’s former users left it for something else. They made a good
               decision. You know, it really doesn’t matter what you write as long
               as you’ve got a young, and beautiful, piece of text.</p>
            </Paper>
          </div>
        </div>
        <HomeFormContainer />
      </div>
    );
  }
}

export default Home;
