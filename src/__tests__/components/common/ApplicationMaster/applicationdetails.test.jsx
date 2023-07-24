import React from "react";
import { fireEvent, logRoles, render, screen, act, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import  ApplicationDetails from '@components/common/ApplicationMaster/ApplicationDetails';

describe('Application Details Component', () => {

    it('should render Application Details', async () => {
        customRender(<ApplicationDetails setparentAppCode={jest.fn()} />);
    });
    
    it('on change application id should work', async () => {
        customRender(<ApplicationDetails setparentAppCode={jest.fn()} setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('textbox', { name: 'Application ID', exact: false});
        await act(async () => {
            fireEvent.change(inputBox, { target: { value: 123 } });
            expect(inputBox.value).toBe("123");
        });
    });

    it('on change document number to be generated should work', async () => {
        customRender(<ApplicationDetails setparentAppCode={jest.fn()} setIsDocumentToGenerate={jest.fn()} setCanFormSave={jest.fn()}  />);
        const inputBox = screen.getByRole('switch', { name: 'Document number to be generated', exact: false});
        fireEvent.click(inputBox)
    });

    it('on change accessible location should work', async () => {
        customRender(<ApplicationDetails setparentAppCode={jest.fn()} setCanFormSave={jest.fn()}  />);
        const inputBox = screen.getByRole('combobox', { name: 'Accessible Location', exact: false});
        fireEvent.change(inputBox, { target: { value: 1 } });
        waitFor(() => expect(inputBox.value).toHaveValue(1));
    });

    it('tree select field should work', async () => {

        const finalFormdata={
            applicationDetails:{
                parentApplicationId:"Test"
            }
        }

        const treeSelectFieldProps = {
            treeDisabled: false,
            selectedTreeSelectKey: "Web",
        };
        customRender(<ApplicationDetails finalFormdata={finalFormdata} setparentAppCode={jest.fn()} setCanFormSave={jest.fn()} treeSelectFieldProps={treeSelectFieldProps}/>);
        const inputBox = screen.getByRole('combobox', { name: '', exact: false});
        fireEvent.change(inputBox, { target: { value: "Web" } });
        expect(inputBox.value).toBe("Web");
    });

    it('on change application type should work', async () => {
        const configurableParamData = [
            { value: '1', label: 'Test1'},
            { value: '2', label: 'Test2'},
        ];
        const criticalityGroupData = [
            { value: '1', label: 'Test1'},
            { value: '2', label: 'Test2'},
        ]
        customRender(<ApplicationDetails criticalityGroupData={criticalityGroupData} configurableParamData={configurableParamData} setparentAppCode={jest.fn()} setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('combobox', { name: 'Application Type', exact: false});
        fireEvent.change(inputBox, { target: { value: 2 } });
        waitFor(() =>expect(inputBox.value).toHaveValue(2));

        const inputBox1 = screen.getByRole('combobox', { name: 'Application Criticality Group', exact: false});
        fireEvent.change(inputBox1, { target: { value: 2 } });
        waitFor(() =>expect(inputBox.value).toHaveValue(2));
    });

});