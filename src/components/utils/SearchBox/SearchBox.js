/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Select, Input } from 'antd';

import { validateRequiredSelectField } from 'utils/validation';

// import styles from 'components/common/Common.module.css';
import styles from './SearchBox.module.css';

const { Option } = Select;
const { Search } = Input;

const SearchBox = (props) => {
    const { searchForm, filterString, optionType, handleSearchTypeChange, handleSearchParamSearch, searchParamRule, handleSearchParamChange } = props;
    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <div className={styles.selectSearchBg}>
            <Form onKeyPress={onKeyPressHandler} form={searchForm} layout="vertical" autoComplete="off">
                <Form.Item name="searchType" initialValue={filterString?.searchType} rules={[validateRequiredSelectField('parameter')]}>
                    <Select onChange={handleSearchTypeChange} placeholder="Select Parameter" {...selectProps}>
                        {optionType?.map((item) => (
                            <Option value={item.key} selected>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item {...searchParamRule} name="searchParam" initialValue={filterString?.searchParam} validateTrigger={['onChange', 'onSearch']}>
                    <Search placeholder="Search" value={filterString?.searchParam} allowClear onSearch={handleSearchParamSearch} onChange={handleSearchParamChange} className={styles.headerSearchField} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchBox;
