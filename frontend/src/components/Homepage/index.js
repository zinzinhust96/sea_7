import React from 'react';
import Purchases_car from '../../assets/img/Major-Purchases_car.png'
import Purchases_House from '../../assets/img/Major-Purchases_House.png'
import Purchases_tutition from '../../assets/img/Major-Purchases_tutition.png'
import Purchases_vacation from '../../assets/img/Major-Purchases_vacation.png'
import './homePage.css'

class HomePage extends React.Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="main-content">
          <div className="content section">
            <section role="region" aria-label="section">
              <div className="section-wrapper  backgroundColor-White" id="majorpurchase">
                <div className="section-content  section-fullwidth">
                  <div className="titleanddescription section">
                    <div className="    default">
                      <div className="section-title font-color-dark-grey large-heading longhand ">

                                                Smart Money Solutions

                      </div>
                      <div className="section-description font-sinkin_sans200_x_light"><p>Client
                                                success is our top goal.</p>
                        <p>Let First Financial guide you on finding solutions to help you get
                                                    where you want and remain financially successful.</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                      </div>
                    </div>
                  </div>
                  <div className="imagelist section">
                    <div className="hand-drawn-image-title large-text ">
                      <div className="hand-drawn-image-title-item font-color-light-grey">
                        <img src={Purchases_House} alt="icon" />
                        <p>IMPROVEMENTS</p>
                      </div>
                      <div className="hand-drawn-image-title-item font-color-light-grey">
                        <img src={Purchases_tutition} alt="icon" />
                        <p>TUITION</p>
                      </div>
                      <div className="hand-drawn-image-title-item font-color-light-grey">
                        <img src={Purchases_car} alt="icon" />
                        <p>CAR</p>
                      </div>
                      <div className="hand-drawn-image-title-item font-color-light-grey">
                        <img src={Purchases_vacation} alt="icon" />
                        <p>VACATION</p>
                      </div>
                    </div>
                  </div>
                  <div className="button section">
                    <div className="btn-centered margin-top-50 ">
                      <a
                        href="#"
                        target=""
                        className="btn btn-solid"
                                            >
                        <span>BE SMART<br /> WITH YOUR MONEY</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="content section">
          <section role="region" aria-label="section">
            <div className="section-wrapper tier3" id="wealth">
              <div className="section-content section-content-with-image ">
                <div className="titleanddescription section">
                  <div
                    className="backgroundColor-black-opaque rounded-corners-10 padding-left-50 padding-top-50 padding-right-50 padding-bottom-50"
                                    >
                    <div
                      className="section-title font-color-white medium-heading font-sinkin_sans200_x_light"
                                        >
                                            Planning For Your Future

                    </div>
                    <div className="section-description font-sinkin_sans200_x_light"><p><span
                      className="font-color-white"
                                        >Two heads are better than one—an old saying,<br />
                                             and an obvious one when it comes to planning for your financial future. <br />
                                             No matter what success looks like for you, we help you achieve it.<br />
                      <br />
                    </span></p>
                      <p><span className="font-color-white">Learn how First Financial can help you and your family remain successful in the long term.</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="button section">
                  <div className="btn-centered  ">
                    <a
                      href="#"
                      target=""
                      className="btn btn-solid"
                                        >
                      <span>PLAN FOR YOUR FUTURE</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default HomePage
