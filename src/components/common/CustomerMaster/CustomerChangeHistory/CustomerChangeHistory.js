/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { convertDateTime } from 'utils/formatDateTime';

import { tblPrepareColumns } from 'utils/tableColumn';
import { customerDetailDataActions } from 'store/actions/customer/customerDetail';

import styles from 'components/common/Common.module.css';

import { DataTable } from 'utils/dataTable';
import { withDrawer } from 'components/withDrawer';
import { BASE_URL_CUSTOMER_MASTER_CHANGE_HISTORY as customURL } from 'constants/routingApi';

import { Row, Button, Col } from 'antd';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        customer: {
            customerDetail: { detailData: data = [], isChangeHistoryLoaded, isChangeHistoryLoading, changeHistoryData },
        },
    } = state;

    let returnValue = {
        userId,
        data,
        totalRecords: changeHistoryData?.totalRecords || [],
        isChangeHistoryLoaded,
        isChangeHistoryLoading,
        changeHistoryData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerChangeHistory: customerDetailDataActions.changeHistory,
            listShowChangeHistoryLoading: customerDetailDataActions.listShowChangeHistoryLoading,
        },
        dispatch
    ),
});

const CustomerChangeHistoryMain = ({ fetchCustomerChangeHistory, onCloseAction, listShowChangeHistoryLoading, customerType, totalRecords, isChangeHistoryLoading, userId, isChangeHistoryLoaded, changeHistoryData, selectedCustomerId }) => {
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const defaultExtraParam = useMemo(() => {
        return [
            {
                key: 'customerType',
                title: 'Customer Type',
                value: customerType,
                canRemove: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType, page]);

    useEffect(() => {
        if (selectedCustomerId && defaultExtraParam) {
            const extraParams = [
                ...defaultExtraParam,
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomerId,
                    name: 'Customer Id',
                },
            ];
            fetchCustomerChangeHistory({ customURL, setIsLoading: listShowChangeHistoryLoading, userId, extraParams: extraParams || defaultExtraParam });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCustomerId, defaultExtraParam]);

    const tableColumn = [
        tblPrepareColumns({
            title: 'Modified Date & Time',
            dataIndex: 'modifiedDate',
            render: (text) => [
                <div>
                    {convertDateTime(text, 'DD MMM YYYY')}
                    <br />
                    {convertDateTime(text, 'HH:mm a')}
                </div>,
            ],
        }),

        tblPrepareColumns({
            title: 'Modified By',
            dataIndex: 'modifiedBy',
        }),

        tblPrepareColumns({
            title: 'Change Source',
            dataIndex: 'source',
        }),

        tblPrepareColumns({
            title: 'Field Name',
            dataIndex: 'fieldName',
        }),

        tblPrepareColumns({
            title: 'Old Value',
            dataIndex: 'oldValue',
        }),

        tblPrepareColumns({
            title: 'New Value',
            dataIndex: 'newValue',
        }),
    ];

    const tableProps = {
        page,
        setPage,
        totalRecords,
        dynamicPagination,
        isLoading: isChangeHistoryLoading,
        tableColumn,
        tableData: changeHistoryData?.paginationResponse,
        scroll: { x: '100%', y: 'calc(100vh - 320px)' },
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DataTable {...tableProps} />
                </Col>
            </Row>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button danger onClick={onCloseAction}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const CustomerChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(CustomerChangeHistoryMain, { title: 'Change History', width: '90%' }));
