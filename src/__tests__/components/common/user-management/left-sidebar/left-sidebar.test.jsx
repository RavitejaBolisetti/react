import React from 'react';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from "@testing-library/react";
import { LeftSidebar } from 'components/common/UserManagement/LeftSidebar';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Left Side Bar Component', () => {

    it('should render left sidebar component UI', () => {
        const formActionType={ addMode: true, }
        customRender(<LeftSidebar formActionType={formActionType} currentSection={'Kai'} />);
    });

    it('assign user roles button should work', () => {
        const formActionType={ addMode: true, editMode: true, }
        customRender(<LeftSidebar formActionType={formActionType} setPreviousSection={jest.fn()} currentSection={'Test'} previousSection={'Kai'} setCurrentSection={jest.fn()} />);

        const assignUserRoles=screen.getByText('Assign User Roles');
        fireEvent.click(assignUserRoles);
    });

});