const readResponse = async resp => {
  let json
  try {
    json = await resp.json()
  } catch (error) {
    throw new Error('Make sure that API is running and returns json response.')
  }
  if (resp.ok) {
    return json
  }
  // custom error message coming from API
  throw new Error(json.errorMessage)
}

export {
  readResponse
}
