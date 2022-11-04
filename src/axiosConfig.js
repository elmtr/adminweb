import prod from './prod'

export const apiURL = prod ? 'https://api.elmtree.ro' : 'http://localhost:4200'

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const tokenConfig = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}