import SES from 'aws-sdk/clients/ses'

export default async function (to, toemail, subject, message) {
  const ses = new SES()
  await ses
    .sendEmail({
      Source: 'Grafiame <naoresponda@grafiame.com.br>',
      Destination: {
        ToAddresses: [`${to} <${toemail}>`]
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message
          }
        }
      }
    })
    .promise()
}
