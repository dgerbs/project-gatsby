const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
	<h2>Your Recent Order for ${total}</h2>
	<p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
	<ul>
	${order
    .map(
      (item) => `<li>
	<img src="${item.thumbnail}" alt="${item.name}" />
	${item.size} ${item.name} - ${item.price}
	</li>`
    )
    .join('')}
	</ul>
	<p>Your total is <strong>${total}</strong> due at pickup.</p>
	<style>
		ul { 
			list-style: none;
		}
	</style>
	</div>`;
}

// create a transport for nodemailer
// const transporter = nodemailer.createTransport({
// authentication variables, i.e. postmark, sendgrid
// host: ,
// port: ,
// auth: {
//     user: ,
//     pass:
// }
// });
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(3000);
  const body = JSON.parse(event.body);
  console.log(body);
  //   Check if they filled out honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zzz goodbye error: 5678',
      }),
    };
  }
  // Validate the data coming in is correct
  const reqFields = ['name', 'email', 'order'];
  for (const field of reqFields) {
    console.log(`Checking that ${field} is good.`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field.`,
        }),
      };
    }
  }
  //   Make sure there are items
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // Send email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  //   console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };

  // Send success or error messages

  // Test send an email
  //   const info = await transporter.sendMail({
  //     from: "Slick's Slices <slick@example.com>",
  //     to: 'orders@example.com',
  //     subject: 'New Order!',
  //     html: `<p>Your new pizza order is here!</p>`,
  //   });
  // //   console.log(info);
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(info),
  //   };
};
