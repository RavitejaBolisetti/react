import { Menu } from '@store/reducers/data/menu';

describe('Menu reducer', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        flatternData: [],
        favouriteMenu: [],
        filter: undefined,
        isLoading: false,
    };

    const sampleData = [
        {
            menuId: 'HOM',
            menuTitle: 'Home',
            parentMenuId: 'Web',
            menuIconUrl: '',
            isFavourite: '',
            accessType: 'R',
            displayOrder: 0,
            subMenu: [],
        },
    ];

    it('should handle MENU_DATA_LOADED action', () => {
        const action = {
            type: 'MENU_DATA_LOADED',
            isLoaded: true,
            data: sampleData,
        };

        const newState = Menu(initialState, action);

        expect(newState.isLoaded).toEqual(true);
    });

    it('should handle MENU_DATA_FILTER action', () => {
        const action = {
            type: 'MENU_DATA_FILTER',
            filter: 'some filter value',
        };

        const newState = Menu(initialState, action);

        expect(newState.filter).toEqual('some filter value');
    });

    it('should handle MENU_DATA_SHOW_LOADING action', () => {
        const action = {
            type: 'MENU_DATA_SHOW_LOADING',
            isLoading: true,
        };

        const newState = Menu(initialState, action);

        expect(newState.isLoading).toEqual(true);
    });

    it('should handle MENU_DATA_CLEAR action', () => {
        // Set the state to something different from the initial state
        const currentState = {
            isLoaded: true,
            data: sampleData,
            flatternData: [],
            favouriteMenu: [],
            filter: 'some filter value',
            isLoading: true,
        };

        const action = {
            type: 'MENU_DATA_CLEAR',
        };

        const newState = Menu(currentState, action);

        expect(newState).toEqual(initialState);
    });

    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: sampleData,
            flatternData: [],
            favouriteMenu: [],
            filter: 'some filter value',
            isLoading: true,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = Menu(currentState, action);

        expect(newState).toEqual(currentState);
    });
});
