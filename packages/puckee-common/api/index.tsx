export const API_BASE = 'http://192.168.0.188:5000/api'

class APIError {
  message: string

  constructor(message: string) {
    // super(...args)
    this.message = message
  }
}

export async function client(endpoint: RequestInfo, options?: RequestInit) {
    const { body, ...customConfig } = options ?? {}
    var headers: Record<string, string> = { 'Content-Type': 'application/json' }
    
    const config: RequestInit= {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    }
  
    if (body) {
      config.body = JSON.stringify(body)
    }
  
    let data
    try {
      const response = await window.fetch(endpoint, config)
      data = await response.json()
      
      if (response.ok) {
        // Return a result object similar to Axios
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        }
      }
      throw new APIError(data.message)
    } catch (err: any) {
      return Promise.reject(err.message ? err.message : data)
    }
  }
  
  client.get = function (endpoint: string, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
  }
  
  client.post = function (endpoint: string, body: any, customConfig = {}) {
    return client(endpoint, { ...customConfig, body })
  }
  