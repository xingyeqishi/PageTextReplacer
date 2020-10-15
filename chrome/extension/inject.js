/*
import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <button onClick={this.buttonOnClick}>
          Open TodoApp
        </button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}
*/

function includesKey(text, keywords) {
  return keywords.filter(i => text.includes(i)).length > 0;
}
function nativeSelector(keywords) {
    var elements = document.querySelectorAll("*");
    var results = [];
    var child;
    for(var i = 0; i < elements.length; i++) {
    	if (elements[i].hasChildNodes()) {
    		for (var j = 0; j < elements[i].childNodes.length; j++) {
    			let child = elements[i].childNodes[j];
    			if (child.nodeType == 3 && includesKey(child.nodeValue, keywords)) {
    				results.push(child);
    			}
    		}
    	}
    }
    return results;
}



window.addEventListener('load', () => {
  chrome.storage.local.get(['state'], function(result) {
    try {
      const task = JSON.parse(result.state).tasks;
      if (task.interval) {
        setInterval(function() {
          var textnodes = nativeSelector(task.match),
            _nv;
          for (var i = 0, len = textnodes.length; i<len; i++){
              _nv = textnodes[i].nodeValue;
              for (var m = 0; m < task.match.length; m++) {
                 _nv = _nv.replace(new RegExp(task.match[m], 'g'), task.replace[m]);
              }
              textnodes[i].nodeValue = _nv;
          }
        }, task.interval);
      }
    } catch(err) {

    }
  });

  /*
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
  */
});
