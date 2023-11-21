/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tag } from 'antd';
import { tblActionColumn, tblPrepareColumns } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

export const productTableColumn = (props) => {
    const { formActionType, handleButtonClick, styles } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.productDetails'),
            dataIndex: 'modelName',
            width: '18%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleSalesSchemeMaster.label.mandatory'),
            dataIndex: 'toggleStatus',
            width: '18%',
            render: (text) => <>{text === true ? <Tag color="success">{translateContent('global.yesNo.yes')}</Tag> : <Tag>{translateContent('global.yesNo.no')}</Tag>}</>,
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '10%', canEdit: true, canView: false, isDeletable: formActionType?.addMode }));
    }

    return tableColumn;
};
