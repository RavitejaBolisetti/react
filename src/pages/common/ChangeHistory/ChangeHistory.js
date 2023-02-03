import React, { useState } from 'react';

import styles from './ChangeHistory.module.css';

import { Table } from 'antd';

const columns = [
    {
        title: 'Changed/Modified Date ',
        dataIndex: 'ChangeDate',
        width: "200px",
        filters: [
            {
                text: '12/09/2023',
                value: '12/09/2023',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.ChangeDate.startsWith(value),
        // sorter: (a, b) => new Date(a.ChangeDate).toLocaleString() - new Date(b.ChangeDate).toLocaleString(),
        sorter: (a, b) => new Date(a.ChangeDate).valueOf() - new Date(b.ChangeDate),
      
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
        width: 100,
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
        sorter: (a, b) => {
            if(a.EmployeeName > b.EmployeeName)
        {
            return 1;
        }
        else if(a.EmployeeName < b.EmployeeName)
        {
            return -1;
         }
         else
        {
            return 0;
        }
        },
        sortDirections: ['descend', 'ascend'],
        width: 100,
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
        sorter: (a, b) => {
            if(a.Attribute > b.Attribute)
        {
            return 1;
        }
        else if(a.Attribute < b.Attribute)
        {
            return -1;
         }
         else
        {
            return 0;
        }
    },
        sortDirections: ['descend', 'ascend'],
        width: 100,
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
        sorter: (a, b) => {
            if(a.Code > b.Code)
        {
            return 1;
        }
        else if(a.Code < b.Code)
        {
            return -1;
         }
         else
        {
            return 0;
        }
    },
        sortDirections: ['descend', 'ascend'],
        width: 100,
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
        width: 100,
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
        sorter: (a, b) => {
            if(a.ShortDescription > b.ShortDescription)
        {
            return 1;
        }
        else if(a.ShortDescription < b.ShortDescription)
        {
            return -1;
         }
         else
        {
            return 0;
        }
    },
        sortDirections: ['descend', 'ascend'],
        width: 100,
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
  
        width: 100,
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
        width: 100,
    },
];
const data = [
    {
        ChangeDate: '12/09/2023',
        EmployeeCode: '19489',
        EmployeeName: 'Vivek Aggarwal',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Inactive',
    },
    {
        ChangeDate:"11/09/2023",
        EmployeeCode:"19488",
        EmployeeName:"vivek Sharma",
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
        EmployeeName:"Bishnoi Agasd",
        Attribute:"Attribute 6",
        Code:"MP",
        Parent:"India",
        ShortDescription:"SMT 7STR",
        LongDescription:"This Smt 7STR variant comes..",
        Status:"Inactive",
    },
    {
        ChangeDate: '12/09/2023',
        EmployeeCode: '19489',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '12/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'IMG 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Inactive',
    },
    {
        ChangeDate: '12/09/2023',
        EmployeeCode: '19489',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
    {
        ChangeDate: '12/09/2023',
        EmployeeCode: '19489',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
