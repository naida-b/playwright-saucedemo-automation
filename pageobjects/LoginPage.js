class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button',{name: 'Login'});
        this.alert = page.getByRole('alert');
    }

    async goTo(url = "/")
    {
        await this.page.goto(url);
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async fillUsernameTextInput(username){
        await this.usernameInput.fill(username);
    }

    async fillPasswordTextInput(password){
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async resetUsernameTextInput(){
        await this.usernameInput.fill("");
    }

    async resetPasswordTextInput(){
        await this.passwordInput.fill("");
    }


}
module.exports = {LoginPage};