import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';

import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from './ChangeHistory.module.css';

const contractData = [
    {
        attributeCode: '1011',
        changedDate: '2000/12/17',
        changedBy: 'Aman',
        shortDescription: 'des1',
        longDescription: 'des2',
        hierarchyCode: '1001',
        status: 'Y',
        parentManufactOrgHie: 'DMS',
    },
    {
        attributeCode: '1021',
        changedDate: '2000/12/10',
        changedBy: 'Aditi',
        shortDescription: 'des1',
        longDescription: 'des2',
        hierarchyCode: '1000',
        status: 'Active',
        parentManufactOrgHie: 'ABCD',
    },
    {
        attributeCode: '1311',
        changedDate: '2000/12/13',
        changedBy: 'Deepak',
        shortDescription: 'des1',
        longDescription: 'des2',
        hierarchyCode: '1003',
        status: 'Y',
        parentManufactOrgHie: 'ABC',
    },
    {
        attributeCode: '1013',
        changedDate: '2000/12/14',
        changedBy: 'Karthik',
        shortDescription: 'des1',
        longDescription: 'des2',
        hierarchyCode: '1004',
        status: 'Active',
        parentManufactOrgHie: 'ABCDE',
    },
    {
        attributeCode: '1014',
        changedDate: '2000/12/15',
        changedBy: 'Sakshi',
        shortDescription: 'des1',
        longDescription: 'des2',
        hierarchyCode: '1031',
        status: 'Y',
        parentManufactOrgHie: 'DMS',
    },
    {
        attributeCode: '1021',
        changedDate: '2000/12/16',
        changedBy: 'Subrat',
        shortDescription: 'des1',
        longDescription: 'des2',
        hierarchyCode: '1055',
        status: 'Active',
        parentManufactOrgHie: 'DMS',
    },
];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerOrgHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [] },
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
            fetchChangeHistoryList: manufacturerOrgHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: manufacturerOrgHierarchyDataActions.changeHistoryShowLoading,
        },
        dispatch
    ),
});

const ManufacturerOrgHierarchyChangeHistoryMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
    useEffect(() => {
        if (!isHistoryLoaded) {
            fetchChangeHistoryList({ setIsLoading: changeHistoryShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHistoryLoaded]);

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Changed Date ',
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
            title: 'Attribute',
            dataIndex: 'attributeCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent',
            dataIndex: 'parentManufactOrgHie',
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
                    position: ['bottomRight'],
                }}
                scroll={{
                    x: 'auto',
                }}
            />
        </div>
    );
};

export const ManufacturerOrgHierarchyChangeHistory = connect(mapStateToProps, mapDispatchToProps)(ManufacturerOrgHierarchyChangeHistoryMain);
