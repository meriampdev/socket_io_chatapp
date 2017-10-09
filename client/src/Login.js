/*eslint-disable no-undef*/

import React, { Component } from 'react';
import './App.css'

class App extends Component {
  componentDidMount() {
    const self = this;


    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      if (typeof(FB) != 'undefined' && FB != null) {
        FB.init({
          appId      : '346407729105738',
          cookie: true,
          xfbml      : true,
          version    : 'v2.10'
        })

        FB.getLoginStatus(function(response) {
          self.statusChangeCallback(response);
        })

        FB.Event.subscribe('auth.login', function(response) {
          // console.log('login', response)
          self.testAPI()
          // window.location = "some other page";
        });

        FB.AppEvents.logPageView();        
      } else {
        console.log('NO FB')
      }
    }
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback')
    console.log(response)
    if (response.status === 'connected') {
      this.testAPI();

      // FB.api('/search?q=meriam&type=user', function(response) {
      //   console.log('facebook search', response)
      // })
    }
  }

  testAPI() {
    // console.log('Welcome!  Fetching your information.... ');
    const { LogIn } = this.props
    FB.api('/me?fields=id,email,cover,name,first_name,last_name,age_range,link,gender,hometown', function(response) {
      // console.log('Successful login for: ' , response);
      LogIn(response)
      //@MARK: CODE TO REDIRECT HERE
    });
  }

  render() {
    console.log('login props', this.props)
    return (
      <div className="App">
        <div
          className="fb-login-button"
          data-max-rows="1" data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
          data-scope = "public_profile,email,user_hometown"
        >
        </div>
      </div>
    );
  }
}

export default App