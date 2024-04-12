import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //initialize mailgen instance with defalut theme and brand configuration
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "servers.arnabsamanta.in",
      link: "https://servers.arnabsamanta.in",
    },
  });

  // For more info on how mailgen content work visit https://github.com/eladnava/mailgen#readme
  // Generate the plaintext version of the e-mail (for clients that do not support HTML)

  const textEmail = mailGenerator.generatePlainText(options.mailgenContent);

  //Generate a HTML email with the provided contents
  const htmlEmail = mailGenerator.generate(options.mailgenContent);

  //create a nodemailer transporter instance which is responsible to send a mail

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "servers.arnabsamanta.in@gmail.com",
    to: options.email,
    text: textEmail,
    html: htmlEmail,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    //As sending email is not an important error in most cases so it is better to silently throw the error rather than breaking it
    //If you want you can invoke the Error module to break the app

    console.log(
      "Email Service failed silently.Make sure MAILTRAP credentials in the .env files are correct"
    );
    console.log("Error", err);
  }
};

const emailVerificationContent = (username, verificationUrl) => {
  /**
   *
   * @param {string} username
   * @param {string} verificationUrl
   * @returns {Mailgen.Content}
   * @description It designs the email verification mail
   */

  //Made through mail-gen checkout https://github.com/eladnava/mailgen#readme to know more

  return {
    body: {
      name: username,
      intro: "Welcome to our app ! We are very excited to have you on board",
      action: {
        instructions:
          "To verify your email please click on the following button :",

        button: {
          color: "#22BC66", //you can change it
          text: "Verify your Account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help or have any type of query ? Just reply to to this email , we will love to help.",
    },
  };
};

const forgotPasswordContent = (username, passwordResetUrl) => {
  /**
   *
   * @param {string} username
   * @param {string} verificationUrl
   * @returns {Mailgen.Content}
   * @description It designs the forgot password mail
   */
  //Made through mail-gen checkout https://github.com/eladnava/mailgen#readme to know more
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account ",
      action: {
        instructions:
          "To reset your password click on the following button or link :",
        button: {
          color: "#22BC66", //you can change it
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help or have any type of query ? Just reply to to this email , we will love to help.",
    },
  };
};

const orderConfirmationMailgenContent = (username, items, totalCost) => {
  return {
    body: {
      name: username,
      intro: "Your order has been processed successfully.",
      table: {
        data: items?.map((item) => {
          return {
            item: item.product?.name,
            price: "INR " + item.product?.price + "/-",
            quantity: item.quantity,
          };
        }),
        columns: {
          // Optionally, customize the column widths
          customWidth: {
            item: "20%",
            price: "15%",
            quantity: "15%",
          },
          // Optionally, change column text alignment
          customAlignment: {
            price: "right",
            quantity: "right",
          },
        },
      },
      outro: [
        `Total order cost: INR ${totalCost}/-`,
        "You can check the status of your order and more in your order history",
      ],
    },
  };
};

export {
  sendEmail,
  emailVerificationContent,
  forgotPasswordContent,
  orderConfirmationMailgenContent,
};
