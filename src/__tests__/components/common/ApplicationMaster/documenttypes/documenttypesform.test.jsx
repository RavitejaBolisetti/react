import React from "react";
import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import DocumentTypesForm from "components/common/ApplicationMaster/documentTypes/DocumentTypesForm";

describe('Document Types Form Component', () => {
     it('should render document types form component', async () => {
        customRender(<DocumentTypesForm />);
     });
});