require("dotenv").config();
require("colors");

const AWS = require("aws-sdk")
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

const IS_TESTING = process.env.NODE_ENV === "test";

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5433;
  const dbProdName = process.env.DATABASE_NAME || "vtrade";
  const dbTestName = process.env.DATABASE_TEST_NAME || "vtrade";
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});


const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log("vtrade config:".red);
console.log("Port:".blue, PORT);
console.log("SECRET_KEY:".blue, SECRET_KEY);
console.log("IS_TESTING:".blue, IS_TESTING);
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR);
console.log("Database URI:".blue, getDatabaseUri());
console.log("------");

module.exports = {
  PORT,
  SECRET_KEY,
  IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  s3
 
};