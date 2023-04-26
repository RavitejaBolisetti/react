import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { geoTreeData as treeDatas} from './Common/Data/data';
import  { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import {fetchList,saveData,hierarchyAttributeFetchList,listShowLoading} from './Common/CommonImports/commonImports';
import { Geo } from '../Geo';


jest.mock('react-redux', () => ({
    connect: () => (Geo) => Geo,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };                                       

describe('geo component', () => {
        test('Geographical Heirarchy Page render ', async () => {
        render(<Geo fetchList={fetchList} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
            screentext('Hierarchy');
        });

        test('Geographical Heirarchy Chnage History Button render ', async () => {
            render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} geoData={treeDatas}/>);
            findbuttonAndClick('Change History')
        });
        test('Is Geographical Hierarchy search working', async () => {
            render(<Geo hierarhyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
            searchIsWorking();
        });
        test('Is the Geographical search Field Present or not', async () => {
            render(<Geo fetchList={fetchList} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);
            searchFieldTest();
          
        });
        test('render Geographical Hierarchy form', async () => {
            render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading}/>);
           
            findplaceholder('Please select attribute level')
        });
        test('render Geographical hierarchy details element',async() => {
            render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} geoData={treeDatas} />);
            
            commonTreeTest();
    
        })
        test('render Geographical hierarchy form element',async() => {
            render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} geoData={treeDatas} />);
            treebranchClickAndTextFinder('Attribute Level');
    
        })
        test('render Geographical hierarchy form element on edit button',async() => {
             render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} geoData={treeDatas} />);
            commonDrawer();
        })
        test('close drawer on click of cancel button',async() => {
            render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} onCloseAction={true} geoData={treeDatas} />);
            const treeBranch =  await screen.findByText('parent 1');
            expect(treeBranch).toBeInTheDocument();
            fireEvent.click(treeBranch);
            const attributeText = await screen.findByText('Attribute Level');
            expect(attributeText).toBeInTheDocument();
            const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
            expect(addiblingBtn).toBeInTheDocument();
            fireEvent.click(addiblingBtn);
            const cancelBtn = await screen.getByText('Cancel');
            expect(cancelBtn).toBeTruthy();
            fireEvent.click(cancelBtn);
            const saveBtn = await screen.queryByText('Save');
            expect(saveBtn).toBeFalsy();
        })
        test('render Geographical Hierarchy tree view and click branch to add child after selecting parent', async () => {
            render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} geoData={treeDatas} />);
            const treeBranch = screen.queryByText('parent 1');
            expect(treeBranch).toBeTruthy();
            userEvent.click(treeBranch);
            const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
            expect(addiblingBtn).toBeInTheDocument();
            const editBtn = screen.queryByRole('button', { name: 'Edit' });
            expect(editBtn).toBeInTheDocument();
        });
   
});
