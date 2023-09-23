/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
// import styles from 'assets/sass/app.module.scss';

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

    const onFinishFailed = () => {
        return;
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.model} label="Model Description" name="model">
                        {customSelectBox({ data: productHierarchyData, placeholder: preparePlaceholderSelect('Model'), fieldNames: { key: 'prodctCode', value: 'prodctShrtName' } })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.vehicleStatus} label="Vehicle Status" name="vehicleStatus">
                        {customSelectBox({ data: typeData[PARAM_MASTER.VEHCL_STATS.id], placeholder: preparePlaceholderSelect('vehicle status') })}
                    </Form.Item>
                    {/* <Form.Item name="oemCode" label="OEM Name" rules={[validateRequiredSelectField('OEM Name')]}>
                        <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData['COMPTR_MFG']} placeholder={preparePlaceholderSelect('OEM Name')} />
                    </Form.Item> */}
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={filterString?.pdDone} label="PDI Done" name="pdDone">
                        {customSelectBox({ data: typeData[PARAM_MASTER.PD_DONE.id], placeholder: preparePlaceholderSelect('pdi done') })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                        Reset
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Apply Filter
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
