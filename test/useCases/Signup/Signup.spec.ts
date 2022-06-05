import NotAllowed from '@/errors/NotAllowed'
import createRepositories, { Repositories } from '@/repositories'
import application from '@test/application.spec'

let repository: Repositories

describe('Signup', () => {
  beforeAll(async () => {
    repository = await createRepositories()
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(repository)
        .map(repository => repository.remove({}))
    )
  })

  it('should create an account', async () => {
    const name = 'any name'
    const email = 'any@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    const account = await application
      .interactors
      .account
      .signup({
        name,
        email,
        phone,
        password
      })

    expect(typeof account.userID).toBe('string')
    expect(account.name).toBe(name)
    expect(account.email).toBe(email)
    expect(account.phone).toBe(phone)
    expect(account.password).not.toEqual(password)

    const [addedUser] = await repository
      .account
      .select({ userID: account.userID })

    expect(addedUser.email).toBe(email)
  })

  it('should not be able create user already exists', async () => {
    const name = 'any name'
    const email = 'any2@mail.com'
    const phone = '79992952868'
    const password = '12345678'

    await application
      .interactors
      .account
      .signup({
        name,
        email,
        phone,
        password
      })

    await expect(
      application
        .interactors
        .account
        .signup({
          name: 'any name user',
          phone: '998294045',
          email,
          password
        })
    ).rejects.toEqual(new NotAllowed('Email already exist'))
  })
})
