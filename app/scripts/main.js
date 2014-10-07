(function(){
'use strict';

var Person = Backbone.Model.extend({
  urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/people',

  validate: function(attributes) {
    if (! attributes.firstname) {
      return ('First name is required.');
    }
    if (! attributes.lastname) {
      return ('Last name is required.');
    }
    if (! attributes.address) {
      return ('Address is required.');
    }
    if (attributes.phonenumber.toString().length != 10) {
      return ('Phone number is required.');
    }
    if (! attributes.email || !attributes.email.match('@')) {
      return ("Valid email is required");
    }
  }

});

var PersonFormView = Backbone.View.extend({
  tagName: 'form',

  template: _.template($('#input-form').text()),

  events: {
    'submit': 'savePerson'
  },

  initialize: function(options){
    options = options || {};
    this.$container = options.$container;
    this.$container.append(this.el);
    this.render();
    this.listenTo(this.model, 'invalid', this.invalidUser);
  },

  render: function() {
    this.$el.html(this.template(this.model));
  },

  savePerson: function(e) {
    e.preventDefault();
    var firstName = this.$('.first-name').val();
    var lastName = this.$('.last-name').val();
    var address = this.$('.address').val();
    var phoneNumber = this.$('.phone-number').val();
    var email = this.$('.email').val();
    this.model.save({firstname: firstName, lastname: lastName, address: address, phonenumber: phoneNumber, email: email});
  },

  invalidUser: function(model, error){
    this.$('.box').addClass('invalid');
    alert(error);
  }

});

var App = Backbone.Router.extend({
  initialize: function(){
    new PersonFormView({model: new Person, $container: $('.form-container')});
  }
});

$(document).ready(function(){
  var app = new App();
  Backbone.history.start();

});

})();
