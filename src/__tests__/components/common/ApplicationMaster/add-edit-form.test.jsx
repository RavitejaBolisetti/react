import React, { useSate } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { AddEditForm } from "@components/common/ApplicationMaster/AddEditForm";

const finalFormdata ={ applicationDetails: { documentNumRequired: true, accessableIndicator:2 } };

afterEach(() => {
   jest.restoreAllMocks();
});

describe('Add Edit Form Component', () => {

     it('should render Add Edit Form', async () => {
        customRender(<AddEditForm setIsBtnDisabled={jest.fn()} isVisible={true} isFieldDisable={jest.fn()} setparentAppCode={jest.fn()}/>);
     });

     it('cancel button should work', async () => {
      customRender(<AddEditForm onCloseAction={jest.fn()} setIsBtnDisabled={jest.fn()} isVisible={true} isFieldDisable={jest.fn()} setparentAppCode={jest.fn()}/>);
      const cancelButton = screen.getByRole("button", {name: 'Cancel', exact: false});
      fireEvent.click(cancelButton);
     })

     it('application action, document type and accessible dealer location collapse should work', async () => {
      customRender(<AddEditForm finalFormdata={finalFormdata} setIsBtnDisabled={jest.fn()} isVisible={true} isFieldDisable={jest.fn()} setparentAppCode={jest.fn()} />);
      // const appActionCollapse = screen.getByRole("button", {name: /Application Actions/i });
      // fireEvent.click(appActionCollapse);
      // const docTypeCollapse = screen.getByRole("button", {name: 'Document Type *', exact: false});
      // fireEvent.click(docTypeCollapse);
      // const accDealerLocationCollapse = screen.getByRole("button", {name: 'Accessible Dealer Location *', exact: false});
      // fireEvent.click(accDealerLocationCollapse );
     });

    });