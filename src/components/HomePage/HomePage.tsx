import { Component, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';

const Router = createRouter();

@Component({
  tag: 'home-page',
  styleUrl: 'homePage.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class HomePage {
  render() {
    return (
      <div>
        <Router.Switch>
          <Route path="/home">
            <nav-bar></nav-bar>
            <landing-page></landing-page>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/">
            <login-comp></login-comp>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/booking">
            <nav-bar></nav-bar>
            <appointment-booking></appointment-booking>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/admin">
            <admin-navbar></admin-navbar>
            <admin-comp></admin-comp>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/admin/hospital">
            <admin-navbar></admin-navbar>
            <admin-hospital></admin-hospital>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/admin/doctors">
            <admin-navbar></admin-navbar>
            <admin-doctors></admin-doctors>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/admin/bookings">
            <admin-navbar></admin-navbar>
            <admin-booking></admin-booking>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/admin/feedback">
            <admin-navbar></admin-navbar>
            <admin-feedback></admin-feedback>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/add">
            <admin-navbar></admin-navbar>
            <admin-form></admin-form>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/feedback">
            <nav-bar></nav-bar>
            <feedback-component></feedback-component>
            <hospital-footer></hospital-footer>
          </Route>
          <Route path="/summary">
            <nav-bar></nav-bar>
            <summary-comp></summary-comp>
            <hospital-footer></hospital-footer>
          </Route>

          {/* <Route path="/login">
            <nav-bar></nav-bar>
            <login-comp></login-comp>
            <footer-component></footer-component>
          </Route> */}
        </Router.Switch>
      </div>
    );
  }
}
