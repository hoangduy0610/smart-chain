const showHiddenPass = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       if(input.type === 'password'){
          input.type = 'text'
          iconEye.classList.add('ri-eye-line')
          iconEye.classList.remove('ri-eye-off-line')
       } else{
          input.type = 'password'
 
          iconEye.classList.remove('ri-eye-line')
          iconEye.classList.add('ri-eye-off-line')
       }
    })
 }

 showHiddenPass('password-login','login-eye')
 showHiddenPass('password-create-register','login-eye-create-register')
 showHiddenPass('password-confirm-register','login-eye-confirm-register')

