import React, { useState } from 'react';
import Modal from 'react-modal';
import MyMapComponent from './Map';
import AddressInput from './AddressInput';

const AddressWithMapPicker = () => {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);

  const openMapModal = () => setShowMap(true);
  const closeMapModal = () => setShowMap(false);


  return (
    <>
      <AddressInput
        id="address"
        label="Địa chỉ"
        value={address}
        onChange={setAddress}
        onIconClick={openMapModal}
        style={{ marginTop: 12 }}
      />

      <Modal
        isOpen={showMap}
        onRequestClose={closeMapModal}
        contentLabel="Chọn địa chỉ trên bản đồ"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
          },
        }}
      >
        <button onClick={closeMapModal}>Đóng</button>
        <MyMapComponent />
      </Modal>
    </>
  );
};

export default AddressWithMapPicker;