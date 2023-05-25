const LoginFields = {
  username: document.querySelector('input[name="login-name"]'),
  password: document.querySelector('input[name="login-password"]'),
  submit: document.querySelector('button[name="login-submit-button"]'),
};

LoginFields.submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked Login Button");
  return false;
});
