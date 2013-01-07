this.app=this.app||{},this.app.templates=this.app.templates||{},this.app.templates.files=function(obj){var __p="";with(obj||{})__p+="",_.each(files,function(e){__p+="\n  ",__p+="tree"===e.type?"\n    <!-- folders -->\n    <a class='link folder' href='#"+user+"/"+repo+"/tree/"+branch+(e.path?"/"+e.path:"")+'\'>\n      <div class="filename">'+(e.path===_.parentPath(current_path)?"..":e.name)+"</div>\n    </a>\n  ":" \n    <!-- files -->\n    <a class='link load-post toggle-view' href='#"+user+"/"+repo+"/edit/"+branch+"/"+e.path+'\'>\n      <div class="filename">'+(e.name||"Untitled")+"</div>\n    </a>\n  ",__p+="\n"}),__p+="";return __p},this.app.templates.header=function(obj){var __p="";with(obj||{})__p+="<div class=\"navigation clearfix\">\n  <a href='/{{site.baseurl}}' class='title'><span>Prose</span></a>\n\n  ",state.repo?(__p+="\n    ",state.path,__p+='\n\n    <a class="user" href="#'+[state.user].join("/")+'">'+state.user+"</a>\n    ",state.repo&&(__p+='\n      <a class="repo" href="#'+[state.user,state.repo,"tree",state.branch].join("/")+'">\n        '+state.repo+"\n      </a>\n    "),__p+="\n\n  "):__p+="\n    "+app.state.title+"\n  ",__p+="\n\n  <div class='user-status"+(window.authenticated?"":" logged-out")+"'>\n  ",__p+=window.authenticated?"\n    "+app.username+' <a class="logout" href="#">Logout</a>\n  ':'\n      <a class="button" href="https://github.com/login/oauth/authorize?client_id={{site.oauth_client_id}}&scope=repo,user,gist&redirect_uri='+encodeURIComponent(window.location.href)+'">Sign in using Github</a>\n  ',__p+="\n  </div>\n  ",state.file&&(__p+='\n    <a class="browse-files" href="#'+[state.user,state.repo,"tree",state.branch,state.path].join("/")+'">\n      Browse Files\n    </a>\n  '),__p+="\n</div>\n";return __p},this.app.templates.notification=function(obj){var __p="";with(obj||{})__p+="",__p+=window.authenticated?'\n  <div class="notification '+type+'">\n    '+message+' \n  </div>\n  <a class="button" href="../">Go back </a>\n':'\n  <div class="notification '+type+'">\n    Please login with your GitHub account to access that project.\n  </div>\n  <a class="button" href="https://github.com/login/oauth/authorize?client_id={{site.oauth_client_id}}&scope=repo, user&redirect_uri='+encodeURIComponent(window.location.href)+'">Sign in</a>\n',__p+="";return __p},this.app.templates.post=function(obj){var __p="";with(obj||{})__p+='\n<div class="document-menu">\n  <div class="document-menu-content">\n    \n    <div class="fl filename">\n      <input type="text" class="filepath" value="'+_.filepath(path,file)+'"/>\n      <div class="state"></div>\n    </div>\n\n    <div class="fl confirm-label">\n       Describe your changes:\n    </div>\n\n    <div class="fr menu-item save-state">\n      <input type="text" class="commit-message" value=""/>\n      <div class="state fl">\n        ',writeable&&(__p+="<a class='toggle-options button' href='#'>&nbsp;</a>"),__p+="\n        \n        ",window.authenticated&&(__p+="\n          <a class='cancel-save button' href='#' title=\"ESC\">X</a>\n          <a class='save button inactive' href='#' title=\"CTRL+S\">"+(writeable?"SAVE":"SUBMIT CHANGE")+"</a>\n        "),__p+="\n      </div>\n    </div>\n    \n    ",markdown&&window.authenticated&&(__p+="\n      ",jekyll&&(__p+='<a class="toggle meta fr menu-item" href="#" title="CTRL+SHIFT+M">Metadata</a> '),__p+='\n      <a data-view="preview" class=\'toggle view preview fr menu-item'+(preview?" active":"")+"' href='#' title=\"Use CTRL+SHIFT+Left/Right to navigate\">Preview document</a>\n      <a data-view=\"compose\" class='toggle view compose fr menu-item"+(preview?"":" active")+'\' title="Use CTRL+SHIFT+Left/Right to navigate" href=\'#\'>Compose document</a>\n      <a data-view="cheatsheet" class="toggle view cheatsheet fr menu-item" href="#" title="Use CTRL+SHIFT+Left/Right to navigate">Markdown reference sheet</a>\n    '),__p+="\n\n    ",window.authenticated||(__p+='\n      <div class="patch-hint">Sign in with GitHub to contribute to this file.</div>\n    '),__p+='\n\n    <div class="options">\n      ',jekyll&&markdown&&(__p+='\n        <div class="publish-state">\n          <input type="checkbox" id="post_published"'+(published?' checked="checked"':"")+"/> Published\n        </div>\n      "),__p+='\n      <div class="actions">\n        <a class="toggle delete button" href="#">Delete File</a>\n      </div>\n    </div>\n    <div class="status" title="Unpublished"></div>\n\n    <br class="clear"/>\n  </div>\n</div>\n\n\n<div class=\'inner clearfix\'>  \n  <div class=\'document prose\'>\n    ',jekyll&&(__p+='\n      <div class="metadata">\n        <div class="metadata-content">\n          <div id="raw_metadata"></div>\n        </div>\n      </div>\n    '),__p+='\n\n    <div class="diff-wrapper">\n      <div class="diff">\n        \n      </div>\n    </div>\n\n    <div class="surface'+(preview?" preview":" compose")+'">\n      <div class="cheatsheet-wrapper">\n        <div class="content">\n\n<div class="left">\n<h2>Headers</h2>\n<pre>\n# Header 1\n## Header 2\n### Header 3\n</pre>\n\n<h2>Text Annotations</h2>\n\n<pre>\n*This text will be emphasized.*\n**This text will be strong.**\nInline `code` in typewriter style\n</pre>\n\n<h2>Links</h2>\n\n<pre>\n[GitHub](http://github.com)\n</pre>\n\n<h2>Images</h2>\n\n<pre>\n![Alt text](/images/logo.png)\n</pre>\n\n<h2>Blockquotes</h2>\n\n<pre>\nWilliam Zinser:\n\n> Writing is thinking on paper. (no-more)\n</pre>\n</div>\n\n<div class="right">\n\n<h2>Unordered Lists</h2>\n\n<pre>\n* Item 1\n* Item 2\n  * Item 2a\n  * Item 2b\n</pre>\n\n<h2>Ordered Lists</h2>\n\n<pre>\n1. Item 1\n2. Item 2\n   * Item 2a\n   * Item 2b\n</pre>\n\n\n<h2>Code Blocks</h2>\n<pre>\nUse 4 spaces indentation:\n\n    function identity(x) {\n      return x;\n    }\n</pre>\n</div>\n\n        </div>\n      </div>\n\n      <div class="content-wrapper">\n        <div class="content">\n          <div id="code"></div>\n        </div>\n      </div>\n\n      <div class="content-preview-wrapper">\n        <div class="content-preview"><div class=\'post-content\'>\n          '+(markdown?marked(content):"")+"\n        </div></div>\n      </div>\n    </div>\n  </div>\n</div>\n";return __p},this.app.templates.posts=function(obj){var __p="";with(obj||{})__p+='<div class="search-menu-wrapper">\n  <div class="search-menu">\n    <div class="search"><input placeholder="Type to search" type="text" id="search_str"/></div>\n    <div class="results">'+files.length+' Files</div>\n\n    <div class="actions">\n      ',window.authenticated&&(__p+="\n        <a class='link new new-file' href='#"+user+"/"+repo+"/new/"+branch+(path?"/"+path:"")+"'>\n          New File\n        </a>\n      "),__p+='\n    </div>\n  </div>\n</div>\n\n<div class=\'inner\'>\n\n  <div class="breadcrumbs">\n    <div class="branch-wrapper">\n      <a class="branch" href="#'+[user,repo,"tree",branch].join("/")+'">\n        '+branch+"\n      </a>\n\n      ",app.state.branches.length>0&&(__p+='\n        <a class="switch-branch" href="#'+[user,repo,"tree",branch].join("/")+'">\n          &nbsp;&nbsp;&nbsp;\n        </a>\n        <div class="branches">\n          <div class="inner-branches">\n            <div class="arrow-up"></div>\n            ',_.each(app.state.branches,function(e){__p+='\n              <a class="select-branch" href="#'+[user,repo,"tree",e].join("/")+'">'+e+"</a>\n            "}),__p+="\n          </div>\n        </div>\n      "),__p+="\n\n    </div>\n\n    ",_.each(_.chunkedPath(path),function(e){__p+='\n      <div class="slash">/</div>\n      <a class="path" href="#'+[user,repo,"tree",branch,e.url].join("/")+'">'+e.name+"</a>\n    "}),__p+='\n    <br class="clear"/>\n  </div>\n\n  <div class=\'post-listing prose clearfix\'>\n\n    <div id="files">\n\n    </div>\n\n  </div>\n</div>\n';return __p},this.app.templates.profile=function(obj){var __p="";with(obj||{})__p+='<div id="profile_wrapper">\n  <div class="profile-header">\n    <div class="avatar"><img src="'+user.avatar_url+'" width="80" height="80"/></div>\n    <div class="user">\n      <div class="username">'+(user.name||user.login)+'</div>\n      <div class="subtitle">as <a href="http://github.com/'+user.login+'" target="_blank"><strong>'+user.login+"</strong></a> since "+new Date(user.created_at).toDateString()+'</div>\n    </div>\n  </div>\n  <div class="profile-details">\n    <div class="info">\n      <div class="location">\n        <span class="label">Located in</span> '+user.location+"\n      </div>\n      ",user.blog&&(__p+='\n      <div class="url">\n        <span class="label">Website at</span> <a href="'+user.blog+'" target="_blank">'+user.blog+"</a>\n      </div>\n      "),__p+="\n      ",user.company&&(__p+='\n        <div class="company">\n          <span class="label">Works at</span> '+user.company+"\n        </div>\n      "),__p+='\n    </div>\n    <div class="stats">\n      ',__p+="User"==user.type?'\n        <div class="item">\n          <a href="http://github.com/'+user.login+'/followers" target="_blank">\n            <div class="count">'+user.followers+'</div>\n            <div class="label">Followers</div>\n          </a>\n        </div>\n      ':'\n        <div class="item">\n          <a href="http://github.com/'+user.login+'/followers" target="_blank">\n           <div class="count">'+user.followers+'</div>\n           <div class="label">Followers</div>\n          </a>\n        </div>\n      ',__p+="\n    </div>\n  </div>\n</div>\n\n<h1>"+repos.length+' Repositories</h2>\n\n<div class="repos">\n    ',_.each(repos,function(e){__p+='\n      <a title=\'edit\' class="select-repo repo" data-user="'+e.owner.login+'" data-repo="'+e.name+"\" href='#"+e.owner.login+"/"+e.name+'\'>\n        <div class="name">'+e.name+'</div>\n        <div class="branches hidden"></div>\n      </a>\n    '}),__p+="\n</div>";return __p},this.app.templates.start=function(obj){var __p="";with(obj||{})__p+="<div class='start dialog clearfix'>\n  ",authenticated||(__p+='\n    <div class="splash">\n      <h2>Prose</h2>\n\n      <div class="authorize">\n        <p>Prose is a content editor for GitHub, optimized for managing websites.</p>\n        <p><a href="/about.html">Learn more.</a></p>\n        <a class="button" href="https://github.com/login/oauth/authorize?client_id={{site.oauth_client_id}}&scope=repo,user,gist">Authorize with GitHub</a>\n      </div>\n    </div>\n  '),__p+="\n</div>\n\n",authenticated&&(__p+="\n  ",organizations.length&&(__p+='\n    <h1>Organizations</h2>\n    <div class="organizations">\n    ',_.each(organizations,function(e){__p+='\n      <a class="organization" href="#'+e.login+'" title="'+e.login+'"><img src="'+e.avatar_url+'" width="80" height="80"/></a>\n    '}),__p+="\n    </div>\n  "),__p+="\n\n  <h1>Repositories</h2>\n  ",_.each(owners,function(e,t){__p+="\n    ",Object.keys(owners).length>1&&(__p+='\n      <div class="owner"><a href="#'+t+'">'+t+'</a>\n        <div class="repo-count">\n          '+e.length+" "+(e.length>1?"Repositories":"Repository")+"\n        </div>\n      </div>\n    "),__p+='\n    <div class="repos">\n        ',_.each(e,function(e){__p+="\n          <a title='edit' class=\"select-repo repo"+(e.private?" private":"")+'" data-user="'+e.owner.login+'" data-repo="'+e.name+"\" href='#"+e.owner.login+"/"+e.name+'\'>\n            <div class="name">'+e.name+"</div>\n          </a>\n        "}),__p+="\n    </div>\n  "}),__p+="\n"),__p+="";return __p};