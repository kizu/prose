// Generated by CoffeeScript 1.4.0
(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w=[].slice,E=function(e,t){return function(){return e.apply(t,arguments)}},S=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};window.sharejs=f={version:"0.5.0"},typeof WEB=="undefined"&&(window.WEB=!0),p=typeof WEB!="undefined"&&WEB!==null?function(e){return setTimeout(e,0)}:process.nextTick,r=function(){function e(){}return e.prototype.on=function(e,t){var n;return this._events||(this._events={}),(n=this._events)[e]||(n[e]=[]),this._events[e].push(t),this},e.prototype.removeListener=function(e,t){var n,r,i,s=this;this._events||(this._events={}),r=(i=this._events)[e]||(i[e]=[]),n=0;while(n<r.length)r[n]===t&&(r[n]=void 0),n++;return p(function(){var t;return s._events[e]=function(){var n,r,i,s;i=this._events[e],s=[];for(n=0,r=i.length;n<r;n++)t=i[n],t&&s.push(t);return s}.call(s)}),this},e.prototype.emit=function(){var e,t,n,r,i,s,o;t=arguments[0],e=2<=arguments.length?w.call(arguments,1):[];if((s=this._events)!=null?!s[t]:!void 0)return this;o=this._events[t];for(r=0,i=o.length;r<i;r++)n=o[r],n&&n.apply(this,e);return this},e}(),r.mixin=function(e){var t;return t=e.prototype||e,t.on=r.prototype.on,t.removeListener=r.prototype.removeListener,t.emit=r.prototype.emit,e};if(typeof WEB=="undefined"||WEB===null)module.exports=r;f._bt=o=function(e,t,n,r){var i,s;return i=function(e,n,r,i){return t(r,e,n,"left"),t(i,n,e,"right")},e.transformX=e.transformX=s=function(e,t){var o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T;n(e),n(t),l=[];for(v=0,b=t.length;v<b;v++){d=t[v],f=[],o=0;while(o<e.length){c=[],i(e[o],d,f,c),o++;if(c.length!==1){if(c.length===0){x=e.slice(o);for(m=0,w=x.length;m<w;m++)u=x[m],r(f,u);d=null;break}T=s(e.slice(o),c),a=T[0],p=T[1];for(g=0,E=a.length;g<E;g++)u=a[g],r(f,u);for(y=0,S=p.length;y<S;y++)h=p[y],r(l,h);d=null;break}d=c[0]}d!=null&&r(l,d),e=f}return[e,l]},e.transform=e.transform=function(e,n,r){var i,o,u,a,f;if(r!=="left"&&r!=="right")throw new Error("type must be 'left' or 'right'");return n.length===0?e:e.length===1&&n.length===1?t([],e[0],n[0],r):r==="left"?(a=s(e,n),i=a[0],u=a[1],i):(f=s(n,e),u=f[0],o=f[1],o)}},typeof WEB=="undefined"&&(f.bootstrapTransform=o),v={},v.name="text",v.create=function(){return""},d=function(e,t,n){return e.slice(0,t)+n+e.slice(t)},u=function(e){var t,n;if(typeof e.p!="number")throw new Error("component missing position field");n=typeof e.i,t=typeof e.d;if(!(n==="string"^t==="string"))throw new Error("component needs an i or d field");if(!(e.p>=0))throw new Error("position cannot be negative")},a=function(e){var t,n,r;for(n=0,r=e.length;n<r;n++)t=e[n],u(t);return!0},v.apply=function(e,t){var n,r,i,s;a(t);for(i=0,s=t.length;i<s;i++){n=t[i];if(n.i!=null)e=d(e,n.p,n.i);else{r=e.slice(n.p,n.p+n.d.length);if(n.d!==r)throw new Error("Delete component '"+n.d+"' does not match deleted text '"+r+"'");e=e.slice(0,n.p)+e.slice(n.p+n.d.length)}}return e},v._append=s=function(e,t){var n,r,i;if(t.i===""||t.d==="")return;return e.length===0?e.push(t):(n=e[e.length-1],n.i!=null&&t.i!=null&&n.p<=(r=t.p)&&r<=n.p+n.i.length?e[e.length-1]={i:d(n.i,t.p-n.p,t.i),p:n.p}:n.d!=null&&t.d!=null&&t.p<=(i=n.p)&&i<=t.p+t.d.length?e[e.length-1]={d:d(t.d,n.p-t.p,n.d),p:t.p}:e.push(t))},v.compose=function(e,t){var n,r,i,o;a(e),a(t),r=e.slice();for(i=0,o=t.length;i<o;i++)n=t[i],s(r,n);return r},v.compress=function(e){return v.compose([],e)},v.normalize=function(e){var t,n,r,i,o;n=[];if(e.i!=null||e.p!=null)e=[e];for(r=0,i=e.length;r<i;r++)t=e[r],(o=t.p)==null&&(t.p=0),s(n,t);return n},g=function(e,t,n){return t.i!=null?t.p<e||t.p===e&&n?e+t.i.length:e:e<=t.p?e:e<=t.p+t.d.length?t.p:e-t.d.length},v.transformCursor=function(e,t,n){var r,i,s,o;i=n==="right";for(s=0,o=t.length;s<o;s++)r=t[s],e=g(e,r,i);return e},v._tc=m=function(e,t,n,r){var i,o,u,f,l,c;a([t]),a([n]);if(t.i!=null)s(e,{i:t.i,p:g(t.p,n,r==="right")});else if(n.i!=null)c=t.d,t.p<n.p&&(s(e,{d:c.slice(0,n.p-t.p),p:t.p}),c=c.slice(n.p-t.p)),c!==""&&s(e,{d:c,p:t.p+n.i.length});else if(t.p>=n.p+n.d.length)s(e,{d:t.d,p:t.p-n.d.length});else if(t.p+t.d.length<=n.p)s(e,t);else{f={d:"",p:t.p},t.p<n.p&&(f.d=t.d.slice(0,n.p-t.p)),t.p+t.d.length>n.p+n.d.length&&(f.d+=t.d.slice(n.p+n.d.length-t.p)),u=Math.max(t.p,n.p),o=Math.min(t.p+t.d.length,n.p+n.d.length),i=t.d.slice(u-t.p,o-t.p),l=n.d.slice(u-n.p,o-n.p);if(i!==l)throw new Error("Delete ops delete different text in the same region of the document");f.d!==""&&(f.p=g(f.p,n),s(e,f))}return e},h=function(e){return e.i!=null?{d:e.i,p:e.p}:{i:e.d,p:e.p}},v.invert=function(e){var t,n,r,i,s;i=e.slice().reverse(),s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(h(t));return s},typeof WEB!="undefined"&&WEB!==null?(f.types||(f.types={}),o(v,m,a,s),f.types.text=v):(module.exports=v,require("./helpers").bootstrapTransform(v,m,a,s)),typeof WEB=="undefined"&&(v=require("./text")),v.api={provides:{text:!0},getLength:function(){return this.snapshot.length},getText:function(){return this.snapshot},insert:function(e,t,n){var r;return r=[{p:e,i:t}],this.submitOp(r,n),r},del:function(e,t,n){var r;return r=[{p:e,d:this.snapshot.slice(e,e+t)}],this.submitOp(r,n),r},_register:function(){return this.on("remoteop",function(e){var t,n,r,i;i=[];for(n=0,r=e.length;n<r;n++)t=e[n],t.i!==void 0?i.push(this.emit("insert",t.p,t.i)):i.push(this.emit("delete",t.p,t.d));return i})}};if(typeof WEB=="undefined"||WEB===null)y=require("../types");typeof WEB!="undefined"&&WEB!==null&&(f.extendDoc=function(e,t){return n.prototype[e]=t}),n=function(){function e(e,t,n){this.connection=e,this.name=t,this.shout=E(this.shout,this),this.flush=E(this.flush,this),n||(n={}),this.version=n.v,this.snapshot=n.snaphot,n.type&&this._setType(n.type),this.state="closed",this.autoOpen=!1,this._create=n.create,this.inflightOp=null,this.inflightCallbacks=[],this.inflightSubmittedIds=[],this.pendingOp=null,this.pendingCallbacks=[],this.serverOps={}}return e.prototype._xf=function(e,t){var n,r;return this.type.transformX?this.type.transformX(e,t):(n=this.type.transform(e,t,"left"),r=this.type.transform(t,e,"right"),[n,r])},e.prototype._otApply=function(e,t){var n;n=this.snapshot,this.snapshot=this.type.apply(this.snapshot,e),this.emit("change",e,n);if(t)return this.emit("remoteop",e,n)},e.prototype._connectionStateChanged=function(e,t){switch(e){case"disconnected":this.state="closed",this.inflightOp&&this.inflightSubmittedIds.push(this.connection.id),this.emit("closed");break;case"ok":this.autoOpen&&this.open();break;case"stopped":typeof this._openCallback=="function"&&this._openCallback(t)}return this.emit(e,t)},e.prototype._setType=function(e){var t,n,r;typeof e=="string"&&(e=y[e]);if(!e||!e.compose)throw new Error("Support for types without compose() is not implemented");this.type=e;if(e.api){r=e.api;for(t in r)n=r[t],this[t]=n;return typeof this._register=="function"?this._register():void 0}return this.provides={}},e.prototype._onMessage=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w;switch(!1){case e.open!==!0:return this.state="open",this._create=!1,this.created==null&&(this.created=!!e.create),e.type&&this._setType(e.type),e.create?(this.created=!0,this.snapshot=this.type.create()):(this.created!==!0&&(this.created=!1),e.snapshot!==void 0&&(this.snapshot=e.snapshot)),e.meta&&(this.meta=e.meta),e.v!=null&&(this.version=e.v),this.inflightOp?(u={doc:this.name,op:this.inflightOp,v:this.version},this.inflightSubmittedIds.length&&(u.dupIfSource=this.inflightSubmittedIds),this.connection.send(u)):this.flush(),this.emit("open"),typeof this._openCallback=="function"?this._openCallback(null):void 0;case e.open!==!1:return e.error&&(typeof console!="undefined"&&console!==null&&console.error("Could not open document: "+e.error),this.emit("error",e.error),typeof this._openCallback=="function"&&this._openCallback(e.error)),this.state="closed",this.emit("closed"),typeof this._closeCallback=="function"&&this._closeCallback(),this._closeCallback=null;case e.op!==null||r!=="Op already submitted":break;case!(e.op===void 0&&e.v!==void 0||e.op&&(d=e.meta.source,S.call(this.inflightSubmittedIds,d)>=0)):i=this.inflightOp,this.inflightOp=null,this.inflightSubmittedIds.length=0,r=e.error;if(r){this.type.invert?(a=this.type.invert(i),this.pendingOp&&(v=this._xf(this.pendingOp,a),this.pendingOp=v[0],a=v[1]),this._otApply(a,!0)):this.emit("error","Op apply failed ("+r+") and the op could not be reverted"),m=this.inflightCallbacks;for(l=0,h=m.length;l<h;l++)t=m[l],t(r)}else{if(e.v!==this.version)throw new Error("Invalid version from server");this.serverOps[this.version]=i,this.version++,this.emit("acknowledge",i),g=this.inflightCallbacks;for(c=0,p=g.length;c<p;c++)t=g[c],t(null,i)}return this.flush();case!e.op:if(e.v<this.version)return;if(e.doc!==this.name)return this.emit("error","Expected docName '"+this.name+"' but got "+e.doc);if(e.v!==this.version)return this.emit("error","Expected version "+this.version+" but got "+e.v);return s=e.op,this.serverOps[this.version]=s,n=s,this.inflightOp!==null&&(y=this._xf(this.inflightOp,n),this.inflightOp=y[0],n=y[1]),this.pendingOp!==null&&(b=this._xf(this.pendingOp,n),this.pendingOp=b[0],n=b[1]),this.version++,this._otApply(n,!0);case!e.meta:w=e.meta,o=w.path,f=w.value;switch(o!=null?o[0]:void 0){case"shout":return this.emit("shout",f);default:return typeof console!="undefined"&&console!==null?console.warn("Unhandled meta op:",e):void 0}break;default:return typeof console!="undefined"&&console!==null?console.warn("Unhandled document message:",e):void 0}},e.prototype.flush=function(){if(this.connection.state!=="ok"||this.inflightOp!==null||this.pendingOp===null)return;return this.inflightOp=this.pendingOp,this.inflightCallbacks=this.pendingCallbacks,this.pendingOp=null,this.pendingCallbacks=[],this.connection.send({doc:this.name,op:this.inflightOp,v:this.version})},e.prototype.submitOp=function(e,t){return this.type.normalize!=null&&(e=this.type.normalize(e)),this.snapshot=this.type.apply(this.snapshot,e),this.pendingOp!==null?this.pendingOp=this.type.compose(this.pendingOp,e):this.pendingOp=e,t&&this.pendingCallbacks.push(t),this.emit("change",e),setTimeout(this.flush,0)},e.prototype.shout=function(e){return this.connection.send({doc:this.name,meta:{path:["shout"],value:e}})},e.prototype.open=function(e){var t,n=this;this.autoOpen=!0;if(this.state!=="closed")return;return t={doc:this.name,open:!0},this.snapshot===void 0&&(t.snapshot=null),this.type&&(t.type=this.type.name),this.version!=null&&(t.v=this.version),this._create&&(t.create=!0),this.connection.send(t),this.state="opening",this._openCallback=function(t){return n._openCallback=null,typeof e=="function"?e(t):void 0}},e.prototype.close=function(e){return this.autoOpen=!1,this.state==="closed"?typeof e=="function"?e():void 0:(this.connection.send({doc:this.name,open:!1}),this.state="closed",this.emit("closing"),this._closeCallback=e)},e}();if(typeof WEB=="undefined"||WEB===null)r=require("./microevent");r.mixin(n),f.Doc=n,typeof WEB!="undefined"&&WEB!==null?(y=f.types,e=window.BCSocket,i=window.SockJS):(y=require("../types"),e=require("browserchannel").BCSocket,n=require("./doc").Doc),t=function(){function t(t,n){var r=this;this.docs={},this.state="connecting",this.socket=typeof b!="undefined"&&b!==null?new i(t):new e(t,{reconnect:!0}),this.socket.send({auth:n?n:null}),this.socket.onmessage=function(e){var t;typeof b!="undefined"&&b!==null&&(e=JSON.parse(e.data));if(e.auth===null)return r.lastError=e.error,r.disconnect(),r.emit("connect failed",e.error);if(e.auth){r.id=e.auth,r.setState("ok");return}return t=e.doc,t!==void 0?r.lastReceivedDoc=t:e.doc=t=r.lastReceivedDoc,r.docs[t]?r.docs[t]._onMessage(e):typeof console!="undefined"&&console!==null?console.error("Unhandled message",e):void 0},this.connected=!1,this.socket.onclose=function(e){r.setState("disconnected",e);if(e==="Closed"||e==="Stopped by server")return r.setState("stopped",r.lastError||e)},this.socket.onerror=function(e){return r.emit("error",e)},this.socket.onopen=function(){return r.lastError=r.lastReceivedDoc=r.lastSentDoc=null,r.setState("handshaking")},this.socket.onconnecting=function(){return r.setState("connecting")}}return t.prototype.setState=function(e,t){var n,r,i,s;if(this.state===e)return;this.state=e,e==="disconnected"&&delete this.id,this.emit(e,t),i=this.docs,s=[];for(r in i)n=i[r],s.push(n._connectionStateChanged(e,t));return s},t.prototype.send=function(e){var t;return t=e.doc,t===this.lastSentDoc?delete e.doc:this.lastSentDoc=t,typeof b!="undefined"&&b!==null&&(e=JSON.stringify(e)),this.socket.send(e)},t.prototype.disconnect=function(){return this.socket.close()},t.prototype.makeDoc=function(e,t,r){var i,s=this;if(this.docs[e])throw new Error("Doc "+e+" already open");return i=new n(this,e,t),this.docs[e]=i,i.open(function(t){return t&&delete s.docs[e],r(t,t?void 0:i)})},t.prototype.openExisting=function(e,t){var n;return this.state==="stopped"?t("connection closed"):this.docs[e]?t(null,this.docs[e]):n=this.makeDoc(e,{},t)},t.prototype.open=function(e,t,n){var r;if(this.state==="stopped")return n("connection closed");if(this.state==="connecting"){this.on("handshaking",function(){return this.open(e,t,n)});return}typeof t=="function"&&(n=t,t="text"),n||(n=function(){}),typeof t=="string"&&(t=y[t]);if(!t)throw new Error("OT code for document type missing");if(e==null)throw new Error("Server-generated random doc names are not currently supported");if(this.docs[e]){r=this.docs[e],r.type===t?n(null,r):n("Type mismatch",r);return}return this.makeDoc(e,{create:!0,type:t.name},n)},t}();if(typeof WEB=="undefined"||WEB===null)r=require("./microevent");r.mixin(t),f.Connection=t;if(typeof WEB!="undefined"&&WEB!==null){l=window.BCSocket!==void 0,c=window.SockJS!==void 0;if(!l&&!c)throw new Error("Must load socks or browserchannel before this library");c&&!l&&(b=!0)}else t=require("./connection").Connection;f.open=function(){var e,n,r;return e={},n=function(n,r){var i,s,o,u;return typeof WEB!="undefined"&&WEB!==null&&(o=window.location,u=b?"sockjs":"channel",n==null&&(n=""+o.protocol+"//"+o.host+"/"+u)),e[n]||(i=new t(n,r),s=function(){return delete e[n]},i.on("disconnected",s),i.on("connect failed",s),e[n]=i),e[n]},r=function(e){var t,n,r,i;r=0,i=e.docs;for(n in i)t=i[n],(t.state!=="closed"||t.autoOpen)&&r++;if(r===0)return e.disconnect()},function(e,t,i,s){var o,u,a;return typeof i=="function"&&(s=i,i={}),typeof i=="string"&&(i={origin:i}),a=i.origin,o=i.authentication,u=n(a,o),u.numDocs++,u.open(e,t,function(e,t){return e?(s(e),r(u)):(t.on("closed",function(){return r(u)}),s(null,t))}),u.on("connect failed"),u}}();if(typeof WEB=="undefined"||WEB===null)f.Doc=require("./doc").Doc,f.Connection=require("./connection").Connection}).call(this);