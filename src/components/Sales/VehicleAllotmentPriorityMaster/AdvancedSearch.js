/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Form, Row, DatePicker } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';

import { formatDate,dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';
import styles from 'assets/sass/app.module.scss';
// import styles from 'components/common/Common.module.css';

export const AdvancedSearchFrom = (props) => {
    const { filterString, setFilterString, typeData, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;
    const { productHierarchyList, advanceFilterForm: { resetFields },  } = props;
    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        console.log('values',values);
        console.log('filterString',filterString);
        setFilterString({
            ...filterString,
            ...values,
            oldModelGroup: values?.oldModelGroup,
            newModelGroup: values?.newModelGroup,
            effectiveFromDate: formatDate(values?.effectiveFromDate),
            effectiveToDate: formatDate(values?.effectiveToDate),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const onFinishFailed = () => {
        return;
    };
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        // className: styles.headerSelectField,
    };
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Reset',
        submitName: 'Search',
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {/* rules={[validateRequiredSelectField('old model group')]} */}
                    <Form.Item initialValue={filterString?.oldModelGroup} label="Old Model Group" name="oldModelGroup" >
                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect('Old Model Group') })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={filterString?.newModelGroup} label="New Model Group" name="newModelGroup" >
                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect('New Model Group') })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                     
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.effectiveFromDate)} label="Effective From Date" name="effectiveFromDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} onChange={() => advanceFilterForm.setFieldsValue({ effectiveToDate: undefined })} />
                  
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.effectiveToDate)} label="Effective To Date" name="effectiveToDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} disabledDate={(current) => current < advanceFilterForm?.getFieldValue('effectiveFromDate')} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
            </Row>
            

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
