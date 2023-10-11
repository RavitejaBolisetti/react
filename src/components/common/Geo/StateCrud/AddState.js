/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { addStateActions } from 'store/actions/common/Geo/State/AddState';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { crudAddPage } from 'components/crud/crudAddPage';

const mapStateToProps = (state) => {
    const {
        common: {
            Geo: {
                State: {
                    AddState: { isLoading, isError, isAdded, isVisible, message = '' },
                },
            },
        },
    } = state;

    return {
        isLoading,
        isError,
        isAdded,
        isVisible,
        message,
    };
};

export const AddState = crudAddPage({
    dataActions: geoStateDataActions,
    addActions: addStateActions,
    mapStateToProps: mapStateToProps,
    AddEditForm,
    name: 'Add_State_Form',
    title: 'Add State',
    showGlobalNotification,
});
