export default () => {
    process.env.TZ = 'UTC'
    process.env.RO_ENDPOINT = '/schedule.php'
    process.env.CCN_ENDPOINT = '/ccnbikes.com'
}
