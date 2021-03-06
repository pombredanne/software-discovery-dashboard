import React from 'react';
import moment from 'moment';
import { DATE_ATTR_DISPLAY } from '../constants';

class Result extends React.Component {
  getDateString(result) {
    let dateString = '';

    ['dateModified', 'dateCreated', 'datePublished'].forEach(d => {
      if (result[d] && result[d].length > 4) {
        const attr = `${DATE_ATTR_DISPLAY[d]}: `;
        dateString = attr + moment(result[d]).format('MMM Do, YYYY');
      }
    });

    return dateString || 'Unknown date';
  }

  render() {
    const result = this.props.result;

    const dateString = this.getDateString(result);
    const source = result.source ?
      <label className="results-link-label">{result.source}</label> : '';
    const description = result.description ?
      <p className="result-description">{result.description}</p> : '';
    const keywords = result.keywords ?
      <ul className="keywords-list">
        {result.keywords.map(k =>
          <li className="keyword" key={k}>{k}</li>
        )}
      </ul> : '';

    return (
      <li>
        <div className="result">
          <h1>
            <a className="result-title-link"
              href={result.source}
              target="_blank"
            >
              {result.title}
            </a>
          </h1>
          {source}
          <div className="result-date">{dateString}</div>
          {description}
          {keywords}
        </div>
      </li>
    );
  }

}

Result.propTypes = {
  result: React.PropTypes.object,
};

export default Result;
