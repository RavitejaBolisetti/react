import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Geo} from './Geo';

jest.mock('react-redux', () => ({
    connect: () => (Geo) => Geo,
}));

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

const fetchList = () => {};
const hierarchyAttributeFetchList = () => {};

describe("geo component", () => {

    test('renders learn react link',async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('render add child button', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const addChildBtn = screen.getByText('Add Child');
        expect(addChildBtn).toBeInTheDocument();
    });

    test('render form', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const codeInputField = screen.queryByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeNull();
    });

    test('render form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeTruthy();
    });




    // test('render form element', async () => {
    //     render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        
    //     const formText = screen.getByPlaceholderText("Please Enter Code");
    //     expect(formText).toBeUndefined();
    // });




});