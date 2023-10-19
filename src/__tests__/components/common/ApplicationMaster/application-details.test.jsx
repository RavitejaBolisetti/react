import React from 'react';
import { fireEvent, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ApplicationDetails from '@components/common/ApplicationMaster/ApplicationDetails';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Application Details Component', () => {
    it('should render Application Details', async () => {
        customRender(<ApplicationDetails setParentAppCode={jest.fn()} />);
    });

    it('on change application id should work', async () => {
        customRender(<ApplicationDetails setParentAppCode={jest.fn()} setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('textbox', { name: 'Application ID', exact: false });
        await act(async () => {
            fireEvent.change(inputBox, { target: { value: 123 } });
            expect(inputBox.value).toBe('123');
        });
    });

    it('on change document number to be generated should work', async () => {
        customRender(<ApplicationDetails setParentAppCode={jest.fn()} setIsDocumentToGenerate={jest.fn()} setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('switch', { name: 'Document number to be generated', exact: false });
        fireEvent.click(inputBox);
    });

    it('on change accessible location should work', async () => {
        customRender(<ApplicationDetails setParentAppCode={jest.fn()} setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('combobox', { name: 'Accessible Location', exact: false });
        fireEvent.change(inputBox, { target: { value: 1 } });
        waitFor(() => expect(inputBox.value).toHaveValue(1));
    });

    it('on change application type should work', async () => {
        const configurableParamData = [
            { value: '1', label: 'Test1' },
            { value: '2', label: 'Test2' },
        ];
        const criticalityGroupData = [
            { value: '1', label: 'Test1' },
            { value: '2', label: 'Test2' },
        ];
        customRender(<ApplicationDetails criticalityGroupData={criticalityGroupData} configurableParamData={configurableParamData} setParentAppCode={jest.fn()} setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('combobox', { name: 'Application Type', exact: false });
        fireEvent.change(inputBox, { target: { value: 2 } });
        waitFor(() => expect(inputBox.value).toHaveValue(2));

        const inputBox1 = screen.getByRole('combobox', { name: 'Application Criticality Group', exact: false });
        fireEvent.change(inputBox1, { target: { value: 2 } });
        waitFor(() => expect(inputBox.value).toHaveValue(2));
    });

    it('tree select should work', async () => {
        const finalFormdata = {
            applicationDetails: {
                parentApplicationId: 'Web',
            },
        };
        const menuData = [
            { menuId: 1, menuTitle: 'tree1', subMenu: [{ menuId: 2, menuTitle: 'tree2' }] },
            { menuId: 3, menuTitle: 'tree3' },
        ];
        customRender(<ApplicationDetails setCanFormSave={jest.fn()} setParentAppCode={jest.fn()} parentAppCode={'Web'} finalFormdata={finalFormdata} menuData={menuData} isReadOnly={false} />);
        const inputBox = screen.getByRole('combobox', { name: '', exact: false });
        fireEvent.change(inputBox, { target: { value: 'tree3' } });
        const treeSelect = screen.getByText('tree3');
        fireEvent.click(treeSelect);
    });
});
