import React from 'react';

import { Table } from 'antd';

import moment from 'moment';
const columns = [
    {
        title: 'Changed/Modified Date',
        dataIndex: 'ChangeDate',
        filters: [
            {
                text: '12/09/2023',
                value: "12/09/2023",
            },
           
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.ChangeDate.startsWith(value),
        // sorter: (a, b) => new Date(a.ChangeDate).toLocaleString() - new Date(b.ChangeDate).toLocaleString(),
        sorter: (a, b) => new Date(a.ChangeDate).valueOf() - new Date(b.ChangeDate),
        width: '210px',
    },

    {
        title: 'Employee Code',
        dataIndex: 'EmployeeCode',
        filters: [
            {
                text: '19489',
                value: '19489',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.EmployeeCode.startsWith(value),
        width: '210px',
    },
    {
        title: 'Employee Name',
        dataIndex: 'EmployeeName',
        filters: [
            {
                text: 'Vivek',
                value: 'Vivek',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.EmployeeName.startsWith(value),
        sorter: (a, b) => a.EmployeeName.length - b.EmployeeName.length,
        sortDirections: ['descend', 'ascend'],
        width: '210px',
    },


    // {
    //     title: 'Attribute',
    //     dataIndex: 'Attribute',
    //     sorter: (a, b) => a.age - b.age,
    //     width: '30%',
    // },
    {
        title: 'Attribute',
        dataIndex: 'Attribute',
        filters: [
            {
                text: 'Attribute 6',
                value: 'Attribute 6',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.Attribute.startsWith(value),
        sorter: (a, b) => a.Attribute - b.Attribute,
        width: '210px',
    },
    {
        title: ' Code',
        dataIndex: 'Code',
        filters: [
            {
                text: 'UP',
                value: 'UP',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.Code.startsWith(value),
        sorter: (a, b) => a.Code.length - b.Code.length,
        sortDirections: ['descend', 'ascend'],
        width: '210px',
    },

    {
        title: 'Parent',
        dataIndex: 'Parent',
        filters: [
            {
                text: 'India',
                value: 'India',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.Parent.startsWith(value),
        width: '210px',
    },
    {
        title: 'Short Description',
        dataIndex: 'ShortDescription',
        filters: [
            {
                text: 'SMT 7STR',
                value: 'SMT 7STR',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.ShortDescription.startsWith(value),
        
        width: '210px',
    },
    {
        title: 'Long Description',
        dataIndex: 'LongDescription',
        filters: [
            {
                text: 'This Smt 7STR..',
                value: 'This Smt 7STR variant comes..',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.LongDescription.startsWith(value),
       
        width: '210px',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        filters: [
            {
                text: 'Active',
                value: 'Active',
            },
            {
                text: 'Inactive',
                value: 'Inactive',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.Status.startsWith(value),
        
        width: '210px',
    },
    

];
const data = [
    {
        ChangeDate:"12/09/2023",
        EmployeeCode:"19489",
        EmployeeName:"Vivek",
        Attribute:"Attribute 6",
        Code:"UP",
        Parent:"India",
        ShortDescription:"SMT 7STR",
        LongDescription:"This Smt 7STR variant comes..",
        Status:"Inactive",
    },
    {
        ChangeDate:"11/09/2023",
        EmployeeCode:"19488",
        EmployeeName:"Agarwal",
        Attribute:"Attribute 6",
        Code:"UP",
        Parent:"India",
        ShortDescription:"SMT 7STR",
        LongDescription:"This Smt 7STR variant comes..",
        Status:"Active",
    },
    {
        ChangeDate:"14/09/2022",
        EmployeeCode:"19489",
        EmployeeName:"Bishnoi",
        Attribute:"Attribute 6",
        Code:"MP",
        Parent:"India",
        ShortDescription:"SMT 7STR",
        LongDescription:"This Smt 7STR variant comes..",
        Status:"Inactive",
    },
    {
        ChangeDate:"12/09/2023",
        EmployeeCode:"19489",
        EmployeeName:"Vivek",
        Attribute:"Attribute 6",
        Code:"UP",
        Parent:"India",
        ShortDescription:"SMT 7STR",
        LongDescription:"This Smt 7STR variant comes..",
        Status:"Active",
    },
    {
        ChangeDate:"12/09/2023",
        EmployeeCode:"19484",
        EmployeeName:"Vivek",
        Attribute:"Attribute 6",
        Code:"UP",
        Parent:"Germany",
        ShortDescription:"SMT 7STR",
        LongDescription:"This Smt 7STR variant comes..",
        Status:"Active",
    },
    
    
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export const ChangeHistory = () => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{
                position: ['bottomLeft'],
                total: 500,
            }}
            onChange={onChange}
            scroll={{
                x:"auto"
              }}
        />
    );
};
