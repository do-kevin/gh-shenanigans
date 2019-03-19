var React = require('react');
var PropTypes = require('prop-types');

function PersonPreview (props) {
  return (
    <div style={{marginTop: '50px'}}>
      <div className='column card'>
        <img 
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />

        <h2 className='username'>
          @{props.username}
        </h2>
        <button 
          onClick={props.onReset.bind(null, props.personId)}
          className='reset'>
          Reset
        </button>
      </div>
    </div>
  );
}

PersonPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  personId: PropTypes.string.isRequired
}

module.exports = PersonPreview;