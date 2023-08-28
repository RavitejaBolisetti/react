/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Space } from 'antd';
import { tblPrepareColumns } from 'utils/tableColumn';
import { FiEye } from 'react-icons/fi';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'components/common/Common.module.css';

export const tblActionColumn = ({ styles, handleButtonClick, width = '10%', fixed = '', AddIcon = false, EditIcon = false, EyeIcon = false }) => {
    return {
        title: 'Action',
        dataIndex: '',
        width,
        fixed: fixed,
        render: (text, record, index) => [
            <Space size="middle">
                <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                    <FiEye />
                </Button>
                <Button type="primary" data-testid="add" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, record, index })}>
                    Map Signature
                </Button>
            </Space>,
        ],
    };
};

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '25%',
        }),

        tblPrepareColumns({
            title: 'Employee Name',
            dataIndex: 'employeeName',
            width: '25%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '25%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
