import React, { Component } from 'react';

const ContactCell = row => (
    <div style={{textAlign: 'left'}}>
      <div><a href={`mailto:${row.value.email}`}>{row.value.email}</a></div>
      <div>Phone: {row.value.phone}</div>
      <div>Cell: {row.value.cell}</div>
    </div>
);

export default ContactCell;
