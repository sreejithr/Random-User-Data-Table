import React, { Component } from 'react';
import ReactTable from 'react-table';
import jQuery from 'jquery';
import ScrollMagic from 'scrollmagic';

import logo from './logo.svg';
import 'react-table/react-table.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLoading: false,
      pageNo: 0,
      isRowLoaded: false,
    };
  }

  componentDidMount() {
    this.fetchRows();

    // Bind fetch to onEnter event of #page-end to achieve infinite scrolling
    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: '#page-end',
      triggerHook: 'onEnter',
    }).addTo(controller).on('enter', this.fetchRows.bind(this));
  }

  fetchRows() {
    if (this.state.dataLoading) return;
    this.setState({ dataLoading: true });

    const url = `https://randomuser.me/api/?page=${this.state.pageNo+1}&results=20`;
    jQuery.ajax({
      url,
      method: 'GET',
      success: response => this.setState({
        data: this.state.data.concat(response.results),
        dataLoading: false,
        pageNo: this.state.pageNo + 1,
      }),
      error: e => this.setState({ dataLoading: false }),
    });
  }

  _renderList() {
    const columnSetup = [
      {
        Header: 'Picture',
        accessor: 'picture',
        Cell: row => (
            <div><img src={row.value.medium}/></div>
        ),
      },

      {
        Header: 'Name',
        columns: [
          {
            Header: 'Title',
            id: 'title',
            accessor: d => d.name.title,
          },
          {
            Header: 'First',
            id: 'first',
            accessor: d => d.name.first,
          },
          {
            Header: 'Last',
            id: 'last',
            accessor: d => d.name.last,
          },
        ],
      },

      {
        Header: 'Gender',
        accessor: 'gender',
      },

      {
        Header: 'Location',
        accessor: 'location',
        Cell: row => (
            <div style={styles.locationContainer}>
              <div>{row.value.street}</div>
              <div>{row.value.city}</div>
              <div>{row.value.state}</div>
            </div>
        ),
      }
    ];

    return (
        <ReactTable
          data={this.state.data}
          columns={columnSetup}
          showPagination={false}
          pageSize={this.state.pageNo * 20}
        />
    );
  }

  render() {
    return (
      <div className="App">
        {this._renderList()}
        <div id="page-end"></div>
      </div>
    );
  }
}

const styles = {
  locationContainer: {
    textAlign: 'left',
  },
};

export default App;
