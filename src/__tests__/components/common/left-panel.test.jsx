/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, act, } from "@testing-library/react";
import customRender from "@utils/test-utils";import '@testing-library/jest-dom/extend-expect';
import LeftPanel from '@components/common/LeftPanel';

describe('Left Panel Component', () => {
    const treeData = [ { menuId: 1, menuTitle: 'tree1', subMenu: [{menuId: 2, menuTitle: 'tree2'}] }, { menuId: 3, menuTitle: 'tree3', }, ];
    const fieldNames = { title: 'menuTitle', key: 'menuId', children: 'subMenu' };
    
    it('should render left panel', async () => {
        customRender(<LeftPanel setSearchValue={jest.fn()} searchValue={"tree2"} isTreeViewVisible={true} treeData={treeData} fieldNames={fieldNames}/>);
        const parentText=screen.getByText('tree1');
        fireEvent.click(parentText);
        const childText=screen.getByText('tree2');
        fireEvent.click(childText);
    });
});