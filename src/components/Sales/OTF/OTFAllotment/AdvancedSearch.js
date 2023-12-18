/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData, productHierarchyData, resetAdvanceFilter } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, resetAdvanceFilter]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            model: values?.model,
            vehicleStatus: values?.vehicleStatus,
            pdDone: values?.pdDone,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        advanceFilterForm.resetFields();
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.model} label={translateContent('commonModules.label.vehicleDetails.modelDescription')} name="model">
                        {customSelectBox({ data: productHierarchyData, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.vehicleDetails.modelDescription')), fieldNames: { key: 'prodctCode', value: 'prodctShrtName' } })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.vehicleStatus} label={translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus')} name="vehicleStatus">
                        {customSelectBox({ data: typeData[PARAM_MASTER.VEHCL_STATS.id], placeholder: preparePlaceholderSelect(translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus')) })}
                    </Form.Item>
                    {/* <Form.Item name="oemCode" label="OEM Name" rules={[validateRequiredSelectField('OEM Name')]}>
                        <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData['COMPTR_MFG']} placeholder={preparePlaceholderSelect('OEM Name')} />
                    </Form.Item> */}
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.pdDone} label={translateContent('bookingManagement.label.pdiDone')} name="pdDone">
                        {customSelectBox({ data: typeData[PARAM_MASTER.PD_DONE.id], placeholder: preparePlaceholderSelect(translateContent('bookingManagement.label.pdiDone')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.alignRight}>
                    <Button onClick={handleResetFilter} danger>
                        {translateContent('global.buttons.reset')}
                    </Button>
                    <Button htmlType="submit" type="primary" className={styles.marL10}>
                        {translateContent('global.buttons.applyFilter')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
