import $ from 'jquery';
import 'at.js';
import 'at.css';
import 'jquery.caret';
import marked from 'marked';
import _ from 'lodash';

import './index.styl';

$(function() {
  var tags = [
    'work',
    'home',
    'goals',
    'tasks'
  ];

  var people = [
    'Tom',
    'Peter',
    'Sally',
    'John',
    'Jane',
    'Jill',
    'Patrick'
  ];

  $('.js-input').atwho({
    at: '#',
    data: tags
  });

  $('.js-input').atwho({
    at: '@',
    data: people
  });

  $('.js-submit').click(compileMarkdown);
  $('.js-input').on('input', _.debounce(compileMarkdown, 300));

  // if we got anything in the input on page-load, let's compile it.
  compileMarkdown();

  function compileMarkdown() {
    var input = $('.js-input').val();
    if (!input) {
      return;
    }

    // do the actual markdown parsing
    var compiled = marked(input);

    // parse our own html for @ and #
    compiled = atSubstitution(compiled);
    compiled = hashSubstitution(compiled);

    console.log(compiled);

    // add to the DOM
    $('.js-output').html(compiled);
  }

  function atSubstitution(compiled) {
    var regex = /@\w+/g;

    return compiled.replace(regex, function(match) {
      return '<a href="/' + match + '">' + match + '</a>';
    });
  }

  function hashSubstitution(compiled) {
    var regex = /#\w+/g;

    return compiled.replace(regex, function(match) {
      var urlSafeTag = match.replace(/#/, '');

      return '<a href="/tags/' + urlSafeTag + '">' + match + '</a>';
    });
  }
});
