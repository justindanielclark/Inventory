const SignupFields = {
  username: document.querySelector('input[name="signup-name"]'),
  password: document.querySelector('input[name="signup-password"]'),
  password_confirm: document.querySelector(
    'input[name="signup-password-confirm"]'
  ),
  secret_key: document.querySelector('input[name="signup-secret-key"]'),
  submit: document.querySelector('button[name="signup-submit-button"]'),
};

SignupFields.submit.addEventListener("click", (e) => {
  return true;
});
