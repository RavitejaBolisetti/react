/*defaultParent
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { TreeSelect } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';

export default function TreeSelectField({ loading = false, treeFieldNames, treeData, defaultValue, selectedTreeSelectKey, handleSelectTreeClick = () => {}, onSelects = () => {}, placeholder, treeDisabled = false, defaultParent = true, HandleClear }) {
    return (
        <>
            <TreeSelect
                treeLine={true}
                treeIcon={true}
                showSearch
                style={{
                    width: '100%',
                }}
                value={selectedTreeSelectKey || (defaultParent ? HIERARCHY_DEFAULT_PARENT : [])}
                defaultValue={defaultValue}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder={placeholder}
                allowClear
                fieldNames={treeFieldNames}
                onChange={(key, treeObj, obj) => handleSelectTreeClick(key, treeObj, obj)}
                onSelect={(key, treeObj, obj) => onSelects(key, treeObj, obj)}
                treeData={treeData}
                treeNodeFilterProp={treeFieldNames?.label}
                disabled={treeDisabled}
                onClear={HandleClear}
                loading={loading}
            />
        </>
    );
}
