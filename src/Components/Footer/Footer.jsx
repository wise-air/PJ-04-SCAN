import css from './Footer.module.css'

const Footer = () => {

    return (
        <footer className={css.footer}>
            <img className={css.img} src="/static/logo-scan.svg" alt=""/>
            <div className={css.info}>
                <p className={css.address}>г. Москва, Цветной б-р, 40</p>
                <p className={css.phone}>
                    <a href="tel:+74957712111">+7 495 771 21 11</a>
                </p>
                <p className={css.email}>
                    <a href="mailto:info@skan.ru">info@skan.ru</a>
                </p>
                <p>&nbsp;</p>
                <p className={css.copyright}>Copyright. 2024</p>
            </div>
        </footer>
    )

}

export default Footer