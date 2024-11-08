import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import nodemailer from "nodemailer"

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');



app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

app.get("/cart", (req, res) => {
  res.render("cart.ejs");
});

app.get("/shop", (req, res) => {
  res.render("shop.ejs");
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/adresroute', (req, res) => {
  res.render('adresroute');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.post('/contact', (req, res) => {
  // Extract data from the form
  const firstName = req.body.c_fname;
  const lastName = req.body.c_lname;
  const email = req.body.c_email;
  const subject = req.body.c_subject;
  const message = req.body.c_message;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
          user: 'chentasingh@outlook.com', // Your Outlook email
          pass: 'Welkom@131A'                  // Your Outlook password
      }
  });

  // Set up email data
  let mailOptions = {
      from: 'chentasingh@outlook.com', // Sender address
      to: 's.chentasingh@apotheekwesterbork.nl',                               // List of receivers
      subject: 'Nieuw bericht ontvangen vanuit uw website',                          // Subject line
      text: `Er is een nieuw contactformulier ingevuld:
      
      Voornaam: ${firstName}
      Achternaam: ${lastName}
      E-mailadres: ${email}
      Onderwerp: ${subject}
      Vraag: ${message}
      `, // Plain text body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).send('Something went wrong. Please try again later.');
      }
      console.log('Message sent: %s', info.messageId);
      res.redirect('/contact?success=true');
  });
});


app.get('/klachtenregeling', (req, res) => {
  res.render('klachtenregeling');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
