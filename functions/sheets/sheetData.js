require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  'registration': {
    id: process.env.GS_REGISTRATION_ID,
    title: 'Registrations',
    columns: [
      'submitted',
      'chapter',
      'distance',
      'route',
      'startDate',
      'startTime',
      'scheduleTime',
      'startLocation',
      'name',
      'email',
      'rideType',
      'membership',
      'notes'
    ]
  },
  'registration-permanent': {
    id: process.env.GS_REGISTRATIONPERM_ID,
    title: 'Permanents 2021',
    columns: [
      'num',
      'distance',
      'startDate',
      'startTime',
      'route',
      'name',
      'startLocation'
    ]
  },
  'covid-screening': {
    id: process.env.GS_COVID_ID,
    title: 'covid-screening',
    columns: [
      'name',
      'email',
      'submitted',
      'fever',
      'cough',
      'breathing',
      'soreThroat',
      'stuffyNose',
      'tasteSmell',
      'nausea',
      'tired',
      'pinkEye',
      'household',
      'contact',
      'travel',
      'event'
    ]
  }
}
