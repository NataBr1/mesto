export default class UserInfo {
  constructor ({nameSelector, jobSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  //возвращаем данные пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    }
  }

  //принимаем новые данные пользователя
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
