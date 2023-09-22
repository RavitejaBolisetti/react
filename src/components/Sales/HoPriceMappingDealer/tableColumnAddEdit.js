/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';

import { Checkbox } from 'antd';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

export const tableColumnAddEdit = (props) => {
    const { typeData, formActionType, handleCheckBox } = props;

    const tableColumn = [
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productHierarchy',
            width: '50%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Select',
            dataIndex: 'dealerFlag',
            width: '30%',
            sorter: false,
            render: (text, record, index) => {
                return !formActionType.viewMode ? <Checkbox defaultChecked={text} onChange={(text) => handleCheckBox(text, index)}></Checkbox> : <p>{getCodeValue(typeData[PARAM_MASTER.YES_NO_FLG.id], text)}</p>;
            },
        }),
    ];

    return tableColumn;
};
