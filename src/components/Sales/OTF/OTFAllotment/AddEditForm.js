/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Card, Descriptions } from 'antd';

import AdvanceFilter from './AdvanceFilter';
import { ListDataTable } from 'utils/ListDataTable';
import { withDrawer } from 'components/withDrawer';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { convertDateTime } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { filterString, setFilterString, toggleButton, settoggleButton, setAdvanceSearchVisible, extraParams, handleResetFilter, removeFilter } = props;
    const { setSelectedOrderVINDetails } = props;

    const { formData, isLoading, selectedOrder, tableProps } = props;
    const { otfTransferForm, onFinishOTFTansfer } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction } = props;

    useEffect(() => {
        setFilterString();
        setSelectedOrderVINDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 6, xl: 6, xxl: 6 },
    };

    const advanceFilterResultProps = {
        advanceFilter: true,
        extraParams,
        filterString,
        setFilterString,
        toggleButton,
        settoggleButton,
        setAdvanceSearchVisible,
        handleResetFilter,
        removeFilter,
    };

    return (
        <>
            <Form form={otfTransferForm} data-testid="test" onFinish={onFinishOTFTansfer} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="OTF No.">{checkAndSetDefaultValue(selectedOrder?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, 'DD MMM YYYY'), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model">{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Order Status">{getStatus(selectedOrder?.orderStatus)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <AdvanceFilter {...advanceFilterResultProps} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                    </Col>
                </Row>
                <VehicleDetailFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
