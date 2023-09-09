/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react'
import { Modal,Typography } from 'antd'

const VehiclePriorityAllotmentAlert = (props) => {
    const { modalOpen, setModalOpen } = props;
  return (

        <Modal title="Vehicle Priority Alert" centered open={modalOpen} onCancel={() => setModalOpen(false)} cancelText="Close">
            <Typography>
                Old Model Group & new vehicle selected are been matching with the Vehicle Priority Master.
                <div />
                Please give the Priority to this Exchange & New Vehicle
            </Typography>
        </Modal>
  
  )
}

export default VehiclePriorityAllotmentAlert