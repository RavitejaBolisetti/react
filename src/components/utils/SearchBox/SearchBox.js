/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Form, Select, Input } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, validateLettersWithWhitespaces } from 'utils/validation';

import { SearchConstants } from './SearchBoxConstants';
import { convertToUpperCase } from 'utils/convertToUpperCase';

import styles from './SearchBox.module.scss';

const { Option } = Select;
const { Search } = Input;

const SearchBox = (props) => {
    const { selectWide, searchForm, optionType, searchParamRule, filterString, setFilterString, handleChange, disabled = false, isLoading, handleSearchWithoutParameter = undefined } = props;
    const { singleField = false, label = '', placeholder = 'Search', singleFieldKey = 'searchParam', defaultOption = undefined, captilized = undefined } = props;

    const [validationRules, setValidationRules] = useState([validateRequiredInputField('searchType')]);

    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    const handleValidation = (value, ValueObj) => {
        if (!value) {
            setValidationRules([validateRequiredInputField('searchType')]);
            return;
        }
        const { value: fieldName } = ValueObj;
        switch (fieldName) {
            case SearchConstants?.MOBILENUMBER?.id: {
                setValidationRules([validateMobileNoField('Mobile Number'), validateRequiredInputField('searchType')]);
                break;
            }
            case SearchConstants?.REGISTRATIONUMBER?.id: {
                setValidationRules([validateRequiredInputField('searchType')]);
                break;
            }
            case SearchConstants?.CHASSISNUMBER?.id: {
                setValidationRules([validateRequiredInputField('chassis number')]);
                break;
            }
            case SearchConstants?.CUSTOMERNAME?.id: {
                setValidationRules([validateLettersWithWhitespaces('customer name')]);
                break;
            }
            default: {
                setValidationRules([validateRequiredInputField('searchType')]);
                break;
            }
        }
    };

    const handleSearchParamSearch = (values) => {
        searchForm
            .validateFields()
            .then((values) => {
                setValidationRules([validateRequiredInputField('searchType')]);
                setFilterString({ ...values, pageSize: filterString?.pageSize, current: 1, advanceFilter: true });
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
        <div className={singleField ? styles.masterListSearchForm : styles.selectSearchBg}>
            <Form onKeyPress={onKeyPressHandler} form={searchForm} layout={singleField ? 'horizontal' : 'vertical'} colon={false} autoComplete="off">
                {!singleField && (
                    <Form.Item name="searchType" initialValue={defaultOption} rules={[validateRequiredSelectField('parameter')]}>
                        <Select onChange={handleValidation} disabled={disabled} placeholder="Select Parameter" {...selectProps}>
                            {optionType?.map((item) => (
                                <Option key={'st' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item label={label} {...searchParamRule} name={singleField && singleFieldKey ? singleFieldKey : 'searchParam'} rules={validationRules} validateTrigger={['onChange', 'onSearch']} className={selectWide ? styles.headerSearchFieldWide : ''}>
                    <Search onInput={captilized ? convertToUpperCase : undefined} loading={isLoading} disabled={disabled} placeholder={placeholder} maxLength={25} value={filterString?.searchParam} allowClear onChange={handleChange} onSearch={singleField && handleSearchWithoutParameter ? handleSearchWithoutParameter : handleSearchParamSearch} className={styles.headerSearchField} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchBox;
