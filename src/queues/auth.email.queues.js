import agenda from '../config/agenda.js';

const registerEmailJob = async (email, subject, text) => {
  const job = agenda.create('send-register-mail', { email, subject, text });

  job.unique({
    'data.email': email,
    'data.subject': subject,
    'data.text': text,
  });

  job.priority('high');
  job.schedule(new Date());
  await job.save();
  console.log('Register email job added');
};

export default { registerEmailJob };
