/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Button, Col, Tag } from 'antd';
import * as IMAGES from 'assets';

import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { withDrawer } from 'components/withDrawer';

import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateTime } from 'utils/formatDateTime';
import { DataTable } from 'utils/dataTable';

import { BASE_URL_CUSTOMER_MASTER_NAME_CHANGE_HISTORY as customURL } from 'constants/routingApi';

import styles from 'components/common/Common.module.css';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { detailData: data = [], isChangeHistoryLoaded, isChangeHistoryLoading, changeHistoryData },
            },
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
            fetchCustomerChangeHistory: customerDetailsIndividualDataActions.changeHistory,
            listShowChangeHistoryLoading: customerDetailsIndividualDataActions.listShowChangeHistoryLoading,
        },
        dispatch
    ),
});

const ChangeHistoryMain = ({ fetchCustomerChangeHistory, onCloseAction, listShowChangeHistoryLoading, customerType, downloadFileFromButton, totalRecords, isChangeHistoryLoading, userId, isChangeHistoryLoaded, changeHistoryData, selectedCustomerId }) => {
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
            title: 'Current Name',
            dataIndex: 'currentName',
        }),
        tblPrepareColumns({
            title: 'Previous Name',
            dataIndex: 'previousName',
        }),
        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'requestDate',
            render: (text) => [
                <div>
                    {convertDateTime(text, 'DD MMM YYYY')}
                    <br />
                    {convertDateTime(text, 'HH:mm a')}
                </div>,
            ],
        }),
        tblPrepareColumns({
            title: 'Approved By/ Rejected By',
            dataIndex: 'approvedOrRejectedBy',
        }),

        tblPrepareColumns({
            title: 'Remarks',
            dataIndex: 'remarks',
        }),

        tblPrepareColumns({
            title: 'Documents',
            dataIndex: 'supportingDocuments',
            render: () => <img src={IMAGES.FILE} alt="logo-images" onClick={downloadFileFromButton} />,
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => (a && b ? String(a['status']).localeCompare(String(b['status']), undefined, { sensitivity: 'base' }) : a),
            render: (_, record) => (record?.status === 'Approved' ? <Tag color="success">Approved</Tag> : record?.status === 'Rejected' ? <Tag color="error">Rejected</Tag> : <Tag color="warning">Pending</Tag>),
        }),
    ];

    const tableProps = {
        page,
        setPage,
        totalRecords,
        dynamicPagination,
        isLoading: isChangeHistoryLoading,
        tableColumn,
        tableData: changeHistoryData?.customerNameChangeResponses,
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
                        <Button data-testid="closed" danger onClick={onCloseAction}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const CustomerNameChangeHistory = connect(mapStateToProps, mapDispatchToProps)(withDrawer(ChangeHistoryMain, { title: 'Name Change History', width: '90%' }));
