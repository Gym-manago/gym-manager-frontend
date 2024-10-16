import { ChevronLeft } from "@mui/icons-material";
import { ReactNode } from "react";
import styles from "./layout.module.scss";

interface Props {
  headerTitle: string;
  onBack?: () => void;
  children: ReactNode;
  HeaderEndNode?: ReactNode;
}

export const Layout = ({
  headerTitle,
  onBack,
  children,
  HeaderEndNode,
}: Props) => {
  console.log(HeaderEndNode);
  return (
    <div className={styles.layout_container}>
      <header className={styles.layout_header}>
        <div className={styles.layout_header_title}>
          {!!onBack && (
            <div onClick={onBack} className={styles.back_icon}>
              <ChevronLeft />
            </div>
          )}
          <h1>{headerTitle}</h1>
        </div>
        {HeaderEndNode}
      </header>
      <div className={styles.main_container}>{children}</div>
    </div>
  );
};
