var userController,
    originalAdapter;

module("UserController", {
  setup: function(){
    originalAdapter = App.Bug.adapter;
    App.reset();
    userController = App.__container__.lookup('controller:user');
  },
  teardown: function() {
    App.Bug.adapter = originalAdapter;
    delete App.Bug.FIXTURES;
  }
});

test("when a user is not logged in, there are no bugs", function(){
  Ember.run(function() {
    userController.set('isLoggedIn', false);

    App.getJSON = function(url, params) {
      return Ember.run(Ember.RSVP,'resolve', []);
    };

    stop();

    userController.get('bugs').then(function(bugs){
      start();
      equal(bugs.get('length'), 0);
    }).then(null,function(reason){
      start();
      ok(false, reason);
    });
  });
});

test("when a user is logged in, on bug retrievsl,  bugs are fetched", function(){
  Ember.run(function(){
    userController.set('isLoggedIn', true);

    App.Bug.adapter = Ember.FixtureAdapter.create({
      findQuery: function(klass, records, params) {
        Ember.run.later(function() {
          records.load(klass, klass.FIXTURES);
        }, 1);
      }
    });

    App.Bug.FIXTURES = [
      {id: 1, summary: 'foo'},
      {id: 2, summary: 'foo'},
      {id: 3, summary: 'foo'},
      {id: 4, summary: 'foo'}
    ];

    stop();
    userController.get('bugs').then(function(issues) {
      start();
      equal(issues.get('length'), 4);
    });
  });
});
