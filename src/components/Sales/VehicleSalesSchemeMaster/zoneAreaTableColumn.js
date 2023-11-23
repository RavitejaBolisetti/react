/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblActionColumn, tblPrepareColumns } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

export const zoneAreaTableColumn = (props) => {
    const { formActionType, handleButtonClick, styles } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.zone'),
            dataIndex: 'zoneName',
            width: '18%',
        }),

        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.area'),
            dataIndex: 'areaName',
            width: '18%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '10%', canEdit: false, canView: false, isDeletable: true }));
    }

    return tableColumn;
};
