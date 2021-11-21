import { Modal, Button } from "antd";
import { useRouter } from "next/router";
import style from "./modal.module.scss";

export const CancelCreateBookModal = ({ updateModalVisible }) => {

  const router = useRouter();

  return (
    <Modal visible={true} footer={null} closable={false} maskClosable={false}>
      <div className={`${style["modal-common"]}`}>
        <div className={`${style["confirm-icon"]}`}>
          <img src="/assets/icons/question.svg" height={56} width={56} />
        </div>

        <div className={`${style["success-message"]}`}>
          Changes you made will not be saved
          <div>Do you want to leave?</div>
        </div>

        <div className={`${style["custom-modal-footer"]}`}>
          <Button
            className={`${style["footer-button"]} ${style["cancel"]} ${style["create-nft-btn"]}`}
            onClick={() => {
              router.push("/");
            }}
          >
            Leave
          </Button>
          <div
            className={`${style["footer-button"]} ${style["cancel"]} ${style["create-nft-btn"]} ${style["save-active"]}`}
            onClick={() => {
              updateModalVisible(false);
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </Modal>
  );
};
