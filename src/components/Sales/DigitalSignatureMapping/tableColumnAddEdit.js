/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { Switch } from 'antd';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';

export const tableColumnAddEdit = (props) => {
    const { typeData, formActionType } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('digitalSignature.label.branch'),
            dataIndex: 'branch',
            width: '50%',
            sorter: false,
        }),
        tblPrepareColumns({
            title: translateContent('digitalSignature.label.accessible'),
            dataIndex: 'accessible',
            width: '30%',
            sorter: false,
            render: (text) => {
                return !formActionType.viewMode ? (
                    <p>
                        <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} onChange={(checked) => (checked ? 1 : 0)} />
                    </p>
                ) : (
                    <p>{getCodeValue(typeData[PARAM_MASTER.YES_NO_FLG.id], text)}</p>
                );
            },
        }),
    ];

    return tableColumn;
};
