import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './ProfilePage.module.css';
import profileImage from 'assets/ProfilePage/profile.png';
import nitroImage from 'assets/ProfilePage/nitro.png';
import hypesquadImage from 'assets/ProfilePage/hypesquad.png';

const ProfilePage: React.FC = () => {
    return (
        <div>
            <Header />
            <section className={styles.profileSection}>
                <div className={styles.profilePage}>
                    <div>
                        <img src={profileImage} alt="Profile" />
                    </div>
                    <div className={styles.profileInfoContainer}>
                        <div className={styles.profileInfo}>
                            <p>Nome:</p>
                            <span className={styles.profileData}>Joaquim Pereira da Silva</span>
                        </div>
                        <div className={styles.profileInfo}>
                            <p>Idade:</p>
                            <span className={styles.profileData}>25 anos</span>
                        </div>
                        <div className={styles.profileInfo}>
                            <p>E-mail:</p>
                            <span className={styles.profileData}>joaquim@gmail.com</span>
                        </div>
                        <div className={styles.profileInfo}>
                            <p>XP Obtido:</p>
                            <span className={styles.profileData}>1500</span><span className={styles.profileData}>XP</span>
                        </div>
                        <div>
                            <p>Insignias:</p>
                            <div className={styles.profileInsignias}>
                                <img src={nitroImage} alt="Insignia Nitro" />
                                <img src={hypesquadImage} alt="Insignia Hypesquad" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage;