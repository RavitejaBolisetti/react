import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/TermsAndConditions/ManufacturerTermCondition/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Term Condition Manufacturer addedit components', () => {
    const props = { formActionType: { isViewModeVisible: true } };
    it('should render AddEdit component', () => {
        customRender(<AddEditForm {...props} isVisible={true} setButtonData={jest.fn()} />);

        const closeImg = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeImg);

        const calenderImg = screen.getAllByRole('img', { name: 'calendar' });
        fireEvent.click(calenderImg[0]);

        fireEvent.click(calenderImg[1]);
    });

    it('should render all fields', async () => {
        const languageList = [{ key: 106, value: 'Kai' }];
        const productHierarchyList = [{ key: 106, value: 'Kai' }];
        const documentTypeList = [{ key: 106, value: 'Kai' }];
        customRender(<AddEditForm {...props} languageList={languageList} productHierarchyList={productHierarchyList} documentTypeList={documentTypeList} isVisible={true} setButtonData={jest.fn()} handleFromDateChange={jest.fn()} setStartDate={jest.fn()} />);

        const documentCatagory = screen.getByRole('textbox', { name: 'Document Category' });
        fireEvent.change(documentCatagory, { target: { value: 'front tyre' } });

        const effectiveFrom = screen.getByRole('textbox', { name: 'Effective From' });

        fireEvent.click(effectiveFrom);

        const todayForFromDate = await screen.findByText('Today');

        fireEvent.click(todayForFromDate);

        const effectiveTo = screen.getByRole('textbox', { name: 'Effective To' });
        fireEvent.change(effectiveTo, { target: { value: 'front tyre' } });

        const productHierarchy = screen.getByRole('combobox', { name: 'Product Hierarchy' });
        fireEvent.change(productHierarchy, { target: { value: 'front tyre' } });

        const documentType = screen.getByRole('combobox', { name: 'Document Type' });
        fireEvent.change(documentType, { target: { value: 'front tyre' } });

        const language = screen.getByRole('combobox', { name: 'Language' });
        fireEvent.change(language, { target: { value: 'front tyre' } });
    });

    it('should render AddEdit component when true', () => {
        const props = { formActionType: { editMode: true } };

        customRender(<AddEditForm {...props} isVisible={true} setButtonData={jest.fn()} setStartDate={jest.fn()} />);
    });

    it('should render view component when true', () => {
        const props = { formActionType: { viewMode: true } };

        customRender(<AddEditForm {...props} isVisible={true} setButtonData={jest.fn()} />);
    });
});
