import PropTypes from 'prop-types'

const IFrame = ({src}) => {
  return (
    <iframe 
      src={`./templates/${src}.html`}
      width='100%'
      height='500vh'
      ></iframe>
  )
}

IFrame.propTypes = {
  src: PropTypes.string.isRequired
}

export default IFrame