class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.usernameTextInput = page.getByLabel('Username');
        this.passwordTextInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button',{name: 'Login'});
        this.invalidUsernameAndPasswordAlert = page.getByRole('alert');
    }

    async goTo()
    {
        await this.page.goto("/");
    }

    async login(username, password){
        await this.usernameTextInput.fill(username);
        await this.passwordTextInput.fill(password);
        await this.loginButton.click();
    }

    async fillUsernameTextInput(username){
        await this.usernameTextInput.fill(username);
    }

    async fillPasswordTextInput(password){
        await this.passwordTextInput.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async resetUsernameTextInput(){
        await this.usernameTextInput.fill("");
    }

    async resetPasswordTextInput(){
        await this.passwordTextInput.fill("");
    }


}
module.exports = {LoginPage};