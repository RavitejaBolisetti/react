/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Select } from 'antd';

const { Option } = Select;

export const customSelectBox = ({ data, placeholder = 'Select', mode = '', loading = false, onChange = undefined, disabled = false, fieldNames = { key: 'key', value: 'value' } }) => {
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        loading,
        disabled,
    };
    return (
        <Select placeholder={placeholder} mode={mode} onChange={onChange} {...selectProps}>
            {data?.map((item) => (
                <Option disabled={item?.disabled || false} value={item?.[fieldNames?.key]}>
                    {item?.[fieldNames?.value]}
                </Option>
            ))}
        </Select>
    );
};
