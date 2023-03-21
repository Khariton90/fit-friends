import { Link } from "react-router-dom"
import { Approute } from "../../consts"

export function IntoPage(): JSX.Element {
  return (
    <main>
      <div className="intro">
        <div className="intro__background">
          <picture>
            <source type="image/webp"
              srcSet="assets/img/content/sitemap//background.webp, assets/img/content/sitemap//background@2x.webp 2x" />
            <img src="assets/img/content/sitemap//background.jpg"
              srcSet="assets/img/content/sitemap//background@2x.jpg 2x" width="1440" height="1024" alt="Фон с бегущей девушкой" />
          </picture>
        </div>
        <div className="intro__wrapper">
          <svg className="intro__icon" width="60" height="60" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
          <div className="intro__title-logo">
            <picture>
              <source type="image/webp"
                srcSet="assets/img/content/sitemap//title-logo.webp, assets/img/content/sitemap//title-logo@2x.webp 2x" />
              <img src="assets/img/content/sitemap//title-logo.png"
                srcSet="assets/img/content/sitemap//title-logo@2x.png 2x"
                width="934" height="455" alt="Логотип Fit Friends" />
            </picture>
          </div>
          <div className="intro__buttons">
            <Link className="btn intro__button" type="button" to={Approute.SignUp}>Регистрация</Link>
            <p className="intro__text">Есть аккаунт? <Link className="intro__link" to={Approute.SignIn}>Вход</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}