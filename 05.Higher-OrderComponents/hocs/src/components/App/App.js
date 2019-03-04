import React, { Component } from 'react';
import './App.css';
import Article from '../Article/Article';
import RegisterForm from '../RegisterForm/RegisterForm';
import Navigation from '../Navigation/Navigation';
import warningWrapper from '../../hocs/warningWrapper';
import BindingForm from '../BindingForm/BindingForm';

const ArticleWithWarning = warningWrapper(Article);
const NavigationWithWarning = warningWrapper(Navigation);
const RegisterFormWithWarning = warningWrapper(RegisterForm);

class App extends Component {
  render() {
    return (
      <section className="App">
        <BindingForm onSubmit={this.onSubmit}>
          <h1>Login form</h1>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
        </BindingForm>
        <ArticleWithWarning />
        <RegisterFormWithWarning />
        <NavigationWithWarning />
      </section>
    );
  }
}

export default App;
