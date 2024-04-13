
async function register({ email, name, avatar }) {
  if (!avatar) return { error: 'avatar is required' }

  if(!name) return { error: 'name is required' }

  const isEmailAlreadyUsed = getUserByEmail(email)
  if (isEmailAlreadyUsed) {
    return { error: 'email already used' }
  }

  const jpgAvatar = convertImageToJPG(avatar)
  const newUser = await createUser({ email, name, avatar: jpgAvatar })
  
  return { user: newUser }
}