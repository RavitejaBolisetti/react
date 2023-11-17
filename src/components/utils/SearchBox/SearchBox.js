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
import { translateContent } from 'utils/translateContent';

import styles from './SearchBox.module.scss';

const { Option } = Select;
const { Search } = Input;

const SearchBox = (props) => {
    const { maxLength = 25, selectWide, searchForm, optionType, searchParamRule, filterString, setFilterString, handleChange, disabled = false, isLoading, handleSearchWithoutParameter = undefined } = props;
    const { validateTrigger = ['onChange', 'onSearch'], allowClear = true, singleField = false, label = '', placeholder = translateContent('global.placeholder.search'), singleFieldKey = 'searchParam', defaultOption = undefined, captilized = undefined, valueReset = true } = props;

    const [validationRules, setValidationRules] = useState([validateRequiredInputField('input')]);

    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    const handleValidation = (value, ValueObj) => {
        if (!value) {
            setValidationRules([validateRequiredInputField('input')]);
            return;
        }
        const { value: fieldName } = ValueObj;
        switch (fieldName) {
            case SearchConstants?.MOBILENUMBER?.id: {
                setValidationRules([validateMobileNoField('Mobile Number'), validateRequiredInputField('mobile number')]);
                break;
            }
            case SearchConstants?.REGISTRATIONUMBER?.id: {
                setValidationRules([validateRequiredInputField('input')]);
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
            case SearchConstants?.NEWMODELGROUP?.id: {
                setValidationRules([validateRequiredInputField('new modal group')]);
                break;
            }
            case SearchConstants?.OLDMODELGROUP?.id: {
                setValidationRules([validateRequiredInputField('old modal group')]);
                break;
            }
            default: {
                setValidationRules([validateRequiredInputField('input')]);
                break;
            }
        }
    };

    const handleSearchParamSearch = (values) => {
        searchForm
            .validateFields()
            .then((values) => {
                valueReset && setValidationRules([validateRequiredInputField('input')]);
                setFilterString({ ...filterString, ...values, searchParam: values?.searchParam?.trim(), [singleFieldKey]: values?.[singleFieldKey]?.trim(), pageSize: filterString?.pageSize, current: 1, advanceFilter: true });
                valueReset && searchForm.resetFields();
            })
            .catch((err) => {
                return;
            });
    };

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: allowClear,
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
                <Form.Item label={label} {...searchParamRule} name={singleField && singleFieldKey ? singleFieldKey : 'searchParam'} rules={validationRules} validateTrigger={validateTrigger} className={selectWide ? styles.headerSearchFieldWide : ''}>
                    <Search onInput={captilized ? convertToUpperCase : undefined} loading={isLoading} disabled={disabled} placeholder={placeholder} maxLength={maxLength} value={filterString?.searchParam} allowClear onChange={handleChange} onSearch={'singleField' && handleSearchWithoutParameter ? handleSearchWithoutParameter : handleSearchParamSearch} className={styles.headerSearchField} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchBox;
