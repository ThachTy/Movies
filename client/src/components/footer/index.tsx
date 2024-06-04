import "./footer.css";
function Footer() {
  return (
    <footer id="footer" className="min-w-full">
      <div className="container py-4 px-2">
        <div className="footer__top">
          {/* Home */}
          <ul className="footer__nav">
            <li className="nav-title mb-4">
              <a className="" href="/">
                Home
              </a>
            </li>
            <li className="nav-items">
              <a href=".">Categories</a>
            </li>
            <li className="nav-items">
              <a href=".">Devices</a>
            </li>
            <li className="nav-items">
              <a href=".">Pricing</a>
            </li>
            <li className="nav-items">
              <a href=".">FAQ</a>
            </li>
          </ul>

          {/* Movies */}
          <ul className="footer__nav">
            <li className="nav-title">
              <a href="/">Shows</a>
            </li>
            <li>
              <a href=".">Gernes</a>
            </li>
            <li>
              <a href=".">Trending</a>
            </li>
            <li>
              <a href=".">New Release</a>
            </li>
            <li>
              <a href=".">Popular</a>
            </li>
          </ul>

          {/* Shows */}
          <ul className="footer__nav">
            <li className="nav-title">
              <a href="/">Shows</a>
            </li>
            <li>
              <a href=".">Gernes</a>
            </li>
            <li>
              <a href=".">Trending</a>
            </li>
            <li>
              <a href=".">New Release</a>
            </li>
            <li>
              <a href=".">Popular</a>
            </li>
          </ul>

          {/* Support */}
          <ul className="footer__nav">
            <li className="nav-title">
              <a href="/">Support</a>
            </li>
            <li>
              <a href=".">Contact Us</a>
            </li>
          </ul>

          {/* Subscription */}
          <ul className="footer__nav">
            <li className="nav-title">
              <a href="/">Subscription</a>
            </li>
            <li>
              <a href=".">Plans</a>
            </li>
            <li>
              <a href=".">Features</a>
            </li>
          </ul>

          {/* Connect */}
          <ul className="footer__nav">
            <li className="nav-title">
              <a href="/">Connect with Us</a>
            </li>
            <div className="footer__socials">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </ul>
        </div>

        <div className="footer__bottom flex items-center justify-between">
          <p>@2023 streamvib. All Rights Reserved</p>
          <div className="footer-term ">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
