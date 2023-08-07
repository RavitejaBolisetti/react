import React from 'react';
import { fireEvent, screen, act, } from "@testing-library/react";
import customRender from "@utils/test-utils";
import createMockStore from '__mocks__/store';
import LeftPanel from 'components/common/LeftPanel';

const treeData = [ { menuId: 1, menuTitle: 'tree1', subMenu: [{menuId: 2, menuTitle: 'tree2'}] }, { menuId: 3, menuTitle: 'tree3', }, ];
const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };

describe('Left Panel Component', () => {

    it('should render left panel', async () => {
        customRender(<LeftPanel setSearchValue={jest.fn()} searchValue={"tree2"} isTreeViewVisible={true} treeData={treeData} fieldNames={fieldNames}/>);
        const parentText=screen.getByText('tree1');
        fireEvent.click(parentText);
        const childText=screen.getByText('tree2');
        fireEvent.click(childText);
    });
});