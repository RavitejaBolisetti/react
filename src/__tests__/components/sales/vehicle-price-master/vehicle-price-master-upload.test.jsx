/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from "@testing-library/react";
import { VehiclePriceMasterUpload } from 'components/Sales/VehiclePriceMaster/VehiclePriceMasterUpload';

describe('Vehicle Price Master Upload component render', () => {

    it("should render vehicle price master upload component",async ()=>{
        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });

        customRender(<VehiclePriceMasterUpload isVisible={true} setFileList={jest.fn()} setEmptyList={jest.fn()} />);

        const uploadFile = screen.getByRole('button', { name: 'Upload File' });

        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });
    });

});