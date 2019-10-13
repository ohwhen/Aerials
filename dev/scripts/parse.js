const fs = require("fs")

// list of filepath strings (requires files to be in same dir as this script)
const files = [ "entries13.json", "entries12.json" ]

// create list of tuples (title, file) from JSON files using 4K SDR movies
const items = files.flatMap( file => {
  const entries = JSON.parse(fs.readFileSync(file))
  return entries.assets.map( entry => ({ title: entry.accessibilityLabel, file: entry["url-4K-SDR"] }))
})

// create playlist header and items
const plsHeader = `[playlist]\nNumberOfEntries=${items.length}`
const plsItems = items.map( (item, index) => `Title${index+1}=${item.title}\nFile${index+1}=${item.file}` ).join("\n")
const pls = `${plsHeader}\n${plsItems}`

// write to disk
fs.writeFile("Aerials.pls", pls, (error) => error && console.log(error))