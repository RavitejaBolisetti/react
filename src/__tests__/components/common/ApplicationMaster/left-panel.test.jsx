import React from 'react';
import { fireEvent, screen, act, } from "@testing-library/react";
import customRender from "@utils/test-utils";
import LeftPanel from 'components/common/LeftPanel';

const treeData = [ { menuId: 1, menuTitle: 'tree1', subMenu: [{menuId: 2, menuTitle: 'tree2'}] }, { menuId: 3, menuTitle: 'tree3', }, ];
const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Left Panel Component', () => {

    it('should render left panel', async () => {
        customRender(<LeftPanel setSearchValue={jest.fn()} searchValue={"tree2"} isTreeViewVisible={true} treeData={treeData} fieldNames={fieldNames}/>);
        const expandBtn=screen.getByRole('img', { name: 'minus-square' });
        fireEvent.click(expandBtn);
    });
});