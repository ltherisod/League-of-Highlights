const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    pass: process.env.PASSWORD,
    user: process.env.MAIL,
  },
  tls: { rejectUnauthorized: false },
})

const options = (to, subject, html) => {
  return {
    from: "League of Highlights <leagueofhighlights.2021@gmail.com>",
    to,
    subject,
    html,
  }
}

module.exports = {
  transport,
  options,
}
