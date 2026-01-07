
import { spawn } from 'child_process'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const transferData = async () => {
  const sourceDB = process.env.SOURCE_DB
  const destDB = process.env.DEST_DB

  if (!sourceDB || !destDB) {
    console.error('Error: SOURCE_DB and DEST_DB environment variables must be set')
    process.exit(1)
  }

  console.log(`Starting data transfer...`)
  console.log(`Source: ${sourceDB.split('@')[1] || '***'}`) // Log safe part of connection string if possible
  console.log(`Destination: ${destDB.split('@')[1] || '***'}`)

  // Construct the command
  // Using shell: true to allow the pipe operator
  const command = `pg_dump "${sourceDB}" --no-owner --no-acl --clean --if-exists | psql "${destDB}"`

  const transferProcess = spawn(command, {
    shell: true,
    stdio: 'inherit', // Pipe output directly to parent process
  })

  transferProcess.on('error', (err) => {
    console.error('Failed to start transfer process:', err)
    process.exit(1)
  })

  transferProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('Data transfer completed successfully!')
    } else {
      console.error(`Data transfer failed with exit code ${code}`)
      process.exit(code)
    }
  })
}

transferData()
