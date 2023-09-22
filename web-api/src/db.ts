import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { utils } from './utils'

const configPath = path.resolve(__dirname, './../.env')
dotenv.config({ path: configPath })

utils.printMatchingEnvVariableNames([
  'CUSTOMCONNSTR_DATABASE',
  'CUSTOMCONNSTR_DATABASE_PASSWORD',
])

const cs = process.env.CUSTOMCONNSTR_DATABASE
const pw = process.env.CUSTOMCONNSTR_DATABASE_PASSWORD
if (!cs || !pw) throw new Error('Database connection string not set!')
const dbConnectionString = cs.replace('<password>', pw)

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions)
