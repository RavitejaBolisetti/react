import React from 'react';
import customRender from '@utils/test-utils';
import { ViewDetail } from '@components/common/CustomerMaster/CorporateCustomer/Contact/ViewContactDetails';
import { screen, fireEvent } from '@testing-library/react';


beforeEach(() => {
    jest.clearAllMocks()
})

const props ={
    styles: jest.fn(),
    isLoading: true
}

describe('View contact details', () => {
    it('should render view contact details', async () => {
        customRender(<ViewDetail isVisible={true} {...props} />)

        const purposeContact = screen.getByRole('columnheader', { name: 'Purpose of Contact', exact: false });
        expect(purposeContact).toBeTruthy();

        const mobileNo = screen.getByRole('columnheader', { name: 'Mobile Number', exact: false });
        expect(mobileNo).toBeTruthy();

        const alternateMobileNo = screen.getByRole('columnheader', { name: 'Alternate Mobile Numbe', exact: false });
        expect(alternateMobileNo).toBeTruthy();

        const relation = screen.getByRole('columnheader', { name: 'Relation', exact: false });
        expect(relation).toBeTruthy();

        const gender = screen.getByRole('columnheader', { name: 'Gender', exact: false });
        expect(gender).toBeTruthy();

        const title = screen.getByRole('columnheader', { name: 'Title', exact: false });
        expect(title).toBeTruthy();

        const fName = screen.getByRole('columnheader', { name: 'First Name', exact: false });
        expect(fName).toBeTruthy();

        const mName = screen.getByRole('columnheader', { name: 'Middle Name', exact: false });
        expect(mName).toBeTruthy();

        const lName = screen.getByRole('columnheader', { name: 'Last/Surname', exact: false });
        expect(lName).toBeTruthy();

        const email = screen.getByRole('columnheader', { name: 'E-mail', exact: false });
        expect(email).toBeTruthy();

        const alternateEmail = screen.getByRole('columnheader', { name: 'Alternate Email ID', exact: false });
        expect(alternateEmail).toBeTruthy();

        const facbookLink = screen.getByRole('columnheader', { name: 'Facebook Link', exact: false });
        expect(facbookLink).toBeTruthy();

        const twitterLink = screen.getByRole('columnheader', { name: 'Twitter Link', exact: false });
        expect(twitterLink).toBeTruthy();

        const instagramLink = screen.getByRole('columnheader', { name: 'Instagram Link', exact: false });
        expect(instagramLink).toBeTruthy();

        const youtubeChannel = screen.getByRole('columnheader', { name: 'Youtube Channel', exact: false });
        expect(youtubeChannel).toBeTruthy();

        const teamBhp = screen.getByRole('columnheader', { name: 'Team BHP Link', exact: false });
        expect(teamBhp).toBeTruthy();

        const markAsDefault = screen.getByRole('columnheader', { name: 'Mark As Default', exact: false });
        expect(markAsDefault).toBeTruthy();

        const edit = screen.getByRole('button', { name: 'Edit', exact: false });
        fireEvent.click(edit);

        const deleteBut = screen.getByRole('button', { name: 'Delete', exact: false });
        fireEvent.click(deleteBut);

    });
});
