// const deleteLoginData = () => {
//   document.cookie = "loginData=; max-age=0";
// }

const setLoginDataToCookie = (data, hour=3) => {
  document.cookie = `loginData=${encodeURIComponent(data)}; max-age=${hour*60*60}; path=/`;
}

const getLoginDataFromCookie = () => {
  const cookieArr = document.cookie.split(";");
    
  for(var i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      
      if('loginData' == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
    
  return null;
}

// 로그인시 필요한 함수
// const getLoginDataFromApi = async () => {
//   const response = await fetch('./api/loginData');
//   return (await response.json());
// }


(async () => {
  const loginData = getLoginDataFromCookie();
  const listElement = document.getElementById('sidebar_list')
  console.log('로그인정보', loginData)
  if (loginData) { // 로그인됨
    const li_logout = document.createElement('li');
    li_logout.className = 'sidebar_item';
    const a_logoutLabel = document.createElement('a');
    a_logoutLabel.setAttribute("href", "./logout");
    a_logoutLabel.innerText = '로그아웃';
    li_logout.appendChild(a_logoutLabel);

    const li_profile = document.createElement('li');
    li_profile.className = 'sidebar_item';
    const a_profileLabel = document.createElement('a');
    a_profileLabel.setAttribute("href", "./profile");
    a_profileLabel.innerText = '프로필';
    li_profile.appendChild(a_profileLabel);

    listElement.prepend(li_logout, li_profile);
  } else { // 로그인 안됨
    const li_login = document.createElement('li');
    li_login.className = 'sidebar_item';
    const a_loginLabel = document.createElement('a');
    a_loginLabel.setAttribute("href", "./login");
    a_loginLabel.innerText = '로그인';
    li_login.appendChild(a_loginLabel);

    listElement.prepend(li_login);
  }
})()