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
