/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Select } from 'antd';

const { Option } = Select;

export const customSelectBox = ({ data, placeholder = 'Select' }) => {
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };
    return (
        <Select placeholder={placeholder} {...selectProps}>
            {data?.map((item) => (
                <Option value={item.key}>{item.value}</Option>
            ))}
        </Select>
    );
};
