import { viewActions, viewActionConstants } from '@store/actions/crud/crudView';

describe('viewActions', () => {
    test('should create a showModal action with the correct type and payload', () => {
        const id = 123;
        const expectedAction = {
            type: viewActionConstants.SHOW_MODAL,
            id,
        };

        const action = viewActions(viewActionConstants).showModal(id);

        expect(action).toEqual(expectedAction);
    });

    test('should create a hideModal action with the correct type', () => {
        const expectedAction = {
            type: viewActionConstants.HIDE_MODAL,
        };

        const action = viewActions(viewActionConstants).hideModal();

        expect(action).toEqual(expectedAction);
    });
});

describe('viewActionConstants', () => {
    test('should create the action constants with the correct prefix', () => {
        const prefix = 'PREFIX_';
        const expectedConstants = {
            SHOW_MODAL: 'PREFIX_VIEW_SHOW_MODAL',
            HIDE_MODAL: 'PREFIX_VIEW_HIDE_MODAL',
        };

        const constants = viewActionConstants(prefix);

        expect(constants).toEqual(expectedConstants);
    });
});
