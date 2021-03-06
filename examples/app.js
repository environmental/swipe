// Generated by CoffeeScript 1.5.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AddressBook = [
    {
      name: 'Adam Cooke',
      twitter: 'adamcooke',
      biog: 'Adam is amazing.'
    }, {
      name: 'Dan Quinney',
      twitter: 'danquinney',
      biog: 'Dan is amazing.'
    }, {
      name: 'Charlie Smurthwaite',
      twitter: 'catphish',
      biog: 'Charlie is amazing.'
    }
  ];

  Swipe.App.DefaultLayout = (function(_super) {

    __extends(DefaultLayout, _super);

    function DefaultLayout() {
      DefaultLayout.__super__.constructor.apply(this, arguments);
    }

    DefaultLayout.prototype.template = function() {
      return Swipe.getTemplate('layout');
    };

    DefaultLayout.addBehaviour('click', 'a.dialog', function(view) {
      Swipe.Dialog["new"]({
        title: "Hello World",
        html: "<p>Hello there!</p>"
      });
      return false;
    });

    return DefaultLayout;

  })(Swipe.Layout);

  Swipe.App.ListView = (function(_super) {

    __extends(ListView, _super);

    function ListView() {
      ListView.__super__.constructor.apply(this, arguments);
    }

    ListView.prototype.template = function() {
      return Swipe.getTemplate('list', {
        contacts: window.AddressBook
      });
    };

    ListView.prototype.pageTitle = 'Contacts';

    return ListView;

  })(Swipe.View);

  Swipe.App.ContactView = (function(_super) {

    __extends(ContactView, _super);

    function ContactView() {
      ContactView.__super__.constructor.apply(this, arguments);
    }

    ContactView.prototype.viewContainer = '#contact';

    ContactView.prototype.template = function() {
      return Swipe.getTemplate('contact', {
        contact: this.properties
      });
    };

    ContactView.loadFromTwitterName = function(name) {
      var contact;
      contact = window.AddressBook.filter(function(c) {
        return c.twitter === name;
      });
      contact = contact[0];
      if (contact) {
        return this.load("contact-" + (md5(name)), function(completeFunction) {
          this.properties = contact;
          this.setPageTitle(contact.name);
          return completeFunction.call();
        });
      } else {
        alert('No contact found!');
        return Swipe.Router.goTo('default');
      }
    };

    ContactView.prototype.setNameToRandomColour = function() {
      var colours;
      colours = ['red', 'blue', 'green', 'orange', 'purple', 'yellow'];
      return $('h3', this.domObject).css('color', colours[Math.floor(Math.random() * colours.length)]);
    };

    ContactView.addBindEvent('load', function() {
      return this.setNameToRandomColour();
    });

    ContactView.addKeyboardShortcut('t', {}, function() {
      var currentSize, name;
      name = $('h3', this.domObject);
      currentSize = parseInt(name.css('font-size'));
      if (currentSize > 60) {
        return true;
      }
      return name.css('font-size', currentSize + 2);
    });

    ContactView.addBehaviour('click', 'h3', function(view) {
      return alert("This contact's name is " + view.properties.name);
    });

    return ContactView;

  })(Swipe.View);

  Swipe.Router.add('default', '', function() {
    return Swipe.App.ListView.load('list');
  });

  Swipe.Router.add('contact', '/contact/:twitter', function() {
    Swipe.App.ListView.load('list');
    return Swipe.App.ContactView.loadFromTwitterName(this.twitter);
  });

  Swipe.initializeApp(function() {
    var _this = this;
    return $(document).ready(function() {
      Swipe.Page.defaultTitle = 'Twitter Address Book';
      return Swipe.App.DefaultLayout.load();
    });
  });

  Swipe.init();

}).call(this);
