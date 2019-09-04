'use strict'

// Object.defineProperty(exports, '__esModule', {
//   value: true
// })
exports.getAccessUrl = getAccessUrl
function getAccessUrl (url) {
  return window.location.origin + '/api/file/' + url
}
