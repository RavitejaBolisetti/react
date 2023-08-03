/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeftPanel from '@components/common/LeftPanel';
import userEvent from '@testing-library/user-event';
const treeData =[
    {
        shortDescription: 'parent 1',
        id: 'parent 1',
        children: [
            {
                shortDescription: 'asian',
                id: 'AS',

                children: [
                    {
                        shortDescription: 'India',
                        id: 'IND',
                    },
                    {
                        title: 'node2',
                        key: 'node2',

                        children: [
                            {
                                title: 'randomNode_2',
                                key: 'randomNode_2',

                                children: [
                                    {
                                        title: 'node2',
                                        key: 'node2',

                                        children: [
                                            {
                                                title: 'randomNode_3',
                                                key: 'randomNode_3',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        shortDescription: 'topNode',
        id: 'topNode',
        children: [
            {
                title: 'node1',
                key: 'node1',

                children: [
                    {
                        title: 'randomNode_1',
                        key: 'randomNode_1',
                    },
                    {
                        title: 'node2',
                        key: 'node2',

                        children: [
                            {
                                title: 'randomNode_2',
                                key: 'randomNode_2',

                                children: [
                                    {
                                        title: 'node2',
                                        key: 'node2',

                                        children: [
                                            {
                                                title: 'randomNode_3',
                                                key: 'randomNode_3',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
describe('LeftPanel', () => {
  it('renders panelVisible when isTreeViewVisible is true', () => {
    const container = render(<LeftPanel isTreeViewVisible={true} isOpenInModal={true}  searchValue="Finac" setSearchValue={jest.fn()} setExpandedKeys={jest.fn()} onExpand={jest.fn()} autoExpandParent={true} setAutoExpandParent={true} />);
    const component = document.querySelector('.treeViewContainer');
    expect(component).toHaveClass('treeViewContainer');
  });

  it('shows tree nodes with matching search value in red', () => {
    const {container  } = render(<LeftPanel isTreeViewVisible={true} treeData={treeData} searchValue="Finac" setSearchValue={jest.fn()} isOpenInModal={true} setExpandedKeys={jest.fn()} onExpand={jest.fn()} autoExpandParent={false}  setAutoExpandParent={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});