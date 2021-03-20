(function(){if(!this.require){var e={},t={},n=function(s,o){var u=r(o,s),a=r(u,"./index"),f,l;f=t[u]||t[a];if(f)return f;if(l=e[u]||e[u=a])return f={id:u,exports:{}},t[u]=f.exports,l(f.exports,function(e){return n(e,i(u))},f),t[u]=f.exports;throw"module "+s+" not found"},r=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i==".."?n.pop():i!="."&&i!=""&&n.push(i);return n.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")};this.require=function(e){return n(e,"")},this.require.define=function(t){for(var n in t)e[n]=t[n]},this.require.modules=e,this.require.cache=t}return this.require}).call(this),this.require.define({"controllers/ticket_form_controller":function(e,t,n){var r=t("api/lotus"),i=Em.Object.extend(t("lib/ticket_forms_position_consumer"),{fieldsManager:null,ticketForm:null,ticketFieldsBinding:"fieldsManager.ticketFields",ticketFormFieldsBinding:"fieldsManager.ticketFormFields",ticketForms:r.ticketFormsData.ticketForms,init:function(){this._super.apply(this,arguments);var e=t("lib/fields_manager");this.set("fieldsManager",e.create({ticketForm:this.get("ticketForm")}))},onSaveTicketForm:function(){var e=this.get("ticketForm"),t=e.get("isNew"),n=this.get("fieldsManager.ticketFormFields").mapProperty("id");e.set("ticketFieldIds",n),e.get("displayName")||e.set("displayName",e.get("name"));var i=this.getTicketFormPosition(e,this.get("ticketForms"));e.set("position",i);var s=this.get("ticketForms");return s.saveTicketForm(e).done(function(){var n=t?"txt.ticket_forms.admin.has_been_created":"txt.ticket_forms.admin.has_been_updated";r.notify(I18n.t(n,{name:e.get("name")})),r.goToRoute("#/admin/ticket_forms")}),!1},onAddTicketFormField:function(e){var t=e.view.get("content");return e.view.$().slideUp(125,function(){this.get("fieldsManager").addTicketFormField(t)}.bind(this)),!1},addTicketFormFieldByName:function(e){return this.get("fieldsManager").addTicketFormFieldByName(e)},onRemoveTicketFormField:function(e){var t=e.view.get("content");return e.view.$().slideUp(125,function(){this.get("fieldsManager").removeTicketFormField(t)}.bind(this)),!1},onDeleteTicketForm:function(){var e=this.get("ticketForm"),t=this.get("ticketForms");return t.destroyTicketForm(e).done(function(){r.notify(I18n.t("txt.ticket_forms.admin.has_been_deleted",{name:e.get("name")})),r.goToRoute("#/admin/ticket_forms")}),!1},onDeactivateTicketForm:function(e){var t=this.get("ticketForm.name"),n=I18n.t("txt.ticket_forms.admin.has_been_deactivated",{name:t}),r=this;return this.get("ticketForm").constructor.deactivateForm(this.get("ticketForm")).done(function(){r._refreshAndNotify(e.view,n)}),!1},onActivateTicketForm:function(e){var t=this.get("ticketForm.name"),n=I18n.t("txt.ticket_forms.admin.has_been_activated",{name:t}),r=this;return this.get("ticketForm").constructor.activateForm(this.get("ticketForm")).done(function(){r._refreshAndNotify(e.view,n)}),!1},onCloneTicketForm:function(){var e=this.get("ticketForm");return r.goToRoute("#/admin/ticket_forms/clone/"+e.get("id")),!1},onSetTicketFormDefault:function(){var e=this.get("ticketForm"),t=this.get("ticketForms");return t.setDefaultTicketForm(e).done(function(){r.notify(I18n.t("txt.ticket_forms.admin.is_the_new_default",{name:e.get("name")}))}),!1},onCancelTicketFormUpdate:function(){return r.goToRoute("#/admin/ticket_forms"),!1},updateCustomFieldsOrder:function(e){this.get("fieldsManager.ticketFormsFieldsManager").updateCustomFieldsOrder(e)},_refreshAndNotify:function(e,t){e.get("parentView.controller").refreshContent().done(function(){r.notify(t)})}});n.exports=i}}),this.require.define({"controllers/ticket_forms_controller":function(e,t,n){var r=Em.Object.extend({ticketFormsData:t("api/lotus").ticketFormsData,working:!1,updateFormsOrder:function(e){var t=this.get("content").filterProperty("isActive",!1),n=this;return e=e.concat(t.mapProperty("id")),Em.Resource.ajax({type:"PUT",contentType:"application/json",url:"/api/v2/ticket_forms/reorder",data:JSON.stringify({ticket_form_ids:e})}).done(function(){n.refreshContent()})},refreshContent:function(){this.set("working",!0);var e=this;return this.get("ticketFormsData").ticketForms.refresh().done(function(){e.set("working",!1)})}});n.exports=r}}),this.require.define({"lib/fields_manager":function(e,t,n){var r=Em.Object.extend({ticketForm:null,ticketFields:null,ticketFormsFieldsManager:null,ticketFormFields:Em.computed.oneWay("ticketFormsFieldsManager.content"),init:function(){this._super.apply(this,arguments),this._setTicketFields();var e=t("lib/ticket_form_fields_manager").create();this.set("ticketFormsFieldsManager",e),this._setTicketFormFields()},addTicketFormField:function(e){this.get("ticketFormsFieldsManager").addField(e),this.get("ticketFields").removeObject(e)},addTicketFormFieldByName:function(e){var t=this.get("ticketFormFields").findProperty("title",e);return t||(t=this.get("ticketFields").findProperty("title",e),Ember.assert("No such field to add: "+e,t!=null),this.addTicketFormField(t)),t},removeTicketFormField:function(e){this.get("ticketFields").pushObject(e),this.get("ticketFormsFieldsManager").removeField(e)},_setTicketFields:function(){var e=this,n=t("api/lotus"),r=[];r.push.apply(r,n.allTicketFields()),e.set("ticketFields",r.filterProperty("active",!0))},_setTicketFormFields:function(){var e=this.get("ticketFields"),t=this.get("ticketFormsFieldsManager"),n=this.get("ticketForm"),r=this._fieldsToSet(n,e);t.addFields(r),e.removeObjects(r)},_fieldsToSet:function(e,t){return e.get("isNew")&&!e.get("ticketFieldIds")?t.filterProperty("isCustomField",!1):e.ticketFields()}});n.exports=r}}),this.require.define({"lib/ticket_form_fields_manager":function(e,t,n){var r=Em.Object.extend({systemFields:null,removableFields:null,customFields:null,init:function(){this._super.apply(this,arguments),this.set("systemFields",[]),this.set("removableFields",[]),this.set("customFields",[])},removeField:function(e){if(!e)return;this._getFieldBucket(e).removeObject(e)},addFields:function(e){var t=this;e.forEach(function(e){t.addField(e)})},addField:function(e){if(!e)return;var t=this._getFieldBucket(e),n=this._getInsertPositionInBucket(t,e);t.insertAt(n,e)},updateCustomFieldsOrder:function(e){if(!e)return;var t=[],n=this.get("customFields");e.forEach(function(e){var r=n.findProperty("title",e);Ember.assert("No such field to reposition: "+e,r!=null),t.push(r)}),this.set("customFields",t)},_getInsertPositionInBucket:function(e,t){var n;return t.get("type")=="tickettype"?n=0:n=e.get("length"),n},_getFieldBucket:function(e){var t;return e.get("isCustomField")?t=this.get("customFields"):e.get("removable")?t=this.get("removableFields"):t=this.get("systemFields"),t},content:function(){return this.get("systemFields").concat(this.get("removableFields")).concat(this.get("customFields"))}.property("systemFields.@each","removableFields.@each","customFields.@each")});n.exports=r}}),this.require.define({"lib/ticket_form_views":function(e,t,n){var r=t("api/lotus").ticketFormsData,i={ListView:t("views/ticket_forms_view").extend({ticketFormsData:r,init:function(){this._super.apply(this,arguments);var e=this.get("ticketFormsData").ticketForms.get("content");this.set("content",e),this.set("controller",t("controllers/ticket_forms_controller").create({content:e}))}}),CreateView:t("views/update_ticket_form_view").extend({ticketFormsData:r,setup:function(){var e=t("controllers/ticket_form_controller").create({ticketForm:this.get("ticketFormsData").TicketForm.create()});this.set("controller",e)}}),EditView:t("views/update_ticket_form_view").extend({ticketFormsData:r,setup:function(e){var n=this.get("ticketFormsData").TicketForm.create({id:e}),r=this;n.fetch().done(function(){var e=t("controllers/ticket_form_controller").create({ticketForm:n});r.set("controller",e)})}}),CloneView:t("views/update_ticket_form_view").extend({ticketFormsData:r,TicketFormController:t("controllers/ticket_form_controller"),setup:function(e){var t=this,n=this.get("ticketFormsData").TicketForm.create({id:e});n.fetch().done(function(){var e=t.get("TicketFormController").create({ticketForm:n.clone()});t.set("controller",e)})}})};n.exports=Object.seal(i)}}),this.require.define({"lib/ticket_forms_position_consumer":function(e,t,n){var r=Em.Mixin.create({getTicketFormPosition:function(e,t){var n;return e.get("isNew")?n=this.maxPosition(t)+1:n=e.get("position"),n},maxPosition:function(e){if(!e||e.length===0)return 0;var t=e.mapProperty("position");return _.max(t)}});n.exports=r}}),Ember.TEMPLATES["templates/ticket_field"]=Handlebars.template(function(t,n,r,i,s){r=r||Ember.Handlebars.helpers;var o="",u,a,f,l,c,h,p=this,d="function",v=r.helperMissing,m=void 0,g=this.escapeExpression;return s.buffer.push("<i "),u={},a=":left view.fieldType",u["class"]=a,c=r.bindAttr,a=c||n.bindAttr,h={},h.hash=u,h.contexts=[],h.data=s,typeof a===d?u=a.call(n,h):a===m?u=v.call(n,"bindAttr",h):u=a,s.buffer.push(g(u)+'></i>\n<span class="title">'),u=n,a="view.title",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+'</span>\n<i class="right icon-plus" '),u=n,a="onAddTicketFormField",f={},l="controller",f.target=l,c=r.action,l=c||n.action,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"action",a,h):u=l,s.buffer.push(g(u)+"></i>\n"),o}),Ember.TEMPLATES["templates/ticket_form"]=Handlebars.template(function(t,n,r,i,s){function y(e,t){var n="",i,s,o,u;return t.buffer.push('\n    <a href="#" '),i=e,s="onSetTicketFormDefault",o={},u="controller",o.target=u,c=r.action,u=c||e.action,h={},h.hash=o,h.contexts=[],h.contexts.push(i),h.data=t,typeof u===d?i=u.call(e,s,h):u===m?i=v.call(e,"action",s,h):i=u,t.buffer.push(g(i)+' class="form-action-left make-default">\n      '),i=e,s="txt.ticket_forms.admin.make_default_v2",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"\n    </a>\n  "),n}function b(e,t){var n="",i,s,o,u;return t.buffer.push('\n    <span class="bullet">&#149;</span>\n    <a href="#" '),i=e,s="onDeactivateTicketForm",o={},u="controller",o.target=u,c=r.action,u=c||e.action,h={},h.hash=o,h.contexts=[],h.contexts.push(i),h.data=t,typeof u===d?i=u.call(e,s,h):u===m?i=v.call(e,"action",s,h):i=u,t.buffer.push(g(i)+' class="form-action-right deactivate">\n      '),i=e,s="txt.ticket_forms.admin.deactivate_v2",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"\n    </a>\n  "),n}r=r||Ember.Handlebars.helpers;var o="",u,a,f,l,c,h,p=this,d="function",v=r.helperMissing,m=void 0,g=this.escapeExpression;return s.buffer.push('<div class="left">\n  <a href="'),u=n,a="ticketFormLink",c=r.unbound,f=c||n.unbound,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"unbound",a,h):u=f,s.buffer.push(g(u)+'" class="form-name"> '),u=n,a="content.name",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+" </a>\n  <span "),u={},a=":display-status content.isDefault:default",u["class"]=a,c=r.bindAttr,a=c||n.bindAttr,h={},h.hash=u,h.contexts=[],h.data=s,typeof a===d?u=a.call(n,h):a===m?u=v.call(n,"bindAttr",h):u=a,s.buffer.push(g(u)+"> "),u=n,a="flags",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+" </span>\n  "),u=n,a="isFormDefault",f=r.unless,h=p.program(1,y,s),h.hash={},h.contexts=[],h.contexts.push(u),h.fn=h,h.inverse=p.noop,h.data=s,u=f.call(n,a,h),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n</div>\n<div class="right">\n  <a href="#" '),u=n,a="onCloneTicketForm",f={},l="controller",f.target=l,c=r.action,l=c||n.action,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"action",a,h):u=l,s.buffer.push(g(u)+' class="form-action-right clone">\n    '),u=n,a="txt.ticket_forms.admin.clone",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+"\n  </a>\n  "),u=n,a="isFormDefault",f=r.unless,h=p.program(3,b,s),h.hash={},h.contexts=[],h.contexts.push(u),h.fn=h,h.inverse=p.noop,h.data=s,u=f.call(n,a,h),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n  <a href="#" '),u=n,a="onActivateTicketForm",f={},l="controller",f.target=l,c=r.action,l=c||n.action,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"action",a,h):u=l,s.buffer.push(g(u)+' class="form-action-right activate">\n    '),u=n,a="txt.ticket_forms.admin.activate_v2",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+"\n  </a>\n</div>\n"),o}),Ember.TEMPLATES["templates/ticket_form_field"]=Handlebars.template(function(t,n,r,i,s){function y(e,t){var n="",i,s,o,u;return t.buffer.push('\n  <i class="right icon-remove" '),i=e,s="onRemoveTicketFormField",o={},u="controller",o.target=u,c=r.action,u=c||e.action,h={},h.hash=o,h.contexts=[],h.contexts.push(i),h.data=t,typeof u===d?i=u.call(e,s,h):u===m?i=v.call(e,"action",s,h):i=u,t.buffer.push(g(i)+" ></i>\n"),n}function b(e,t){t.buffer.push('\n  <i class="right icon-lock"></i>\n')}r=r||Ember.Handlebars.helpers;var o="",u,a,f,l,c,h,p=this,d="function",v=r.helperMissing,m=void 0,g=this.escapeExpression;return s.buffer.push("<i "),u={},a=":left view.fieldType",u["class"]=a,c=r.bindAttr,a=c||n.bindAttr,h={},h.hash=u,h.contexts=[],h.data=s,typeof a===d?u=a.call(n,h):a===m?u=v.call(n,"bindAttr",h):u=a,s.buffer.push(g(u)+'></i>\n<span class="title">'),u=n,a="view.truncFieldLabel",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+'</span>\n<span class="display-status">'),u=n,a="view.endUserLabel",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+"</span>\n"),u=n,a="isOptional",f=r["if"],h=p.program(1,y,s),h.hash={},h.contexts=[],h.contexts.push(u),h.fn=h,h.inverse=p.program(3,b,s),h.data=s,u=f.call(n,a,h),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n"),o}),Ember.TEMPLATES["templates/ticket_forms"]=Handlebars.template(function(t,n,r,i,s){function y(e,t){var n="",i,s,o,u;return t.buffer.push('\n  <div class="header inactive" >\n    <div class="left">\n      <h5>\n        '),i=e,s="txt.views.ticketforms.label.inactive_ticket_form",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+" ("),i=e,s="inActiveTicketForms.length",o={},u="true",o.escaped=u,c=r._triageMustache,u=c||e._triageMustache,h={},h.hash=o,h.contexts=[],h.contexts.push(i),h.data=t,typeof u===d?i=u.call(e,s,h):u===m?i=v.call(e,"_triageMustache",s,h):i=u,t.buffer.push(g(i)+')\n        <i class="icon-loading-spinner"></i>\n      </h5>\n    </div>\n    <div class="right">\n      <a href="#" '),i=e,s="onToggleInactiveTicketForms",c=r.action,o=c||e.action,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"action",s,h):i=o,t.buffer.push(g(i)+" >\n        "),i=e,s="showInactiveForms",o=r["if"],h=p.program(2,b,t),h.hash={},h.contexts=[],h.contexts.push(i),h.fn=h,h.inverse=p.program(4,w,t),h.data=t,i=o.call(e,s,h),(i||i===0)&&t.buffer.push(i),t.buffer.push("\n      </a>\n    </div>\n  </div>\n"),n}function b(e,t){var n="",i,s,o;return t.buffer.push("\n          "),i=e,s="txt.views.ticketforms.label.hide.inactive_ticket_form",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"\n        "),n}function w(e,t){var n="",i,s,o;return t.buffer.push("\n          "),i=e,s="txt.views.ticketforms.label.show.inactive_ticket_form",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"\n        "),n}r=r||Ember.Handlebars.helpers;var o="",u,a,f,l,c,h,p=this,d="function",v=r.helperMissing,m=void 0,g=this.escapeExpression;return s.buffer.push("<h2> "),u=n,a="txt.ticket_forms.admin.ticket_forms",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+'</h2>\n<div class="header">\n  <div class="left">\n    <h5>\n      '),u=n,a="txt.ticket_forms.admin.active_forms",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+" ("),u=n,a="activeTicketForms.length",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+')\n      <i class="icon-loading-spinner"></i>\n    </h5>\n  </div>\n  <div class="right">\n    <a href=\'#/admin/ticket_forms/create\' > '),u=n,a="txt.ticket_forms.admin.create_new_form_v2",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+" </a>\n  </div>\n</div>\n\n"),u=n,a="views/ticket_forms_collection_view",f={},l="activeTicketForms",f.contentBinding=l,c=r.view_module,l=c||n.view_module,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view_module",a,h):u=l,s.buffer.push(g(u)+"\n\n"),u=n,a="showInactiveFormsToggle",f=r["if"],h=p.program(1,y,s),h.hash={},h.contexts=[],h.contexts.push(u),h.fn=h,h.inverse=p.noop,h.data=s,u=f.call(n,a,h),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n\n"),u=n,a="views/ticket_forms_collection_view",f={},l="inActiveTicketForms",f.contentBinding=l,c=r.view_module,l=c||n.view_module,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view_module",a,h):u=l,s.buffer.push(g(u)+"\n"),o}),Ember.TEMPLATES["templates/update_ticket_forms"]=Handlebars.template(function(t,n,r,i,s){function y(e,t){var n="",i,s,o;return t.buffer.push("\n            "),i=e,s="txt.ticket_forms.admin.delete_form",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"\n          "),n}function b(e,t){var n="",i,s,o,u;return t.buffer.push('\n            <a href="#" '),i=e,s="onDeleteTicketForm",o={},u="controller",o.target=u,c=r.action,u=c||e.action,h={},h.hash=o,h.contexts=[],h.contexts.push(i),h.data=t,typeof u===d?i=u.call(e,s,h):u===m?i=v.call(e,"action",s,h):i=u,t.buffer.push(g(i)+' class="delete">\n              '),i=e,s="txt.ticket_forms.admin.delete_form",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"\n            </a>\n          "),n}function w(e,t){var n="",i,s,o;return t.buffer.push("\n      <p>"),i=e,s="txt.ticket_forms.admin.drag_fields_you_want_to_add",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"</p>\n    "),n}function E(e,t){var n="",i,s,o;return t.buffer.push("\n      <p>"),i=e,s="txt.ticket_forms.admin.edit.no_fields",c=r.t,o=c||e.t,h={},h.hash={},h.contexts=[],h.contexts.push(i),h.data=t,typeof o===d?i=o.call(e,s,h):o===m?i=v.call(e,"t",s,h):i=o,t.buffer.push(g(i)+"</p>\n    "),n}r=r||Ember.Handlebars.helpers;var o="",u,a,f,l,c,h,p=this,d="function",v=r.helperMissing,m=void 0,g=this.escapeExpression;return s.buffer.push('<div class="container">\n  <div class="content update">\n    <h2> '),u=n,a="txt.ticket_forms.admin.ticket_forms",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+' <span class="form-name">'),u=n,a="ticketForm.name",f={},l="true",f.escaped=l,c=r._triageMustache,l=c||n._triageMustache,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"_triageMustache",a,h):u=l,s.buffer.push(g(u)+'</span> </h2>\n    <div class="name agent-title">\n      '),u=n,a="lib/lotus/labeled_text_field",f={},l="field",f["class"]=l,l="label",f.labelBinding=l,l="ticketForm.name",f.valueBinding=l,c=r.view_module,l=c||n.view_module,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view_module",a,h):u=l,s.buffer.push(g(u)+'\n    </div>\n\n    <div class="name">\n      <div class="field">\n        <label '),u={},a="displayNameDisabled:disabled :_tooltip",u["class"]=a,c=r.bindAttr,a=c||n.bindAttr,h={},h.hash=u,h.contexts=[],h.data=s,typeof a===d?u=a.call(n,h):a===m?u=v.call(n,"bindAttr",h):u=a,s.buffer.push(g(u)+" "),u={},a="txt.admin.views.ticket_forms.end_user_visible_help",u.title=a,c=r.translateAttr,a=c||n.translateAttr,h={},h.hash=u,h.contexts=[],h.data=s,typeof a===d?u=a.call(n,h):a===m?u=v.call(n,"translateAttr",h):u=a,s.buffer.push(g(u)+' data-placement="top" data-html="true">\n          '),u=n,a="Ember.Checkbox",f={},l="ticketForm.endUserVisible",f.checkedBinding=l,c=r.view,l=c||n.view,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view",a,h):u=l,s.buffer.push(g(u)+" "),u=n,a="txt.ticket_forms.admin.form_name_for_end_users",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+"\n        </label>\n        "),u=n,a="Em.TextField",f={},l="displayNameDisabled",f.disabledBinding=l,l="ticketForm.displayName",f.valueBinding=l,c=r.view,l=c||n.view,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view",a,h):u=l,s.buffer.push(g(u)+'\n      </div>\n    </div>\n\n    <div class="create-ticket-form">\n      <p>\n        '),u=n,a="txt.ticket_forms.admin.form_fields",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+"\n      </p>\n      "),u=n,a="views/ticket_form_fields_view",f={},l="ticket-form-fields",f["class"]=l,l="ticketFormFields",f.contentBinding=l,l="controller",f.controllerBinding=l,c=r.view_module,l=c||n.view_module,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view_module",a,h):u=l,s.buffer.push(g(u)+'\n\n      <div class="action">\n        <div class="left">\n          '),u=n,a="ticketForm.isActive",f=r["if"],h=p.program(1,y,s),h.hash={},h.contexts=[],h.contexts.push(u),h.fn=h,h.inverse=p.program(3,b,s),h.data=s,u=f.call(n,a,h),(u||u===0)&&s.buffer.push(u),s.buffer.push('\n        </div>\n\n        <div  class="right">\n          <a href="#" '),u=n,a="onCancelTicketFormUpdate",f={},l="controller",f.target=l,c=r.action,l=c||n.action,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"action",a,h):u=l,s.buffer.push(g(u)+' class="cancel" >\n            '),u=n,a="txt.ticket_forms.admin.cancel",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+"\n          </a>\n          <button "),u=n,a="onSaveTicketForm",f={},l="controller",f.target=l,c=r.action,l=c||n.action,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"action",a,h):u=l,s.buffer.push(g(u)+' class="btn btn-inverse save" >\n            '),u=n,a="txt.ticket_forms.admin.save_form",c=r.t,f=c||n.t,h={},h.hash={},h.contexts=[],h.contexts.push(u),h.data=s,typeof f===d?u=f.call(n,a,h):f===m?u=v.call(n,"t",a,h):u=f,s.buffer.push(g(u)+'\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="sidebar update">\n    '),u=n,a="ticketFields.length",f=r["if"],h=p.program(5,w,s),h.hash={},h.contexts=[],h.contexts.push(u),h.fn=h,h.inverse=p.program(7,E,s),h.data=s,u=f.call(n,a,h),(u||u===0)&&s.buffer.push(u),s.buffer.push("\n\n    "),u=n,a="views/ticket_fields_view",f={},l="ticketFields",f.contentBinding=l,l="controller",f.controllerBinding=l,c=r.view_module,l=c||n.view_module,h={},h.hash=f,h.contexts=[],h.contexts.push(u),h.data=s,typeof l===d?u=l.call(n,a,h):l===m?u=v.call(n,"view_module",a,h):u=l,s.buffer.push(g(u)+"\n  </div>\n</div>\n"),o}),this.require.define({"views/ticket_fields_view":function(e,t,n){var r=t("lib/views/sortable_collection_view_mixin"),i=Em.View.extend({templateName:"templates/ticket_field",classNames:["ticket-field","custom-field"],fieldType:Em.computed.oneWay("content.type"),attributeBindings:["fieldName:data-field-name"],fieldName:Em.computed.oneWay("content.title"),title:function(){var e=this.get("content.title");return this.get("content.isCustomField")||(e+=" "+I18n.t("txt.ticket_forms.admin.system_label")),e}.property("content.title","content.isCustomField")}),s=Em.CollectionView.extend(r,{content:null,controller:null,classNames:["ticket-fields","connected"],itemViewClass:i,sortableItemSelector:".custom-field",sortableItemIdAttribute:"data-field-name"});n.exports=s}}),this.require.define({"views/ticket_form_fields_view":function(e,t,n){var r=t("lib/views/sortable_collection_view_mixin"),i=t("lib/formatting_helper").truncateWithEllipsis,s=Em.View.extend({templateName:"templates/ticket_form_field",classNames:["form-field"],classNameBindings:["editable","customField"],attributeBindings:["fieldName:data-field-name"],fieldType:Em.computed.oneWay("content.type"),fieldName:Em.computed.oneWay("content.title"),isEndUserVisible:Em.computed.oneWay("content.visibleInPortal"),isEndUserEditable:Em.computed.oneWay("content.editableInPortal"),isEndUserRequired:Em.computed.oneWay("content.requiredInPortal"),endUserLabel:function(){return this.get("content.requiredInPortal")?I18n.t("txt.ticket_forms.admin.end_user_required_label"):this.get("content.editableInPortal")?I18n.t("txt.ticket_forms.admin.end_user_editable_label"):this.get("content.visibleInPortal")?I18n.t("txt.ticket_forms.admin.end_user_visible_label"):""}.property("content.visibleInPortal","content.editableInPortal","content.requiredInPortal"),fieldLabel:function(){var e=this.get("content.title");return this.get("content.isCustomField")||(e+=" "+I18n.t("txt.ticket_forms.admin.system_label")),e}.property("content.title","content.isCustomField"),truncFieldLabel:function(){return i(this.get("fieldLabel"),40)}.property("fieldLabel"),isOptional:function(){return this.get("content.isCustomField")||this.get("content.removable")}.property("content.isCustomField","content.removable"),editable:function(){return this.get("isOptional")?"optional":"standard"}.property("isOptional"),customField:function(){return this.get("content.isCustomField")===!0}.property("content.isCustomField")}),o=Em.CollectionView.extend(r,{content:null,controller:null,classNames:["connected"],itemViewClass:s,sortableItemSelector:".custom-field",sortableItemIdAttribute:"data-field-name",sortableConnectWith:".connected",sortableDidChange:function(e){var t=this,n;e.forEach(function(e){var r=t.get("content").findProperty("title",e);r||(r=t.get("controller").addTicketFormFieldByName(e)),r.get("isCustomField")&&(n=n||[],n.push(e))}),this.get("controller").updateCustomFieldsOrder(n)}}).reopenClass({toString:function(){return"TicketFormFieldsView"}});n.exports=o}}),this.require.define({"views/ticket_form_view":function(e,t,n){var r=Ember.View.extend({init:function(){this._super.apply(this,arguments);var e=t("controllers/ticket_form_controller"),n=e.create({ticketForm:this.get("content")});this.set("controller",n)},classNames:["ticket-form"],classNameBindings:["isFormActive:form-active","isFormInactive:form-inactive","isFormDefault:default"],attributeBindings:["formId:data-form-id"],formId:Em.computed.oneWay("content.id"),isVisible:function(){var e=!1;return this.get("parentView.showInactiveForms")?e=!0:!this.get("parentView.showInactiveForms")&&this.get("content.isActive")&&(e=!0),e}.property("parentView.showInactiveForms"),flags:function(){if(this.get("isFormInactive"))return;var e=this.get("content"),t="(%@)";if(e.get("isDefault"))return t.fmt(I18n.t("txt.ticket_forms.admin.default"));if(e.get("endUserVisible")===null||e.get("endUserVisible")===!1)return t.fmt(I18n.t("txt.ticket_forms.admin.agent_only"))}.property("isFormInactive","content.endUserVisible","content.isDefault"),isFormActive:Em.computed.bool("content.isActive"),isFormInactive:Em.computed.not("isFormActive"),isFormDefault:Em.computed.bool("content.isDefault"),ticketFormLink:function(){if(this.get("content.id"))return"#/admin/ticket_forms/edit/%@".fmt(this.get("content.id"))}.property("content.id"),templateName:"templates/ticket_form"});n.exports=r}}),this.require.define({"views/ticket_forms_collection_view":function(e,t,n){var r=t("lib/views/sortable_collection_view_mixin"),i=Em.CollectionView.extend(r,{content:null,controller:Em.computed.oneWay("parentView.controller"),showInactiveFormsBinding:"parentView.showInactiveForms",itemViewClass:t("views/ticket_form_view"),sortableItemSelector:".ticket-form.form-active",sortableItemIdAttribute:"data-form-id",sortableDidChange:function(e){this.get("controller").updateFormsOrder(e)}});n.exports=i}}),this.require.define({"views/ticket_forms_view":function(e,t,n){var r=Em.View.extend({content:null,showInactiveForms:!0,classNames:["content"],classNameBindings:["working:working"],templateName:"templates/ticket_forms",onToggleInactiveTicketForms:function(){return this.toggleProperty("showInactiveForms"),!1},workingBinding:"controller.working",activeTicketForms:function(){var e;return this.get("content")&&(e=this.get("content").filterProperty("isActive",!0),e=e||[],e=_.sortBy(e,function(e){return e.get("position")})),e}.property("content.@each.isActive"),inActiveTicketForms:function(){var e;return this.get("content")&&(e=this.get("content").filter(function(e){return e.get("isActive")===null||e.get("isActive")===!1}),e=e||[],e=_.sortBy(e,function(e){return e.get("position")})),e}.property("content.@each.isActive"),showInactiveFormsToggle:function(){return this.get("inActiveTicketForms.length")>0}.property("inActiveTicketForms.length")});n.exports=r}}),this.require.define({"views/update_ticket_form_view":function(e,t,n){var r=Em.View.extend({controller:null,classNames:["ticket_forms"],ticketForm:Em.computed.oneWay("controller.ticketForm"),ticketFormFields:Em.computed.oneWay("controller.ticketFormFields"),ticketFields:Em.computed.oneWay("controller.ticketFields"),label:function(){return I18n.t("txt.ticket_forms.admin.form_name_for_agents")}.property(),templateName:"templates/update_ticket_forms",displayNameDisabled:Ember.computed.not("ticketForm.endUserVisible"),didInsertElement:function(){$("#admin_content").scroll(function(){var e=this.scrollTop,t=$(".ticket_forms").outerHeight(),n=$(window).height();e<t-n+42&&$(".ticket_forms .sidebar.update").css("margin-top",e+"px")})},willDestroyElement:function(){$("#admin_content").unbind("scroll")}});n.exports=r}}),this.require.define({"api/lotus":function(e,t,n){var r=null,i=t("lib/growl"),s={notify:i.notice,error:i.error.bind(i),goToRoute:Zendesk.Routes.goToHash,allTicketFields:function(){return r||(r=Zd.TicketFields.instance()),r.allTicketFields()},ticketFormsData:t("modules/ticket_forms_data/main")};n.exports=Object.seal(s)}}),this.require.define({"api/ticket_forms/lib":function(e,t,n){n.exports=Object.seal({Views:t("lib/ticket_form_views")})}});