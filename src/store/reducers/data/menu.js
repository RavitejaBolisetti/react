import { MENU_DATA_LOADED, MENU_DATA_FILTER, MENU_DATA_SHOW_LOADING } from 'store/actions/data/menu';

const initialState = {
    isLoaded: false,
    data: [],
    flatternData: [],
    favouriteMenu: [],
    filter: undefined,
    isLoading: false,
};

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { subMenu, ...rest } = node;
        node &&
            dataList.push({
                ...rest,
            });
        if (node.subMenu) {
            generateList(node.subMenu);
        }
    }
    return dataList;
};

const favouriteMenuData = (data) => data?.find((item) => item.menuId === 'FAV')?.subMenu;

export const Menu = (state = initialState, action) => {
    switch (action.type) {
        case MENU_DATA_LOADED:
            return { ...state, isLoaded: action.isLoaded, data: refactorMenu(action.data), flatternData: generateList(action.data), favouriteMenu: favouriteMenuData(action.data) };
        case MENU_DATA_FILTER:
            return { ...state, filter: action.filter };
        case MENU_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        default:
            return { ...state };
    }
};

const homeMenu = {
    menuId: 'HOM',
    menuTitle: 'Home',
    parentMenuId: 'Web',
    menuIconUrl: '',
    isFavourite: '',
    accessType: 'R',
    displayOrder: 0,
    subMenu: [],
};

const refactorMenu = (menu) => menu;
