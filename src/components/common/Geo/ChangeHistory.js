import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { geoDataActions } from 'store/actions/data/geo';
import { convertDateTime } from 'utils/formatDateTime';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from '../ChangeHistory/ChangeHistory.module.css';
import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isHistoryLoading, isHistoryLoaded = false, historyData: changeHistoryData = [], changeHistoryVisible: isVisible },
        },
    } = state;

    let returnValue = {
        userId,
        isHistoryLoading,
        isVisible,
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
            onCloseAction: geoDataActions.changeHistoryModelClose,
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

    const tableColumn = [
        tblPrepareColumns({
            title: 'Changed/Modified Date ',
            dataIndex: 'changedDate',
            render: (text) => convertDateTime(text),
            width: 220,
        }),
        tblPrepareColumns({
            title: 'Changed By',
            dataIndex: 'changedBy',
            width: 150,
        }),
        tblPrepareColumns({
            title: 'Attribute Type',
            dataIndex: 'attributeType',
            width: 200,
        }),
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'geoCode',
            width: 100,
        }),
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'geoName',
        }),
        tblPrepareColumns({
            title: 'Parent Code',
            dataIndex: 'parentCode',
            width: 150,
        }),
        tblPrepareColumns({
            title: 'Parent Name',
            dataIndex: 'parentName',
            width: 200,
        }),
    ];

    const tableProps = {
        isLoading,
        tableColumn,
        tableData: changeHistoryData,
    };

    return (
        <div className={styles.changeHistoryContainer}>
            {/* <div>
                <h3>Change History</h3>
            </div> */}
            <DataTable {...tableProps} />
        </div>
    );
};

export const ChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryGeoMain, { title: 'Change History', width: '90%' }));
