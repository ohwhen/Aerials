const fs = require("fs")
const fetch = require("node-fetch")
const util = require("util")
const stream = require("stream")
const pipeline = util.promisify(stream.pipeline)
const tar = require("tar-fs")
const os = require("os")
const path = require("path")

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const urls = [    
  "https://sylvan.apple.com/Aerials/resources-13.tar",
  "https://sylvan.apple.com/Aerials/resources.tar",
  "https://sylvan.apple.com/Aerials/2x/entries.json"
]

urls.map( async url => {

  try {
    const fileName = url.split("/").pop()
    const resource = fs.createWriteStream(fileName)
    const response = await fetch(url)
    const file = await response.body.pipe(resource)
    file.on("finish", () => {
      if (fileName.includes(".tar")) {
      }
    })
  } catch (error) {
    console.log(error)
  }
})