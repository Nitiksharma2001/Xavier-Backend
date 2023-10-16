import 'dotenv/config'
import express from 'express'
import { userModel } from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const authRouter = express.Router()

authRouter.post('/user/signup', (req, resp) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return resp.json({ error: 'incomplete details' })
  }
  userModel.find({ email }, (error, user) => {
    if (error) {
      return resp.json(error)
    }
    if (user === null) {
      bcrypt.hash(password, 6, (err, hash) => {
        if (err) {
          return resp.json(err)
        }
        const newUser = new userModel({ name, email, password: hash }).save(
          () => {
            return resp.json({ message: 'user created' })
          }
        )
      })
    } else {
      return resp.json({ message: 'user already existed' })
    }
  })
})
authRouter.post('/user/login', (req, resp) => {
  const { email, password } = req.body
  userModel.findOne({ email }).exec((err, user) => {
    if (err) {
      return resp.json({ error: err })
    }
    if (!user) {
      return resp.json({ message: 'wrong email or password' })
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return resp.json(err)
      }
      if (result) {
        const { name, email } = user
        const token = jwt.sign({ name, email }, process.env.JWT_kEY)
        return resp.json({ token, name, email })
      } else {
        return resp.json({ message: 'wrong email or password' })
      }
    })
  })
})
