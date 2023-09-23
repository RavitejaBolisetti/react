/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, } from 'react';
import { Form, Row, Col } from 'antd';
import { GstAuthFormButton } from '../GSTAuthenticationFormButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tableColumn } from './tableColumn';
import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { dealerBranchAccessAction } from 'store/actions/data/financialAccounting/dealerBranchAccessAction';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                // DocumentDescription: { isLoaded: isDocumentTypesLoaded = false, isLoading: isDocumentTypeLoading = false, data: documentTypeData = [] },
                DealerBranchDetails: {  data: dealerBranchData = [] },
            },
            
        },
    } = state;

    const moduleTitle = 'GST Details';

    let returnValue = {
        userId,
        moduleTitle,
        dealerBranchData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerBranchAccessAction.fetchList,
            listShowLoading: dealerBranchAccessAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const GstBranchAccessibleMasterBase = (props) => {
    const { typeData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, } = props;
    const { form, handleFormValueChange, NEXT_ACTION, handleButtonClick, dealerBranchData } = props;

     const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {            
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction });
        }
    }, [userId]);     
    

    const onFinish = (values) => {
        // const recordId = supplierInvoiceData?.id || '';
        // const data = { ...values, id: recordId, supplierInvoiceNumber: '', loyaltyScheme: values?.loyaltyScheme === true ? 1 : 0, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
        handleButtonClick({ record: values, buttonAction: NEXT_ACTION });

        // const onSuccess = (res) => {
        //     handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        //     // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        //     fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        // };
        // const onError = (message) => {
        //     showGlobalNotification({ message });
        // };
        // const requestData = {
        //     data: data,
        //     method: 'put',
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        // };
        // saveData(requestData);
    };

    const onFinishFailed = () => {};

    const viewProps = {
        typeData,
        styles,
    };
    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: dealerBranchData, //data,
        showAddButton: false,
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {/* isLoading={showDataLoading} */}
                    <ListDataTable {...tableProps} showAddButton={false} />

                    {/* {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />} */}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <GstAuthFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const GstBranchAccessibleMaster = connect(mapStateToProps, mapDispatchToProps)(GstBranchAccessibleMasterBase);
