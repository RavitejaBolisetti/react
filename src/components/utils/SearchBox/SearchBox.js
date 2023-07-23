/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Select, Input } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from './SearchBox.module.css';

const { Option } = Select;
const { Search } = Input;

const SearchBox = (props) => {
    const { selectWide, searchForm, optionType, searchParamRule, filterString, setFilterString, handleChange } = props;
    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    // const handleSearchTypeChange = (searchType) => {
    // if (searchType === 'mobileNumber') {
    //     setCustomerSearchRules({ rules: [validateMobileNoField('Mobile Number'), validateRequiredInputField('Mobile Number')] });
    // } else if (searchType === 'customerName') {
    //     setCustomerSearchRules({ rules: [validateLettersWithWhitespaces('Customer Name'), validateRequiredInputFieldMinLength('Customer Name')] });
    // } else if (searchType === 'otfNumber') {
    //     setCustomerSearchRules({ rules: [validateRequiredInputField('OTF Number')] });
    // } else {
    // searchForm.setFieldsValue({ searchParam: undefined, searchType: undefined });
    // setFilterString({ ...filterString, searchParam: undefined, searchType: undefined });
    // }
    // };

    const handleSearchParamSearch = (values) => {
        searchForm
            .validateFields()
            .then((values) => {
                setFilterString({ ...values, advanceFilter: true });
                searchForm.resetFields();
            })
            .catch((err) => {
                return;
            });
    };

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: true,
        className: selectWide ? styles.headerSelectFieldWide : styles.headerSelectField,
    };
    return (
        <div className={styles.selectSearchBg}>
            <Form onKeyPress={onKeyPressHandler} form={searchForm} layout="vertical" autoComplete="off">
                <Form.Item name="searchType" rules={[validateRequiredSelectField('parameter')]}>
                    <Select placeholder="Select Parameter" {...selectProps}>
                        {optionType?.map((item) => (
                            <Option key={'st' + item.key} value={item.key}>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item {...searchParamRule} name="searchParam" rules={[validateRequiredInputField('search parameter')]} validateTrigger={['onChange', 'onSearch']}>
                    <Search placeholder="Search" maxLength={25} value={filterString?.searchParam} allowClear onChange={handleChange} onSearch={handleSearchParamSearch} className={selectWide ? styles.headerSearchFieldWide : styles.headerSearchField} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchBox;
