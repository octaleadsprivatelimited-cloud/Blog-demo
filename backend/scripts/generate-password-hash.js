// Script to generate bcrypt password hash
// Usage: node scripts/generate-password-hash.js your_password

import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
  console.error('Usage: node generate-password-hash.js <password>');
  process.exit(1);
}

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('\nPassword hash generated:');
    console.log(hash);
    console.log('\nUse this hash in your database INSERT statement.\n');
  })
  .catch(err => {
    console.error('Error generating hash:', err);
    process.exit(1);
  });

