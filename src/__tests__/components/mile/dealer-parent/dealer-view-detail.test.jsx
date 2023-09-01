import '@testing-library/jest-dom/extend-expect';
import { screen } from "@testing-library/react";
import { ViewDetail } from '@components/Mile/DealerParent/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddEditForm Component Render', ()=>{
    it('render', ()=>{
        customRender(<ViewDetail styles={{}} />);

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
    })
})