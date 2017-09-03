import React, { Component } from 'react';
import ReactTable from 'react-table';
import ScrollMagic from 'scrollmagic';
import { flag } from 'country-code-emoji';
import jQuery from 'jquery';
import moment from 'moment';

import LocationCell from './LocationCell';
import ContactCell from './ContactCell';
import './styles/react-table.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLoading: false,
      pageNo: 0,
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

  _onSort(sorts) {
    if (sorts.length > 0) {
      this.setState({ sortedBy: sorts[0].id, sortOrder: sorts[0].desc });
    }
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _renderList() {
    const columnSetup = [
      {
        Header: 'Photo',
        accessor: 'picture',
        sortable: false,
        Cell: row => <div><img src={row.value.medium}/></div>,
      },
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Title',
            id: 'title',
            maxWidth: 50,
            accessor: d => this.capitalize(d.name.title),
          },
          {
            Header: 'First',
            id: 'first',
            accessor: d => this.capitalize(d.name.first),
          },
          {
            Header: 'Last',
            id: 'last',
            accessor: d => this.capitalize(d.name.last),
          },
        ],
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        maxWidth: 100,
      },
      {
        Header: 'Nationality',
        accessor: 'nat',
        Cell: row => <div>{row.value} {flag(row.value)}</div>,
        maxWidth: 100,
      },
      {
        Header: 'Location',
        accessor: 'location',
        sortable: false,
        minWidth: 150,
        Cell: LocationCell,
      },
      {
        Header: 'Contact',
        id: 'contact',
        minWidth: 200,
        sortable: false,
        accessor: d => d,
        Cell: ContactCell,
      },
      {
        Header: 'Username',
        id: 'username',
        minWidth: 150,
        sortable: true,
        accessor: d => d.login,
        Cell: row => (
            <div style={{textAlign: 'center'}}>
              <div>{row.value.username}</div>
            </div>
        ),
      },
      {
        Header: 'Date of birth',
        accessor: 'dob',
        sortMethod: (a, b) => moment(a).isBefore(b),
        Cell: row => (
            <div style={styles.locationContainer}>
              <div>{moment(row.value.dob).format('DD-MM-YYYY')}</div>
              <div>{moment(row.value.dob).format('HH:mm:ss')}</div>
            </div>
        ),
      },
      {
        Header: 'Registered',
        accessor: 'registered',
        sortMethod: (a, b) => moment(a).isBefore(b),
        Cell: row => (
            <div style={styles.locationContainer}>
              <div>{moment(row.value.registered).format('DD-MM-YYYY')}</div>
              <div>{moment(row.value.registered).format('HH:mm:ss')}</div>
            </div>
        ),
      },
    ];

    return (
        <ReactTable
          style={styles.table}
          onSortedChange={this._onSort.bind(this)}
          data={this.state.data}
          columns={columnSetup}
          loading={this.state.dataLoading}
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
