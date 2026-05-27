import pool from './db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async id => {
  if (Number.isNaN(Number(id))) {
    throw new Error('invalid id')
  }

  const response = await fetch(
    `https://users-api-we0n.onrender.com/api/users/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  return await response.json()
}