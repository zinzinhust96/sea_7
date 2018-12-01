import React from 'react';
import {
  Card,
  CardBody,
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Col,
  Row,
} from 'reactstrap';
import image2 from '../../assets/img/capu1.jpg'
import image1 from '../../assets/img/CJT47.jpg'
import image3 from '../../assets/img/hOIuY.jpg'
import Purchases_car from '../../assets/img/Major-Purchases_car.png'
import Purchases_House from '../../assets/img/Major-Purchases_House.png'
import Purchases_tutition from '../../assets/img/Major-Purchases_tutition.png'
import Purchases_vacation from '../../assets/img/Major-Purchases_vacation.png'
import './homePage.css'

const items = [
  {
    src: image1,
    altText: 'Slide 1',
    header: 'Building Client Success',
    caption: 'We Are Committed to One Thing:\n'
            + 'Building Client Success',
  },
  {
    src: image2,
    altText: 'Slide 2',
    header: 'step on the path to success',
    caption: 'Let us help you take another step on the path to success.',
  },
  {
    src: image3,
    altText: 'Slide 3',
    header: 'Save time and money',
    caption: 'Save time and money with our flexible spending accounts',
  },
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides2 = items.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
                >
        <img className="d-block w-100" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.header} />
      </CarouselItem>
    ));

    return (
      <div className="animated fadeIn">
        <Row style={{ marginTop: -800 }}>
          <Col xs="12" xl="12">
            <Card>
              <CardBody className="card-body">
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                  <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={this.goToIndex}
                                    />
                  {slides2}

                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={this.previous}
                                    />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
              </CardBody>
            </Card>
          </Col>
        </Row>

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
