import {useState} from "react";
import SectionTitleTwo from '../SectionTitles/SectionTitleTwo';
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const InstallationBlocks = ({services}) => {
    const [didViewCountUp, setDidViewCountUp] = useState(false);

    const navigate = useNavigate();
    const onVisibilityChange = isVisible => {
        if (isVisible) {
        setDidViewCountUp(true);
        }
    };

    const handleClick = (service) => {
        navigate(`/installations/${service.id}`, { state: { serviceData: service } });
    };

    return (
        <div className="section section-padding-top section-padding-bottom-150">
          <div className="container">
            <div className="row">
              <div className="col-12" data-aos="fade-up">
                <div className="about-content-area mt-0 mb-md-10 mb-10">
                  <SectionTitleTwo
                    subTitle="Installation Status"
                    title="List of your subscribed services"
                  />
                  <div className="row mb-n6">
                    {services.map((service, index) => (
                      <div
                        className="col-md-4 col-sm-6 col-12 mb-6"
                        key={index}
                        onClick={() => handleClick(service)}
                      >
                        <div className="about-funfact service-panel">
                          <div className="number">
                            <VisibilitySensor
                              onChange={onVisibilityChange}
                              offset={{ top: 10 }}
                              delayedCall
                            >
                              <CountUp
                                end={didViewCountUp ? service.attributes.score : 0}
                              />
                            </VisibilitySensor>
                            % complete
                          </div>
                          <h6 className="text">{service.attributes.name}</h6>
                          <p>{service.attributes.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
            
}

InstallationBlocks.propTypes = {
    services : PropTypes.array.isRequired
};
  
  
export default InstallationBlocks;
