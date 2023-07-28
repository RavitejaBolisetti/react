import { editActions, editActionConstants } from '@store/actions/crud/crudEdit';

describe('editActions', () => {
    const prefix = 'TEST_';
    const actionConstants = editActionConstants(prefix);
    const actions = editActions(actionConstants);

    it('success action', () => {
        const message = 'Item edited successfully';
        const isFormShown = true;

        const action = actions.success(message, isFormShown);

        expect(action).toEqual({
            type: actionConstants.SUCCESS,
            message,
            isFormShown,
        });
    });

    it('error action', () => {
        const message = 'Error occurred';

        const action = actions.error(message);

        expect(action).toEqual({
            type: actionConstants.ERROR,
            message,
        });
    });

    it('showLoading action', () => {
        const isLoading = true;

        const action = actions.showLoading(isLoading);

        expect(action).toEqual({
            type: actionConstants.SHOW_LOADING,
            isLoading,
        });
    });

    it('hideForm action', () => {
        const action = actions.hideForm();

        expect(action).toEqual({
            type: actionConstants.HIDE_FORM,
        });
    });

    it('showForm action', () => {
        const id = 123;
        const manageCountryMilestone = true;

        const action = actions.showForm(id, manageCountryMilestone);

        expect(action).toEqual({
            type: actionConstants.SHOW_FORM,
            id,
            manageCountryMilestone,
        });
    });

    it('setFileHash action', () => {
        const fileData = { name: 'file.txt', hash: 'hash123' };

        const action = actions.setFileHash(fileData);

        expect(action).toEqual({
            type: actionConstants.FILE_UPLOAD_SUCCESS,
            fileData,
        });
    });

    it('errorClose action', () => {
        const action = actions.errorClose();

        expect(action).toEqual({
            type: actionConstants.ERROR_CLOSE,
        });
    });
});
