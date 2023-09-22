/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';

import { Checkbox, Form } from 'antd';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

const CheckboxGroup = Checkbox.Group;

export const tableColumnAddEdit = (props) => {
    const { typeData, formActionType, handleCheckBox } = props;

    // const [checkedList, setCheckedList] = useState([]);

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
                return !formActionType.viewMode ? (
                    // <Form.Item name={index}>
                    <Checkbox defaultChecked={text} onChange={(text) => handleCheckBox(text, index)}></Checkbox>
                ) : (
                    // </Form.Item>
                    <p>{getCodeValue(typeData[PARAM_MASTER.YES_NO_FLG.id], text)}</p>
                );
            },
        }),
    ];

    return tableColumn;
};
