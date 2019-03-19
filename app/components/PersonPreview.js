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
      </div>
      {props.children}
    </div>
  );
}

PersonPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PersonPreview;