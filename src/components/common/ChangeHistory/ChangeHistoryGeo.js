import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';

import { geoDataActions } from 'store/actions/data/geo';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from './ChangeHistory.module.css';

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
        changeHistoryData: changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchChangeHistoryList: geoDataActions.fetchChangeHistoryList,
            changeHistoryShowLoading: geoDataActions.changeHistoryShowLoading,
        },
        dispatch
    ),
});

const ChangeHistoryGeoMain = ({ fetchChangeHistoryList, changeHistoryShowLoading, isLoading, userId, isHistoryLoaded, changeHistoryData, }) => {
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
