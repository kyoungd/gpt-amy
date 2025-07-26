import PropTypes from "prop-types";
import {useState} from "react";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterUpItem = ({ data }) => {
    const [didViewCountUp, setDidViewCountUp] = useState(false);
    const { ref } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        onChange: (inView) => {
            if (inView) {
                setDidViewCountUp(true);
            }
        }
    });

    return (
        <div className="funfact">
            <div className="number" ref={ref}>
                <CountUp end={didViewCountUp ? data.number : 0} />
            </div>
            <h6 className="text">{data.text}</h6>
        </div>
    )
}

CounterUpItem.propTypes = {
    data: PropTypes.object
};

export default CounterUpItem;
