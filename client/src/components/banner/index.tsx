import { Link } from 'react-router-dom'
import bannerVideo from "@assets/videos/home_hero_background_2023.mp4";

import './banner.css';
function Banner() {
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
          <h1 className="content-heading">Go ahead, stream free</h1>
          <p className="content-text">
            With Plex you can watch over 20,000 free movies and shows, plus Live
            TV on almost any device. What are you waiting for?
          </p>
          <Link className="btn btn-signup" to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
