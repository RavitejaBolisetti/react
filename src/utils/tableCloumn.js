const onFilterFn = (value, record) => {
    if (record.ChangeDate !== undefined) {
        return record.ChangeDate.startsWith(value);
    } else if (record.EmployeeCode !== undefined) {
        return record.EmployeeCode.startsWith(value);
    } else if (record.EmployeeName !== undefined) {
        return record.EmployeeName.startsWith(value);
    }
};

export const tblPrepareColumns = ({ title, dataIndex, render = undefined, ellipsis = false, filters = undefined, filterMode = 'tree', filterSearch = true, sorter = true }) => {
    return {
        title,
        dataIndex,
        ellipsis,
        filters,
        render,
        filterMode,
        filterSearch,
        onFilter: onFilterFn,
        sorter: sorter && ((a, b) => a[dataIndex].localeCompare(b[dataIndex], undefined, { sensitivity: 'base' })),
        sortDirections: ['descend', 'ascend'],
    };
};
