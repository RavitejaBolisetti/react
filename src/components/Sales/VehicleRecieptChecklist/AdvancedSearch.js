/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Select, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import { ModalButtons } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import TreeSelectField from 'components/common/TreeSelectField';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, vehicleModelData, isModelDataLoading, setSelectedTreeSelectKey } = props;
    const { productHierarchyData, formData, handleSelectTreeClick, selectedTreeSelectKey, isProductDataLoading } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        rules,
        setrules,
    } = props;

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            ...selectedTreeSelectKey,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            current: 1,
            pageSize: 10,
            advanceFilter: true,
        });

        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        resetFields();
        setSelectedTreeSelectKey({ model: undefined, modelName: [] });
        setrules({ fromdate: false, todate: false });
    };

    const onFinishFailed = () => {
        return;
    };

    const fieldNames = { label: 'prodctShrtName', value: 'prodctCode', children: 'subProdct' };

    const treeSelectFieldProps = {
        treeFieldNames: fieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: selectedTreeSelectKey?.model,
        handleSelectTreeClick,
        treeExpandedKeys: [formData?.model],
        placeholder: preparePlaceholderSelect('Model'),
        loading: isProductDataLoading,
        treeDisabled: false,
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.apply'),
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate')} name="fromDate" className={styles?.datePicker} rules={[{ required: rules?.fromdate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message1') }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect(translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current > new Date()}
                            onChange={(event) => {
                                advanceFilterForm.setFieldsValue({ toDate: undefined });
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                else if (!event) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate')} name="toDate" className={styles?.datePicker} rules={[{ required: rules?.todate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message2') }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect(translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current < advanceFilterForm?.getFieldValue('fromDate') || current > new Date()}
                            onChange={(event) => {
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                if (!event && !advanceFilterForm?.getFieldValue('fromDate')) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Model Description" name="model">
                        <TreeSelectField {...treeSelectFieldProps} />
                        {/* <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('model')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} /> */}
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
