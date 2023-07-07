/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect } from 'react';
import { Row, Col, Space, Form, Card } from 'antd';

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { otfInvoiceDetailDataActions } from 'store/actions/data/otf/invoiceDetail';
// import { showGlobalNotification } from 'store/actions/notification';
import { DataTable } from 'utils/dataTable';

import { VehicleDetailFormButton } from '../VehicleDetailFormButton';

import { tableColumn } from './tableColumn';

import styles from 'components/common/Common.module.css';

// import { OTF_STATUS } from 'constants/OTFStatus';

// const mapStateToProps = (state) => {
//     const {
//         auth: { userId },
//         data: {
//             OTF: {
//                 InvoiceDetail: { isLoaded: isDataLoaded = false, isLoading, data: invoiceData = [] },
//             },
//         },
//     } = state;

//     const moduleTitle = 'Invoice Information';

//     let returnValue = {
//         userId,
//         isDataLoaded,
//         invoiceData,
//         isLoading,
//         moduleTitle,
//     };
//     return returnValue;
// };

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     ...bindActionCreators(
//         {
//             fetchList: otfInvoiceDetailDataActions.fetchList,
//             listShowLoading: otfInvoiceDetailDataActions.listShowLoading,
//             resetData: otfInvoiceDetailDataActions.reset,
//             showGlobalNotification,
//         },
//         dispatch
//     ),
// });

export const EntitelmentMasterBase = (props) => {
    const { form, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, handleButtonClick, NEXT_ACTION } = props;
    const { section, selectedOrderId, selectedOrder: { orderStatus = false } = {} } = props;

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    const errorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, nextBtn: true, saveBtn: false },
    };

    const onFinish = (values) => {
        handleButtonClick({ record: undefined, buttonAction: NEXT_ACTION });
    };
    const onFinishFailed = () => {};

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                        <Card>
                            <DataTable srlTitle={'#'} removePagination={true} tableColumn={tableColumn()} />
                        </Card>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

// export const EntitelmentMaster = connect(mapStateToProps, mapDispatchToProps)(EntitelmentMasterBase);
export const EntitelmentMaster = connect(null, null)(EntitelmentMasterBase);
