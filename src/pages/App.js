import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../styles/other/MUIRedTheme';

import '../styles/partials/_Body';
import '../styles/partials/_Typography';
import '../styles/partials/_AppBar';

class App extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
    };
  }

  render() {
    return (
      <div>
        <AppBar
          title="JLHS GPA Goal Graph"
          showMenuIconButton={false}
          id ="AppBar"
        />
        <div className="container" id="BodyContainer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default App;
