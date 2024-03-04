/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Select, Input, DatePicker, Switch } from 'antd';
import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import { bindActionCreators } from 'redux';

import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';
import { showGlobalNotification } from 'store/actions/notification';


export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, productHierarchyData, resetAdvanceFilter } = props;
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
            current: 1,
        });
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        advanceFilterForm.resetFields();
    };
    const handleSelectTreeClick = (value) => {
        setParentAppCode(value);
        advanceFilterForm.setFieldValue('Product Hierarchy', value);
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
        placeholder: preparePlaceholderSelect('Select Product'),
        filterString,
        name: 'Product Hierarchy',
        labelName: 'Product Hierarchy',
    };



    const modalProps = {
        reset: true,
        submit: true,
        resetName: `${translateContent('global.buttons.reset')}`,
        submitName: `${translateContent('global.buttons.search')}`,
        handleResetFilter,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>           
             <ProductModelHierarchy {...treeSelectFieldProps} />                
                   
           </Col>          
          
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="From Date" name="fromDate">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('fromDate')} fieldNames={{ label: 'fromDate', value: 'fromDate' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="To Date" name="toDate">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('toDate')} fieldNames={{ label: 'toDate', value: 'toDate' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
            {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Name" name="dealerName">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Name')} fieldNames={{ label: 'dealerName', value: 'dealerName' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} /> 
                     </Form.Item>
                </Col> */}
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Area Office" name="areaOffice">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Area Office')} fieldNames={{ label: 'areaOffice', value: 'areaOffice' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Location" name="dealerlocation">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Location')} fieldNames={{ label: 'location', value: 'location' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} /> 
                     </Form.Item>
                </Col>
                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Branch" name="dealerbranch">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Branch')} fieldNames={{ label: 'dealerbranch', value: 'dealerbranch' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col> */}
               
              
              
{/* 
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={translateContent('vehicleRelated.label.status')}  rules={[validateRequiredSelectField(translateContent('vehicleRelated.validation.status'))]}>
                            {customSelectBox({ data: status, placeholder: preparePlaceholderSelect(translateContent('vehicleRelated.label.status')) })}
                        </Form.Item>
                        </Col> */}
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});


