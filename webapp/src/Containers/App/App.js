import React, { Component } from 'react';
import { teal700, purple600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from '../../Routes';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal700,
    accent1Color: '#592ce2',
  }
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <Routes />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
