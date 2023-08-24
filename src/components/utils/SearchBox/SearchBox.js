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
    const { selectWide, searchForm, optionType, searchParamRule, filterString, setFilterString, handleChange, disabled = false, isLoading, handleSearchWithoutParameter = undefined } = props;
    const { singleField = false, label = '', placeholder = 'Search', singleFieldKey = 'searchParam', defaultValue='' } = props;
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
        defaultValue,
        allowClear: true,
        className: selectWide ? styles.headerSelectFieldWide : styles.headerSelectField,
    };

    return (
        <div className={singleField ? styles.masterListSearchForm : styles.selectSearchBg}>
            <Form onKeyPress={onKeyPressHandler} form={searchForm} layout={singleField ? 'horizontal' : 'vertical'} colon={false} autoComplete="off">
                {!singleField && (
                    <Form.Item name="searchType" initialValue={defaultValue} rules={[validateRequiredSelectField('parameter')]}>
                        <Select disabled={disabled} placeholder="Select Parameter" {...selectProps}>
                            {optionType?.map((item) => (
                                <Option key={'st' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item label={label} {...searchParamRule} name={singleField && singleFieldKey ? singleFieldKey : 'searchParam'} rules={[validateRequiredInputField('search value')]} validateTrigger={['onChange', 'onSearch']}>
                    <Search loading={isLoading} disabled={disabled} placeholder={placeholder} maxLength={25} value={filterString?.searchParam} allowClear onChange={handleChange} onSearch={singleField && handleSearchWithoutParameter ? handleSearchWithoutParameter : handleSearchParamSearch} className={singleField ? styles.headerSearchField : selectWide ? styles.headerSearchFieldWide : styles.headerSearchField} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchBox;
