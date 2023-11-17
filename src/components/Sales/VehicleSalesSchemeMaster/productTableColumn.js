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
import { Switch } from 'antd';
import { tblPrepareColumns } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';


export const productTableColumn = (handleToggle) => {
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
            render: (text,record) => {
                return <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={true} onChange={(checked) => handleToggle(checked, record)} />;
            },
        }),
    ];

    return tableColumn;
};
