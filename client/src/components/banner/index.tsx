import { Link } from 'react-router-dom'
import bannerVideo from "@assets/videos/home_hero_background_2023.mp4";
import { useTranslation } from 'react-i18next'

import './banner.css';
function Banner() {
  const { t } = useTranslation(["banner", "button"]);
  return (
    <div id="banner">
      <video
        src={bannerVideo}
        className="banner-video"
        loop
        muted
        autoPlay
      ></video>
      <div className="banner__content">
        <div className="content">
          <h1 className="content-heading">{t("banner", { context: "title" })}</h1>
          <p className="content-text">
            {t("banner", { context: "text" })}
          </p>
          <Link className="btn btn-signup" to="/signup">{t("button.signup", { ns: "button" })}</Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
