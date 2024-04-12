// Nomenclatura de variáveis

const Categories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(request, response) {
  const githubUsername = String(request.query.username)

  if (!githubUsername) {
    return response.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userRecoveredOnGithub = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (userRecoveredOnGithub.status === 404) {
    return response.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const userInfos = await userRecoveredOnGithub.json()

  const orderedFollowerList = Categories.sort((a, b) =>  b.followers - a.followers); 

  const checkingCategory = orderedFollowerList.find(category => userInfos.followers > category.followers)

  const userCategory = {
    username: githubUsername,
    category: checkingCategory.title
  }

  return userCategory
}

getData({ query: {
  username: 'josepholiveira'
}}, {})