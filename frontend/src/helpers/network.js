function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
function parseJSON(response) {
  return response.json()
}
export async function fetchJSON(url, opts) {
  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON)
}
