/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Space } from 'antd';
import { tblPrepareColumns } from 'utils/tableColumn';
import { FiEye } from 'react-icons/fi';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

export const tblActionColumn = ({ handleButtonClick, width = '10%', fixed = '' }) => {
    return {
        title: translateContent('digitalSignature.label.action'),
        dataIndex: '',
        width,
        fixed: fixed,
        render: (text, record, index) => [
            <Space size="middle">
                <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                    <FiEye />
                </Button>
                <Button type="primary" data-testid="add" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, record, index })}>
                    {translateContent('digitalSignature.button.mapSignature')}
                </Button>
            </Space>,
        ],
    };
};

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('digitalSignature.label.dealerName'),
            dataIndex: 'dealerName',
            width: '25%',
        }),

        tblPrepareColumns({
            title: translateContent('digitalSignature.label.employeeName'),
            dataIndex: 'employeeName',
            width: '25%',
        }),

        tblPrepareColumns({
            title: translateContent('digitalSignature.label.status'),
            dataIndex: 'status',
            width: '25%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
