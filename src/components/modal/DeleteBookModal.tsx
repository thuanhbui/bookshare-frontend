import { Modal, Button } from "antd";
import Image from "next/image";
import style from "./modal.module.scss";

export const DeleteBookModal = ({ updateModalVisible, deleteBook }) => {

  return (
    <Modal visible={true} footer={null} closable={true} maskClosable={false}>
      <div className={`${style["nft-modal"]}`}>
        <div className={`${style["confirm-icon"]}`}>
          <Image src="/assets/icons/question.svg" height={56} width={56} />
        </div>

        <div className={`${style["confirm-msg"]}`}>
          Are you sure want to delete this book?
        </div>

        <div className={`${style["custom-modal-footer"]}`}>
          <Button
            className={`${style["footer-button"]} ${style["cancel"]} ${style["create-nft-btn"]}`}
            onClick={() => {
              updateModalVisible("");
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            className={`${style["save-active"]} ${style["footer-button"]} ${style["create-nft-btn"]}`}
            onClick={() => {
              deleteBook();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
