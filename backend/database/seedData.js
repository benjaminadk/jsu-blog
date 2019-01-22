require('dotenv').config()
const axios = require('axios')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v1')
const md5 = require('md5')
const md = require('./md')

module.exports = async rows => {
  function createRandomId() {
    return uuid()
      .replace(/-/g, '')
      .slice(0, 10)
  }

  async function sendData(data) {
    await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
      },
      url: `${process.env.PRISMA_ENDPOINT}/import`,
      data
    })
  }

  const lists = []
  const relations = []
  const date = new Date().toISOString()
  const adminId = createRandomId()
  const adminEmail = 'benjaminadk@gmail.com'

  const admin = {
    _typeName: 'User',
    id: adminId,
    name: 'benjaminadk',
    password: await bcrypt.hash('password', 10),
    email: adminEmail,
    image: `https://www.gravatar.com/avatar/${md5(adminEmail)}?d=mp`,
    bio: 'JavaScript developer and site admin.',
    role: 'ADMIN',
    updatedAt: date,
    createdAt: date
  }

  const postNodes = rows.map((row, i) => {
    return {
      _typeName: 'Post',
      id: createRandomId(),
      topic: row[0],
      title: row[1],
      subtitle: row[2],
      body: i === 0 ? md : row[3],
      image: row[4],
      published: row[5] === 'TRUE' ? true : false,
      updatedAt: date,
      createdAt: date
    }
  })

  postNodes.forEach((post, i) => {
    const list = {
      _typeName: 'Post',
      id: post.id,
      tags: rows[i][6].split(',')
    }
    const r1 = { _typeName: 'Post', id: post.id, fieldName: 'author' }
    const r2 = { _typeName: 'User', id: adminId, fieldName: 'posts' }
    const relation = [r1, r2]
    relations.push(relation)
    lists.push(list)
  })

  const nodes = [admin, ...postNodes]
  const NODES = { valueType: 'nodes', values: nodes }
  const LISTS = { valueType: 'lists', values: lists }
  const RELATIONS = { valueType: 'relations', values: relations }

  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('Database seeded.')
  }
}
