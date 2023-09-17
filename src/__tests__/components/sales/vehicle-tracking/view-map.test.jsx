import React from 'react';
import { ViewMap } from 'components/Sales/VehicleTracking/ViewMap';
import customRender from '@utils/test-utils';
import GoogleMapReact from 'google-map-react';

jest.mock('google-map-react', () => {
    return jest.fn().mockImplementation(({ onGoogleApiLoaded }) => {
        const Marker = jest.fn().mockImplementation(() => {
            return {}; 
        });

        onGoogleApiLoaded({ map: {}, maps: { Marker } });
        return <div />;
    });
});


describe('View Map Component', () => {

    it('should render view map component UI', () => {
        const styles={
            drawerBody: ''
        };
        const formData={
            currentLatitude: 106,
            currentLongitude: 106
        }
        const renderMarkers = jest.fn();
        const modifiedArray=[{ name: 'Kai' }];
        customRender(<ViewMap isVisible={true} styles={styles} formData={formData} renderMarkers={renderMarkers} modifiedArray={modifiedArray} />);
    });

});