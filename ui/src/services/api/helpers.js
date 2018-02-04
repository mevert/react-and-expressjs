const readResponse = async resp => {
  let json = {}
  const contentType = resp.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    json = await resp.json()
  }
  if (resp.ok) {
    return json
  }
  throw new Error('Todo: handle custom errors that are coming from API')
}

export {
  readResponse
}
