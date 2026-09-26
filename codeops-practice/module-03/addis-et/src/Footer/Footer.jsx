import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h4 className={styles.heading}>Addis Eats</h4>
          <p className={styles.text}>
            Sharing traditions from the Ethiopian highlands — one Gursha at a
            time.
          </p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Hospitality Hours</h4>
          <p className={styles.text}>Tuesday – Sunday: 11:30 AM – 11:00 PM</p>
          <p className={styles.text}>Monday: Reserved for Private Banquets</p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Dietary Traditions</h4>
          <p className={styles.text}>Vegan Fasting (Bayaynetu / Tsom)</p>
          <p className={styles.text}>Traditional Prime Meat Feasts</p>
          <p className={styles.text}>House Tej (Pure Honey Wine)</p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Addis Location</h4>
          <p className={styles.text}>
            Bole Medhanialem, Addis Ababa & express delivery across town.
          </p>
          <p className={styles.text}>+251 911 234 567</p>
        </div>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} Addis Eats Habesha Dining. Authentic
        Ethiopian & Eritrean heritage.
      </p>
    </footer>
  );
};

export default Footer;
