import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from './ChangeHistory.module.css';


const contractData = [
    {
        authorityType: 'AD',
        employeeCode: '1001',
        employeeName: 'abc',
        attributeCode: '1011',
        dateEffectiveFrom: '2000/01/01',
        dateEffectiveTo: ' 2000/12/01',
        changedDate: '2000/12/12',
        changedBy: 'xyz',
        code: '1000',
        parent: 'A',
        shortDescription: 'des1',
        longDescription: 'des2',
        status: 'Y',
    },
    {
        authorityType: 'AD',
        employeeCode: '1002',
        employeeName: 'ab',
        attributeCode: '1012',
        dateEffectiveFrom: '2000/01/01',
        dateEffectiveTo: ' 2000/12/01',
        changedDate: '2000/1/13',
        changedBy: 'xyx',
        code: '1001',
        parent: 'B',
        shortDescription: 'desc1',
        longDescription: 'description2',
        status: 'Y',
    },
    {
        authorityType: 'AD',
        employeeCode: '1003',
        employeeName: 'abcd',
        attributeCode: '1013',
        dateEffectiveFrom: '2000/01/01',
        dateEffectiveTo: ' 2000/12/01',
        changedDate: '2000/2/11',
        changedBy: 'xxy',
        code: '1002',
        parent: 'A',
        shortDescription: 'desc11',
        longDescription: 'description22',
        status: 'N',
    },
];
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [] },
        },
    } = state;
    let returnValue = {
        userId,
        isHistoryLoading,
        isHistoryLoaded,
        changeHistoryData: contractData || changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchChangeHistoryList: manufacturerAdminHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: manufacturerAdminHierarchyDataActions.changeHistoryShowLoading,
        },
        dispatch
    ),
});

const ManufacturerAdminHierarchyChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Changed/Modified Date ',
            dataIndex: 'changedDate',
            render: (text) => convertDateTime(text),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Changed By',
            dataIndex: 'changedBy',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute Code',
            dataIndex: 'attributeCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute type',
            dataIndex: 'authorityType',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Employee Code',
            dataIndex: 'employeeCode',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Employee Name',
            dataIndex: 'employeeName',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Date Effective From ',
            dataIndex: 'dateEffectiveFrom',
            render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Date Effective To ',
            dataIndex: 'dateEffectiveTo',
            render: (text) => convertDateTime(text),
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parent',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Short Description',
            dataIndex: 'shortDescription',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Long Description',
            dataIndex: 'longDescription',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
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
            render: (text) => (text === 'Y' ? 'Active' : 'In Active'),
        })
    );

    return (
        <div className={styles.changeHistoryContainer}>
            <div>
                <h3>Change History</h3>
            </div>
            <Table
                loading={isLoading}
                columns={tableColumn}
                dataSource={changeHistoryData}
                pagination={{
                    position: ['bottomright'],
                }}
                scroll={{
                    x: 'auto',
                }}
            />
        </div>
    );
};

export const ManufacturerAdminHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(ManufacturerAdminHierarchyChangeHistoryMain);
