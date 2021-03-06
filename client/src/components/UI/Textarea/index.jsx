import PropTypes from "prop-types";
import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 0 10px;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;

  border: 2px solid #5c6bc0;
  border-radius: 4px;
  background-color: transparent;
  outline: none;

  &:hover,
  &:focus {
    border-color: #3949ab;
  }
`;

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Textarea;
