import { crudEditPage } from 'components/crud/crudEditPage';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { editStateActions } from 'store/actions/common/Geo/State/EditState';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        common: {
            Geo: {
                State: {
                    EditState: { isLoading, isError, isVisible, id, message = '', isUpdated },
                },
            },
        },
        data: {
            Geo: {
                State: { data: stateData = [] },
            },
        },
    } = state;

    let returnValue = {
        isLoading,
        isError,
        isVisible,
        isUpdated,
        message,
    };

    if (isVisible) {
        const stateDetail = stateData.find((item) => item.code === id);
        returnValue = { ...returnValue, data: stateDetail };
    }

    return returnValue;
};

export const EditState = crudEditPage({
    mapStateToProps: mapStateToProps,
    dataActions: geoStateDataActions,
    editAction: editStateActions,
    name: 'Edit_State_Form',
    title: 'Edit State',
    AddEditForm: AddEditForm,
    showGlobalNotification,
});
