import React from 'react';
import { TreeSelect } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';

export default function TreeSelectField({ treeFieldNames, treeData, defaultValue, selectedTreeSelectKey, handleSelectTreeClick, placeholder, treeDisabled = false, defaultParent = true }) {
    const treeKey = selectedTreeSelectKey !== 'null' && selectedTreeSelectKey ? selectedTreeSelectKey : defaultParent ? HIERARCHY_DEFAULT_PARENT : null;
    return (
        <>
            <TreeSelect
                treeLine={true}
                treeIcon={true}
                showSearch
                style={{
                    width: '100%',
                }}
                value={treeKey}
                defaultValue={defaultValue}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder={placeholder}
                allowClear
                fieldNames={treeFieldNames}
                onChange={handleSelectTreeClick}
                treeData={treeData}
                treeNodeFilterProp={treeFieldNames?.label}
                disabled={treeDisabled}
            />
        </>
    );
}
