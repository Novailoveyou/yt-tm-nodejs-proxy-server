const express = require('express')
const router = express.Router()
const needle = require('needle')
const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = require('../config/env')

router.get('/', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE
    })

    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiRes.body

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
