/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Select } from 'antd';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

export const customSelectBox = ({ data, placeholder = translateContent('global.placeholder.select'), mode = '', loading = false, testId, onChange = undefined, disabled = false, customTitle = undefined, disableOptionsList = [], fieldNames = { key: 'key', value: 'value' } }, disableOptionsKey = fieldNames?.key || 'key') => {
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        loading,
        disabled,
    };
    return (
        <Select placeholder={placeholder} mode={mode} onChange={onChange} {...selectProps} data-testid={testId} className={styles.fullWidth}>
            {data?.map((item) => (
                <Option key={item?.[fieldNames?.key]} option={item} type={item?.type} disabled={item?.disabled || (disableOptionsList?.length && !!disableOptionsList?.find((element) => element?.[disableOptionsKey] === item?.[fieldNames?.key]))} value={item?.[fieldNames?.key]}>
                    {customTitle ? customTitle(item?.[fieldNames?.key], item?.[fieldNames?.value]) : item?.[fieldNames?.value]}
                </Option>
            ))}
        </Select>
    );
};
