// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getConfigs, addConfig } from "../../lib/configs"
const yaml = require('js-yaml')

export default function handler(req, res) {
  if (req.method === 'POST') {
    const id = req.body.id
    const plugin = req.body.plugin
    const config = req.body.config

    if (id === undefined) {
      res.status(400).json({
        message: "Didn't get a config ID!"
      })
      return
    }

    if (plugin === undefined) {
      res.status(400).json({
        message: "Didn't get a plugin!"
      })
      return;
    }

    if (config === undefined) {
      res.status(400).json({
        message: "Didn't get a config!"
      })
      return;
    }

    try {
      yaml.load(config)
    } catch (e) {
      res.status(400).json({
        message: "Invalid config!"
      })
      return
    }

    const didAdd = addConfig({
      id: id,
      plugin: plugin,
      config: config
    })

    if (didAdd) {
      res.status(201).json({
        message: `Added ${id} for ${plugin}!`
      })
    } else {
      res.status(200).json({
        message: `Did not add ${id} for ${plugin} as it already exists!`
      })
    }
  } else if (req.method === 'GET') {
    const plugin = req.body.plugin
    const limit = req.body.limit || 50

    let configs = []

    if (plugin === undefined) {
      configs = getConfigs()
        .slice(0, limit)
    } else {
      configs = getConfigs()
        .filter(c => c.plugin.toLowerCase() === plugin.toLowerCase())
        .slice(0, limit)
    }

    res.status(200).json({
      configs: configs
    })
  } else {
    res.status(400).json({
      message: `${req.method} requests are not supported!`
    })
  }
}
