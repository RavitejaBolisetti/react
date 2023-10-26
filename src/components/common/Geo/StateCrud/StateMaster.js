/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { AddState } from './AddState';
import { EditState } from './EditState';
import { ListState } from './ListState';
import { AdvanceFilterState } from './AdvanceFilterState';
import { addStateActions } from 'store/actions/common/Geo/State/AddState';
import { editStateActions } from 'store/actions/common/Geo/State/EditState';
import { listStateActions } from 'store/actions/common/Geo/State/ListState';
import { crudMasterPage } from 'components/crud/crudMasterPage';
import { injectAuthRoleRights } from 'utils/injectAuthRoleRights';

const mapStateToProps = (state) => {
    const {
        common: {
            Geo: {
                State: {
                    AddState: { isVisible: isAddFormVisible },
                    EditState: { isVisible: isEditFormVisible },
                    ListState: { showAdvanceFilter },
                },
            },
        },
    } = state;

    return injectAuthRoleRights(state, {
        isAddFormVisible,
        isEditFormVisible,
        showAdvanceFilter,
    });
};

export const StateMaster = crudMasterPage({
    ListingPage: ListState,
    AddPage: AddState,
    EditPage: EditState,
    AdvanceFilter: AdvanceFilterState,
    listAction: listStateActions,
    addAction: addStateActions,
    editAction: editStateActions,
    mapStateToProps: mapStateToProps,
    advanceFilter: true,
});
