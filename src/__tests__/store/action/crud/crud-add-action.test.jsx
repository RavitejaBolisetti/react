import { addActions, addActionConstants } from '@store/actions/crud/crudAdd';

describe('addActions', () => {
    const prefix = 'TEST_';
    const actionConstants = addActionConstants(prefix);
    const actions = addActions(actionConstants);

    it('success action', () => {
        const message = 'Item added successfully';
        const isFormShown = true;
        const newItemId = 123;

        const action = actions.success(message, isFormShown, newItemId);

        expect(action).toEqual({
            type: actionConstants.SUCCESS,
            message,
            isFormShown,
            newItemId,
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

    it('showForm action', () => {
        const action = actions.showForm();

        expect(action).toEqual({
            type: actionConstants.SHOW_FORM,
        });
    });

    it('hideForm action', () => {
        const action = actions.hideForm();

        expect(action).toEqual({
            type: actionConstants.HIDE_FORM,
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

    it('setFileHash action', () => {
        const fileData = { name: 'file.txt', hash: 'hash123' };

        const action = actions.setFileHash(fileData);

        expect(action).toEqual({
            type: actionConstants.FILE_UPLOAD_SUCCESS,
            fileData,
        });
    });

    it('successClose action', () => {
        const action = actions.successClose();

        expect(action).toEqual({
            type: actionConstants.SUCCESS_CLOSE,
        });
    });

    it('errorClose action', () => {
        const action = actions.errorClose();

        expect(action).toEqual({
            type: actionConstants.ERROR_CLOSE,
        });
    });
});
