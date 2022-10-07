import React from 'react';

import { connect } from 'react-redux';

class Config extends React.Component {
  render() {
    return (
      <h1 data-testid="settings-title"> Pagina config</h1>
    );
  }
}

export default connect()(Config);
