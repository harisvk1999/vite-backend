const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const sendVerificationEmail = async (
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
    Source: "your-ses-verified-email@example.com",
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent:", result.MessageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
