import '@testing-library/jest-dom/extend-expect';
import { DealerParent } from '@components/Mile/DealerParent/DealerParent';
import { fireEvent, render, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { tableColumn } from 'components/Mile/DealerParent/tableColumn';
import { DataTable } from 'utils/dataTable';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumnActions } from 'utils/tableColumnActions';
import { tblActionColumn } from 'utils/tableColumn';
import { AddEditForm } from 'components/Mile/DealerParent/AddEditForm';

const FormWrapper = (props) => {
    const [listFilterForm] = Form.useForm();

    const myFormMock = {
        ...listFilterForm,
        resetFi:jest.fn(),
        validateFields:jest.fn()
    }
    return (<DealerParent listFilterForm={myFormMock} {...props} />);
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('DealerParent Component Render', () => {
    it('should render table header', () => {
        customRender(<DealerParent />);

        const srl = screen.getByRole('columnheader', {name:'Srl.'});
        expect(srl).toBeTruthy();

        const groupCode = screen.getByRole('columnheader', {name:'Group Code'});
        expect(groupCode).toBeTruthy();

        const groupName = screen.getByRole('columnheader', {name:'Group Name'});
        expect(groupName).toBeTruthy();

        const title = screen.getByRole('columnheader', {name:'Title'});
        expect(title).toBeTruthy();

        const ownerName = screen.getByRole('columnheader', {name:'Owner Name'});
        expect(ownerName).toBeTruthy();

        const contactNumber = screen.getByRole('columnheader', {name:'Contact Number'});
        expect(contactNumber).toBeTruthy();

        const emailID = screen.getByRole('columnheader', {name:'Email ID'});
        expect(emailID).toBeTruthy();

        const status = screen.getByRole('columnheader', {name:'Status'});
        expect(status).toBeTruthy();

        const action = screen.getByRole('columnheader', {name:'Action'});
        expect(action).toBeTruthy();

        const prePage = screen.getByRole('listitem', {name:'Previous Page'});
        expect(prePage).toBeTruthy();
        fireEvent.click(prePage);

        const nextPage = screen.getByRole('listitem', {name:'Next Page'});
        expect(prePage).toBeTruthy();
        fireEvent.click(nextPage);
    });

    it('should render search icon', ()=>{
        customRender(<FormWrapper onSearchHandle={jest.fn()} setFilterString={jest.fn()} handleClearInSearch={jest.fn()}  setShowDataLoading={jest.fn()} />);

        const groupNameTextBox = screen.getByRole('textbox', {name:'Group Name'});
        fireEvent.change(groupNameTextBox, {target: {value:'test'}});

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    })

    it('pass filterDataItem array', ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                DealerHierarchy: {
                    DealerParent: {
                        isDataLoaded: true,
                        data:[{name:"MAHINDRA LTD"},{name:"test"}],
                    }
                }
            },
        });
        
        customRender(
            <Provider store={mockStore}>
                <DealerParent userId={'123'} onSearchHandle={jest.fn()} setFilterString={jest.fn()} handleClearInSearch={jest.fn()}  setShowDataLoading={jest.fn()} filterFunction={jest.fn()} />
            </Provider>
        );

        const groupNameTextBox = screen.getByRole('textbox', {name:'Group Name'});
        fireEvent.change(groupNameTextBox, {target: {value:'test'}});

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        const filterDataItem = [{name:'test'}];
        const setSearchdata = jest.fn();
        setSearchdata(filterDataItem);
    })

    it('should render close-circle icon', ()=>{
        customRender(<FormWrapper onSearchHandle={jest.fn()} setFilterString={jest.fn()} handleClearInSearch={jest.fn()}  setShowDataLoading={jest.fn()} />);

        const groupNameTextBox = screen.getByRole('textbox', {name:'Group Name'});
        fireEvent.change(groupNameTextBox, {target: {value:'test'}});

        const closeIcon = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(closeIcon);
    })

    it("should renderwhen isDataLoaded is false ", () => {
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                DealerHierarchy: {
                    DealerParent: {
                        isDataLoaded: false,
                    }
                }
            },
        });
        customRender(
        <Provider store={mockStore}>
            <DealerParent fetchList={jest.fn()} />
        </Provider>
        );
    });
});
