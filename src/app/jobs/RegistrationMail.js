import Mail from '../lib/Mail'

export default {
  key: 'RegistrationMail',
  options: {
    attempts: 3
  },
  async handle({ data }) {
    const user = data.Email

    Mail(user.to, user.toemail, user.subject, user.message).catch(error =>
      console.log({ message: `${error.code}: ${error.message}` })
    )
  }
}
