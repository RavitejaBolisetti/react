/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';
import { geoPinCodeDataActions } from 'store/actions/data/geo/pincodes';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;
    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData: pincodeData?.pinCodeDetails,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            listPinCodeShowLoading: geoPinCodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPinCodeDataActions.fetchList,
            resetPincodeData: geoPinCodeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InstallationAddressDetailsMasterBase = (props) => {
    const { StatusBar, onCloseAction, fetchList, formActionType, requestPayload, chargerInstallationMasterData, crmCustomerVehicleData, fetchPincodeDetail, userId, isDataLoaded, onChargerInstallationFinish, setRequestPayload, showGlobalNotification } = props;
    const { form, handleFormValueChange, section, isLoading } = props;
    const { FormActionButton, pageType } = props;
    const { insuranceCompanies, pincodeData } = props;
    const [checked, setChecked] = useState(false);

    const onFinish = () => {
        form.validateFields()
            .then(() => {
                const values = form.getFieldsValue();
                const dataSet = checked
                    ? { sameAsCustomerAddress: values?.sameAsCustomerAddress ? 'Y' : 'N', instAddressDetails: { address: crmCustomerVehicleData?.customerDetails?.customerAddress, pinCode: crmCustomerVehicleData?.customerDetails?.pinCode, city: crmCustomerVehicleData?.customerDetails?.customerCity, state: crmCustomerVehicleData?.customerDetails?.state, customerMobileNumber: crmCustomerVehicleData?.otfDetails?.mobileNumber } }
                    : { sameAsCustomerAddress: values?.sameAsCustomerAddress ? 'Y' : 'N', instAddressDetails: { address: values?.address, city: values?.city, state: values?.state, pinCode: values?.pinCode, customerMobileNumber: values?.customerMobileNumber } };

                if (checked) {
                    setRequestPayload((prev) => ({ ...prev, chargerInstAddressDetails: { sameAsCustomerAddress: values?.sameAsCustomerAddress ? 'Y' : 'N', instAddressDetails: { address: crmCustomerVehicleData?.customerDetails?.customerAddress, pinCode: crmCustomerVehicleData?.customerDetails?.pinCode, city: crmCustomerVehicleData?.customerDetails?.customerCity, state: crmCustomerVehicleData?.customerDetails?.state, customerMobileNumber: crmCustomerVehicleData?.otfDetails?.mobileNumber } } }));
                } else {
                    setRequestPayload((prev) => ({ ...prev, chargerInstAddressDetails: { sameAsCustomerAddress: values?.sameAsCustomerAddress ? 'Y' : 'N', instAddressDetails: { address: values?.address, city: values?.city, state: values?.state, pinCode: values?.pinCode, customerMobileNumber: values?.customerMobileNumber } } }));
                }

                handleFormValueChange();
                onChargerInstallationFinish({ ...requestPayload, chargerInstAddressDetails: dataSet });
            })
            .catch((err) => {});
    };
    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const onSuccessAction = () => {
        return;
    };

    const viewProps = {
        styles,
        onCloseAction,
        isLoading,
        pageType,
        insuranceCompanies,
        chargerInstallationMasterData,
    };

    const formProps = {
        ...props,
        pincodeData,
        form,
        fetchList,
        userId,
        isDataLoaded,
        isLoading,
        pageType,
        insuranceCompanies,
        onSuccessAction,
        onErrorAction,
        fetchPincodeDetail,
        crmCustomerVehicleData,
        setChecked,
        chargerInstallationMasterData,
        formActionType,
    };

    const myProps = {
        ...props,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {!formActionType?.addMode && <StatusBar status={chargerInstallationMasterData?.chargerInstDetails?.requestDetails[0].stageType} />}
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? (
                        <>
                            <ViewDetail {...viewProps} />
                        </>
                    ) : (
                        <>
                            <AddEditForm {...formProps} />
                        </>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InstallationAddressDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InstallationAddressDetailsMasterBase);
