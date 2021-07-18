require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  type: 'service_account',
  project_id: 'randonneurs-to',
  private_key_id: process.env.GS_PRIVATE_KEY_ID,
  private_key: (process.env.GS_PRIVATE_KEY || '').replace(/(\\r)|(\\n)/g, '\n'),
  client_email: 'randonneurstosheets@randonneurs-to.iam.gserviceaccount.com',
  client_id: '116465140767443102500',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/randonneurstosheets%40randonneurs-to.iam.gserviceaccount.com'
}
