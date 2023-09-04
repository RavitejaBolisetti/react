import React from 'react';
import customRender from '@utils/test-utils';
import { VehicleDetailStatusTag } from 'components/Sales/VehicleDetail/utils/VehicleDetailStatusTag';

describe('Vehicle Detail Status Tag Component', () => {

    it('should render vehicle detail status tag component', () => {
        customRender(<VehicleDetailStatusTag />);
    });

    it('booked tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Booked'} />);
    });

    it('alloted tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Allotted'} />);
    });

    it('cancelled tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Cancelled'} />);
    });

    it('invoiced tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Invoiced'} />);
    });

    it('delivered tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Delivered'} />);
    });

    it('transferred tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Transferred'} />);
    });

    it('pending for cancellation tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Pending for cancellation'} />);
    });

    it('cancellation requested tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Cancellation Requested'} />);
    });

    it('rejected tag should render', () => {
        customRender(<VehicleDetailStatusTag status={'Rejected'} />);
    });

});