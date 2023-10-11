import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidatePassword = (user, password) => bcrypt.compareSync(user, password)