import { CloseOutlined } from "@mui/icons-material";
import styles from "../styles.module.scss";

interface Props {
  onClose: () => void;
}

export const AddNew = ({ onClose }: Props) => {
  return (
    <div className={styles.modal_container} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h3>Add new</h3>
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.modal_content}></div>
      </div>
    </div>
  );
};
