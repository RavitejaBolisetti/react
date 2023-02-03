import React, { useState } from 'react';

import styles from './ChangeHistory.module.css';

import { Table } from 'antd';
import moment from 'moment';


const sortDateFn = (a, b) => moment(a.ChangeDate, "DD-MM-YYYY") - moment(b.ChangeDate, "DD-MM-YYYY");
const generalsorter= (a,b) => 
{
    if(a.EmployeeName!==undefined)
    {
        if (a.EmployeeName > b.EmployeeName) 
        {
            return 1;
        } 
        else if (a.EmployeeName < b.EmployeeName) 
        {
            return -1;
        } 
        else {
            return 0;
        }
    }
    else if(a.Code!==undefined)
    {
        if (a.Code > b.Code) 
        {
            return 1;
        } 
        else if (a.Code < b.Code) 
        {
            return -1;
        } 
        else {
            return 0;
        }
    }
   else if(a.Attribute!==undefined)
   {
    if (a.Attribute > b.Attribute) 
        {
            return 1;
        } 
        else if (a.Attribute < b.Attribute) 
        {
            return -1;
        } 
        else {
            return 0;
        }
   }
   else if(a.ShortDescription!==undefined)
   {
    if (a.ShortDescription > b.ShortDescription) 
        {
            return 1;
        } 
        else if (a.Attribute < b.Attribute) 
        {
            return -1;
        } 
        else {
            return 0;
        }
   }
   else
   {
    if (a.LongDescription > b.LongDescription) 
        {
            return 1;
        } 
        else if (a.LongDescription < b.LongDescription) 
        {
            return -1;
        } 
        else {
            return 0;
        }
   }
}
const onFilterFn = (value, record) => record.ChangeDate.startsWith(value);

const tblPrepareColumns = ({ title, dataIndex, ellipsis = false, filters = undefined, filterMode = 'tree', filterSearch = true, sortFn = undefined }) => {
    return {
        title,
        dataIndex,
        ellipsis,
        filters,
        filterMode,
        filterSearch,
        onFilter: onFilterFn,
        sorter: sortFn,
    };
};

const tableColumn = [];

tableColumn.push(
    tblPrepareColumns({
        title: 'Changed/Modified Date ',
        dataIndex: 'ChangeDate',
        filters: [
            {
                text: '12/09/2023',
                value: '12/09/2023',
            },
        ],
        sortFn:sortDateFn,
        onFilterFn:onFilterFn,

    })
);

tableColumn.push(
    tblPrepareColumns({
        title: 'Employee Code',
        dataIndex: 'EmployeeCode',
        filters: [
            {
                text: '19489',
                value: '19489',
            },
        ],
        onFilter:onFilterFn,
    })
);

tableColumn.push(
    tblPrepareColumns(
    {
        title: 'Employee Name',
        dataIndex: 'EmployeeName',
        
        filters: [
            {
                text: 'Vivek',
                value: 'Vivek',
            },
        ],
        sortFn:generalsorter,
        onFilter:onFilterFn,
    })
);

tableColumn.push(
    tblPrepareColumns(
        {
            title: 'Attribute',
        dataIndex: 'Attribute',
        filters: [
            {
                text: 'Attribute 6',
                value: 'Attribute 6',
            },
        ],
        sortFn:generalsorter,
        onFilter:onFilterFn,
        }
    )
);
tableColumn.push(
    tblPrepareColumns(
        {
            title: 'Code',
            dataIndex: 'Code',
           
            filters: [
                {
                    text: 'UP',
                    value: 'UP',
                },
            ],
            sortFn:generalsorter,
            onFilter:onFilterFn,
        }
    )
);
tableColumn.push(
    tblPrepareColumns(
        {
            title: 'Parent',
        dataIndex: 'Parent',
      
        filters: [
            {
                text: 'India',
                value: 'India',
            },
        ],
        onFilter:onFilterFn,
        }
    )
);
tableColumn.push(
    tblPrepareColumns(
        {
            title: 'Short Description',
        dataIndex: 'ShortDescription',
       
        filters: [
            {
                text: 'SMT 7STR',
                value: 'SMT 7STR',
            },
        ],
        sortFn:generalsorter,
        onFilter:onFilterFn,
        }
    )
);

tableColumn.push(
    tblPrepareColumns(
        {
            title: 'Long Description',
        dataIndex: 'LongDescription',
       
        filters: [
            {
                text: 'This Smt 7STR..',
                value: 'This Smt 7STR variant comes..',
            },
        ],
        sortFn:generalsorter,
        onFilter:onFilterFn,
        }
    )
);
tableColumn.push(
    tblPrepareColumns(
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
        }
    )
);

const data = [
    {
        ChangeDate: '12/09/2023',
        EmployeeCode: '19489',
        EmployeeName: 'Vivek Aggarwal',
        Attribute: 'Attribute 5',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Inactive',
    },
    {
        ChangeDate: '11/09/2023',
        EmployeeCode: '19488',
        EmployeeName: 'vivek Sharma',
        Attribute: 'Attribute 3',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '14/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Bishnoi Agasd',
        Attribute: 'Attribute 2',
        Code: 'MP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
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
        ChangeDate: '12/09/2023',
        EmployeeCode: '19484',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'Germany',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
        ChangeDate: '11/09/2023',
        EmployeeCode: '19488',
        EmployeeName: 'vivek Sharma',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '14/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Bishnoi Agasd',
        Attribute: 'Attribute 6',
        Code: 'MP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
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
        ChangeDate: '12/09/2023',
        EmployeeCode: '19484',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'Germany',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
        ChangeDate: '11/09/2023',
        EmployeeCode: '19488',
        EmployeeName: 'vivek Sharma',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '14/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Bishnoi Agasd',
        Attribute: 'Attribute 6',
        Code: 'MP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
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
        ChangeDate: '12/09/2023',
        EmployeeCode: '19484',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'Germany',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
        ChangeDate: '11/09/2023',
        EmployeeCode: '19488',
        EmployeeName: 'vivek Sharma',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '14/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Bishnoi Agasd',
        Attribute: 'Attribute 6',
        Code: 'MP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
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
        ChangeDate: '12/09/2023',
        EmployeeCode: '19484',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'Germany',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
        ChangeDate: '11/09/2023',
        EmployeeCode: '19488',
        EmployeeName: 'vivek Sharma',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '14/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Bishnoi Agasd',
        Attribute: 'Attribute 6',
        Code: 'MP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
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
        ChangeDate: '12/09/2023',
        EmployeeCode: '19484',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'Germany',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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
        ChangeDate: '11/09/2023',
        EmployeeCode: '19488',
        EmployeeName: 'vivek Sharma',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
    },
    {
        ChangeDate: '14/09/2022',
        EmployeeCode: '19489',
        EmployeeName: 'Bishnoi Agasd',
        Attribute: 'Attribute 6',
        Code: 'MP',
        Parent: 'India',
        ShortDescription: 'SMT 7STR',
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
        ChangeDate: '12/09/2023',
        EmployeeCode: '19484',
        EmployeeName: 'Vivek',
        Attribute: 'Attribute 6',
        Code: 'UP',
        Parent: 'Germany',
        ShortDescription: 'SMT 7STR',
        LongDescription: 'This Smt 7STR variant comes..',
        Status: 'Active',
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

export const ChangeHistoryNeedToFinal = () => {
    return (
        <Table
            columns={tableColumn}
            dataSource={data}
            pagination={{
                position: ['bottomLeft'],
            }}
            onChange={onChange}
            scroll={{
                x: 'auto',
            }}
        />
    );
};
