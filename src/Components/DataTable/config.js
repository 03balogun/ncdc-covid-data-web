import React from 'react';
import {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';

export const columns = [
    {
        name: 'State',
        selector: 'state',
        sortable: true,
        wrap: true,
        maxWidth: '100px',
        style: {
            textTransform: 'capitalize',
        },
        cell: row => (<Link to={row.state}>{row.state}</Link>)
    },
    {
        name: 'Confirmed',
        selector: 'total_confirmed_cases',
        sortable: true,
        maxWidth: '100px',
        center: true,
        compact: true,
        cell: row => (row.total_confirmed_cases.toLocaleString())
    },
    {
        name: 'Active',
        selector: 'total_active_cases',
        sortable: true,
        maxWidth: '100px',
        center: true,
        compact: true,
        cell: row => (row.total_active_cases.toLocaleString())
    },
    {
        name: 'Recovered',
        selector: 'total_discharged',
        sortable: true,
        maxWidth: '100px',
        center: true,
        compact: true,
        cell: row => (row.total_discharged.toLocaleString())
    },
    {
        name: 'Death',
        selector: 'total_deaths',
        sortable: true,
        maxWidth: '100px',
        center: true,
        compact: true,
        cell: row => (row.total_deaths.toLocaleString())
    },
];

export const customStyles = {
    headCells: {
        style: {
            textTransform: 'uppercase',
            fontWeight: 'bold'
        }
    }
};

createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#ccc',
    },
    background: {
        default: '#1a212c',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});
