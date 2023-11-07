/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData, productHierarchyData, resetAdvanceFilter } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
    } = props;

    const [parentAppCode, setParentAppCode] = useState();

    useEffect(() => {
        resetFields();
        if (!filterString?.model) setParentAppCode();
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
    const handleSelectTreeClick = (value) => {
        setParentAppCode(value);
        advanceFilterForm.setFieldValue('model', value);
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: parentAppCode,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect('Model'),
        filterString,
        name: 'model',
        labelName: 'Model',
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {/* <Form.Item initialValue={filterString?.model} label="Model Description" name="model">
                        {customSelectBox({ data: productHierarchyData, placeholder: preparePlaceholderSelect('Model'), fieldNames: { key: 'prodctCode', value: 'prodctShrtName' } })}
                    </Form.Item> */}
                    <ProductModelHierarchy {...treeSelectFieldProps} />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.vehicleStatus} label={translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus')} name="vehicleStatus">
                        {customSelectBox({ data: typeData[PARAM_MASTER.VEHCL_STATS.id], placeholder: preparePlaceholderSelect(translateContent('orderDeliveryVehicleAllotment.label.vehicleStatus')) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.pdDone} label={translateContent('orderDeliveryVehicleAllotment.label.pdiDone')} name="pdDone">
                        {customSelectBox({ data: typeData[PARAM_MASTER.PD_DONE.id], placeholder: preparePlaceholderSelect(translateContent('orderDeliveryVehicleAllotment.label.pdiDone')) })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                    {translateContent('global.buttons.reset')}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                    {translateContent('global.buttons.apply')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
