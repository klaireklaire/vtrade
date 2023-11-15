const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const Appimage = require("./appimage")
const Token = require("../utils/tokens");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      createdat: user.createdat,
    };
  }

  static async login(credentials) {
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError("Please input password");
    }

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return this.makePublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid email/password combo");
  }

 
  static async register(credentials) {
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "password",
      "username"
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });


    if (credentials.email.indexOf("@vassar.edu") <= 0 || credentials.email.length < 1) {
      throw new BadRequestError("Invalid email. Must be a vassar email");
    }

    if (credentials.password.length < 1) {
      throw new BadRequestError("Please input password");
    }

    if (credentials.firstname.length < 1) {
      throw new BadRequestError("Please input first name");
    }

    if (credentials.lastname.length < 1) {
      throw new BadRequestError("Please input last name");
    }

    if (credentials.username.length < 1) {
      throw new BadRequestError("Please input username");
    }


    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Email already exists: ${credentials.email}`);
    }

   

    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const lowercasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `
        INSERT INTO users(
            firstname,
            lastname,
            email,
            password,
            username
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,firstname,lastname,email, createdat, updatedat;
        `,
      [
        credentials.firstname,
        credentials.lastname,
        lowercasedEmail,
        hashedPassword,
        credentials.username
      ]
    );

    var user = result.rows[0];
    user = User.makePublicUser(user);

    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    if (email.indexOf("@vassar.edu") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    var user = result.rows[0];

    return user;
  }

  static async fetchUserById(id) {
    if (!id) {
      throw new BadRequestError("No id provided");
    }

    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
    const user = result.rows[0];

    return user;
  }

  static async deleteUser(userId) {
    await db.query(
      `
     DELETE FROM users
     WHERE id = $1;
    
     
     `,
      [userId]
    );
  }

  static async editUser(updates, images = null){
    
  }

  static async requestPasswordReset(email) {
    const user = await this.fetchUserByEmail(email);

    if (!user) {
      throw new BadRequestError("The email does not exist");
    }

    var resetToken = Token.createResetToken(user);
    var link = `${process.env.CLIENT_URL}passwordconfirm?token=${resetToken}`;

    return link;
  }

  static async updatePassword({ confirm, password, id }) {
    if (password.length < 1) {
      throw new BadRequestError("Invalid password");
    }

    if (password !== confirm) {
      throw new BadRequestError("Passwords do not match");
    }

    var hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `UPDATE users
              SET password = $1,
              updatedAt = NOW()
                   WHERE id = $2
                   RETURNING id,firstName,lastName,email,username,location, birthdate, gender, createdAt, image_url, updatedAt;`,
      [hashedPassword, id]
    );

    const res = result.rows[0];
    return res;
  }

  static sendmail(email, link) {
    const msg = {
      to: email,
      from: "vanlyfe.com@gmail.com",
      subject: "PASSWORD RESET",
      text: `Text`,
      html: `Kindly click <a href=${link}>this link</a> to reset your password. The link expires in 5 minutes.`,
    };
    sgMail.send(msg);
  }
}

module.exports = User;
