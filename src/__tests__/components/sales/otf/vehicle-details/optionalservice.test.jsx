import { Form } from 'antd';
import { fireEvent, logRoles, screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/VehicleDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { OptionServicesForm } from '@components/Sales/OTF/VehicleDetails/optionServicesForm';

// const typeDataMock = {
//     OPT_SRV: [
//         { key: 'FSTG', value: 'FasT Tag' },
//         { key: 'HRSP', value: 'HRSP' },
//         { key: 'OCHRG', value: 'Other charges' },
//         { key: 'REGST', value: 'Registration' },
//     ],
// };

const FormWrapper = (props) => {
    const [optionForm] = Form.useForm();
    return <OptionServicesForm optionForm={optionForm} {...props} />;
};

describe('OTF Vehicle optional Component render', () => {
    it('should render optional service form', async () => {
        customRender(<FormWrapper typeData={'OPT_SRV'} />);
        // screen.debug();
    });

    it('test 1', async () => {
        
        // const OPT_SRV= [{"id":"870e57ea-87d2-4f1c-8187-c5aafbbf48fc","key":"FSTG","value":"FasT Tag","parentKey":"OPT_SRV"},{"id":"f33b3c98-0ae4-4957-944b-3f78db2d06d0","key":"HRSP","value":"HRSP","parentKey":"OPT_SRV"},{"id":"36925f40-9acb-4bf4-843b-1d616df457d4","key":"OCHRG","value":"Other charges","parentKey":"OPT_SRV"},{"id":"5ea2b22e-b07a-4d8d-a042-a9a7f870c590","key":"REGST","value":"Registration","parentKey":"OPT_SRV"}]
        // let typeData = {};
        // typeData['OPT_SRV'] = [{"id":"870e57ea-87d2-4f1c-8187-c5aafbbf48fc","key":"FSTG","value":"FasT Tag","parentKey":"OPT_SRV"},{"id":"f33b3c98-0ae4-4957-944b-3f78db2d06d0","key":"HRSP","value":"HRSP","parentKey":"OPT_SRV"},{"id":"36925f40-9acb-4bf4-843b-1d616df457d4","key":"OCHRG","value":"Other charges","parentKey":"OPT_SRV"},{"id":"5ea2b22e-b07a-4d8d-a042-a9a7f870c590","key":"REGST","value":"Registration","parentKey":"OPT_SRV"}];
        // customRender(<FormWrapper typeData={typeData} />);
        // const serviceName = screen.getByRole('combobox', { name: /service name/i });
        // fireEvent.click(serviceName);
        // const fastTagOption=screen.getByText('FasT Tag');
        // logRoles(screen.getByTestId('logRole'));
    });

    // it('should render all text', async () => {
    //     customRender(<FormWrapper typeData={'OPT_SRV'} />);

    //     const serviceName = screen.getByRole('combobox', { name: /service name/i });
    //     expect(serviceName).toBeTruthy();

    //     const amount = screen.getByRole('textbox', { name: /amount/i });
    //     expect(amount).toBeTruthy();

    //     const saveBtn = screen.getByRole('button', { name: 'Save' });
    //     fireEvent.click(saveBtn);
    //     expect(saveBtn).toBeTruthy();

    //     const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    //     fireEvent.click(cancelBtn);
    //     expect(cancelBtn).toBeTruthy();
    // });
});
