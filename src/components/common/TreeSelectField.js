import React from 'react';
import { TreeSelect } from 'antd';

export default function TreeSelectField({ treeFieldNames, treeData, defaultValue, selectedTreeSelectKey, handleSelectTreeClick, treeDisabled = false }) {
    return (
        <>
            <TreeSelect
                treeLine={true}
                treeIcon={true}
                showSearch
                style={{
                    width: '100%',
                }}
                value={selectedTreeSelectKey}
                defaultValue={defaultValue}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder="Select"
                allowClear
                fieldNames={treeFieldNames}
                onChange={handleSelectTreeClick}
                treeData={treeData}
                treeNodeFilterProp={treeFieldNames.label}
                disabled={treeDisabled}
            />
        </>
    );
}
