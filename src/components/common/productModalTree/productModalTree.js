/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form } from 'antd';

import { validateRequiredSelectField } from 'utils/validation';
import TreeSelectField from 'components/common/TreeSelectField';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

const ProductModelTree = (props) => {
    const { treeFieldNames, treeData, selectedTreeSelectKey, handleSelectTreeClick, filterString, labelName, name } = props;

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData,
        defaultParent: false,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect('Model'),
    };

    return (
        <Form.Item initialValue={filterString?.model} name={name} label={labelName} rules={[validateRequiredSelectField('model')]}>
            <TreeSelectField {...treeSelectFieldProps} />
        </Form.Item>
    );
};

export default ProductModelTree;
