import { User, UserModel } from './user.model'

export const createUser = async (user: Omit<User, 'comparePassword'>) => UserModel.create(user)

export const findUserByEmail = async (email: User['password']) => UserModel.findOne({ email })
