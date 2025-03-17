import "react";
import PropTypes from "prop-types";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <button className="close" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        {imageUrl ? (
          <img src={imageUrl} alt="resume" />
        ) : (
          <p>No resume image available.</p>
        )}
      </div>
    </div>
  );
};

ResumeModal.propTypes = {
  imageUrl: PropTypes.string, // 'imageUrl' should be a string
  onClose: PropTypes.func.isRequired, // 'onClose' is a required function
};

ResumeModal.defaultProps = {
  imageUrl: null, // Default to null if 'imageUrl' is not provided
};

export default ResumeModal;
