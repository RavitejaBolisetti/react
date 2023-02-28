import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from './ChangeHistory.module.css';

const contractData = [
    {
        geoCode: 'DL',
        geoName: 'New Delhi',
        changedDate: '2000/11/12',
        changedBy: 'Aman',
        parentName: 'ABC',
        parentCode: '15542',
        attributeType: 'State',
    },
    {
        geoCode: 'GJ',
        geoName: 'Gujarat',
        changedDate: '2000/12/01',
        changedBy: 'Akash',
        parentName: 'XYZ',
        parentCode: '12342',
        attributeType: 'State',
    },
    {
        geoCode: 'JBP',
        geoName: 'Jabalpur',
        changedDate: '2000/12/20',
        changedBy: 'Aditya',
        parentName: 'ABCDE',
        parentCode: '12343',
        attributeType: 'City/District',
    },
    {
        geoCode: 'JHS',
        geoName: 'Jhansi',
        changedDate: '2000/12/30',
        changedBy: 'Divya',
        parentName: 'DMS',
        parentCode: '12542',
        attributeType: 'City/District',
    },
    {
        geoCode: 'MP',
        geoName: 'Madhya Pradesh',
        changedDate: '2000/12/22',
        changedBy: 'Shivam',
        parentName: 'ACDE',
        parentCode: '22342',
        attributeType: 'State',
    },
];

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [] },
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
            fetchChangeHistoryList: productHierarchyDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: productHierarchyDataActions.changeHistoryShowLoading,
        },
        dispatch
    ),
});

const ChangeHistoryGeoMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData }) => {
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
            title: 'Attribute Type',
            dataIndex: 'attributeType',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Hierarchy Code',
            dataIndex: 'geoCode',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Hierarchy Name',
            dataIndex: 'geoName',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent Hierarchy Code',
            dataIndex: 'parentCode',
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Parent Hierarchy Name',
            dataIndex: 'parentName',
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
                    position: ['bottomLeft'],
                }}
                scroll={{
                    x: 'auto',
                }}
            />
        </div>
    );
};

export const ChangeHistoryGeo = connect(mapStateToProps, mapDispatchToProps)(ChangeHistoryGeoMain);
