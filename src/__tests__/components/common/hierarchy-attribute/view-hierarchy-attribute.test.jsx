import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewHierarchyAttribute } from 'components/common/HierarchyAttribute/ViewHierarchyAttribute';

describe('View Hierarchy Attribute Component', () => {

    it('should render view hierarchy attribute component', async () => {
        customRender(<ViewHierarchyAttribute />);
    });

});