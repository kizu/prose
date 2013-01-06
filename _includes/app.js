(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.events = {
      "click .toggle-view": "toggleView"
    };

    Application.prototype.toggleView = function(e) {
      var link, route;
      e.preventDefault();
      e.stopPropagation();
      link = $(e.currentTarget);
      route = link.attr("href").replace(/^\//, "");
      $(".toggle-view.active").removeClass("active");
      link.addClass("active");
      return router.navigate(route, true);
    };

    Application.prototype.initialize = function() {
      var calculateLayout, lazyLayout, that;
      calculateLayout = function() {
        if (that.mainView && that.mainView.refreshCodeMirror) {
          return that.mainView.refreshCodeMirror();
        }
      };
      _.bindAll(this);
      that = this;
      this.header = new app.views.Header({
        model: this.model
      });
      lazyLayout = _.debounce(calculateLayout, 300);
      return $(window).resize(lazyLayout);
    };

    Application.prototype.render = function() {
      $(this.header.render().el).prependTo(this.el);
      return this;
    };

    Application.prototype.replaceMainView = function(name, view) {
      $("body").removeClass().addClass("current-view " + name);
      if (name !== "start") {
        $("#header").show();
      }
      if (this.mainView) {
        this.mainView.remove();
      } else {
        $("#main").empty();
      }
      this.mainView = view;
      return $(view.el).appendTo(this.$("#main"));
    };

    Application.prototype["static"] = function() {
      return this.header.render();
    };

    Application.prototype.posts = function(user, repo, branch, path) {
      this.loading("Loading posts ...");
      return loadPosts(user, repo, branch, path, _.bind(function(err, data) {
        this.loaded();
        if (err) {
          return this.notify("error", "The requested resource could not be found.");
        }
        this.header.render();
        return this.replaceMainView("posts", new app.views.Posts({
          model: data,
          id: "posts"
        }).render());
      }, this));
    };

    Application.prototype.post = function(user, repo, branch, path, file, mode) {
      this.loading("Loading post ...");
      return loadPosts(user, repo, branch, path, _.bind(function(err, data) {
        if (err) {
          return this.notify("error", "The requested resource could not be found.");
        }
        loadPost(user, repo, branch, path, file, _.bind(function(err, data) {
          var that;
          this.loaded();
          this.header.render();
          if (err) {
            return this.notify("error", "The requested resource could not be found.");
          }
          data.preview = mode !== "edit";
          data.lang = _.mode(file);
          this.replaceMainView((window.authenticated ? "post" : "read-post"), new app.views.Post({
            model: data,
            id: "post"
          }).render());
          return that = this;
        }, this));
        return this.header.render();
      }, this));
    };

    Application.prototype.newPost = function(user, repo, branch, path) {
      this.loading("Creating file ...");
      return loadPosts(user, repo, branch, path, _.bind(function(err, data) {
        return emptyPost(user, repo, branch, path, _.bind(function(err, data) {
          this.loaded();
          data.jekyll = _.jekyll(path, data.file);
          data.preview = false;
          data.markdown = _.markdown(data.file);
          this.replaceMainView("post", new app.views.Post({
            model: data,
            id: "post"
          }).render());
          this.mainView._makeDirty();
          app.state.file = data.file;
          return this.header.render();
        }, this));
      }, this));
    };

    Application.prototype.profile = function(username) {
      var that;
      that = this;
      app.state.title = username;
      this.loading("Loading profile ...");
      return loadRepos(username, function(err, data) {
        that.header.render();
        that.loaded();
        data.authenticated = !!window.authenticated;
        return that.replaceMainView("start", new app.views.Profile({
          id: "start",
          model: data
        }).render());
      });
    };

    Application.prototype.start = function(username) {
      var that;
      that = this;
      app.state.title = "";
      this.header.render();
      return this.replaceMainView("start", new app.views.Start({
        id: "start",
        model: _.extend(this.model, {
          authenticated: !!window.authenticated
        })
      }).render());
    };

    Application.prototype.notify = function(type, message) {
      this.header.render();
      return this.replaceMainView("notification", new app.views.Notification(type, message).render());
    };

    Application.prototype.loading = function(msg) {
      return $("#main").html("<div class=\"loading\"><span>" + msg || "Loading ..." + "</span></div>");
    };

    Application.prototype.loaded = function() {
      return $("#main .loading").remove();
    };

    return Application;

  })(Backbone.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Header = (function(_super) {

    __extends(Header, _super);

    function Header() {
      return Header.__super__.constructor.apply(this, arguments);
    }

    Header.prototype.id = "header";

    Header.prototype.events = {
      "click a.logout": "_logout"
    };

    Header.prototype._logout = function() {
      logout();
      app.instance.render();
      if ($("#start").length > 0) {
        app.instance.start();
      } else {
        window.location.reload();
      }
      return false;
    };

    Header.prototype.render = function() {
      $(this.el).html(app.templates.header(_.extend(this.model, {
        state: app.state
      })));
      return this;
    };

    return Header;

  })(Backbone.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Notification = (function(_super) {

    __extends(Notification, _super);

    function Notification() {
      return Notification.__super__.constructor.apply(this, arguments);
    }

    Notification.prototype.id = "notification";

    Notification.prototype.initialize = function(type, message) {
      this.model = {};
      this.model.type = type;
      return this.model.message = message;
    };

    Notification.prototype.render = function() {
      $(this.el).html(app.templates.notification(this.model));
      return this;
    };

    return Notification;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      this.toggleShare = __bind(this.toggleShare, this);
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.id = "post";

    Post.prototype.events = {
      "click .save": "_save",
      "click .cancel-save": "_toggleCommit",
      "click .save.confirm": "updateFile",
      "click a.toggle.view": "_toggleView",
      "click a.toggle.meta": "_toggleMeta",
      "change input": "_makeDirty",
      "change #post_published": "updateMetaData",
      "click .delete": "_delete",
      "click .toggle-options": "_toggleOptions",
      "change #share": "toggleShare"
    };

    Post.prototype._toggleOptions = function() {
      $(".options").toggle();
      return false;
    };

    Post.prototype._delete = function() {
      if (confirm("Are you sure you want to delete that file?")) {
        deletePost(app.state.user, app.state.repo, app.state.branch, this.model.path, this.model.file, _.bind(function(err) {
          if (err) {
            return alert("Error during deletion. Please wait 30 seconds and try again.");
          }
          return router.navigate([app.state.user, app.state.repo, "tree", app.state.branch].join("/"), true);
        }, this));
      }
      return false;
    };

    Post.prototype.updateURL = function() {
      var url;
      url = _.compact([app.state.user, app.state.repo, (this.model.preview ? "blob" : "edit"), app.state.branch, this.model.path, this.model.file]);
      return router.navigate(url.join("/"), false);
    };

    Post.prototype._makeDirty = function(e) {
      this.dirty = true;
      if (this.editor) {
        this.model.content = this.editor.getValue();
      }
      if (this.metadataEditor) {
        this.model.raw_metadata = this.metadataEditor.getValue();
      }
      if (!this.$(".button.save").hasClass("saving")) {
        this.$(".button.save").html((this.model.writeable ? "SAVE" : "SUBMIT CHANGE"));
        return this.$(".button.save").removeClass("inactive error");
      }
    };

    Post.prototype.showDiff = function() {
      var d, diff, text1, text2;
      text1 = this.prevContent;
      text2 = this.serialize();
      d = this.dmp.diff_main(text1, text2);
      this.dmp.diff_cleanupSemantic(d);
      diff = this.dmp.diff_prettyHtml(d).replace(/&para;/g, "");
      return $(".diff-wrapper .diff").html(diff);
    };

    Post.prototype._toggleCommit = function() {
      if (!this.$(".document-menu").hasClass("commit")) {
        this.$(".commit-message").attr("placeholder", "Updated " + $("input.filepath").val());
      }
      this.hideMeta();
      this.$(".button.save").html((this.$(".document-menu").hasClass("commit") ? (this.model.writeable ? "SAVE" : "SUBMIT CHANGE") : "COMMIT"));
      this.$(".button.save").toggleClass("confirm");
      this.$(".document-menu").toggleClass("commit");
      this.$(".button.cancel-save").toggle();
      this.$(".document-menu-content .options").hide();
      this.showDiff();
      this.$(".surface").toggle();
      this.$(".diff-wrapper").toggle();
      this.$(".commit-message").focus();
      return false;
    };

    Post.prototype._save = function(e) {
      if (!this.dirty) {
        return false;
      }
      this._toggleCommit();
      e.preventDefault();
      return false;
    };

    Post.prototype._toggleView = function(e) {
      var that;
      that = this;
      this.toggleView($(e.currentTarget).attr("data-view"));
      _.delay((function() {
        return that.refreshCodeMirror();
      }), 1);
      return false;
    };

    Post.prototype._toggleMeta = function(e) {
      var that;
      that = this;
      if (e) {
        e.preventDefault();
      }
      $(".toggle.meta").toggleClass("active");
      $(".metadata").toggle();
      _.delay((function() {
        return that.refreshCodeMirror();
      }), 1);
      return false;
    };

    Post.prototype.refreshCodeMirror = function() {
      if ($(".toggle.meta").hasClass("active")) {
        $(".CodeMirror-scroll").height($(".document").height() / 2);
      } else {
        $(".CodeMirror-scroll").height($(".document").height());
      }
      this.editor.refresh();
      if (this.metadataEditor) {
        this.metadataEditor.refresh();
      }
      return this.toggleShare();
    };

    Post.prototype.toggleView = function(view) {
      this.view = view;
      if (view === "preview") {
        this.model.preview = true;
        this.$(".post-content").html(marked(this.model.content));
      } else {
        this.model.preview = false;
      }
      this.hideMeta();
      this.updateURL();
      $(".toggle").removeClass("active");
      $(".toggle." + view).addClass("active");
      $(".document .surface").removeClass("preview cheatsheet compose");
      return $(".document .surface").addClass(view);
    };

    Post.prototype.hideMeta = function() {
      $(".toggle.meta").removeClass("active");
      return $(".metadata").hide();
    };

    Post.prototype.right = function() {
      var view;
      view = $(".toggle.active").attr("data-view");
      if (view === "preview") {
        return;
      }
      if (view === "compose") {
        return this.toggleView("preview");
      }
      return this.toggleView("compose");
    };

    Post.prototype.left = function() {
      var view;
      view = $(".toggle.active").attr("data-view");
      if (view === "cheatsheet") {
        return;
      }
      if (view === "compose") {
        return this.toggleView("cheatsheet");
      }
      return this.toggleView("compose");
    };

    Post.prototype.initialize = function() {
      this.dmp = new diff_match_patch();
      this.mode = "edit";
      this.prevContent = this.serialize();
      if (!window.shortcutsRegistered) {
        key("⌘+s, ctrl+s", _.bind(function() {
          this.updateFile();
          return false;
        }, this));
        key("ctrl+shift+right", _.bind(function() {
          this.right();
          return false;
        }, this));
        key("ctrl+shift+left", _.bind(function() {
          this.left();
          return false;
        }, this));
        key("esc", _.bind(function() {
          this.toggleView("compose");
          return false;
        }, this));
        return window.shortcutsRegistered = true;
      }
    };

    Post.prototype.parseMetadata = function(metadata) {
      metadata = this.metadataEditor.getValue();
      if (!metadata) {
        return {};
      }
      try {
        return jsyaml.load(metadata);
      } catch (err) {
        return null;
      }
    };

    Post.prototype.updateMetaData = function() {
      var published, updatePublished;
      updatePublished = function(yamlStr, published) {
        var regex;
        regex = /published: (false|true)/;
        if (yamlStr.match(regex)) {
          return yamlStr.replace(regex, "published: " + !!published);
        } else {
          return yamlStr + "\npublished: " + !!published;
        }
      };
      if (!this.model.jekyll) {
        return true;
      }
      this.model.raw_metadata = this.metadataEditor.getValue();
      published = this.$("#post_published").prop("checked");
      this.model.raw_metadata = updatePublished(this.model.raw_metadata, published);
      this.metadataEditor.setValue(this.model.raw_metadata);
      if (published) {
        $("#post").addClass("published");
      } else {
        $("#post").removeClass("published");
      }
      return true;
    };

    Post.prototype.updateFilename = function(filepath, cb) {
      var finish, that;
      finish = function() {
        that.model.path = app.state.path;
        that.model.file = app.state.file;
        app.instance.header.render();
        return that.updateURL();
      };
      that = this;
      if (!_.validPathname(filepath)) {
        return cb("error");
      }
      app.state.path = this.model.path;
      app.state.file = _.extractFilename(filepath)[1];
      app.state.path = _.extractFilename(filepath)[0];
      if (this.model.persisted) {
        return movePost(app.state.user, app.state.repo, app.state.branch, _.filepath(this.model.path, this.model.file), filepath, _.bind(function(err) {
          if (!err) {
            finish();
          }
          if (err) {
            return cb("error");
          } else {
            return cb(null);
          }
        }, this));
      } else {
        finish();
        return cb(null);
      }
    };

    Post.prototype.serialize = function() {
      return serialize(this.model.content, (this.model.jekyll ? this.model.raw_metadata : null));
    };

    Post.prototype.updateSaveState = function(label, classes) {
      return $(".button.save").html(label).removeClass("inactive error saving").addClass(classes);
    };

    Post.prototype.sendPatch = function(filepath, filename, filecontent, message) {
      var patch, that;
      patch = function() {
        if (that.updateMetaData()) {
          that.model.content = that.prevContent;
          that.editor.setValue(that.prevContent);
          return patchFile(app.state.user, app.state.repo, app.state.branch, filepath, filecontent, message, function(err) {
            if (err) {
              _.delay((function() {
                that.$(".button.save").html("SUBMIT CHANGE");
                that.$(".button.save").removeClass("error");
                return that.$(".button.save").addClass("inactive");
              }), 3000);
              that.updateSaveState("! Try again in 30 seconds", "error");
              return;
            }
            that.dirty = false;
            that.model.persisted = true;
            that.model.file = filename;
            that.updateURL();
            that.prevContent = filecontent;
            return that.updateSaveState("CHANGE SUBMITTED", "inactive");
          });
        } else {
          return that.updateSaveState("! Metadata", "error");
        }
      };
      that = this;
      that.updateSaveState("SUBMITTING CHANGE ...", "inactive saving");
      patch();
      return false;
    };

    Post.prototype.saveFile = function(filepath, filename, filecontent, message) {
      var save, that;
      save = function() {
        if (that.updateMetaData()) {
          return saveFile(app.state.user, app.state.repo, app.state.branch, filepath, filecontent, message, function(err) {
            if (err) {
              _.delay((function() {
                return that._makeDirty();
              }), 3000);
              that.updateSaveState("! Try again in 30 seconds", "error");
              return;
            }
            that.dirty = false;
            that.model.persisted = true;
            that.model.file = filename;
            that.updateURL();
            that.prevContent = filecontent;
            return that.updateSaveState("SAVED", "inactive");
          });
        } else {
          return that.updateSaveState("! Metadata", "error");
        }
      };
      that = this;
      that.updateSaveState("SAVING ...", "inactive saving");
      if (filepath === _.filepath(this.model.path, this.model.file)) {
        return save();
      }
      return this.updateFilename(filepath, function(err) {
        if (err) {
          return that.updateSaveState("! Filename", "error");
        } else {
          return save();
        }
      });
    };

    Post.prototype.updateFile = function() {
      var filecontent, filename, filepath, message, method, that;
      that = this;
      filepath = $("input.filepath").val();
      filename = _.extractFilename(filepath)[1];
      filecontent = this.serialize();
      message = this.$(".commit-message").val() || this.$(".commit-message").attr("placeholder");
      method = (this.model.writeable ? this.saveFile : this.sendPatch);
      this.model.content = this.editor.getValue();
      return method.call(this, filepath, filename, filecontent, message);
    };

    Post.prototype.keyMap = function() {
      var that;
      that = this;
      return {
        "Shift-Ctrl-Left": function(codemirror) {
          return that.left();
        },
        "Shift-Ctrl-Right": function(codemirror) {
          return that.right();
        },
        "Shift-Ctrl-M": function(codemirror) {
          return that._toggleMeta();
        },
        "Ctrl-S": function(codemirror) {
          return that.updateFile();
        }
      };
    };

    Post.prototype.initEditor = function() {
      var that;
      that = this;
      return setTimeout((function() {
        if (that.model.jekyll) {
          that.metadataEditor = CodeMirror($("#raw_metadata")[0], {
            mode: "yaml",
            value: that.model.raw_metadata,
            theme: "prose-dark",
            lineWrapping: true,
            lineNumbers: true,
            extraKeys: that.keyMap(),
            onChange: _.bind(that._makeDirty, that)
          });
          $("#post .metadata").hide();
        }
        that.editor = CodeMirror($("#code")[0], {
          mode: that.model.lang,
          value: that.model.content,
          lineWrapping: true,
          lineNumbers: true,
          extraKeys: that.keyMap(),
          matchBrackets: true,
          theme: "prose-bright",
          onChange: _.bind(that._makeDirty, that)
        });
        return that.refreshCodeMirror();
      }), 100);
    };

    Post.prototype.render = function() {
      var that;
      that = this;
      $(this.el).html(app.templates.post(_.extend(this.model, {
        mode: this.mode
      })));
      if (this.model.published) {
        $(this.el).addClass("published");
      }
      this.initEditor();
      return this;
    };

    Post.prototype.toggleShare = function() {
      if ($('#share').is(':checked')) {
        return this.initShare();
      } else {
        return this.endShare();
      }
    };

    Post.prototype.initShare = function() {
      var _this = this;
      return sharejs.open(this.slug(), "text", "{{ site.share_url }}", function(error, newDoc) {
        if (app.doc != null) {
          _this.endShare();
        }
        app.doc = newDoc;
        if (error) {
          console.error(error);
          return;
        }
        return app.doc.attach_cm(_this.editor, true);
      });
    };

    Post.prototype.endShare = function() {
      if (app.doc == null) {
        return;
      }
      app.doc.close();
      return app.doc.detach_cm();
    };

    Post.prototype.slug = function() {
      return Backbone.history.fragment.replace(/\//g, '-');
    };

    return Post;

  })(Backbone.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Posts = (function(_super) {

    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.events = {
      "click a.link": "_loading",
      "keyup #search_str": "_search",
      "click a.switch-branch": "_toggleBranchSelection"
    };

    Posts.prototype._toggleBranchSelection = function() {
      this.$(".branch-wrapper .branches").toggle();
      return false;
    };

    Posts.prototype.initialize = function(options) {};

    Posts.prototype._search = function() {
      return _.delay(_.bind(function() {
        var searchstr;
        searchstr = this.$("#search_str").val();
        this.model = getFiles(this.model.tree, app.state.path, searchstr);
        return this.renderResults();
      }, this), 10);
    };

    Posts.prototype._loading = function(e) {
      return $(e.currentTarget).addClass("loading");
    };

    Posts.prototype.semantifyPaths = function(paths) {
      return _.map(paths, function(path) {
        return {
          path: path,
          name: path
        };
      });
    };

    Posts.prototype.renderResults = function() {
      var caption, searchstr;
      this.$("#files").html(app.templates.files(_.extend(this.model, app.state, {
        current_path: app.state.path
      })));
      caption = this.model.files.length + "";
      searchstr = this.$("#search_str").val();
      if (searchstr) {
        caption += " matches";
      } else {
        caption += " files";
      }
      return this.$(".results").html(caption);
    };

    Posts.prototype.render = function() {
      var that;
      that = this;
      $(this.el).html(app.templates.posts(_.extend(this.model, app.state, {
        current_path: app.state.path
      })));
      _.delay((function() {
        that.renderResults();
        return $("#search_str").focus();
      }), 1);
      return this;
    };

    return Posts;

  })(Backbone.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Profile = (function(_super) {

    __extends(Profile, _super);

    function Profile() {
      return Profile.__super__.constructor.apply(this, arguments);
    }

    Profile.prototype.id = "start";

    Profile.prototype.render = function() {
      $(this.el).html(app.templates.profile(this.model));
      return this;
    };

    return Profile;

  })(Backbone.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.views.Start = (function(_super) {

    __extends(Start, _super);

    function Start() {
      return Start.__super__.constructor.apply(this, arguments);
    }

    Start.prototype.id = "start";

    Start.prototype.events = {
      "submit #login_form": "_login"
    };

    Start.prototype._login = function() {
      var password, self, user;
      self = this;
      user = self.$("#github_user").val();
      password = self.$("#github_password").val();
      login({
        username: user,
        password: password
      }, function(err) {
        if (err) {
          return self.$(".bad-credentials").show();
        }
        return window.location.reload();
      });
      return false;
    };

    Start.prototype.render = function() {
      $(this.el).html(app.templates.start(this.model));
      if (!window.authenticated) {
        $("#header").hide();
      }
      return this;
    };

    return Start;

  })(app.views.Profile);

}).call(this);

(function() {

  authenticate();

  loadApplication(function(err, data) {
    window.app.instance = new app.views.Application({
      el: '#container',
      model: data
    }).render();
    if (err) {
      return app.instance.notify('error', 'Error while loading data from Github. This might be a temporary issue. Please try again later.');
    }
    window.router = new app.routers.Application();
    return Backbone.history.start();
  });

  window.onbeforeunload = function(event) {
    var conf;
    conf = App.instance.confirmExit(e);
    if (c === true) {
      return null;
    }
    event = event || window.event;
    if (event) {
      event.returnValue = conf;
    }
    return conf;
  };

}).call(this);
