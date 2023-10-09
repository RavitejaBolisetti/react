import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { EvrDetailsCapturingMaster } from '@components/Sales/EvrDetailsCapturing/EvrDetailsCapturingMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';
import createMockStore from '__mocks__/store';


describe('Evr details capturing master render', () => {

    it("Should render Evr details capturing master components", () => {
        customRender(<EvrDetailsCapturingMaster />)
    })
})