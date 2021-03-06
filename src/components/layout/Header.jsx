import styles from './header.module.sass';
import { IconButton } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { IoHelpOutline } from 'react-icons/io5';

function Header({ title, subtitle, history }) {
    return (
        <div className={styles.header}>
            <IconButton onClick={history.goBack} icon={<BiArrowBack className={styles.icon} />} />
            <div className={styles['title-container']}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
            </div>
            <IconButton icon={<IoHelpOutline className={styles.icon} />} />
        </div>
    );
}

export default Header;
