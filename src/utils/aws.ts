import AWS from "aws-sdk";

AWS.config.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};
AWS.config.region = "ap-south-1";

const ses = new AWS.SES();

export const sendVerificationEmail = async (
  toEmail: string,
  verificationCode: string
) => {
  const params = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your verification code is: ${verificationCode}`,
        },
      },
      Subject: {
        Data: "Email Verification - Your OTP",
      },
    },
    Source: "harisvkvvnr@gmail.com",
  };

  try {
    console.log(ses, "hiii ses");

    const result = await ses.sendEmail(params).promise();
    console.log("Email sent:", result, "resultttt");
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
