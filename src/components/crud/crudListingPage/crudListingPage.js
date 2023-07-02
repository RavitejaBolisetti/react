/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { dependentDataLoader, crudListingBase } from './crudListingBase';
import { tblSerialNumberColumn, tableColumnStringWithTag } from 'utils/tableColumn';
import { tableColumnActionsEditDelete } from 'utils/tableColumn';
import { showGlobalNotification } from 'store/actions/notification';

import { bindActionCreators } from 'redux';

const crudListingPage = ({ advanceFilter = false, studySpecific = false, siteSpecific = false, mapStateToProps, dataActions, dataListActions, moduleName, addButtonTitle, addButtonIcon, tableColumnList, filterFunction, dependentDataLoaders, additionalDispatchActions = {}, manageCTMSSpecific = false, isAddButtonHide = false, customTableAction = undefined, exportData = false }) => {
    const myColumns = (props) => {
        const { canEditMaster = true, canDeleteMaster = true } = props;
        const tableColumn = [tblSerialNumberColumn];
        tableColumn.push(...tableColumnList);
        tableColumn.push(tableColumnStringWithTag({ title: 'Status', dataIndex: 'status' }));
        if (canEditMaster || canDeleteMaster) {
            tableColumn.push(tableColumnActionsEditDelete({ title: 'Actions' }));
        }
        return tableColumn;
    };

    // Following code is based on pattern seen on redux docs
    // from: https://react-redux.js.org/using-react-redux/connect-mapdispatch#manually-injecting-dispatch
    // This is method suggested to manually inject dispatch along with action creators that are bound to dispatch.

    const mapDispatchToProps = (dispatch) => ({
        dispatch,
        ...bindActionCreators(
            {
                fetchlist: dataActions.fetchList,
                listSetFilterString: dataListActions.setFilterString,
                listShowLoading: dataListActions.showLoading,
                listFetchError: dataListActions.fetchError,
                showAdvanceFilter: dataListActions.showAdvanceFilter,
                deleteList: dataActions.delete,
                deleteMultipleList: dataActions.deleteMultiple,
                listSetSeletedData: dataListActions.setSeletedData,
                listDeleteShowLoading: dataListActions.deleteShowLoading,
                updateList: dataActions.update,
                activeMultipleList: dataActions.activeMultiple,
                inActiveMultipleList: dataActions.inMultipleActive,
                listUnSetSeletedData: dataListActions.unSetSeletedData,
                closeActionError: dataListActions.errorClose,
                exportToExcel: dataActions.exportToExcel,
                showGlobalNotification,
                ...additionalDispatchActions,
            },
            dispatch
        ),
    });

    return crudListingBase({
        mapStateToProps,
        dataActions,
        dataListActions,
        moduleName,
        addButtonTitle,
        addButtonIcon,
        tableColumnList: myColumns,
        filterFunction,
        dependentDataLoaders,
        mapDispatchToProps,
        advanceFilter,
        exportData,
    });
};

export { dependentDataLoader, crudListingPage };
