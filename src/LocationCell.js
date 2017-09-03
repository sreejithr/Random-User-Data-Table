import React, { Component } from 'react';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const LocationCell = row => (
    <div style={{ textAlign: 'left' }}>
      <div>{capitalize(row.value.street)}</div>
      <div>{capitalize(row.value.city)}</div>
      <div>{capitalize(row.value.state)}</div>
    </div>
);

export default LocationCell;
