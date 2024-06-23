import PropTypes from 'prop-types'

const IFrame = ({src}) => {
  return (
    <iframe src={`./templates/${src}.html`}></iframe>
  )
}

IFrame.propTypes = {
  src: PropTypes.string.isRequired
}

export default IFrame