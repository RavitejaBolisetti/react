/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { MENU_DATA_LOADED, MENU_DATA_FILTER, MENU_DATA_SHOW_LOADING, MENU_DATA_CLEAR } from 'store/actions/data/menu';
import { MenuConstant } from 'constants/MenuConstant';

const initialState = {
    isLoaded: false,
    data: [],
    flatternData: [],
    favouriteMenu: [],
    filter: undefined,
    isLoading: false,
};

const favouriteMenuData = (data) => data?.find((item) => item.menuId === 'FAV')?.subMenu;
const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

export const Menu = (state = initialState, action) => {
    switch (action.type) {
        case MENU_DATA_LOADED: {
            const dataList = [];
            const generateList = (data) => {
                for (let node of data) {
                    dataList.push({
                        ...node,
                        id: node[fieldNames?.key],
                        title: node[fieldNames?.title],
                        link: MenuConstant?.[node[fieldNames?.key]?.toLowerCase()]?.link,
                        slug: MenuConstant?.[node[fieldNames?.key]?.toLowerCase()]?.slug,
                        childExist: node[fieldNames?.children]?.length > 0,
                    });
                    if (node[fieldNames?.children]) {
                        generateList(node[fieldNames?.children]);
                    }
                }
            };

            action.data && generateList(action.data);
            return { ...state, isLoaded: action.isLoaded, data: refactorMenu(action.data), flatternData: dataList, favouriteMenu: favouriteMenuData(action.data) };
        }
        case MENU_DATA_FILTER:
            return { ...state, filter: action.filter };
        case MENU_DATA_SHOW_LOADING:
            return { ...state, isLoading: action.isLoading };
        case MENU_DATA_CLEAR:
            return { ...initialState };
        default:
            return { ...state };
    }
};

const homeMenu = [
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

const refactorMenu = (menu) => {
    return [...homeMenu, ...menu];
};
