import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Input} from 'reactstrap';

export function getLanguage(language) {
    const splitted = language.split('-');
    return splitted[0];
}

class LanguageSelector extends Component {

  onLanguageChange (event) {
    const { i18n } = this.props;
    i18n.changeLanguage(event.target.value);
  }

  render () {
    const { i18n } = this.props;
    let language = getLanguage(i18n.language);

    return (<div className="language-selector">
      <Input type="select" onChange={this.onLanguageChange.bind(this)} defaultValue={language}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </Input>
    </div>)
  }
}

export default translate("translations")(LanguageSelector)