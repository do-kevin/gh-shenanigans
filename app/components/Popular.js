var React = require('react');

class Popular extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      languageSelected: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        languageSelected: lang
      }
    });
  }

	render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python'];
		return (
      <ul className='languages'>
        {languages.map(function(lang) {
          return (
            <li 
              style={
                lang === this.state.languageSelected ?   {borderBottom: '3px solid hsl(24, 100%, 50%)',
              color: 'hsl(0, 0%, 100%)'} : null}
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>
          );
        }, this)}
      </ul>
    );
	}
}

module.exports = Popular;
