/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Col, Row, Divider, Form } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { EditVehicleDetailsModal } from './EditVehicleDetailsModal';
import { DataTable } from 'utils/dataTable';
import { tableColumnVehicleDetails } from './tableColumnVehicleDetails';

import { EDIT_ACTION, VIEW_ACTION  } from 'utils/btnVisiblity';

import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const { formData, isLoading, buttonDataVehicleDetails, updateVehicleDetails } = props;
    const {  handleButtonClick, buttonData, setButtonData, onCloseAction} = props;

    const [editVehicleDetailsForm] = Form.useForm();

    const [ isEditVehicleDetailsVisible, setIsEditVehicleDetailsVisible ] = useState(false);
    const [ editVehicleDetails, setEditVehicleDetails ] = useState({});

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 4, xl: 4, xxl: 4 },
    };

    const onFinish = (values) => {
        setIsEditVehicleDetailsVisible(false);
        editVehicleDetailsForm.resetFields();
        updateVehicleDetails({...editVehicleDetails, cancelledQuantity: values?.cancelledQuantity});
        let data = { ...values };

        const onSuccess = (res) => {
            // showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchIndentList({ customURL: customURL + '/search', setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        };

        const onError = (message) => {
            //showGlobalNotification({ message });
        };
        const requestData = {
            // data: data,
            // customURL: customURL + '/indent',
            // method: 'post',
            // setIsLoading: listShowLoading,
            // userId,
            // onError,
            // onSuccess,
        };

        //saveData(requestData);
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const onCloseActionEditVehicleDetails = () => {
        setEditVehicleDetails({});
        editVehicleDetailsForm.resetFields();
        setIsEditVehicleDetailsVisible(false);
    };

    const handleButtonClickVehicleDetails = ({ record = null, buttonAction, openDefaultSection = true, index }) => {
        switch (buttonAction) {
            case EDIT_ACTION:
                setEditVehicleDetails(record);
                setIsEditVehicleDetailsVisible(true);
                break;
            case VIEW_ACTION:
                
                break;
            
            default:
                break;
        }
    };

    const sorterPagination = false;

    const tableProps = {
        srl: true,
        tableColumn: tableColumnVehicleDetails( handleButtonClickVehicleDetails, sorterPagination, buttonDataVehicleDetails ),
        tableData: formData?.vehicleDetails,
        pagination: sorterPagination,
    };

    const editVehicleDetailsProps = {
        isVisible: isEditVehicleDetailsVisible,
        titleOverride: 'Edit Vehicle Details',
        editVehicleDetailsForm,
        onFinish,
        formData : editVehicleDetails,
        onCloseAction: onCloseActionEditVehicleDetails,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Indent Number">{checkAndSetDefaultValue(formData?.indentNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent Date">{checkAndSetDefaultValue(formData?.indentDate ? formData?.indentDate : undefined, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(formData?.indentStatus, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent To Parent">{checkAndSetDefaultValue(formData?.indentToParent, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Indent To Location">{checkAndSetDefaultValue(formData?.indentToLocation, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Requested By">{checkAndSetDefaultValue(formData?.requestedBy, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Remark">{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                    </Card>

                    <Card>
                        <Row gutter={24}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h4>Vehicle Details</h4>
                                <Divider />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <DataTable {...tableProps} />
                            </Col> 
                        </Row>
                    </Card>
                    
                </Col>
            </Row>
            <EditVehicleDetailsModal {...editVehicleDetailsProps} />
            <VehicleDetailFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%', footer: null });
