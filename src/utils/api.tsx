const apiUrl = 'http://127.0.0.1:5000'

async function client(method: string, endpoint: string, data: any) {
  const config = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    const jsonData = await response.json()
    if (response.ok) {
      return jsonData
    }
    return Promise.reject(jsonData)
  })
}
export { getChatbotApiResponse }

function getChatbotApiResponse(input: string) {
  return client('POST', 'get_response', { input_prompt: input })
}
