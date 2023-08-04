
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import CardProductAttribute from '@components/common/ProductHierarchy/ProductAttribute/CardProductAttribute';
import { act } from 'react-dom/test-utils';


const props = {
    finalFormdata: [],
    attributeForm: {},
    forceUpdate: jest.fn(),
    skuAttributes: [],
    setSKUAttributes: [],
    productHierarchyAttributeData: {},
    setFormBtnActive: true,
    showGlobalNotification: true,
    setDisabledEdit: jest.fn(),
    onAttributeEdit: jest.fn(),
    onAttributeSave: jest.fn(),
    onAttributeCancel: jest.fn(),
    editForm: false,
}

afterEach(cleanup);



describe('CardProductAttribute component', () => {
    it('should render the CardProductAttribute components', () => {
        const { getByRole } = customRender(
            <CardProductAttribute
                isVisible={true}
                {...props}
                formEdit={false}
            />);       

        screen.getByRole('card-product')
    });


    // it('should render the edit button', async () => {
    //     const { getByTestId } = customRender(<CardProductAttribute isVisible={true} {...props} setFormBtnActive={jest.fn()} formEdit={false} onAttributeEdit={jest.fn()} />);
    //     const editbutton = getByTestId("edit-button");
    //     fireEvent.click(editbutton);
    //     expect(editbutton).toBeEnabled();
    // })

    // it('should render the delete button', async () => {
    //     const { getByTestId } = customRender(<CardProductAttribute isVisible={true} {...props} formEdit={false} onAttributeDelete={jest.fn()} setSKUAttributes={jest.fn()}/>);
    //     fireEvent.click(getByTestId("delete-button"));
    // })

    // it("should render the secondary text", () => {
    //     customRender(<CardProductAttribute isVisible={true} {...props} onAttributeDelete={jest.fn()} />);
    //     expect(screen.getAllByTestId("code")).toBeTruthy();
    //     expect(screen.getAllByTestId("secondary")).toBeTruthy();
    // })


    // it('should click cancel', async () => {
    //     customRender(<CardProductAttribute isVisible={true} {...props} formEdit={true} onAttributeCancel={jest.fn()} />);
    //     await act(async () => {
    //         const buttonClick = screen.getAllByTestId('cancel', { name: /Cancel/i });
    //         fireEvent.click(buttonClick);
    //     });
    // });

    // it('should click save', async () => {
    //     const { getByTestId } = customRender(<CardProductAttribute isVisible={true} {...props} formEdit={true}  onAttributeSave={jest.fn()} />);
    //     await act(async () => {
    //         const buttonClick = screen.getAllByTestId('save', { name: /Save/i });
    //         fireEvent.click(buttonClick);
    //     });

    //     screen.getByTestId("button")
    // });
});