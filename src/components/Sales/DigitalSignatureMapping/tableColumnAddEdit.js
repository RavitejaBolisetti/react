/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { Switch } from 'antd';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

export const tableColumnAddEdit = (props) => {
    const { typeData, formActionType, handleUpdateStatus } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Branch',
            dataIndex: 'branch',
            width: '50%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Accessible',
            dataIndex: 'accessible',
            width: '30%',
            sorter: false,
            render: (text) => {
                return !formActionType.viewMode ? (
                    <p>
                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                    </p>
                ) : (
                    <p>{getCodeValue(typeData[PARAM_MASTER.YES_NO_FLG.id], text)}</p>
                );
            },
        }),
    ];

    return tableColumn;
};
