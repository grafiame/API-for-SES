import Queue from '../lib/Queue'
import joi from 'joi'

export default {
  async store(req, res) {
    const { toemail, to, subject, message } = req.body

    const schema = joi.object({
      to: joi.string().min(3).required(),
      toemail: joi.string().email().min(3).required(),
      subject: joi.string().min(3).required(),
      message: joi.string().min(3).required()
    })

    const validation = schema.validate(req.body)
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message)
    }

    const Email = {
      toemail,
      to,
      subject,
      message
    }

    // Adicionar job RegistrationMail na fila
    await Queue.add('RegistrationMail', { Email })

    await Queue.add('UserReport', { Email })

    return res.json(Email)
  }
}
