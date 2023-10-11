/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';
// import styles from 'components/crud/crudListingPage/crudMasterPage.module.css';
import { DisableItemComponent } from 'utils/disableItemComponent';
import { showGlobalNotification } from 'store/actions/notification';

export const crudMasterPage = ({ ListingPage, AddPage, EditPage, ViewPage, advanceFilter, AdvanceFilter, addAction, editAction, listAction, additionalActions = {}, mapStateToProps, enableView, canViewRight, canEditRight }) => {
    const mapDispatchToProps = {
        onAddAction: addAction.showForm,
        onAddCloseAction: addAction.hideForm,
        onEditAction: editAction.showForm,
        onEditCloseAction: editAction.hideForm,
        setFilterString: listAction.setFilterString,
        onFilterCloseAction: listAction.showAdvanceFilter,
        showGlobalNotification,
        ...additionalActions,
    };

    const MasterPage = (props) => {
        const { showAdvanceFilter, onAddAction, onAddCloseAction, isAddFormVisible, isEditFormVisible, onEditCloseAction, onFilterCloseAction, onEditAction, isViewModalVisible, onViewCloseAction, setFilterString } = props;

        const canViewMaster = true;
        const canAddMaster = true;
        const canEditMaster = true;

        return (
            <>
                {canViewMaster ? (
                    <>
                        <div className={'crudMasterPage'}>
                            <ListingPage onAddAction={onAddAction} onEditAction={onEditAction} canViewMaster={canViewMaster} canAddMaster={canAddMaster} canEditMaster={canEditMaster} {...props} />
                        </div>
                        {canAddMaster || canEditMaster ? <AddPage onCloseAction={onAddCloseAction} isVisible={isAddFormVisible} {...props} /> : <DisableItemComponent />}
                        {canEditMaster ? <EditPage onCloseAction={onEditCloseAction} isVisible={isEditFormVisible} {...props} /> : <DisableItemComponent />}
                        {enableView && <ViewPage onCloseAction={onViewCloseAction} isVisible={isViewModalVisible} {...props} />}
                        {advanceFilter && <AdvanceFilter onCloseAction={() => onFilterCloseAction(false)} isVisible={showAdvanceFilter} setFilterString={setFilterString} {...props} />}
                    </>
                ) : (
                    <DisableItemComponent />
                )}
            </>
        );
    };
    const withMasterPage = connect(mapStateToProps, mapDispatchToProps)(MasterPage);
    return withMasterPage;
};
