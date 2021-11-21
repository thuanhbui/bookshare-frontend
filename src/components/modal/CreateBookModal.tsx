import { Modal, Button } from "antd";
import Image from "next/image";
import style from "./modal.module.scss";
import { useState } from "react";

export const CreateBookModal = ({ updateModalVisible, upLoad, isLoading }) => {

  const [clickCreate, setClickCreate] = useState(false);

  return (
    <Modal visible={true} footer={null} closable={false} maskClosable={false}>
      <div className={`${style["nft-modal"]}`}>
        <div className={`${style["confirm-icon"]}`}>
          <Image src="/assets/icons/question.svg" height={56} width={56} />
        </div>

        <div className={`${style["confirm-msg"]}`}>
          Are you sure want to create this book?
        </div>

        <div className={`${style["custom-modal-footer"]}`}>
          <Button
            className={`${style["footer-button"]} ${style["cancel"]} ${style["create-nft-btn"]}`}
            onClick={() => {
              !clickCreate && updateModalVisible("");
            }}
            disabled={clickCreate}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            className={`${style["save-active"]} ${style["footer-button"]} ${style["create-nft-btn"]}`}
            onClick={() => {
              !clickCreate && upLoad();
              setClickCreate(true);
            }}
            loading={isLoading}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
