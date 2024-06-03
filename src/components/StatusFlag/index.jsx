import React from 'react';
import PropTypes from 'prop-types';

const StatusFlag = ({ color }) => {
    const flagStyle = {
        width: '100%',         // Flag width is 100% of its container
        paddingTop: '50%',     // Padding-top for aspect ratio (height relative to width)
        backgroundColor: color,
        border: '1px solid black'
    };

    // Aspect ratio box to maintain the flag's aspect ratio
    const aspectRatioBoxStyle = {
        position: 'relative',  // Relative position for the aspect ratio box
    };

    const flagInnerStyle = {
        position: 'absolute',  // Absolute position for the flag
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    return (
        <div style={aspectRatioBoxStyle}>
            <div style={{...flagStyle, ...flagInnerStyle}}></div>
        </div>
    );
};

StatusFlag.propTypes = {
    color: PropTypes.string.isRequired
};

export default StatusFlag;
