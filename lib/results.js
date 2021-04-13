import fs from 'fs'
import path from 'path'

export function initResults() {
  const fileNames = fs.readdirSync(
    path.join(process.cwd(), '/public/screenshots')
  )

  return fileNames.map((fileName) => ({
    query: fileName.split('-')[1].split('.')[0],
    filePath: `/screenshots/${fileName}`,
  }))
}
