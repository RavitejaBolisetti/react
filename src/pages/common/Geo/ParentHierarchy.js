import React from 'react';
import TreeView from 'components/common/TreeView';
import { Modal } from 'antd';

export default function ParentHierarchy({ isModalOpen, setIsModalOpen, title }) {
    return (
        <div>
            <Modal style={{ top: 100 }} title={title} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <TreeView isOpenInModal={true} />
            </Modal>
        </div>
    );
}
