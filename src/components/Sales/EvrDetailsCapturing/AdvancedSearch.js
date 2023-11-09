/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { validateRequiredSelectField } from 'utils/validation';
import dayjs from 'dayjs';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import TreeSelectField from 'components/common/TreeSelectField';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, modelGroupProductData, selectedTreeSelectKey, handleSelectTreeClick, modelCodeName } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        handleResetFilter,
        advanceFilterForm: { resetFields },
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            current: 1,
            dueFromDate: formatDate(values?.dueFromDate),
            dueToDate: formatDate(values?.dueToDate),
            model: values?.model,
            modelCodeName: modelCodeName,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: modelGroupProductData,
        handleSelectTreeClick,
        selectedTreeSelectKey,
        defaultParent: false,
        placeholder: preparePlaceholderSelect(translateContent('evrDetailsCapturing.label.productHierarchy')),
    };

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('global.validation.dateLessThan')));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={0} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item initialValue={filterString?.model} label={translateContent('evrDetailsCapturing.label.productHierarchy')} name="model" rules={[validateRequiredSelectField(translateContent('evrDetailsCapturing.label.productHierarchy'))]}>
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.dueFromDate)} label={translateContent('evrDetailsCapturing.label.dueFromDate')} name="dueFromDate" rules={[validateRequiredSelectField(translateContent('evrDetailsCapturing.label.dueFromDate'))]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} onChange={() => advanceFilterForm.setFieldsValue({ dueToDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        initialValue={formatDateToCalenderDate(filterString?.dueToDate)}
                        label={translateContent('evrDetailsCapturing.label.dueToDate')}
                        name="dueToDate"
                        rules={[
                            validateRequiredSelectField(translateContent('evrDetailsCapturing.label.dueToDate')),
                            {
                                validator: (_, value) => {
                                    return advanceFilterForm.getFieldValue('dueFromDate') ? CheckDateEffectiveTo(value, advanceFilterForm?.getFieldValue('dueFromDate')) : Promise.resolve();
                                },
                            },
                        ]}
                        className={styles?.datePicker}
                    >
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} />
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
                        Apply
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
