export default class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
  }

  //возвращаем данные пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  //принимаем новые данные пользователя
  setUserInfo(userName, userJob) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
  }
}
