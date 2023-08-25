/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { Select } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Option } = Select;

export const tableColumnAddEdit = (props) => {
    const { typeData, formActionType } = props;
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };
    const tableColumn = [
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productHierarchy',
            width: '50%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Dealer Flag',
            dataIndex: 'dealerFlag',
            width: '30%',
            sorter: false,
            render: (text) => {
                return !formActionType.viewMode ? (
                    <p>
                        <Select defaultValue={text} maxLength={50} placeholder={preparePlaceholderSelect('Select')} {...selectProps}>
                            {typeData[PARAM_MASTER.YES_NO_FLG.id]?.map((item) => (
                                <Option key={'dv' + item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </p>
                ) : (
                    <p>{getCodeValue(typeData[PARAM_MASTER.YES_NO_FLG.id], text)}</p>
                );
            },
        }),
    ];

    return tableColumn;
};
