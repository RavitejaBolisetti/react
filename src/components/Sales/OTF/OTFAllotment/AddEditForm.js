/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions } from 'antd';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import AdvanceFilter from './AdvanceFilter';
import { AdvancedSearch } from './AdvancedSearch';
import { ListDataTable } from 'utils/ListDataTable';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { convertDateTime } from 'utils/formatDateTime';
import styles from 'components/common/Common.module.css';

import { FilterIcon } from 'Icons';
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { filterString, setFilterString, toggleButton, settoggleButton, setAdvanceSearchVisible, extraParams } = props;
    const { isAdvanceSearchVisible, advanceFilterForm, typeData, productHierarchyData } = props;

    const { formData, isLoading, selectedOrder, tableProps } = props;
    const { otfTransferForm, onFinishOTFTansfer } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction } = props;

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        onFinishOTFTansfer,
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
    };

    const advanceFilterProps = {
        titleOverride: 'Advance Filters',
        isVisible: isAdvanceSearchVisible,
        icon: <FilterIcon size={20} />,
        advanceFilterForm,
        typeData,
        filterString,
        setFilterString,
        setAdvanceSearchVisible,
        productHierarchyData,
    };

    return (
        <>
            <Form form={otfTransferForm} data-testid="test" onFinish={onFinishOTFTansfer} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card className={styles.ExchangeCard}>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="OTF No.">{checkAndSetDefaultValue(selectedOrder?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, 'DD MMM YYYY'), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model">{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Order Status">{getStatus(selectedOrder?.orderStatus)}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <AdvanceFilter {...advanceFilterResultProps} />
                        <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                        <AdvancedSearch {...advanceFilterProps} />
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
