// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).message("Must be a POST request!")
    return
  }

  const id = req.body.id
  const plugin = req.body.plugin
  const config = req.body.config

  if (id === undefined) {
    res.status(400).message("Didn't get a config ID!")
    return
  }

  if (plugin === undefined) {
    res.status(400).message("Didn't get a plugin name!")
    return;
  }

  if (config === undefined) {
    res.status(400).message("Didn't get a config!")
    return;
  }


}
