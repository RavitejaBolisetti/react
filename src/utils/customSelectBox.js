/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Select } from 'antd';

const { Option } = Select;

export const customSelectBox = ({ data, placeholder = 'Select', mode = '', loading = false, onChange = undefined, disabled = false, disableOptionsList, disableOptionsKey, fieldNames = { key: 'key', value: 'value' } }) => {
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
                <Option key={item?.[fieldNames?.key]} option={item} type={item?.type} disabled={item?.disabled || (disableOptionsList?.length && !!disableOptionsList?.find((element) => element?.[disableOptionsKey] === item?.[fieldNames?.key]))} value={item?.[fieldNames?.key]}>
                    {item?.[fieldNames?.value]}
                </Option>
            ))}
        </Select>
    );
};
