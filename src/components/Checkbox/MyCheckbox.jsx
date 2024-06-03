import styled from 'styled-components';
import PropTypes from 'prop-types';

const Checkbox = styled.input`
  /* Style the checkbox */
  appearance: none;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  outline: none;
  position: relative;
  width: 20px;

  /* Style the checkmark */
  &:before {
    content: '';
    background: #000;
    border-radius: 3px;
    display: block;
    height: 12px;
    left: 4px;
    position: absolute;
    top: 4px;
    width: 12px;
  }

  /* Hide the checkmark by default */
  &:not(:checked):before {
    display: none;
  }
`;

const MyCheckbox = ({ id, checked, onCheckboxChange, children }) => (
  <Checkbox type="checkbox" id={id} checked={checked} onChange={onCheckboxChange} {...children} />
);

MyCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MyCheckbox;
