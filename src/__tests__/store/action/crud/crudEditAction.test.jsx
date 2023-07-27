import { editActions, editActionConstants } from '@store/actions/crud/crudEdit';

describe('editActions', () => {
    const prefix = 'TEST_';
    const actionConstants = editActionConstants(prefix);
    const actions = editActions(actionConstants);

    test('success action', () => {
        const message = 'Item edited successfully';
        const isFormShown = true;

        const action = actions.success(message, isFormShown);

        expect(action).toEqual({
            type: actionConstants.SUCCESS,
            message,
            isFormShown,
        });
    });

    test('error action', () => {
        const message = 'Error occurred';

        const action = actions.error(message);

        expect(action).toEqual({
            type: actionConstants.ERROR,
            message,
        });
    });

    test('showLoading action', () => {
        const isLoading = true;

        const action = actions.showLoading(isLoading);

        expect(action).toEqual({
            type: actionConstants.SHOW_LOADING,
            isLoading,
        });
    });

    test('hideForm action', () => {
        const action = actions.hideForm();

        expect(action).toEqual({
            type: actionConstants.HIDE_FORM,
        });
    });

    test('showForm action', () => {
        const id = 123;
        const manageCountryMilestone = true;

        const action = actions.showForm(id, manageCountryMilestone);

        expect(action).toEqual({
            type: actionConstants.SHOW_FORM,
            id,
            manageCountryMilestone,
        });
    });

    test('setFileHash action', () => {
        const fileData = { name: 'file.txt', hash: 'hash123' };

        const action = actions.setFileHash(fileData);

        expect(action).toEqual({
            type: actionConstants.FILE_UPLOAD_SUCCESS,
            fileData,
        });
    });

    test('errorClose action', () => {
        const action = actions.errorClose();

        expect(action).toEqual({
            type: actionConstants.ERROR_CLOSE,
        });
    });
});
