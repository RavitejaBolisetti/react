/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Descriptions, Col, Row, Divider, Form } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { DATA_TYPE } from 'constants/dataType';
import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { EditVehicleDetailsModal } from './EditVehicleDetailsModal';
import { PARAM_MASTER } from 'constants/paramMaster';
import { getCodeValue } from 'utils/getCodeValue';
import { DataTable } from 'utils/dataTable';
import { tableColumnVehicleDetails } from './tableColumnVehicleDetails';

import { EDIT_ACTION, VIEW_ACTION } from 'utils/btnVisiblity';

import styles from 'assets/sass/app.module.scss';
import { STOCK_TRANSFER } from 'constants/StockTransfer';

const ViewDetailMain = (props) => {
    const { toggleButton, formData, isLoading, updateVehicleDetails } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction } = props;
    const { setCancellationData, setCancellationIssueVisible, typeData } = props;

    const [editVehicleDetailsForm] = Form.useForm();
    const [isEditVehicleDetailsVisible, setIsEditVehicleDetailsVisible] = useState(false);
    const [editVehicleDetails, setEditVehicleDetails] = useState({});

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 4, xl: 4, xxl: 4 },
    };

    const onFinish = (values) => {
        setEditVehicleDetails({});
        setIsEditVehicleDetailsVisible(false);
        editVehicleDetailsForm.resetFields();
        updateVehicleDetails({ ...editVehicleDetails, cancelledQuantity: values?.cancelledQuantity });
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
                setEditVehicleDetails({ ...record });
                editVehicleDetailsForm.setFieldsValue({ ...record });
                setIsEditVehicleDetailsVisible(true);
                break;
            case VIEW_ACTION:
                setCancellationData({ ...record, indentDetailId: record?.id, ...formData, modelCode: record?.modelCode });
                setCancellationIssueVisible(true);
                break;

            default:
                break;
        }
    };

    const tableProps = {
        srl: true,
        pagination: false,
        isLoading: isLoading,
        tableColumn: tableColumnVehicleDetails({ handleButtonClick: handleButtonClickVehicleDetails, canView: true, canEdit: toggleButton === STOCK_TRANSFER?.RAISED.key }),
        tableData: formData?.vehicleDetails,
    };

    const editVehicleDetailsProps = {
        isVisible: isEditVehicleDetailsVisible,
        titleOverride: 'Edit Vehicle Details',
        editVehicleDetailsForm,
        onFinish,
        formData: editVehicleDetails,
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
                            <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER?.INDNT_RAS?.id], formData?.indentStatus), isLoading)}</Descriptions.Item>
                            {/* <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(formData?.indentStatus, isLoading)}</Descriptions.Item> */}
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
