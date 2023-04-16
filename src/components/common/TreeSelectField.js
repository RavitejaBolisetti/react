import React from 'react';
import { TreeSelect } from 'antd';

export default function TreeSelectField({ treeFieldNames, treeData, defaultValue, selectedTreeSelectKey, handleSelectTreeClick, placeholder, treeDisabled = false }) {
    return (
        <>
            <TreeSelect
                treeLine={true}
                treeIcon={true}
                showSearch
                style={{
                    width: '100%',
                }}
                value={selectedTreeSelectKey || []}
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
                treeNodeFilterProp={treeFieldNames?.label }
                disabled={treeDisabled}
            />
        </>
    );
}
