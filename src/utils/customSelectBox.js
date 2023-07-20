/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Select } from 'antd';

const { Option } = Select;

export const customSelectBox = ({ data, placeholder = 'Select', loading = false, onChange = undefined, disabled = false, fieldNames = { key: 'key', value: 'value' } }) => {
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        loading,
    };
    return (
        <Select placeholder={placeholder} onChange={onChange} {...selectProps}>
            {data?.map((item) => (
                <Option value={item?.[fieldNames?.key]}>{item?.[fieldNames?.value]}</Option>
            ))}
        </Select>
    );
};
