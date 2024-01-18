/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Select, Input, DatePicker, Switch } from 'antd';
import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { dateFormat, formatDate } from 'utils/formatDateTime';

import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry, handleFilterChange, filteredStateData, filteredDistrictData } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
        setAdvanceSearchVisible(false);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
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
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Zone" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('zone')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Area Office" name="areaOffice">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Area Office')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Name" name="dealerName">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }}  allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Location Name" name="locationName">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Location Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col> */}
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label={'Scheme Type' || translateContent('city.label.countryCode')} name="schemeType" rules={[validateRequiredSelectField('corporate category' || translateContent('city.validation.country'))]}>
                        {customSelectBox({ data: [], fieldNames: { key: 'key', value: 'key' }, placeholder: preparePlaceholderSelect('Scheme Type') })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={'Scheme Name' || translateContent('city.label.state')} initialValue={filterString?.stateCode} name="stateCode">
                        {customSelectBox({ data: [], fieldNames: { key: 'key', value: 'key' }, placeholder: preparePlaceholderSelect('Scheme Name') })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={'Validity For' || translateContent('city.label.state')} initialValue={filterString?.stateCode} name="stateCode">
                        {customSelectBox({ data: [], fieldNames: { key: 'key', value: 'key' }, placeholder: preparePlaceholderSelect('Validity For') })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={'Modal Group' || translateContent('city.label.state')} initialValue={filterString?.stateCode} name="stateCode">
                        {customSelectBox({ data: [], fieldNames: { key: 'key', value: 'key' }, placeholder: preparePlaceholderSelect('Modal Group') })}
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={'Modal Varient' || translateContent('city.label.state')} initialValue={filterString?.stateCode} name="stateCode">
                        {customSelectBox({ data: [], fieldNames: { key: 'key', value: 'key' }, placeholder: preparePlaceholderSelect('Modal Varient') })}
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.pad5}>
                    <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label={'Status' || translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
