import React, { Component } from 'react';
import ReactTable from 'react-table'
import jQuery from 'jquery';

import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRowLoaded: false,
    };
  }

  fetchRows() {
    
  }

  // _renderList() {
  //   return (
  //       <InfiniteLoader
  //         isRowLoaded={this.state.isRowLoaded}
  //         loadMoreRows={this.fetchRows}
  //       >
  //         {({ onRowsRendered, registerChild }) => (
  //             <List
  //               height={200}
  //               onRowsRendered={onRowsRendered}
  //               ref={registerChild}
  //               rowHeight={20}
  //               rowRenderer={this._renderRow.bind(this)}
  //               width={300}
  //             />
  //         )}
  //       </InfiniteLoader>
  //   );
  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
