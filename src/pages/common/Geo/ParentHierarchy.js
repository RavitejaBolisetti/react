import React from 'react';
import TreeView from 'components/common/TreeView';
import { Modal } from 'antd';

export default function ParentHierarchy({ isModalOpen, setIsModalOpen, title }) {
    return (
        <div>
<<<<<<< HEAD
            <Modal style={{ top: 100 }} title={title} open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
=======
            <Modal style={{ top: 100 }} title={title} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
>>>>>>> feature
                <TreeView isOpenInModal={true} />
            </Modal>
        </div>
    );
}
