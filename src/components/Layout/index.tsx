import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ReactNode } from 'react';
import styles from './layout.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  headerTitles: (string | undefined)[];
  onBack?: () => void;
  children: ReactNode;
  HeaderEndNode?: ReactNode;
}

export const Layout = ({
  headerTitles,
  onBack,
  children,
  HeaderEndNode,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout_container}>
      <header className={styles.layout_header}>
        <div className={styles.layout_header_title}>
          {!!onBack && (
            <div onClick={onBack} className={styles.back_icon}>
              <ChevronLeft />
            </div>
          )}
          {headerTitles
            .filter((t) => t !== undefined)
            .map((title) => (
              <div key={title}>
                <span>
                  <ChevronRight />
                </span>
                <h1
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/app/${title}`)}
                >
                  {title}
                </h1>
              </div>
            ))}
        </div>
        {HeaderEndNode}
      </header>
      <div className={styles.main_container}>{children}</div>
    </div>
  );
};
