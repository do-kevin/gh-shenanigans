var React = require('react');
var PropTypes = require('prop-types');

function PersonPreview ({ avatar, username, children}) {
  return (
    <div style={{marginTop: '50px'}}>
      <div className='column card'>
        <img 
          className='avatar'
          src={avatar}
          alt={'Avatar for ' + username}
        />

        <h2 className='username'>
          @{username}
        </h2>
      </div>
      {children}
    </div>
  );
}

PersonPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PersonPreview;