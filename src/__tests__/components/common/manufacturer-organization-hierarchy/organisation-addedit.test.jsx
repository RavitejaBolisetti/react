import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from 'components/common/ManufacturerOrganizationHierarchy/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const fieldNames = { title: 'Kai', key: 106 };

describe('Manufacturer Org Hierarchy Addedit Detail components', () => {
    it('should render ManufacturerOrgHierarchy components', () => {
        customRender(<AddEditForm isVisible={true} fieldNames={fieldNames} setSelectedTreeSelectKey={jest.fn()} />);
    });

    it('test for attribute data', () => {
        const attributeData = [{ id: 106 }];
        const formData = { attributeKey: 106 };
        customRender(<AddEditForm isVisible={true} attributeData={attributeData} formData={formData} fieldNames={fieldNames} setSelectedTreeSelectKey={jest.fn()} />);
    });

    it('test for unfiltered data', () => {
        const formData = { attributeKey: 106 };
        const unFilteredAttributeData = [{ id: 106 }];
        customRender(<AddEditForm isVisible={true} unFilteredAttributeData={unFilteredAttributeData} formData={formData} fieldNames={fieldNames} setSelectedTreeSelectKey={jest.fn()} />);
    });
});
