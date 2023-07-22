import React, { useSate } from "react";
import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import { AddEditForm } from "@components/common/ApplicationMaster/AddEditForm";

const formProp = { isReadOnly: false, isVisible: true, isFieldDisable: true, applicationForm: { "_init": true, "__INTERNAL__": {} }, finalFormdata: { "applicationDetails": { "id": "ad1ef86f-cb9e-4cb4-a94c-7042f13a512f", "applicationId": "Aman", "parentApplicationId": "CRM", "applicationName": "Aman", "applicationType": "Group", "applicationTitle": "Aman", "documentNumRequired": true, "status": true, "nodeType": " ", "criticalityGroupName": "WE0002", "criticalityGroupMasterId": "593a0fd8-1d50-49db-81f6-c9c04bdd2108", "accessableIndicator": 0, "deviceType": "W" }, "applicationAction": [ { "id": "b0b89e5d-bc08-488b-8a4c-a792718ae24d", "actionMasterId": "f8c69de6-7a91-4d3e-bf75-f4cf51699b73", "actionName": "create", "status": true, "actionId": "C01" } ], "documentType": [ { "id": "fe00ac62-d377-4ee7-8d7b-cc576fd5f4d7", "documentTypeCode": "DOC", "digitalSignatureRequired": true, "documentTypeDescription": "DOC", "termAndConRequired": true } ], "accessibleLocation": [] }, criticalityGroupData: [ { "criticalityGroupCode": "CODE11", "criticalityGroupName": "CODE11", "activeIndicator": false, "criticalityDefaultGroup": false, "id": "53c84350-d3ff-425f-a735-2b3e221c13d4", "allowedTimings": [ { "id": "c5235853-44ac-4912-8e8c-ac7d7c3e5d03", "isDeleted": "N", "timeSlotFrom": "10:11", "timeSlotTo": "11:11" } ] } ], actions: [ { "actionName": "insert", "id": "a3b55576-380b-4f09-9b61-632e813f396a", "actionId": "I01", "status": true }, { "actionName": "update", "id": "d0c9ddde-e722-4d65-b06f-79350b5363bd", "actionId": "U01", "status": true }, { "actionName": "create", "id": "f8c69de6-7a91-4d3e-bf75-f4cf51699b73", "actionId": "C01", "status": false }, { "actionName": "view", "id": "e34eda20-d186-4c54-9647-187306095d2e", "actionId": "V01", "status": true }, { "actionName": "delete", "id": "a3d27fef-c2d8-449f-956c-ab75eb12716d", "actionId": "D01", "status": false } ], menuData: { "menuId": "CRM", "menuTitle": "CRM", "parentMenuId": "Web", "menuIconUrl": "icon", "isFavourite": "0", "accessType": "R", "displayOrder": 1, "deviceType": "W", "action": [ { "applicationActionId": "b11582e8-7103-4192-a181-a334d76c0785", "actionMasterId": "e34eda20-d186-4c54-9647-187306095d2e", "actionName": "view", "actionId": "V01", "status": true } ], "subMenu": [ { "menuId": "Aman", "menuTitle": "Aman", "parentMenuId": "CRM", "menuIconUrl": "icon", "isFavourite": "0", "accessType": "R", "deviceType": "W", "action": [ { "applicationActionId": "b0b89e5d-bc08-488b-8a4c-a792718ae24d", "actionMasterId": "f8c69de6-7a91-4d3e-bf75-f4cf51699b73", "actionName": "create", "actionId": "C01", "status": false } ], "subMenu": [] } ] }, isBtnDisabled: false }

const finalFormdata ={ applicationDetails: { documentNumRequired: true, accessableIndicator:2 } }

describe('Add Edit Form Component', () => {

     it('should render Add Edit Form', async () => {
        customRender(<AddEditForm setIsBtnDisabled={jest.fn()} isVisible={true} isFieldDisable={jest.fn()} setparentAppCode={jest.fn()}/>);
     });

     it('cancel button should work', async () => {
      customRender(<AddEditForm onCloseAction={jest.fn()} setIsBtnDisabled={jest.fn()} isVisible={true} isFieldDisable={jest.fn()} setparentAppCode={jest.fn()}/>);
      logRoles(screen.getByTestId("logrole"));
      const cancelButton = screen.getByRole("button", {name: 'Cancel', exact: false});
      fireEvent.click(cancelButton);
     })

     it('application action, document type and accessible dealer location collapse should work', async () => {
      customRender(<AddEditForm finalFormdata={finalFormdata} setIsBtnDisabled={jest.fn()} isVisible={true} isFieldDisable={jest.fn()} setparentAppCode={jest.fn()} />);
      logRoles(screen.getByTestId("logrole"));
      const appActionCollapse = screen.getByRole("button", {name: 'Application Actions *', exact: false});
      fireEvent.click(appActionCollapse);
      const docTypeCollapse = screen.getByRole("button", {name: 'Document Type *', exact: false});
      fireEvent.click(docTypeCollapse);
      const accDealerLocationCollapse = screen.getByRole("button", {name: 'Accessible Dealer Location *', exact: false});
      fireEvent.click(accDealerLocationCollapse );
     })

    });