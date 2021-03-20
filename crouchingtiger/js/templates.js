Ember.TEMPLATES["templates/admin/admin_menu"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="section">\n      <div class="title"><i class="'), i = e, s = "icon", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + '"></i> '), i = e, s = "title", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + '</div>\n\n      <ul class="nav nav-pills nav-stacked">\n        '), i = e, s = "links", o = r.each, c = h.program(2, y, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </ul>\n    </div>\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          "), i = e, s = "viewClass", l = r.view, o = l || e.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view", s, c) : i = o, t.buffer.push(m(i) + "\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<div class='stacked_menu_settings'>\n  "), u = n, a = "sections", f = r.each, c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/benchmark"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.launchpad.learn_more.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<h2>"), u = n, a = "txt.launchpad.benchmark_survey.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h2>\n<p>\n    "), u = n, a = "txt.launchpad.benchmark_survey.intro_text", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</p>\n<div class="columnbox">\n  '), u = n, a = "views/launchpad/benchmark_survey_view", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + "\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/menu_link"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<a href="'), u = n, a = "href", l = r.unbound, f = l || n.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "unbound", a, c) : u = f, s.buffer.push(m(u) + '">'), u = n, a = "title", l = r.unbound, f = l || n.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "unbound", a, c) : u = f, s.buffer.push(m(u) + "</a>\n"), o
}), Ember.TEMPLATES["templates/admin/overview"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <li>\n          <a "), i = {}, s = "url", i.href = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = e, s = "trackForumArticleVisit", c = r.actionWithEvent, o = c || e.actionWithEvent, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "actionWithEvent", s, h) : i = o, t.buffer.push(g(i) + ' target="_blank">\n            <div class="profile">\n              <img '), i = {}, s = "submitter.thumbnail", i.src = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + '></img>\n            </div>\n            <p class="title truncate">'), i = e, s = "title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + '</p>\n            <span class="title_info">\n              '), i = e, s = "submitter.name", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n              "), i = e, s = "createdAt", o = {}, u = "true", o.live = u, u = "true", o.relative = u, c = r.timestamp, u = c || e.timestamp, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "timestamp", s, h) : i = u, t.buffer.push(g(i) + "\n            </span>\n          </a>\n        </li>\n      "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="your_account">\n      <h3>'), i = e, s = "txt.admin.overview.your_account.title", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</h3>\n      <p>"), i = e, s = "txt.admin.overview.your_account.current_subscription", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</p>\n      <div>"), i = e, s = "txt.admin.overview.your_account.plan_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " "), i = e, s = "currentAccount.planName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</div>\n      <div>"), i = e, s = "txt.admin.overview.your_account.agents", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " "), i = e, s = "currentAccount.maxAgents", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</div>\n      "), i = e, s = "currentAccount.inTrial", o = r["if"], h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(8, T, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <div>\n          "), i = e, s = "txt.admin.overview.your_account.days_left_in_trial_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '\n          <span class="red"> '), i = e, s = "currentAccount.daysLeftInTrial", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n        </div>\n        "), i = e, s = "launchpadController.shouldShowUpsell", o = r["if"], h = p.program(5, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          "), i = e, s = "views/dashboard/buy_now_button", c = r.view_module, o = c || e.view_module, h = p.program(6, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof o === d ? i = o.call(e, s, h) : i = y.call(e, o, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.admin.overview.your_account.buy_now_button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <a "), i = e, s = "goToUpdateAccount", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ">"), i = e, s = "txt.admin.overview.your_account.update_account", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n      "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <li>\n          "), i = e, s = "Zd.currentUser.isAdmin", o = r["if"], h = p.program(11, C, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(17, O, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </li>\n      "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "isAvailable", o = r["if"], h = p.program(12, k, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(14, L, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n              <a href="), i = e, s = "settingUrl", c = r.u, o = c || e.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "u", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push(' class="name" '), i = e, s = "trackSuggestedFeatureSettings", c = r.actionWithEvent, o = c || e.actionWithEvent, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "actionWithEvent", s, h) : i = o, t.buffer.push(g(i) + ">"), i = e, s = "humanName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</a>\n              <p>"), i = e, s = "description", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</p>\n            "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n              <span class="name disabled">'), i = e, s = "humanName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n              <p>"), i = e, s = "description", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</p>\n              "), i = e, s = "views/dashboard/buy_now_button", o = {}, u = "upgrade-required enabled", o["class"] = u, c = r.view_module, u = c || e.view_module, h = p.program(15, A, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n            "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n                <i class="icon-arrow-up"></i> '), i = e, s = "txt.admin.overview.suggested_features.upgrade_required_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n              "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n            <span class="name">'), i = e, s = "humanName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n            <p>"), i = e, s = "description", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</p>\n            "), i = e, s = "isAvailable", o = r.unless, h = p.program(18, M, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function M(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n              <button class="btn upgrade-required disabled">\n                <i class="icon-arrow-up"></i> '), i = e, s = "txt.admin.overview.suggested_features.upgrade_required_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n              </button>\n            "), n
    }

    function _(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "activeFeatures", o = r["if"], h = p.program(21, D, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function D(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <li>\n            <span class="name">'), i = e, s = "humanName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n            <ul>\n              "), i = e, s = "activeFeatures", o = r.each, h = p.program(22, P, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n            </ul>\n          </li>\n        "), n
    }

    function P(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n                <li>\n                  "), i = e, s = "Zd.currentUser.isAdmin", o = r["if"], h = p.program(23, H, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(25, B, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n                </li>\n              "), n
    }

    function H(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n                    <a href="), i = e, s = "settingUrl", c = r.u, o = c || e.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "u", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push(" "), i = e, s = "trackActiveFeatureSettings", c = r.actionWithEvent, o = c || e.actionWithEvent, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "actionWithEvent", s, h) : i = o, t.buffer.push(g(i) + ">"), i = e, s = "humanName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</a>\n                  "), n
    }

    function B(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n                    <span>"), i = e, s = "humanName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n                  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<header>\n  <h1>"), u = n, a = "currentAccount.name", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h1>\n  <div class="right">'), u = n, a = "currentAccount.subdomain", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '.zendesk.com</div>\n</header>\n\n<div class="overview_content">\n\n  <div class="system_updates">\n    <h3>'), u = n, a = "txt.admin.overview.system_updates.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n    <ul>\n      "), u = n, a = "visibleAnnouncements", f = r.each, h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    </ul>\n    <div class="controls">\n      <a '), u = n, a = "goToNewerAnnouncementsPage", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="newer" '), u = {}, a = "atNewestAnnouncementsPage", u.disabled = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">‹</a>\n      <a "), u = n, a = "goToOlderAnnouncementsPage", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="older" '), u = {}, a = "atOldestAnnouncementsPage", u.disabled = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">›</a>\n    </div>\n  </div>\n\n  "), u = n, a = "Zd.currentUser.isAdmin", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="feature_usages">\n    <h3>'), u = n, a = "txt.admin.overview.feature_usages.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n    "), u = n, a = "views/admin/overview/feature_usage_view", f = {}, l = "macros", f.feature = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "views/admin/overview/feature_usage_view", f = {}, l = "triggers", f.feature = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "views/admin/overview/feature_usage_view", f = {}, l = "automations", f.feature = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "views/admin/overview/feature_usage_view", f = {}, l = "views", f.feature = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n\n  <div "), u = {}, a = ":suggested_features suggestedFeaturesShown:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <h3>\n      <span>"), u = n, a = "txt.admin.overview.suggested_features.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</span>\n      <a "), u = n, a = "showActiveFeatures", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ">"), u = n, a = "txt.admin.overview.active_features.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n    </h3>\n    <ul>\n      "), u = n, a = "suggestedFeatures", f = r.each, h = p.program(10, N, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </ul>\n  </div>\n\n  <div "), u = {}, a = ":active_features activeFeaturesShown:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <h3>\n      <a "), u = n, a = "showSuggestedFeatures", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ">"), u = n, a = "txt.admin.overview.suggested_features.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n      <span>"), u = n, a = "txt.admin.overview.active_features.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</span>\n    </h3>\n    <ul>\n      "), u = n, a = "featureCategoryCollection", f = r.each, h = p.program(20, _, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </ul>\n  </div>\n\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/overview/feature_usage"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "mostUsedPastWeek", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), i = e, s = "updatedRecently", o = r["if"], h = p.program(9, T, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <li><span class="header">'), i = e, s = "txt.admin.overview.feature_usage.details_dropdown.most_used_in_7_days_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span></li>\n          "), i = e, s = "Zd.currentUser.isAdmin", o = r["if"], h = p.program(3, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(6, S, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "mostUsedPastWeek", o = r.each, h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n              <li><a href="#/admin/'), i = e, s = "view.feature", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "/edit/"), i = e, s = "id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" '), i = e, s = "trackFeatureUsagesSettings", o = {}, u = "view.parentView", o.target = u, c = r.actionWithEvent, u = c || e.actionWithEvent, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "actionWithEvent", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "title", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n            "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "mostUsedPastWeek", o = r.each, h = p.program(7, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n              <li><span>"), i = e, s = "title", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span></li>\n            "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <li><span class="header">'), i = e, s = "txt.admin.overview.feature_usage.details_dropdown.recently_updated_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span></li>\n          "), i = e, s = "Zd.currentUser.isAdmin", o = r["if"], h = p.program(10, N, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(13, k, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "updatedRecently", o = r.each, h = p.program(11, C, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n              <li><a href="#/admin/'), i = e, s = "view.feature", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "/edit/"), i = e, s = "id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" '), i = e, s = "trackFeatureUsagesSettings", o = {}, u = "view.parentView", o.target = u, c = r.actionWithEvent, u = c || e.actionWithEvent, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "actionWithEvent", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "title", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n            "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "updatedRecently", o = r.each, h = p.program(14, L, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n              <li><span>"), i = e, s = "title", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span></li>\n            "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <li><span class="header">'), i = e, s = "noActiveFeatureHeader", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + '</span></li>\n        <li><a href="#/admin/'), i = e, s = "view.feature", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "txt.admin.overview.feature_usage.details_dropdown.create_some_here_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.overview.feature_usage.used_today_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '\n      <span class="count">'), i = e, s = "usedPastDayCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n    "), n
    }

    function M(e, t) {
        t.buffer.push("\n      &nbsp;\n    ")
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="feature_details">\n  <div class="dropdown" tabindex="-1">\n    <a class="dropdown-toggle" data-toggle="dropdown">\n      '), u = n, a = "txt.admin.overview.feature_usage.details_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n      <span class="icon">▼</span>\n    </a>\n    <ul class="dropdown-menu pull-right">\n      <div class="diamond"></div>\n      '), u = n, a = "totalCount", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(16, A, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </ul>\n  </div>\n  <h3>"), u = n, a = "featureHumanName", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n  <span class="stat">'), u = n, a = "totalCount", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '&nbsp;</span>\n</div>\n\n<div class="today">\n  <div>\n    '), u = n, a = "hasUsedPastDayCount", f = r["if"], h = p.program(18, O, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(20, M, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n  <div>\n    "), u = n, a = "txt.admin.overview.feature_usage.updated_today_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    <span class="count">'), u = n, a = "updatedPastDayCount", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/subscription"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<h2>"), u = n, a = "txt.admin.menu.item.subscription", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</h2>\n\n"), u = n, a = "views/admin/subscription/subscription_information_view", l = r.view_module, f = l || n.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view_module", a, c) : u = f, s.buffer.push(m(u) + "\n"), u = n, a = "views/admin/subscription/subscription_plans_view", l = r.view_module, f = l || n.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view_module", a, c) : u = f, s.buffer.push(m(u) + "\n"), u = n, a = "views/admin/subscription/subscription_cancel_view", l = r.view_module, f = l || n.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view_module", a, c) : u = f, s.buffer.push(m(u) + "\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/agent_cost_summary"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  <div "), i = {}, s = ":plan-details isStarterPlan", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">\n    "), i = e, s = "previewSubscription.agent_cost_summary", o = r["with"], c = h.program(2, y, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  </div>\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <div id="starter-plan">\n        <span class="cost">'), i = e, s = "annual_unit_cost", o = {}, u = "0", o.precision = u, l = r.currency, u = l || e.currency, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "currency", s, c) : i = u, t.buffer.push(m(i) + "</span>\n        "), i = e, s = "txt.admin.subscription.agent_cost_summary.per_year_for_number_of_agents", o = {}, u = "agents_per_unit", o.numberOfAgentsBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + '\n      </div>\n\n      <div id="other-plan">\n        <div>\n          <span class="cost">'), i = e, s = "monthly_unit_cost", o = {}, u = "0", o.precision = u, l = r.currency, u = l || e.currency, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "currency", s, c) : i = u, t.buffer.push(m(i) + "</span>\n          "), i = e, s = "txt.admin.subscription.agent_cost_summary.per_month_per_agent", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n        </div>\n        <div>\n          <span class="cost">'), i = e, s = "monthly_unit_cost_with_annual_billing", o = {}, u = "0", o.precision = u, l = r.currency, u = l || e.currency, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "currency", s, c) : i = u, t.buffer.push(m(i) + "</span>\n          "), i = e, s = "txt.admin.subscription.agent_cost_summary.per_month_per_agent_with_annual_billing", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n        </div>\n      </div>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("\n"), s.buffer.push("\n"), s.buffer.push("\n"), s.buffer.push("\n\n"), u = n, a = "previewSubscription.isFetching", f = r.unless, c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/plan_options"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div id="notice-managed-account">\n    <h4>'), i = e, s = "txt.views.subscription_view.plan_options.managed_account", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h4>\n    <p>"), i = e, s = "txt.views.subscription_view.plan_options.managed_account_description", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</p>\n  </div>\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "parentView.controller.canManageSubscription", o = r.unless, c = h.program(4, b, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), i = e, s = "parentView.controller.canManageSubscription", o = r["if"], c = h.program(6, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div id="notice-contact-account-owner">\n      <h4>'), i = e, s = "txt.views.subscription_view.plan_options.contact_account_owner.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h4>\n      <p>"), i = e, s = "txt.views.subscription_view.plan_options.contact_account_owner.body", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</p>\n    </div>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="pricing_form">\n      '), i = e, s = "previewSubscription.isStarterPlan", o = r.unless, c = h.program(7, E, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n\n      <label for="promo_code">\n        '), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Promo_Code", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      </label>\n       "), i = e, s = "updatePreviewTextField", o = {}, u = "previewSubscription.promo_code", o.valueBinding = u, u = "disablePromoCode", o.disabledBinding = u, u = "promoCodePlaceHolderText", o.placeholderBinding = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n       <div "), i = {}, s = ":field_status isPromoCodeNotValid:error", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + '>\n        <span class="updatable">'), i = e, s = "promoCodeStatusText", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</span>\n      </div>\n    </div>\n\n    <div class="pricing_details">\n      '), i = e, s = "previewSubscription.pricing", o = r["with"], c = h.program(9, S, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n      <div class="line_items_status">\n        '), i = e, s = "updateFailed", o = r["if"], c = h.program(11, x, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n      </div>\n    </div>\n\n    <div class="extras">\n      <div class="heading">'), i = e, s = "txt.admin.subscription.confirmation.extras.header.title_1", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n      <div class="subtitle"> '), i = e, s = "txt.admin.subscription.confirmation.extras.header.subtitle", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + ' </div>\n      </div>\n      <div class="corpus">\n        '), i = e, s = "views/admin/subscription/voice_optin_checkbox", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + '\n        <label class="voice_optin" for="voice_optin_checkbox">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Zendesk_Voice", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</label>\n        <div class="type">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Phone_numbers", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n        <div class="pricing voice">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Phone_numbers_cost_per_month", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n        <div class="type">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Calls", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n        <div class="pricing voice">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Calls_cost_per_minute", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n        <div class="clear"></div>\n\n        <div class="voice_transcription_optin">\n          '), i = e, s = "views/admin/subscription/voice_transcription_checkbox", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + '\n          <label for="voice_transcription_optin_checkbox">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Transcribe_voicemails", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</label>\n          <div class="pricing">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.Transcribe_voicemails_cost_per_minute", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n          <span class="voice_capture">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.extras.English_language_only", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</span>\n          <div class="clear"></div>\n        </div>\n      </div>\n    </div>\n\n    <button '), i = e, s = "navigateToNextPage", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + "\n      "), i = {}, s = "disableSubmit", i.disabled = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ' class="submit button save btn btn-inverse">\n      '), i = e, s = "navigateToNextPageLabel", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n    </button>\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <label for="subscription_max_agents" class="max_agent_input">\n          '), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Number_of_Agents", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n          <abbr title="required">*</abbr>\n        </label>\n        '), i = e, s = "updatePreviewTextField", o = {}, u = "max_agent_input", o["class"] = u, u = !0, o.shouldInvalidate = u, u = "previewSubscription.max_agents", o.valueBinding = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n        <div "), i = {}, s = ":field_status isMaxAgentsCountNotValid:error", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + '>\n          <span class="updatable">'), i = e, s = "maxAgentsStatusText", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</span>\n        </div>\n\n        <label for="subscription_billing_cycle_type" class="billing_cycle_input">\n          '), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Bill_me", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n          <abbr title="required">*</abbr>\n        </label>\n        '), i = e, s = "updatePreviewSelect", o = {}, u = "controller.billingCycleOptions", o.contentBinding = u, u = "controller.selectedBillingCycle", o.selectionBinding = u, u = "content.label", o.optionLabelPath = u, u = "content.value", o.optionValuePath = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + '\n        <div class="field_status"><!-- spacer --></div>\n      '), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div class="line_items">\n          <div class="line_item">\n            <div id="price" class="amount updatable">'), i = e, s = "charge.gross", l = r.currency, o = l || e.currency, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "currency", s, c) : i = o, t.buffer.push(m(i) + '</div>\n            <div class="name">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Price", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n          </div>\n\n          <div class="line_item">\n            <div id="billing-cycle-discount" class="amount updatable">- '), i = e, s = "billing_cycle.discount", l = r.currency, o = l || e.currency, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "currency", s, c) : i = o, t.buffer.push(m(i) + '</div>\n            <div class="name">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Discount", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n          </div>\n\n          <div class="line_item">\n            <div id="promo-discount" class="amount updatable">- '), i = e, s = "promo.discount", l = r.currency, o = l || e.currency, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "currency", s, c) : i = o, t.buffer.push(m(i) + '</div>\n            <div class="name">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Promo", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n          </div>\n\n          <div class="line_item total">\n            <div id="total" class="amount updatable">'), i = e, s = "charge.net", l = r.currency, o = l || e.currency, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "currency", s, c) : i = o, t.buffer.push(m(i) + '</div>\n            <div class="loading updatable"></div>\n            <div class="name">'), i = e, s = "txt.admin.views.settings.account._subscription_options_form.Total", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n          </div>\n\n          <div class="billing_cycle updatable">\n            '), i = e, s = "view.billingCycleWithTaxText", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n          </div>\n        </div>\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <span id="message">\n            '), i = e, s = "txt.admin.views.settings.account._subscription_options_form.unable_to_fetch_plan_cost_for_preview", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n          </span>\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return u = n, a = "currentSubscription.isAssisted", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "currentSubscription.isAssisted", f = r.unless, c = h.program(3, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/subscription_cancel"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "parentView.controller.currentSubscription.isAssisted", o = r.unless, c = h.program(2, y, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="cancel_subscription">\n      <h2>'), i = e, s = "txt.views.subscription_view.cancel_subscription.Need_to_cancel_your_account", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h2>\n      <p>"), i = e, s = "txt.views.subscription_view.cancel_subscription.Ready_to_say_goodbye_Once", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</p>\n\n      <p class="link">\n        <a '), i = e, s = "showCancelSubscriptionWarning", o = {}, u = !1, o.href = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">"), i = e, s = "txt.views.subscription_view.cancel_subscription.yes_cancel_my_account", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</a>\n      </p>\n\n      "), i = e, s = "views/admin/subscription/subscription_cancel_warning_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + '\n\n      <div class="clear">\n      </div>\n    </div>\n  '), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return u = n, a = "parentView.controller.canManageSubscription", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/subscription_cancel_warning"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<p class="beware">\n  '), u = n, a = "txt.views.subscription_view.cancel_subscription.You_are_about_to_cancel", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  <a "), u = n, a = "confirmSubscriptionCancellation", f = {}, l = !1, f.href = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n    "), u = n, a = "txt.views.subscription_view.cancel_subscription.yes_i_am_sure_i_want_to_cancel", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </a>\n</p>\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/subscription_confirmation"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "downgrade", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "planTypeDowngraded", o = r["if"], h = p.program(4, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "maxAgentsDowngraded", o = r["if"], h = p.program(13, N, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "promoLost", o = r["if"], h = p.program(15, C, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <div class="header">'), i = e, s = "txt.admin.subscription.confirmation.downgrade.header", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</div>\n      "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <div class="message">\n          '), i = e, s = "currentSubscription.isRegularPlan", o = r["if"], h = p.program(5, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), i = e, s = "currentSubscription.isPlusPlan", o = r["if"], h = p.program(7, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), i = e, s = "currentSubscription.isEnterprisePlan", o = r["if"], h = p.program(9, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </div>\n        "), i = e, s = "currentSubscription.isEnterprisePlan", o = r["if"], h = p.program(11, T, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.admin.subscription.confirmation.downgrade.plan.regular", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.admin.subscription.confirmation.downgrade.plan.plus", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.admin.subscription.confirmation.downgrade.plan.enterprise", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <div class="message">\n            '), i = e, s = "txt.admin.subscription.confirmation.downgrade.plan.enterprise_light_agents", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          </div>\n        "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div class="message">\n          '), i = e, s = "txt.admin.subscription.confirmation.downgrade.max_agents", o = {}, u = "maxAgentsReducedBy", o.maxAgentsReducedByBinding = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n        </div>\n      "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "downgrade", o = r["if"], h = p.program(16, k, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(18, L, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <div class="message">'), i = e, s = "txt.admin.subscription.confirmation.promo_code.downgrade_lost", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</div>\n        "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          "), i = e, s = "billingCycleTypeChanged", o = r["if"], h = p.program(19, A, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n            <div class="message">'), i = e, s = "txt.admin.subscription.confirmation.promo_code.lost", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</div>\n          "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<h2>"), u = n, a = "txt.admin.views.account.subscription.confirm.Confirm_subscription_change", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</h2>\n\n<div class="attributes-container">\n  <div class="attributes old">\n    <div class="header">'), u = n, a = "txt.admin.subscription.confirmation.plan_summary.current", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n    <ul>\n      <li>"), u = n, a = "txt.views.subscription_view.characteristics.details.plan", f = {}, l = "currentSubscription.displayPlanName", f.plan_nameBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "</li>\n      <li>"), u = n, a = "txt.views.subscription_view.characteristics.details.max_agents", f = {}, l = "currentSubscription.max_agents", f.max_agentsBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "</li>\n      <li>"), u = n, a = "currentSubscriptionBillingCycle", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</li>\n    </ul>\n\n    <div class="extras old">\n      <h3>\n        '), u = n, a = "txt.admin.subscription.confirmation.extras.header.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n        <small>"), u = n, a = "txt.admin.subscription.confirmation.extras.header.subtitle", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</small>\n      </h3>\n      <ul>\n        <li>"), u = n, a = "currentSubscriptionVoiceOptions", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</li>\n      </ul>\n    </div>\n  </div>\n\n  <div class="attributes new">\n    <div class="header">'), u = n, a = "txt.admin.subscription.confirmation.plan_summary.new", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n    <ul>\n      <li>"), u = n, a = "txt.views.subscription_view.characteristics.details.plan", f = {}, l = "previewSubscription.displayPlanName", f.plan_nameBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "</li>\n      <li>"), u = n, a = "txt.views.subscription_view.characteristics.details.max_agents", f = {}, l = "previewSubscription.max_agents", f.max_agentsBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "</li>\n      <li>"), u = n, a = "previewSubscriptionBillingCycle", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</li>\n    </ul>\n\n    <div class="extras new">\n      <h3>\n        '), u = n, a = "txt.admin.subscription.confirmation.extras.header.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n        <small>"), u = n, a = "txt.admin.subscription.confirmation.extras.header.subtitle", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</small>\n      </h3>\n      <ul>\n        <li>"), u = n, a = "previewSubscriptionVoiceOptions", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class="message_box_container">\n  <div class="message_box">\n\n    '), u = n, a = "controller", f = r["with"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  </div>\n</div>\n\n<div class="buttons">\n  <button '), u = n, a = "confirm", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="btn btn-inverse confirm">'), u = n, a = "status", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <a "), u = n, a = "cancel", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="cancel">'), u = n, a = "txt.admin.subscription.confirmation.cancel", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/subscription_information"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "view.isSubscribed", o = r.unless, c = h.program(2, y, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(4, b, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <div class="trial section_element">\n        <div class="title">\n          '), i = e, s = "txt.views.subscription_view.trial.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n        </div>\n        <div class="details">\n         '), i = e, s = "view.trialDetailsString", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n        </div>\n      </div>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="characteristics section_element">\n      <div class="title">\n        '), i = e, s = "txt.views.subscription_view.characteristics.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n      </div>\n      <div class="details">\n        <ul>\n          <li>'), i = e, s = "txt.views.subscription_view.characteristics.details.plan", o = {}, u = "plan_name", o.plan_nameBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + "</li>\n          <li>"), i = e, s = "txt.views.subscription_view.characteristics.details.max_agents", o = {}, u = "max_agents", o.max_agentsBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + "</li>\n          <li>"), i = e, s = "view.billingCycleFrequencyString", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</li>\n        </ul>\n      </div>\n      <div class="clear"></div>\n    </div>\n    '), i = e, s = "view.isAccountOwner", o = r["if"], c = h.program(5, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.
        fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="credit_card section_element">\n        <div class="title">\n          '), i = e, s = "txt.views.subscription_view.credit_card.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n        </div>\n        <div class="details">\n          '), i = e, s = "hasCreditCard", o = r["if"], c = h.program(6, E, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(8, S, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </div>\n      </div>\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            "), i = e, s = "txt.views.subscription_view.credit_card.current_credit_card_details.change_credit_card", o = {}, u = "credit_card.shadowed_number", o.shadowed_numberBinding = u, u = "credit_card.expiry.month", o.monthBinding = u, u = "credit_card.expiry.year", o.yearBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + '\n            <a class="change_credit_card" '), i = e, s = "showCreditCardEntryPage", o = {}, u = !1, o.href = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">\n              "), i = e, s = "txt.views.subscription_view.credit_card.current_credit_card_details.change_credit_card_link", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n            </a>\n          "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            "), i = e, s = "txt.views.subscription_view.credit_card.add_credit_card_to_account", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '\n            <a class="add_credit_card" '), i = e, s = "showCreditCardEntryPage", o = {}, u = !1, o.href = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">\n              "), i = e, s = "txt.views.subscription_view.credit_card.current_credit_card_details.add_credit_card_link", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n            </a>\n          "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return u = n, a = "currentSubscription", f = r["with"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/subscription_payment"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="section_element">\n      <div class="title">'), i = e, s = "txt.views.subscription_payment_view.your_plan_title", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</div>\n      "), i = e, s = "txt.views.subscription_payment_view.your_plan_description", o = {}, u = "previewSubscription.plan_name", o.planNameBinding = u, u = "previewSubscription.max_agents", o.maxAgentsBinding = u, u = "previewSubscription.billing_cycle_name", o.billingCycleNameBinding = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n    </div>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div class="alert alert-error">\n          <h3>'), i = e, s = "controller.creditCardRegistrationErrorTitle", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</h3>\n\n          "), i = e, s = "controller.creditCardRegistrationErrorMessages", o = r.each, h = p.program(4, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </div>\n      "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <div><strong>"), i = e, s = "name", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</strong> "), i = e, s = "message", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</div>\n          "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="credit_card">\n  <h2>'), u = n, a = "txt.views.subscription_payment_view.credit_card.payment_information", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h2>\n\n  "), u = n, a = "currentAccount.isInternallyBilled", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="section_element">\n    <div class="title">'), u = n, a = "txt.views.subscription_payment_view.credit_card.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n\n    <div class="iframe_wrapper">\n      '), u = n, a = "controller.creditCardRegistrationErrorMessages", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n      "), u = n, a = "zuoraIframeView", f = {}, l = "controller.iframeUrl", f.srcBinding = l, l = "zuora_credit_card_iframe", f.id = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n    </div>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/subscription/subscription_plans"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="header">\n    '), i = e, s = "currentSubscription.isUcsfPricing", o = r["if"], c = h.program(2, y, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      <h3>"), i = e, s = "txt.admin.account_settings.select_plan", o = {}, u = "previewSubscription.displayPlanName", o.plan_nameBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + '</h3>\n      <div class="clear"></div>\n    </div>\n\n    <div class="causeware">\n      <h3>'), i = e, s = "txt.admin.account_settings.generic_starter_plan_now_free_with_a_donation", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</h3>\n    </div>\n\n    <div class="corpus">\n      '), i = e, s = "views/admin/subscription/plan_options_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + '\n      <div class="features">\n        <div class="included">\n          <h4>'), i = e, s = "txt.admin.views.settings.account._subscription_features.What_you_get", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h4>\n          <ul>\n            "), i = e, s = "previewSubscription.advertisedFeatures.included", o = r.each, c = h.program(4, b, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n          </ul>\n        </div>\n        <div class="missing">\n          <h4>'), i = e, s = "txt.admin.views.settings.account._subscription_features.what_you_are_missing", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h4>\n          <ul>\n            "), i = e, s = "previewSubscription.advertisedFeatures.missing", o = r.each, c = h.program(6, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n          </ul>\n        </div>\n      </div>\n      <div class="clear"></div>\n    </div>\n  '), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="billing">\n        '), i = e, s = "views/admin/subscription/agent_cost_summary_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n      </div>\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            <li>"), i = e, s = "", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</li>\n            "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            <li>"), i = e, s = "", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</li>\n            "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div id="loading-status" '), i = {}, s = "updating:loading", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">\n      "), i = e, s = "updateFailed", o = r["if"], c = h.program(9, S, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(11, x, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.admin.account_settings.subscription.unable_to_load_plan_information_at_this_time", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.admin.account_settings.subscription.loading_plan_information", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="title">'), u = n, a = "txt.admin.account_settings.choose_plan", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</div>\n<ul class="plan_selection">\n  <li class="plan starter"><a '), u = n, a = "changePlan", l = r.actionWithEvent, f = l || n.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "actionWithEvent", a, c) : u = f, s.buffer.push(m(u) + ' data-plan="starter">Starter</a></li>\n  <li class="plan regular"><a '), u = n, a = "changePlan", l = r.actionWithEvent, f = l || n.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "actionWithEvent", a, c) : u = f, s.buffer.push(m(u) + ' data-plan="regular">Regular</a></li>\n  <li class="plan plus"><a '), u = n, a = "changePlan", l = r.actionWithEvent, f = l || n.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "actionWithEvent", a, c) : u = f, s.buffer.push(m(u) + ' data-plan="plus">Plus</a></li>\n  <li class="plan enterprise"><a '), u = n, a = "changePlan", l = r.actionWithEvent, f = l || n.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "actionWithEvent", a, c) : u = f, s.buffer.push(m(u) + ' data-plan="enterprise">Enterprise</a></li>\n</ul>\n\n<div class="clear"></div>\n\n<div class="selected_plan_indicator">\n</div>\n\n<div class="plan_description">\n  '), u = n, a = "currentSubscription.isFetched", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "currentSubscription.isFetched", f = r.unless, c = h.program(8, E, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/switch_to_classic"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<h2>"), u = n, a = "txt.admin.switch_to_classic.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h2>\n<h5>\n  "), u = n, a = "txt.admin.switch_to_classic.description1", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "<br />\n  "), u = n, a = "txt.admin.switch_to_classic.description2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n</h5>\n<p class="link">'), u = n, a = "switchURL", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</p>\n<div class="columnbox">\n  <h4 class="column">'), u = n, a = "txt.admin.switch_to_classic.row_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</h4>\n  <p class="column">\n    '), u = n, a = "txt.admin.switch_to_classic.note1", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "<br />\n    "), u = n, a = "txt.admin.switch_to_classic.note2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </p>\n  <button "), u = n, a = "switchToClassic", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="btn btn-inverse">\n    '), u = n, a = "txt.admin.switch_to_classic.button_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/admin/ticket_forms_instructions"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<h5>"), u = n, a = "txt.ticket_forms.admin.ticket_forms", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n<p>\n  "), u = n, a = "txt.ticket_forms.admin.a_ticket_form_determines_the_fields", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n</p>\n<p>\n  "), u = n, a = "txt.ticket_forms.admin.you_can_create_multiple_ticket_forms_v2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n</p>\n\n<div class="instructions">\n  <h5>'), u = n, a = "txt.admin.views.ticket_forms.end_user_text.text_v2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n  "), u = n, a = "lib/views/labeled_text_area", f = {}, l = "controller.ticketFormsInstructions", f.valueBinding = l, l = "label", f.labelBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n</div>\n<button href="#" '), u = n, a = "onSave", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn save" >'), u = n, a = "txt.modal.edit.save", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</button>\n"), o
}), Ember.TEMPLATES["templates/admin/ticket_forms_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="container">\n  '), u = n, a = "TicketFormsListView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n  "), u = n, a = "TicketFormsInstructionsView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n</div>\n"), o
}), Ember.Handlebars.registerPartial("channels.dialer_view", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n  "), i = {}, s = "div", i.tagName = s, s = "popover below dialer", i["class"] = s, s = "parentView.oneChannel", i.classNameBindings = s, s = "parentView", i.dialerBinding = s, s = "controller", i.controllerBinding = s, l = r.view, s = l || e.view, c = h.program(2, b, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s;
        return t.buffer.push('\n    <div class="arrow"></div>\n    <div class="popover-inner">\n      '), i = {}, s = "div", i.tagName = s, s = "voice-section", i.id = s, s = "parentView.voiceState.hasVoiceEnabled", i.isVisibleBinding = s, s = "controller", i.controllerBinding = s, l = r.view, s = l || e.view, c = h.program(3, w, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = {}, s = "div", i.tagName = s, s = "chat-section", i.id = s, s = "ChatLotus.Service.hasChatEnabled", i.isVisibleBinding = s, l = r.view, s = l || e.view, c = h.program(20, O, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n    </div>\n    <div class="clear"></div>\n  '), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div id="voice-header" class="item">\n          <span class="dialer-title">'), i = e, s = "txt.views.channels.dialer_view.voice_header", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</span>\n          "), i = e, s = "views/channels/availability/voice_split_availability_view", o = {}, u = "split dropdown", o["class"] = u, u = "controller", o.controllerBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(4, E, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </div>\n        "), i = e, s = "controller.voiceState.hasOutboundEnabled", o = r["if"], c = h.program(11, N, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n        <div id="no-calls">\n          '), i = e, s = "controller.noCallsMessagingVisible", o = r["if"], c = h.program(13, C, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </div>\n        "), i = e, s = "views/channels/call_console_view", o = {}, u = "call-console", o.id = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n        "), i = {}, s = "div", i.tagName = s, s = "voice-dialer", i.id = s, s = "controller.showKeypad", i.isVisibleBinding = s, l = r.view, s = l || e.view, c = h.program(18, A, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            "), i = e, s = "views/channels/availability/voice_availability_view", o = {}, u = "is-available", o["class"] = u, l = r.view_module, u = l || e.view_module, c = h.program(5, S, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n            <button class="btn dropdown-toggle via" data-toggle="dropdown">\n              '), i = {}, s = "span", i.tagName = s, s = "browser", i["class"] = s, s = "isViaBrowser", i.isVisibleBinding = s, l = r.view, s = l || e.view, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "view", c) : i = s, t.buffer.push(m(i) + "\n              "), i = {}, s = "span", i.tagName = s, s = "phone", i["class"] = s, s = "isViaPhone", i.isVisibleBinding = s, l = r.view, s = l || e.view, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "view", c) : i = s, t.buffer.push(m(i) + '\n              <b class="caret"></b>\n            </button>\n\n            <ul class="menu dropdown-menu pull-right">\n              <li '), i = e, s = "availableViaBrowser", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + '>\n                <a>\n                  <span class="browser"></span>\n                  '), i = e, s = "txt.views.channels.phone_number_view.specifically_via_browser", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n                </a>\n              </li>\n              "), i = e, s = "hasVoiceNumber", o = r["if"], c = h.program(7, x, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(9, T, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n            </ul>\n          "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n              "), i = {}, s = "blip", i["class"] = s, s = "view.voiceState.available", i.classNameBindings = s, l = r.view, s = l || e.view, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "view", c) : i = s, t.buffer.push(m(i) + '\n              <div class="text pull-left">'), i = e, s = "label", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</div>\n            "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n                <li "), i = e, s = "availableViaPhone", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + '>\n                  <a>\n                    <span class="phone"></span>\n                    '), i = e, s = "txt.views.channels.phone_number_view.via_phone", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + " "), i = e, s = "voiceNumber", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n                  </a>\n                </li>\n              "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n                <li class="not-configured">\n                  <a>\n                    <span class="phone"></span>\n                    '), i = e, s = "txt.views.channels.phone_number_view.via_phone", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + ' <span class="not-configured">'), i = e, s = "txt.views.channels.phone_number_view.not_configured", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</span>\n                  </a>\n                </li>\n              "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <div id="calling-number" class="item">\n            <span id="dialout-icon"></span>\n            '), i = e, s = "views/channels/phone_number_view", o = {}, u = "span", o.tagName = u, u = "calling-number-select", o.id = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n          </div>\n          <div "), i = e, s = "toggleKeypad", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' onclick="return false;" '), i = {}, s = ":logo-wrapper :item :sheen controller.dialerLogo", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + '>\n            <div id="outbound-logo" '), i = {}, s = ":dialer-logo controller.dialerLogo", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + "></div>\n          </div>\n        "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n            <div id="voice-message" class="message">\n              '), i = e, s = "controller.voiceState.available", o = r["if"], c = h.program(14, k, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(16, L, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n              <a "), i = e, s = "showSettings", o = {}, u = "controller.voiceController", o.target = u, u = "true", o.propagateEvents = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' onclick="return false;" class="change-settings"></a>\n            </div>\n          '), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n                "), i = e, s = "txt.views.channels.dialer_view.no_incoming_calls", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n              "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n                "), i = e, s = "txt.views.channels.dialer_view.currently_offline", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n              "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          "), i = e, s = "views/channels/outbound_dialer_view", o = {}, u = "controller", o.controllerBinding = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n        "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <div id="chat-header" class="item">\n          <span class="dialer-title">'), i = e, s = "txt.views.channels.dialer_view.chat_header", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</span>\n\n          "), i = e, s = "views/channels/availability/chat_availability_view", l = r.view_module, o = l || e.view_module, c = h.program(21, M, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof o === p ? i = o.call(e, s, c) : i = g.call(e, o, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n        </div>\n        "), i = e, s = "Chat.hasConnection", o = r.unless, c = h.program(23, _, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n        <div id="incoming-chats">\n          '), i = {}, s = "div", i.tagName = s, s = "chat-message", i.id = s, s = "message", i["class"] = s, s = "Chat.invitesController.hasNoInvites", i.isVisibleBinding = s, l = r.view, s = l || e.view, c = h.program(25, D, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), i = e, s = "ChatLotus.DialerView", l = r.view, o = l || e.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view", s, c) : i = o, t.buffer.push(m(i) + "\n        </div>\n      "), n
    }

    function M(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            "), i = {}, s = "blip", i["class"] = s, s = "ChatLotus.Service.Availability.availabilityClass", i.classNameBindings = s, l = r.view, s = l || e.view, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "view", c) : i = s, t.buffer.push(m(i) + '\n            <div class="text pull-left">'), i = e, s = "label", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</div>\n          "), n
    }

    function _(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <div id="chat-status">\n            <div class="message">\n              <div class="indicator"></div>\n              '), i = e, s = "txt.views.channels.dialer_view.chat_is_unavailable", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n            </div>\n          </div>\n        "), n
    }

    function D(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "ChatLotus.Service.Availability.available", o = r["if"], c = h.program(26, P, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(29, B, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function P(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n              "), i = e, s = "Chat.invitesController.hasNoInvites", o = r["if"], c = h.program(27, H, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n            "), n
    }

    function H(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n                "), i = e, s = "txt.views.channels.dialer_view.no_incoming_chats", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n              "), n
    }

    function B(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n              "), i = e, s = "txt.views.channels.dialer_view.currently_offline", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n            "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return u = n, a = "views/channels/dialer_view", l = r.view_module, f = l || n.view_module, c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, l && typeof f === p ? u = f.call(n, a, c) : u = g.call(n, f, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.TEMPLATES["templates/channels/call_console_ticket_view"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <button "), i = e, s = "hang_up", o = {}, u = "voiceController", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="btn btn-inverse right danger hang_up" tabindex="-1">\n      '), i = e, s = "txt.voice.actions.hang_up", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n    </button>\n\n    <button "), i = e, s = "toggleMute", o = {}, u = "voiceController", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + "\n            "), i = {}, s = "voiceState.callConsoleMuted:muted :btn :mute", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + "\n            "), i = {}, s = "voiceController.cannotMute", i.disabled = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + '\n            tabindex="-1">\n      '), i = e, s = "txt.voice.actions.mute", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n    </button>\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <button class="btn btn-inverse right primary disabled" tabindex="-1">\n      '), i = e, s = "voiceState.waitingMessage", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n    </button>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="icons">\n      <div class="calling_number">\n        <span class="icon"></span>\n        '), i = e, s = "voiceState.currentCall.display_number", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '\n      </div>\n      <div class="separator"></div>\n      <div class="caller_location">\n        <span class="icon"></span>\n        '), i = e, s = "voiceState.currentCall.callerLocation", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n      </div>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="action-bar">\n  '), u = n, a = "controller.canHangUp", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "isConnecting", f = r["if"], c = h.program(3, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "controller.canHangUp", f = r["if"], c = h.program(5, b, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="clear"></div>\n</div>\n'), o
}), Ember.TEMPLATES["templates/channels/call_console_view"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "waitMessage", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  <span>"), i = e, s = "txt.views.voice.call_console.missed_call", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '</span>\n  <span class="reasonTitle">'), i = e, s = "missedCallReason.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + '</span>\n  <span class="reasonDetails">'), i = e, s = "missedCallReason.details", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n"), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  <div>\n    "), i = e, s = "content.ticket.href", o = {}, u = "btn btn-inverse full ticket", o.classNames = u, c = r.linkTo, u = c || e.linkTo, h = p.program(6, S, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  </div>\n"), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "txt.voice.console.ticket_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + ' <span class="id">#'), i = e, s = "parentView.content.ticket.id", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n    "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <br/>\n      <button "), i = e, s = "goToOrganization", o = {}, u = "voiceController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="caller-organization">\n        '), i = e, s = "content.caller.organization.name", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <span class="location">'), i = e, s = "content.callerLocation", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n  "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <span class="called-from number">'), i = e, s = "content.human_calling_number", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n  "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <span class="received-at number">'), i = e, s = "content.human_answering_number", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</span>\n  "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "parentView.inConnectionPhase", o = r["if"], h = p.program(17, L, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(19, A, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <span class="console-button btn green connecting disabled">\n        '), i = e, s = "txt.voice.actions.connecting", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </span>\n    "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <button "), i = e, s = "decline", o = {}, u = "parentView.voiceController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="console-button btn btn-inverse" '), i = {}, s = "parentView.isCheckingForConnection", i.disabled = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ">\n        "), i = e, s = "txt.voice.actions.decline", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n      <button "), i = e, s = "accept", o = {}, u = "parentView.voiceController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + " "), i = {}, s = "parentView.isCheckingForConnection :console-button :btn :btn-inverse :green", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = {}, s = "parentView.isCheckingForConnection", i.disabled = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ">\n        "), i = e, s = "parentView.acceptButtonText", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="mute-container">\n      <button '), i = e, s = "toggleMute", o = {}, u = "parentView.voiceController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + " "), i = {}, s = "parentView.voiceController.isMuted:muted :btn :mute", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = {}, s = "parentView.voiceController.cannotMute", i.disabled = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ">\n        "), i = e, s = "txt.voice.actions.mute", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    </div>\n    <button "), i = e, s = "hang_up", o = {}, u = "parentView.voiceController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn btn-inverse danger hang_up">\n      '), i = e, s = "txt.voice.actions.hang_up", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    </button>\n  "), n
    }

    function M(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <button "), i = e, s = "finish", o = {}, u = "parentView.voiceController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn btn-inverse green wide">\n      '), i = e, s = "txt.voice.actions.wrapup", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    </button>\n  "), n
    }

    function _(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <button "), i = e, s = "closeConsole", o = {}, u = "parentView", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn console-btn btn-inverse wide">\n      '), i = e, s = "txt.voice.actions.close", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    </button>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = {}, a = "button", u.tagName = a, a = "btn btn-inverse disabled full", u["class"] = a, a = "isConnecting", u.isVisibleBinding = a, a = "voiceState.waitingMessage", u.waitMessageBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/channels/call_countdown_view", f = {}, l = "isVisible", f.isVisibleBinding = l, l = "voiceController", f.voiceControllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = {}, a = "div", u.tagName = a, a = "missed-call", u["class"] = a, a = "showMissedCallMessage", u.isVisibleBinding = a, a = "missedCallReason", u.missedCallReasonBinding = a, c = r.view, a = c || n.view, h = p.program(3, w, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "content.hasTicket", f = r["if"], h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n<a "), u = n, a = "showSettings", f = {}, l = "voiceController", f.target = l, l = "true", f.propagateEvents = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' onclick="return false;" class="change-settings"></a>\n\n<div class="info">\n  <div class="requester">\n    <img '), u = {}, a = "content.callerPhotoUrl", u.src = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '/>\n  </div>\n  <div class="caller-info">\n    <button '), u = n, a = "goToCaller", f = {}, l = "voiceController", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="caller-name">\n      '), u = n, a = "content.caller.name", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n    </button>\n    "), u = n, a = "content.caller.organization.name", f = r["if"], h = p.program(8, x, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  </div>\n  <div class="calling_number">'), u = n, a = "content.display_number", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</div>\n  "), u = n, a = "content.callerLocation", f = r["if"], h = p.program(10, T, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n\n\n<div class="answering_number">\n  '), u = n, a = "content.outbound", f = r["if"], h = p.program(12, N, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(14, C, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n<div class="action-bar">\n  '), u = {}, a = "canAcceptOrDecline", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(16, k, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  "), u = {}, a = "canHangUp", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(21, O, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  "), u = {}, a = "canWrapUp", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(23, M, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = {}, a = "showMissedCallMessage", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(25, _, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  <div class="clear"></div>\n</div>\n'), o
}), Ember.TEMPLATES["templates/channels/call_countdown_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="countdown-timer">\n  <span class="countdown-label">'), u = n, a = "txt.voice.console.countdown.incoming_call", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</span>\n  <span class="countdown-secs">'), u = n, a = "txt.voice.console.countdown.answer_in", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ' <span class="seconds">'), u = n, a = "secondsRemaining", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>"), u = n, a = "txt.voice.console.countdown.seconds", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</span>\n</div>\n"), o
}), Ember.TEMPLATES["templates/channels/call_timer"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o, u = this;
    s.buffer.push('<div class="timer_slider_container">\n  <div class="timer_slider">\n    <div class="arrow"></div>\n    <div class="control">\n      <button class="voice_timer" tabindex="-1">\n        <span class="time">00:00</span>\n      </button>\n    </div>\n    <div class="clear"></div>\n  </div>\n</div>\n')
}), Ember.TEMPLATES["templates/channels/dialer_keypad_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o, u = this;
    s.buffer.push('<div class="keypad-button" id="keypad-button-1" data-keypad-key="1">\n  <span class="number">1</span>\n  <span class="letters">&nbsp;</span>\n</div>\n<div class="keypad-button" id="keypad-button-2" data-keypad-key="2">\n  <span class="number">2</span>\n  <span class="letters">ABC</span>\n</div>\n<div class="keypad-button" id="keypad-button-3" data-keypad-key="3">\n  <span class="number">3</span>\n  <span class="letters">DEF</span>\n</div>\n<div class="keypad-button" id="keypad-button-4" data-keypad-key="4">\n  <span class="number">4</span>\n  <span class="letters">GHI</span>\n</div>\n<div class="keypad-button" id="keypad-button-5" data-keypad-key="5">\n  <span class="number">5</span>\n  <span class="letters">JKL</span>\n</div>\n<div class="keypad-button" id="keypad-button-6" data-keypad-key="6">\n  <span class="number">6</span>\n  <span class="letters">MNO</span>\n</div>\n<div class="keypad-button" id="keypad-button-7" data-keypad-key="7">\n  <span class="number">7</span>\n  <span class="letters">PQRS</span>\n</div>\n<div class="keypad-button" id="keypad-button-8" data-keypad-key="8">\n  <span class="number">8</span>\n  <span class="letters">TUV</span>\n</div>\n<div class="keypad-button" id="keypad-button-9" data-keypad-key="9">\n  <span class="number">9</span>\n  <span class="letters">WXYZ</span>\n</div>\n<div class="keypad-button" id="keypad-button-star" data-keypad-key="*">\n  <span class="number">*</span>\n  <span class="letters">&nbsp;</span>\n</div>\n<div class="keypad-button" id="keypad-button-0" data-keypad-key="0">\n  <span class="number">0</span>\n  <span class="letters">+</span>\n</div>\n<div class="keypad-button" id="keypad-button-hash" data-keypad-key="#">\n  <span class="number">#</span>\n  <span class="letters">&nbsp;</span>\n</div>\n')
}), Ember.TEMPLATES["templates/channels/outbound_dialer_view"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        t.buffer.push('\n      <div id="backspace-button"></div>\n    ')
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <button "), i = e, s = "place", o = {}, u = "outboundCall", o.target = u, c = r.actionWithEvent, u = c || e.actionWithEvent, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "actionWithEvent", s, h) : i = u, t.buffer.push(g(i) + " "), i = {}, s = "voiceState.dialing", i.disabled = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ' class="call green console-button">\n      '), i = e, s = "voiceState.dialing", o = r["if"], h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(6, S, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </button>\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.voice.dialer.calling", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.voice.dialer.call", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div id="dialer-inner">\n  <div id="dialed-number-wrapper">\n    '), u = n, a = "views/channels/dialer_calling_code_view", f = {}, l = "span", f.tagName = l, l = "country-select", f.id = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "views/channels/outbound_dialer_number_field", f = {}, l = "dialed-number", f.id = l, l = "voiceState.dialedNumber", f.valueBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = {}, a = "backspace-wrapper", u.id = a, a = "noActiveCall", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n\n  "), u = n, a = "views/channels/dialer_keypad_view", f = {}, l = "dialer-keypad", f.id = l, l = "pull-right", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n  "), u = n, a = "noActiveCall", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/components/launchpad_action"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "text", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/contextual_help/contextual_help"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <div class="title_bar clickable" '), i = e, s = "toggleMenu", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + '>\n    <div class="icon">&#10067;</div>\n    <label>'), i = e, s = "currentSubject.title", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</label>\n    "), i = e, s = "expanded", o = r["if"], c = h.program(2, b, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n  </div>\n\n  <div class="content">\n    <div class="descriptions">\n      '), i = e, s = "currentSubject.descriptions", o = r.each, c = h.program(4, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n\n    "), i = e, s = "hasTabContents", o = r["if"], c = h.program(6, E, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  </div>\n"), n
    }

    function b(e, t) {
        t.buffer.push("\n      <a>&#59232;</a>\n    ")
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <p>"), i = e, s = "", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + "</p>\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <div class="sections">\n        <nav '), i = {}, s = "tabCount", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">\n          "), i = e, s = "tabContents", o = r.each, c = h.program(7, S, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        </nav>\n\n        <ul>\n          <li "), i = {}, s = ":tutorials view.shouldShowTutorials:active", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">\n            "), i = e, s = "tutorials.data", o = r.each, c = h.program(10, T, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          </li>\n\n          <li "), i = {}, s = ":videos view.shouldShowVideos:active", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">\n            "), i = e, s = "views/contextual_help/video_thumbnail_view", o = {}, u = "videos.data", o.dataBinding = u, u = "controller", o.controllerBinding = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n          </li>\n\n          <li "), i = {}, s = ":references view.shouldShowReferences:active", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + '>\n            <div class="container">\n              '), i = e, s = "references.data", o = r.each, c = h.program(12, N, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n            </div>\n            <div class="foot">\n              <a '), i = e, s = "trackGotoForum", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ' href="https://support.zendesk.com/forums" target="_blank">'), i = e, s = "txt.contextual.go_to_forums", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</a>\n              <a "), i = e, s = "trackSubmitRequest", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ' href="https://support.zendesk.com/requests/anonymous/new" target="_blank">'), i = e, s = "txt.contextual.submit_request", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</a>\n            </div>\n          </li>\n        </ul>\n\n      </div>\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            "), i = e, s = "views/contextual_help/nav_view", o = {}, l = r.key, u = l || e.key, o.name = u, u = "controller", o.controllerBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(8, x, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n              <div class="icon">'), i = e, s = "icon", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</div>\n              <label>"), i = e, s = "label", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + "</label>\n            "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n              <div class="bullet">&#9204;</div>\n              <a href="'), i = e, s = "link", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push('" target="_blank">'), i = e, s = "topic", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + "</a>\n            "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n                "), i = e, s = "subTopics", l = r.unboundIf, o = l || e.unboundIf, c = h.program(13, C, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(15, k, t), c.data = t, l && typeof o === p ? i = o.call(e, s, c) : i = g.call(e, o, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n              "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n                  "), i = e, s = "views/contextual_help/subtopics_view", o = {}, u = e, o.data = u, u = "controller", o.controllerBinding = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n                "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n                  <div class="bullet">&#9204;</div>\n                  <a '), i = e, s = "trackLinkVisit", l = r.actionWithEvent, o = l || e.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "actionWithEvent", s, c) : i = o, t.buffer.push(m(i) + ' href="'), i = e, s = "link", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push('" target="_blank">'), i = e, s = "topic", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + "</a>\n                "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return u = n, a = "initialized", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/contextual_help/modal_video"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<button class="close_video" data-dismiss="modal">✕</button>\n<iframe src="'), u = n, a = "videoSrc", l = r.unbound, f = l || n.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "unbound", a, c) : u = f, s.buffer.push(m(u) + '"\n        allowtransparency="true"\n        frameborder="0"\n        scrolling="no"\n        class="wistia_embed"\n        name="wistia_embed"\n        width="960"\n        height="540">\n</iframe>\n'), o
}), Ember.TEMPLATES["templates/contextual_help/subtopics"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t, n) {
        var i = "",
            s, o, u;
        return t.buffer.push("\n    <a "), s = e, o = "trackLinkVisit", l = r.actionWithEvent, u = l || e.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(s), c.data = t, typeof u === p ? s = u.call(e, o, c) : u === v ? s = d.call(e, "actionWithEvent", o, c) : s = u, t.buffer.push(m(s) + ' href="'), s = n, o = "data.link", l = r.unbound, u = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(s), c.data = t, typeof u === p ? s = u.call(e, o, c) : u === v ? s = d.call(e, "unbound", o, c) : s = u, (s || s === 0) && t.buffer.push(s), s = e, o = "id", l = r.unbound, u = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(s), c.data = t, typeof u === p ? s = u.call(e, o, c) : u === v ? s = d.call(e, "unbound", o, c) : s = u, (s || s === 0) && t.buffer.push(s), t.buffer.push('" target="_blank">\n      <div class="bullet">&#9204;</div>\n      '), s = e, o = "topic", l = r.unbound, u = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(s), c.data = t, typeof u === p ? s = u.call(e, o, c) : u === v ? s = d.call(e, "unbound", o, c) : s = u, t.buffer.push(m(s) + "\n    </a>\n  "), i
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<a "), u = n, a = "trackLinkVisit", l = r.actionWithEvent, f = l || n.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "actionWithEvent", a, c) : u = f, s.buffer.push(m(u) + ' href="'), u = n, a = "data.link", l = r.unbound, f = l || n.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "unbound", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('" target="_blank">'), u = n, a = "data.topic", l = r.unbound, f = l || n.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "unbound", a, c) : u = f, s.buffer.push(m(u) + "</a>\n<div "), u = n, a = "toggleSubtopics", l = r.action, f = l || n.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "action", a, c) : u = f, s.buffer.push(m(u) + ' class="icon">\n  <span class="plus">&#8862;</span>\n  <span class="minus">&#8863;</span>\n</div>\n<div class="subtopics">\n  '), u = n, a = "data.subTopics", f = r.each, c = h.programWithDepth(g, s, n), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/contextual_help/video_thumbnail"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <span "), i = e, s = "showThumbnail", l = r.actionWithEvent, o = l || e.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "actionWithEvent", s, c) : i = o, t.buffer.push(m(i) + " data-nav-button>\n        <button></button>\n    </span>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<a "), u = n, a = "showVideo", l = r.action, f = l || n.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "action", a, c) : u = f, s.buffer.push(m(u) + "><img "), u = {}, a = "thumbnail", u.src = a, l = r.bindAttr, a = l || n.bindAttr, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "bindAttr", c) : u = a, s.buffer.push(m(u) + "/></a>\n<nav>\n  "), u = n, a = "data", f = r.each, c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</nav>\n"), o
}), Ember.TEMPLATES["templates/current_user/face_box"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <b class="name">'), i = e, s = "parentView.user.name", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</b>\n      <small>"), i = e, s = "txt.header.view_user_profile", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</small>\n    "), n
    }

    function w(e, t) {
        var n, i, s;
        n = e, i = "txt.header.help", c = r.t, s = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(n), h.data = t, typeof s === d ? n = s.call(e, i, h) : s === m ? n = v.call(e, "t", i, h) : n = s, t.buffer.push(g(n))
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "Zendesk.Routes.staticPaths.classicURL", o = {}, u = "_blank", o.target = u, c = r.linkTo, u = c || e.linkTo, h = p.program(6, S, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.header.view_customer_portal", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.header.user_logout", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<a href="" id="face" class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n  <img '), u = {}, a = "view.user.profileImageUrl", u.src = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ' />\n  <b class="caret"></b>\n  <i '), u = {}, a = "view.hasUnreadFeatureNotifications", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '></i>\n</a>\n\n<ul class="dropdown-menu pull-right">\n  <li>\n    '), u = n, a = "view.user.href", f = {}, l = "button", f["class"] = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </li>\n\n  "), u = n, a = "views/current_user/feature_notifications", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + '\n\n  <li class="divider"></li>\n\n  <li>\n    <a '), u = n, a = "showKeyboardShortcutsModal", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="button" tabindex="-1" href="">\n      '), u = n, a = "txt.keyboard_shortcuts.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </a>\n  </li>\n\n  <li>\n    <a target="_blank" href="https://support.zendesk.com/forums/21222852" tabindex="-1">'), u = n, a = "txt.header.give_feedback", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n  </li>\n\n  <li>\n    "), u = n, a = "Zendesk.Routes.staticPaths.helpURL", c = r.linkTo, f = c || n.linkTo, h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  </li>\n\n  <li class="divider"></li>\n\n  <li>\n    '), u = n, a = "view.showGoToWebPortal", f = r["if"], h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </li>\n\n  <li>\n    "), u = n, a = "view.logoutLink", f = {}, l = "_self", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(8, x, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </li>\n</ul>\n"), o
}), Ember.TEMPLATES["templates/current_user/feature_notifications"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <span class="unread-feature-notification-count">\n        '), i = e, s = "view.unreadCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n      </span>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<li class="divider"></li>\n\n<li>\n  <a '), u = n, a = "showModal", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="button feature-notifications" tabindex="-1" href="">\n    <span>\n      '), u = n, a = "txt.header.whats_new", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </span>\n    "), u = n, a = "view.anyUnread", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </a>\n</li>\n"), o
}), Ember.TEMPLATES["templates/custom_fields/label"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<label class="custom-field-label">'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</label>\n"), o
}), Ember.TEMPLATES["templates/dashboard/activity_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<img class="profile" src="'), u = n, a = "actorPhoto", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '" />\n<div class="description">'), u = n, a = "title", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('</div>\n<div class="comment_value">'), u = n, a = "comment", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + "</div>\n"), u = n, a = "content.created_at", f = {}, l = "true", f.live = l, l = "true", f.relative = l, c = r.timestamp, l = c || n.timestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "timestamp", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/dashboard/indicators"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="stats-group">\n      '), i = e, s = "txt.admin.views.shared._csr_data_boxes.Satisfaction_Statistics_60_days", o = {}, u = "h4", o.tagName = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n      <ul>\n\n        "), i = {}, s = "li", i.tagName = s, s = "controller.isUserStatsOff:hidden", i.classBinding = s, c = r.view, s = c || e.view, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n        "), i = {}, s = "li", i.tagName = s, s = "controller.isAccountStatsOff:hidden", i.classBinding = s, c = r.view, s = c || e.view, h = p.program(4, E, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      </ul>\n    </div>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <div class="cell-value">'), i = e, s = "controller.indicators.satScoreLast60Days", c = r.percent, o = c || e.percent, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "percent", s, h) : i = o, t.buffer.push(g(i) + '</div>\n          <div class="cell-title">'), i = e, s = "txt.admin.views.shared._csr_data_boxes.You", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</div>\n        "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <div class="cell-value">'), i = e, s = "controller.indicators.accountSatScoreLast60Days", c = r.percent, o = c || e.percent, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "percent", s, h) : i = o, t.buffer.push(g(i) + '</div>\n          <div class="cell-title">'), i = e, s = "txt.admin.views.shared._csr_data_boxes.Help_desk", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</div>\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="indicators clearfix">\n\n  <div class="stats-group">\n    '), u = n, a = "txt.admin.views.shared._csr_data_boxes.Open_Tickets_now", f = {}, l = "h4", f.tagName = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n    <ul>\n\n      <li "), u = n, a = "showMyTickets", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":clickable controller.isMyTicketsActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n        <div class="cell-value">'), u = n, a = "controller.indicators.openTickets", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n        <div class="cell-title">'), u = n, a = "txt.helpers.dashboard_helper.You", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n      </li>\n\n      <li "), u = n, a = "showGroupTickets", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":clickable controller.isGroupTicketsActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n        <div class="cell-value">'), u = n, a = "controller.indicators.groupOpenTickets", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n        <div class="cell-title">'), u = n, a = "txt.helpers.dashboard_helper.Groups", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n      </li>\n\n    </ul>\n  </div>\n\n  <div class="stats-group">\n    '), u = n, a = "txt.admin.views.shared._csr_data_boxes.Ticket_Statistics_this_week", f = {}, l = "h4", f.tagName = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n    <ul>\n\n      <li "), u = n, a = "showGoodTickets", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":clickable controller.isGoodTicketsActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n        <div class="cell-value">'), u = n, a = "controller.indicators.ticketsRatedGoodThisWeek", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n        <div class="cell-title">'), u = n, a = "txt.helpers.dashboard_helper.Good", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n      </li>\n\n      <li "), u = n, a = "showBadTickets", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":clickable controller.isBadTicketsActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n        <div class="cell-value">'), u = n, a = "controller.indicators.ticketsRatedBadThisWeek", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n        <div class="cell-title">'), u = n, a = "txt.helpers.dashboard_helper.Bad", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n      </li>\n\n      <li "), u = n, a = "showSolvedTickets", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":clickable controller.isSolvedTicketsActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n        <div class="cell-value">'), u = n, a = "controller.indicators.ticketsSolvedThisWeek", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n        <div class="cell-title">'), u = n, a = "txt.helpers.dashboard_helper.Solved", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n      </li>\n\n    </ul>\n  </div>\n\n  "), u = n, a = "controller.isStatsOn", f = r["if"], h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/dashboard/launchpad_header"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/dashboard_button", o = {}, u = "activateDashboard", o.action = u, c = r.view_module, u = c || e.view_module, h = p.program(2, w, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    "), i = e, s = "views/launchpad/launchpad_button", o = {}, u = "activateLaunchpad", o.action = u, c = r.view_module, u = c || e.view_module, h = p.program(4, E, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.launchpad.activation_button.hide", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.launchpad.activation_button.show2", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "parentView.launchpadController.shouldShowUpsell", o = r["if"], h = p.program(7, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n    <div class="left days_left_in_trial">\n      '), i = e, s = "parentView.launchpadController.shouldShowTrialCountdown", o = r["if"], h = p.program(10, N, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(12, C, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="left">\n        '), i = e, s = "views/dashboard/buy_now_button", c = r.view_module, o = c || e.view_module, h = p.program(8, T, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof o === d ? i = o.call(e, s, h) : i = y.call(e, o, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </div>\n    "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          "), i = e, s = "txt.admin.views.layouts.settings_tab.buy_now", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n        "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <span class="trial_warning">\n          '), i = e, s = "parentView.currentAccount.daysLeftInTrial", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n        </span>\n        "), i = e, s = "txt.admin.public.javascript.header_renderer.days_left_in_trial_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "parentView.launchpadController.isTrialExpired", o = r["if"], h = p.program(13, k, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(15, L, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <span class="trial_warning">\n            '), i = e, s = "txt.launchpad.trial.expired_text", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          </span>\n        "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <span class="trial_warning">\n            '), i = e, s = "txt.launchpad.trial.expires_today_text", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          </span>\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="pane left">\n  '), u = n, a = "views/launchpad/toggle_view", c = r.view_module, f = c || n.view_module, h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="pane right">\n  '), u = n, a = "parentView.currentAccount.isTrialAccount", f = r["if"], h = p.program(6, S, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="right">\n    <div class="btn-group">\n      '), u = n, a = "views/launchpad/learn_more_view", f = {}, l = "learn_more", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    </div>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/filters/column_editor/active_column_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<i class="checkmark icon-ok"></i>\n<span class="item-content">'), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n<a "), u = n, a = "remove", f = {}, l = "view", f.target = l, c = r.actionWithEvent, l = c || n.actionWithEvent, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "actionWithEvent", a, h) : u = l, s.buffer.push(g(u) + ' class="close">×</a>\n'), o
}), Ember.TEMPLATES["templates/filters/column_editor/available_column_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<i class="checkmark icon-ok"></i><span class="item-content">'), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n"), o
}), Ember.TEMPLATES["templates/filters/column_editor/column_editor"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<div "), u = {}, a = ":popover :static", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n  <div class="popover-inner">\n    <div '), u = {}, a = ":popover-content :active-columns-panel view.controller.shouldShowActiveColumns:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      <h3>"), u = n, a = "txt.user_filters.columns", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n      "), u = n, a = "views/filters/column_editor_active_list_view", f = {}, l = "ul", f.tagName = l, l = "active-columns", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.controller.activeColumns", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n      <div "), u = {}, a = ":commands :add-column view.controller.shouldShowAddColumn:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n        <a "), u = n, a = "showAvailableColumns", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">"), u = n, a = "txt.user_filters.add_columns", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</a>\n      </div>\n\n      <div class="divider"></div>\n\n      <h3>'), u = n, a = "txt.user_filters.group_by", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n        <div "), u = {}, a = ":sorter :link view.controller.groupOrder", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + "\n             "), u = n, a = "toggleGroupOrder", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n          "), u = n, a = "txt.user_filters.sort", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ' <i class="arrow-up"></i><i class="arrow-down"></i>\n        </div>\n      </h3>\n      '), u = n, a = "lib/views/select_view", f = {}, l = "view.controller.groupByColumns", f.optionsBinding = l, l = "ComboSelectMenu", f.delegateType = l, l = "view.controller.groupBy", f.valueBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n      <h3>"), u = n, a = "txt.user_filters.order_by", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n        <div "), u = {}, a = ":sorter :link view.controller.sortOrder", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + "\n             "), u = n, a = "toggleSortOrder", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n             "), u = n, a = "txt.user_filters.sort", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ' <i class="arrow-up"></i><i class="arrow-down"></i>\n        </div>\n      </h3>\n      '), u = n, a = "lib/views/select_view", f = {}, l = "view.controller.sortByColumns", f.optionsBinding = l, l = "ComboSelectMenu", f.delegateType = l, l = "view.controller.sortBy", f.valueBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    </div>\n\n    <div "), u = {}, a = ":popover-content :available-columns-panel view.controller.shouldShowAvailableColumns:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '>\n      <div class="commands">\n        <a '), u = n, a = "showActiveColumns", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="back-link">'), u = n, a = "txt.control.menu.back_link_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</a>\n      </div>\n\n      <div class="divider"></div>\n\n      <div class="search-container">'), u = n, a = "Em.TextField", f = {}, l = "view.controller.searchKeyword", f.valueBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + '<span class="search_icon"></span></div>\n\n      '), u = n, a = "views/filters/column_editor_available_list_view", f = {}, l = "ul", f.tagName = l, l = "available-columns", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.controller.filteredAvailableColumns", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    </div>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/filters/editor"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <div class="modal-header">\n        <span '), i = e, s = "cancel", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="close">×</span>\n        <h3>'), i = e, s = "txt.user_filters.create_view", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h3>\n      </div>\n    "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="filter-actions">\n        '), i = e, s = "view.previewable", o = r["if"], c = h.program(4, b, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), i = e, s = "view.isModal", o = r["if"], c = h.program(6, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(8, E, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </div>\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <span class="link" '), i = e, s = "previewFilter", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">"), i = e, s = "txt.user_filters.preview", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</span>\n        "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <button type="submit" class="btn btn-inverse" '), i = e, s = "saveFilter", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">"), i = e, s = "txt.modal.edit.save", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</button>\n          <button class="btn" '), i = e, s = "cancel", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">"), i = e, s = "txt.modal.confirm_modal.cancel", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</button>\n        "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <a "), i = e, s = "deleteFilter", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="delete">'), i = e, s = "txt.user_filters.delete", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</a>\n          "), i = e, s = "view.content.resource.isNew", o = r.unless, c = h.program(9, S, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          <a "), i = e, s = "deactivateFilter", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="deactivate">'), i = e, s = "txt.user_filters.deactivate", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</a>\n        "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n            <a "), i = e, s = "cloneFilter", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="clone">'), i = e, s = "txt.user_filters.clone", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</a>\n            <span class="delimiter">&bull;</span>\n          '), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="popover-inner">\n  <div class="popover-content">\n    '), u = n, a = "view.isModal", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    "), u = n, a = "view.TitleView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n    "), u = n, a = "view.VisibilityView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n    <hr>\n    "), u = n, a = "view.AllConditionsView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n    "), u = n, a = "view.shouldShowActions", f = r["if"], c = h.program(3, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/filters/editor/actions"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "controller.editingFilter.resource.isNew", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(4, w, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <button class="btn btn-inverse" '), i = e, s = "saveFilter", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.modal.edit.save", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</button>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="btn-group dropdown">\n      <button class="btn btn-inverse" '), i = e, s = "saveFilter", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.modal.edit.save", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '</button>\n      <button data-toggle="dropdown" class="btn btn-inverse dropdown-toggle">\n        <span class="caret"></span>\n      </button>\n      <ul class="menu dropdown-menu pull-right">\n        <li><a '), i = e, s = "saveFilterAs", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' tabindex="-1">'), i = e, s = "txt.user_filters.save_as", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      </ul>\n    </div>\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <button class="btn btn-inverse" '), i = e, s = "saveFilterAs", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.user_filters.save_as", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</button>\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<span class="editing-status">'), u = n, a = "txt.user_filters.edited", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</span>\n<button class="btn" '), u = n, a = "deactivateAndRevert", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">"), u = n, a = "txt.modal.confirm_modal.cancel", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</button>\n"), u = n, a = "controller.canEdit", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(6, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/filters/editor/conditions"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "view.ZentenceGroupView", f = {}, l = "controller", f.controllerBinding = l, l = "view.menu", f.menuBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + '\n<span class="link add-condition" '), u = n, a = "addCondition", f = {}, l = !1, f.bubbles = l, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">"), u = n, a = "txt.user_filters.add_new_filter", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</span>\n"), o
}), Ember.TEMPLATES["templates/filters/feeds/add_comment"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  <p class='other_viewers'>"), i = e, s = "view.content.otherViewersMessage", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</p>\n"), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "view.content.isViewedByOthers", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n<a class="close" '), u = n, a = "toggleAddComment", f = {}, l = "parentView", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">×</a>\n\n"), u = n, a = "views/tickets/ticket_fields/assignee/assignee_view", f = {}, l = "span", f.tagName = l, l = "view.content", f.ticketBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = n, u = p.invokePartial(i["tickets.add_comment.shared_content"], "tickets.add_comment.shared_content", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/tickets/ticket_fields/status_view", f = {}, l = "view.content", f.ticketBinding = l, l = "view.controller", f.controllerBinding = l, l = "ticket.id", f.isVisibleBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = n, a = "views/tickets/macro_view", f = {}, l = "macro-selector", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.content", f.ticketBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/filters/feeds/feed_ticket"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n\n  <div "), i = {}, s = "view.content.author.isAgent:is-agent :user_photo", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + '>\n    <img src="'), i = e, s = "view.content.author.profileImageUrl", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" class="profile"/>\n    <i class="photo_badge"></i>\n  </div>\n\n  <div class="content">\n    <div class="header">\n      <strong><a href="#/users/'), i = e, s = "view.content.author.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "view.content.author.name", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</a></strong>\n      "), i = e, s = "content.created_at", o = {}, u = "true", o.relative = u, u = "true", o.live = u, u = "span", o.tagName = u, c = r.timestamp, u = c || e.timestamp, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "timestamp", s, h) : i = u, t.buffer.push(g(i) + '\n    </div>\n    <div class="body">\n      <div class="comment"><p>'), i = e, s = "content.body", o = {}, u = "250", o.length = u, c = r.truncateAndTrim, u = c || e.truncateAndTrim, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "truncateAndTrim", s, h) : i = u, t.buffer.push(g(i) + "</p></div>\n    </div>\n  </div>\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="ticket_mast">\n  <h2 class="title">\n    <a href="#/tickets/'), u = n, a = "view.content.id", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '">'), u = n, a = "view.content.subject", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + "</a>\n  </h2>\n\n  <p "), u = {}, a = "content.isViewedByOthers :delimited_items", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <span>\n      <strong>"), u = n, a = "view.content.requester.name", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + "</strong>\n      "), u = n, a = "content.created_at", f = {}, l = "true", f.relative = l, l = "true", f.live = l, l = "span", f.tagName = l, c = r.timestamp, l = c || n.timestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "timestamp", a, h) : u = l, s.buffer.push(g(u) + "\n    </span>\n\n    <span "), u = n, a = "toggleConversation", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="link latest">show full conversation ('), u = n, a = "view.content.comment_count", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + ")</span>\n    <span "), u = n, a = "toggleConversation", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="link full">show compact conversation</span>\n    <span '), u = n, a = "toggleAddComment", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="link reply">reply</span>\n    <span '), u = {}, a = "content.statusName :ticket_status_label", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">"), u = n, a = "view.content.statusDisplayName", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n  </p>\n</div>\n\n"), u = n, a = "Ember.ContainerView", f = {}, l = "view.addCommentView", f.currentViewBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n"), u = n, a = "Ember.ContainerView", f = {}, l = "view.fullConversationView", f.currentViewBinding = l, l = "conversation", f["class"] = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = {}, a = "content.last_comments", u.contentBinding = a, a = "conversation latest_conversation", u["class"] = a, a = "event", u.itemClass = a, a = "content.public:is-public", u.itemClassBinding = a, c = r.collection, a = c || n.collection, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/filters/footer_bulk"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n\n  "), i = {}, s = "controller.suspendedFilterController", i.controllerBinding = s, c = r.view, s = c || e.view, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="controls-group">\n      <button '), i = e, s = "clearSelection", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn">\n        '), i = e, s = "txt.ticket.bulk.clear_button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '\n      </button>\n\n      <div class="btn-group dropup">\n        <button '), i = e, s = "recoverTickets", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn btn-inverse btn-inner-left">\n          '), i = e, s = "controller.recoverButtonLabel", c = r._triageMustache, o = c || e._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "_triageMustache", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push('\n        </button>\n\n        <button class="btn btn-inverse dropdown-toggle" data-toggle="dropdown">\n          <span class="caret"></span>\n        </button>\n\n        <ul class="menu dropdown-menu pull-right">\n          <li>\n            <button '), i = e, s = "deleteTickets", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">\n              "), i = e, s = "controller.deleteButtonLabel", c = r._triageMustache, o = c || e._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "_triageMustache", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("\n            </button>\n          </li>\n          <li>\n            <button "), i = e, s = "recoverTickets", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">\n              "), i = e, s = "controller.recoverButtonLabel", c = r._triageMustache, o = c || e._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "_triageMustache", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("\n            </button>\n          </li>\n        </ul>\n      </div>\n    </div>\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <div class="controls-group">\n    <button '), i = e, s = "clearSelection", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn">\n      '), i = e, s = "txt.ticket.bulk.clear_button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    </button>\n\n    <button "), i = e, s = "showBulkEditForm", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn btn-inverse">\n      '), i = e, s = "view.bulkEditLabel", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n    </button>\n  </div>\n\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "parentView.controller.isSuspendedMode", f = {}, l = "parentView.controller", f.controllerBinding = l, l = r["if"], h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(4, E, s), h.data = s, u = l.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/filters/list_editor/active_filter_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<span class="item-content">'), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</span>\n<span class="actions">\n  <a '), u = n, a = "deactivateFilter", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="deactivate">'), u = n, a = "txt.user_filters.deactivate", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n</span>\n"), o
}), Ember.TEMPLATES["templates/filters/list_editor/inactive_filter_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<span class="item-content">'), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</span>\n<span class="actions">\n  <a '), u = n, a = "activateFilter", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="activate">'), u = n, a = "txt.user_filters.activate", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</a><span class="delimiter">&bull;</span><a\n     '), u = n, a = "deleteFilter", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="delete">'), u = n, a = "txt.user_filters.delete", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n</span>\n"), o
}), Ember.TEMPLATES["templates/filters/suspended_tooltip"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="popover-inner">\n\n  <h3 class="popover-title">\n    <span class="ticket_status_label small suspended">'), u = n, a = "txt.suspended_ticket.type", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</span>\n    "), u = n, a = "content.typeDisplayName", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + " #"), u = n, a = "content.id", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n    <span class="summary_date">'), u = n, a = "content.created_at", c = r.boundTimestamp, f = c || n.boundTimestamp, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "boundTimestamp", a, h) : u = f, s.buffer.push(g(u) + '</span>\n  </h3>\n\n  <div class="popover-content">\n    <p>'), u = n, a = "content.subject", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "<p/>\n    "), u = n, a = "view.suspendedContent", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n\n</div>\n"), o
}), Ember.TEMPLATES["templates/filters/ticket_filter_index_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<a "), u = n, a = "activate", f = {}, l = "view", f.target = l, l = "mouseDown", f.on = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n  "), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n  <span class="count" '), u = {}, a = "view.content.freshCount", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">"), u = n, a = "view.content.ticketCount", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n</a>\n"), o
}), Ember.TEMPLATES["templates/filters/ticket_list"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <tr><td colspan="100">'), i = e, s = "txt.filters.empty_filter", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</td></tr>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<table class="filter_tickets">\n  <thead>\n    '), u = n, a = "views/filters/filter_table_header_view", f = {}, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </thead>\n\n  "), u = n, a = "lib/views/tickets_table_body_view", f = {}, l = "controller", f.controllerBinding = l, l = "controller", f.itemControllerBinding = l, l = "controller.filter.content", f.contentBinding = l, l = "controller.filter.columns", f.columnsBinding = l, l = "controller.filter.groupingColumn", f.groupingColumnBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n  "), u = {}, a = "controller.showEmptyListRow", u.isVisibleBinding = a, a = "tbody", u.tagName = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n</table>\n\n"), u = n, a = "lib/views/pagination", f = {}, l = "view.controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), u = n, a = "views/ticket_list/bulk_footer_view", f = {}, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/filters/ticket_tooltip"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <p class='other_viewers'>"), i = e, s = "content.otherViewersMessage", c = r._triageMustache, o = c || e._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "_triageMustache", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</p>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <div class="last_comment_header" '), i = {}, s = "content.lastComment.public", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ">"), i = e, s = "txt.ticket.events.comments_latest", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '<span class="summary_date">'), i = e, s = "content.lastComment.created_at", c = r.boundTimestamp, o = c || e.boundTimestamp, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "boundTimestamp", s, h) : i = o, t.buffer.push(g(i) + "</span></div>\n      <div>"), i = e, s = "view.lastComment", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</div>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="popover-inner">\n\n  <h3 class="popover-title">\n    <span class="ticket_status_label small" '), u = {}, a = "content.statusName", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">"), u = n, a = "content.statusDisplayName", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n    "), u = n, a = "content.typeDisplayName", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + " #"), u = n, a = "content.id", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n    <span class="priority" '), u = {}, a = "content.priorityClassName", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">("), u = n, a = "content.priorityDisplayName", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + ')</span>\n    <span class="summary_date">'), u = n, a = "content.created_at", c = r.boundTimestamp, f = c || n.boundTimestamp, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "boundTimestamp", a, h) : u = f, s.buffer.push(g(u) + "</span>\n  </h3>\n\n  "), u = n, a = "content.isViewedByOthers", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="popover-content"><p>'), u = n, a = "content.subject", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</p>"), u = n, a = "view.description", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "content.lastComment", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("</div>\n\n</div>\n"), o
}), Ember.TEMPLATES["templates/filters/user_filter_index_item"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<a "), u = n, a = "activate", f = {}, l = "view", f.target = l, l = "mouseDown", f.on = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n  "), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n</a>\n"), o
}), Ember.TEMPLATES["templates/filters/user_list"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "txt.user_filters.empty_filter", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/views/user_list_body_view", f = {}, l = "controller", f.controllerBinding = l, l = "controller", f.itemControllerBinding = l, l = "controller.filter.content", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = {}, a = "controller.showEmptyListRow", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "lib/views/pagination", f = {}, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/filters/user_table_list"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <tr><td colspan="100">'), i = e, s = "txt.user_filters.empty_filter", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</td></tr>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <div class="no_views">\n    <div class="zendesk_logo"></div><br/>\n    '), i = e, s = "txt.user_filters.no_active_views", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "<br/>\n    <a "), i = e, s = "addFilter", o = {}, u = "view.controller.manager", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' tabindex="-1">'), i = e, s = "txt.user_filters.create_view", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n  </div>\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<table class="filter_tickets">\n  <thead>\n    '), u = n, a = "views/filters/user_filter_table_header_view", f = {}, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </thead>\n\n  "), u = n, a = "lib/views/user_table_body_view", f = {}, l = "controller", f.controllerBinding = l, l = "controller", f.itemControllerBinding = l, l = "controller.filter.content", f.contentBinding = l, l = "controller.filter.columns", f.columnsBinding = l, l = "controller.filter.groupingColumn", f.groupingColumnBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n  "), u = {}, a = "controller.showEmptyListRow", u.isVisibleBinding = a, a = "tbody", u.tagName = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n</table>\n\n"), u = n, a = "lib/views/pagination", f = {}, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = n, a = "controller.shouldShowEmptyMessage", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.Handlebars.registerPartial("general.collapsible_sidebar_toggle", Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<button "), u = n, a = "toggleSidebar", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="pin_control action_button">\n  <i class="icon-chevron-right pin"></i><i class="icon-chevron-left unpin"></i>\n</button>\n'), o
})), Ember.TEMPLATES["templates/general/add_tab"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.header.new_ticket", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.header.new_user", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.header.new_organization", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/dialog_button", o = {}, u = "content", o.contentBinding = u, u = "recent_ticket", o["class"] = u, c = r.view_module, u = c || e.view_module, h = p.program(8, x, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <div class="ticket_status '), i = e, s = "content.status", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">#'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '</div>\n          <div class="info">\n            '), i = e, s = "content.title", o = {}, u = "65", o.length = u, c = r.truncateAndTrim, u = c || e.truncateAndTrim, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "truncateAndTrim", s, h) : i = u, t.buffer.push(g(i) + '\n            <div class="requester_name">'), i = e, s = "content.requesterName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</div>\n          </div>\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<span class="icon" /><span>'), u = n, a = "txt.tickets.add_tab.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</span>\n<div class="popover add bottom">\n  <div class="popover-inner">\n    <h3 class="popover-title">'), u = n, a = "txt.header.create_a_new_something", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</h3>\n    <div class="popover-content">\n      '), u = n, a = "views/dialog_button", f = {}, l = "parentView", f.target = l, l = "openNewTicket", f.action = l, l = "Toolbar: Create", f.totangoActivity = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n      "), u = n, a = "views/dialog_button", f = {}, l = "Zendesk.newUserController", f.target = l, l = "newUser", f.action = l, l = "Zendesk.currentUser.canCreateUser", f.isVisibleBinding = l, l = "Toolbar: Create", f.totangoActivity = l, c = r.view_module, l = c || n.view_module, h = p.program(3, w, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n      "), u = n, a = "views/dialog_button", f = {}, l = "parentView.newOrganizationController", f.target = l, l = "newOrganization", f.action = l, l = "Zendesk.currentUser.canCreateOrganization", f.isVisibleBinding = l, l = "Toolbar: Create", f.totangoActivity = l, c = r.view_module, l = c || n.view_module, h = p.program(5, E, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n      <h3 class="popover-title popover-content-title">'), u = n, a = "txt.tickets.last_viewed.title_2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n      "), u = {}, a = "recent_ticket", u.itemClass = a, a = "view.recentTickets.local", u.contentBinding = a, c = r.collection, a = c || n.collection, h = p.program(7, S, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n    </div>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/general/pagination_controls"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "lib/views/page_thumbs_collection", f = {}, l = "view.controller", f.controllerBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/general/tab"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="tab-content-holder">\n  <div class="close" '), u = n, a = "close", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + '>&times;</div>\n  <div class="icon"></div>\n  <div class="tab_text">'), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/general/ticket_tab"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="tab-content-holder">\n  <div class="close" '), u = n, a = "close", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + '>&times;</div>\n  <div class="icon"></div>\n  <div class="tab_text">'), u = n, a = "view.content.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n  <div class="new_chat_message" '), u = n, a = "close", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">"), u = n, a = "view.content.chatController.unreadMessages", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/article"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="icon topic"></div>\n<div class="content clearfix">\n  <p><a href="'), u = n, a = "content.url", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '" target="_blank" class="title">'), u = n, a = "content.name", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "</a></p>\n  "), u = n, a = "txt.user.section.article_item_meta", f = {}, l = "view.createdStamp", f.createdDateBinding = l, l = "p", f.tagName = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/forum"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="icon forum"></div>\n<div class="content cleafix">\n  <p><a href="'), u = n, a = "view.contentUrl", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '" target="_blank" class="title">'), u = n, a = "content.name", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "</a></p>\n  <p>"), u = n, a = "view.meta", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</p>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/group"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="icon group"></div>\n<div class="content cleafix">\n  <p><a href="'), u = n, a = "content.url", l = r.u, f = l || n.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "u", a, c) : u = f, s.buffer.push(m(u) + '" class="title">'), u = n, a = "content.name", l = r.u, f = l || n.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "u", a, c) : u = f, s.buffer.push(m(u) + '</a></p>\n  <div class="details">\n    '), u = n, a = "content.created_at", l = r.timestamp, f = l || n.timestamp, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "timestamp", a, c) : u = f, s.buffer.push(m(u) + "\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/org_user"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    ("), i = e, s = "view.content.roleDisplayName", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ")\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/users/photo_view", f = {}, l = "view.content", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n<div class="content">\n  <a '), u = {}, a = "view.content.href", u.href = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ' class="title">'), u = n, a = "view.content.name", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</a>\n  "), u = n, a = "view.content.isAgent", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="description">'), u = n, a = "view.content.email", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n  <div class="details">'), u = n, a = "view.content.createdTimestamp", c = r._triageMustache, f = c || n._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "_triageMustache", a, h) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('</div>\n</div>\n<div class="clear"></div>\n'), o
}), Ember.TEMPLATES["templates/items/organization"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    / "), i = e, s = "content.default", l = r.u, o = l || e.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "u", s, c) : i = o, t.buffer.push(m(i) + "\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "content.group.name", l = r.u, o = l || e.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "u", s, c) : i = o, t.buffer.push(m(i) + "\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="icon organization"></div>\n<div class="content">\n  <a href="'), u = n, a = "content.href", l = r.u, f = l || n.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "u", a, c) : u = f, s.buffer.push(m(u) + '" class="title">'), u = n, a = "content.name", l = r.u, f = l || n.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "u", a, c) : u = f, s.buffer.push(m(u) + "</a>\n  "), u = n, a = "content.default", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  <div class="description">\n    '), u = n, a = "content.group", f = r["if"], c = h.program(3, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  </div>\n  <div class="details">\n    '), u = n, a = "content.created_at", l = r.timestamp, f = l || n.timestamp, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "timestamp", a, c) : u = f, s.buffer.push(m(u) + "\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/ticket"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<span class="ticket_status_label compact '), u = n, a = "content.statusName", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '">'), u = n, a = "content.statusMnemonic", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '</span>\n<div class="content">\n  <a href="'), u = n, a = "content.href", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '" class="title">'), u = n, a = "content.subject", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '</a>\n  <div class="description">'), u = n, a = "content.description", f = {}, l = "250", f.length = l, c = r.truncateAndTrim, l = c || n.truncateAndTrim, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "truncateAndTrim", a, h) : u = l, s.buffer.push(g(u) + '</div>\n  <div class="details">\n    '), u = n, a = "content.typeName", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + " #"), u = n, a = "content.id", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + " &mdash; "), u = n, a = "content.created_at", c = r.timestamp, f = c || n.timestamp, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "timestamp", a, h) : u = f, s.buffer.push(g(u) + " &mdash; "), u = n, a = "content.requester.name", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/topic"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="icon topic"></div>\n<div class="content clearfix">\n  <p><a href="/entries/'), u = n, a = "content.id", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '" target="_blank" class="title">'), u = n, a = "content.title", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "</a></p>\n  <p>"), u = n, a = "txt.user.section.topics_item_meta", f = {}, l = "view.forumLink", f.forumLinkBinding = l, l = "view.createdStamp", f.createdDateBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n  </p>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/topic_comment"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="icon topic"></div>\n<div class="content clearfix">\n  <p><a href="/entries/'), u = n, a = "content.topic.id", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "#post_"), u = n, a = "content.id", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '" target="_blank" class="title">"'), u = n, a = "strippedComment", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '"</a></p>\n  <p>'), u = n, a = "txt.user.section.topic_comments_item_meta", f = {}, l = "view.topicLink", f.topicLinkBinding = l, l = "view.createdStamp", f.createdDateBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n  </p>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/topic_vote"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="icon topic"></div>\n<div class="content clearfix">\n  <p><a href="/entries/'), u = n, a = "content.topic.id", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '" target="_blank" class="title">'), u = n, a = "content.topic.title", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "</a></p>\n  <p>"), u = n, a = "txt.user.section.topic_votes_item_meta", f = {}, l = "view.createdStamp", f.createdDateBinding = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n  </p>\n</div>\n"), o
}), Ember.TEMPLATES["templates/items/user"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    ("), i = e, s = "content.roleDisplayName", c = r.u, o = c || e.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "u", s, h) : i = o, t.buffer.push(g(i) + ")\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    / <a href="'), i = e, s = "content.organization.href", c = r.u, o = c || e.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "u", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "content.organization.name", c = r.u, o = c || e.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "u", s, h) : i = o, t.buffer.push(g(i) + "</a>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/users/photo_view", f = {}, l = "content", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n<div class="content">\n  <a href="'), u = n, a = "content.href", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '" class="title">'), u = n, a = "content.name", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + "</a>\n  "), u = n, a = "content.isAgent", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "content.organization", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  <div class="description">\n    '), u = n, a = "content.email", c = r.u, f = c || n.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "u", a, h) : u = f, s.buffer.push(g(u) + '\n  </div>\n  <div class="details">\n    '), u = n, a = "content.created_at", c = r.timestamp, f = c || n.timestamp, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "timestamp", a, h) : u = f, s.buffer.push(g(u) + '\n  </div>\n</div>\n<div class="clear"></div>\n'), o
}), Ember.TEMPLATES["templates/launchpad/add_agents"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <div class="launchpad-task">\n    <div class="icon agents"></div>\n    <h3>'), i = e, s = "txt.launchpad.add_agents.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h3>\n    <hr />\n    <p>\n      "), i = e, s = "txt.launchpad.add_agents.description", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      "), i = e, s = "learnMoreURL", o = {}, u = "_blank", o.target = u, l = r.linkTo, u = l || e.linkTo, c = h.program(2, b, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </p>\n      "), i = e, s = "shouldShowSample", o = r["if"], c = h.program(4, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "shouldShowSettings", o = r["if"], c = h.program(6, E, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n      <div class="content">\n        <div class="triangle-up"></div>\n        '), i = e, s = "shouldShowSample", o = r["if"], c = h.program(8, S, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), i = e, s = "shouldShowSettings", o = r["if"], c = h.program(10, x, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </div>\n  </div>\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.launchpad.learn_more.button", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <button "),
        i = e, s = "showSettings", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ' class="btn btn-info">\n          '), i = e, s = "txt.admin.views.settings.tickets.show.Settings", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n        </button>\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <button "), i = e, s = "goToNextIncompleteTask", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ' class="btn">\n          '), i = e, s = "date.datepicker.close_text", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n        </button>\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          "), i = e, s = "lib/views/iframe_view", o = {}, u = "videoSrc", o.srcBinding = u, u = "true", o.allowtransparency = u, u = "0", o.frameborder = u, u = "no", o.scrolling = u, u = "wistia_embed", o["class"] = u, u = "wistia_embed", o.name = u, u = "960", o.width = u, u = "540", o.height = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n        "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <div class="add_agents">\n            '), i = e, s = "AgentListTextArea", l = r.view, o = l || e.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view", s, c) : i = o, t.buffer.push(m(i) + '\n            <div class="hint">('), i = e, s = "txt.launchpad.add_agents.hint", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + ")</div>\n            "), i = e, s = "InviteAgentsButton", l = r.view, o = l || e.view, c = h.program(11, T, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof o === p ? i = o.call(e, s, c) : i = g.call(e, o, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          </div>\n        "), n
    }

    function T(e, t) {
        var n, i, s, o;
        n = e, i = "label", s = {}, o = "true", s.escaped = o, l = r._triageMustache, o = l || e._triageMustache, c = {}, c.hash = s, c.contexts = [], c.contexts.push(n), c.data = t, typeof o === p ? n = o.call(e, i, c) : o === v ? n = d.call(e, "_triageMustache", i, c) : n = o, t.buffer.push(m(n))
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return u = n, a = "views/launchpad/tasks/add_agents_view", l = r.view_module, f = l || n.view_module, c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, l && typeof f === p ? u = f.call(n, a, c) : u = g.call(n, f, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/launchpad/add_chat"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.settings.portal._settings.learn_more_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        t.buffer.push('\n        <img alt="Sample_chat" src="https://assets.zendesk.com/agent/assets/launchpad/sample_chat-3832f9a76ab835899541dc801e559fe4.png" />\n      ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon chat"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.addChat.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.launchpad.add_chat.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(5, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/add_facebook"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.launchpad.learn_more.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon facebook"></div>\n  <h3>'), u = n, a = "txt.launchpad.add_facebook.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n      "), u = n, a = "txt.launchpad.add_facebook.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n        <img alt="Sample_facebook" src="https://assets.zendesk.com/agent/assets/launchpad/sample_facebook-179c4a689acd96e31f639b0d9c48dfac.png" />\n    </div>\n</div>\n'), o
}), Ember.TEMPLATES["templates/launchpad/add_feedback_tab"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.settings.portal._settings.learn_more_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        t.buffer.push('\n        <img alt="Sample_feedback_tab" src="https://assets.zendesk.com/agent/assets/launchpad/sample_feedback_tab-d0d078f87c19070e0f95b61a7c284ac0.png" />\n      ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon feedback"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.addFeedbackTab.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.launchpad.feedback_tab.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(5, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/add_help_center"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <button "), i = e, s = "goToNextIncompleteTask", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' class="btn">\n        '), i = e, s = "date.datepicker.close_text", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <button "), i = e, s = "showSettings", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' class="btn btn-info">\n        '), i = e, s = "txt.launchpad.menu.task.addHelpCenter.label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon hc"></div>\n  '), u = n, a = "txt.launchpad.menu.task.addHelpCenter.label", f = {}, l = "h3", f.tagName = l, c = r.t, l = c || n.t, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "t", a, h) : u = l, s.buffer.push(g(u) + "\n  <hr />\n  <p>\n      "), u = n, a = "txt.launchpad.addHelpCenter.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      <a "), u = n, a = "showSettings", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ">\n        "), u = n, a = "txt.launchpad.learn_more.button", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      </a>\n  </p>\n    "), u = n, a = "shouldGoToSettings", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(3, b, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    <div class="content">\n      <div class="triangle-up"></div>\n        <img alt="Sample_help_center" src="https://assets.zendesk.com/agent/assets/launchpad/sample_help_center-a1479949fba507d3bdc435120aebaec3.png" />\n    </div>\n</div>\n'), o
}), Ember.TEMPLATES["templates/launchpad/add_twitter"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.launchpad.learn_more.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon twitter"></div>\n  <h3>'), u = n, a = "txt.users.edit.add_twitter_handle_title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n      "), u = n, a = "txt.launchpad.add_twitter.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n        <img alt="Sample_twitter" src="https://assets.zendesk.com/agent/assets/launchpad/sample_twitter-c8cb06d465866a44aae50ea79c33f4ac.png" />\n    </div>\n</div>\n'), o
}), Ember.TEMPLATES["templates/launchpad/add_voice"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.voice.settings.index.learn_more", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        t.buffer.push('\n        <img alt="Sample_voice" src="https://assets.zendesk.com/agent/assets/launchpad/sample_voice-b208933fa634c800679fdfc2bccdf1b2.png" />\n      ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon voice"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.addVoice.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.launchpad.add_voice.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(5, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/benchmark"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.launchpad.learn_more.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon benchmark"></div>\n  <h3>'), u = n, a = "txt.launchpad.benchmark_survey.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n      "), u = n, a = "txt.launchpad.benchmark_survey.intro_text", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n      <button "), u = n, a = "goToNextIncompleteTask", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' class="btn">\n        '), u = n, a = "date.datepicker.close_text", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n      </button>\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "views/launchpad/benchmark_survey_view", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + "\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/benchmark_global_chart"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="category">'), i = e, s = "txt.launchpad.tour.benchmark.global_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n    <div class="data">\n      '), i = e, s = "globalSatisfaction", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '<br/>\n      <div class="description">'), i = e, s = "txt.launchpad.tour.benchmark.customer_satisfaction_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n    </div>\n    <div class="data">\n      '), i = e, s = "globalResponseTime", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "<span class='unit'>"), i = e, s = "industryResponseTimeUnit", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</span><br/>\n      <div class="description">'), i = e, s = "txt.launchpad.tour.benchmark.response_time_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n    </div>\n    <div class="data">\n      '), i = e, s = "globalTickestPerMonth", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '<br/>\n      <div class="description">'), i = e, s = "txt.launchpad.tour.benchmark.tickets_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</div>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="global">\n  '), u = n, a = "controller", f = r["with"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/benchmark_industry_chart"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="category"><div class="dim">'), i = e, s = "txt.launchpad.tour.benchmark.industry_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</div>"), i = e, s = "industryName", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</div>\n    <div class="data">\n      '), i = e, s = "industrySatisfaction", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '<br/>\n      <div class="description">'), i = e, s = "txt.launchpad.tour.benchmark.customer_satisfaction_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n    </div>\n    <div class="data">\n      '), i = e, s = "industryResponseTime", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "<span class='unit'>"), i = e, s = "industryResponseTimeUnit", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</span><br/>\n      <div class="description">'), i = e, s = "txt.launchpad.tour.benchmark.response_time_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + '</div>\n    </div>\n    <div class="data">\n      '), i = e, s = "industryTickestPerMonth", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '<br/>\n      <div class="description">'), i = e, s = "txt.launchpad.tour.benchmark.tickets_label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</div>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="industry">\n  '), u = n, a = "controller", f = r["with"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/benchmark_survey"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "Em.Select", o = {}, u = "industryOptions", o.contentBinding = u, u = "industryResult", o.selectionBinding = u, u = "industryPrompt", o.promptBinding = u, u = "content.label", o.optionLabelPath = u, u = "content.value", o.optionValuePath = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n\n        "), i = e, s = "Em.Select", o = {}, u = "employeeCountOptions", o.contentBinding = u, u = "employeeCountResult", o.selectionBinding = u, u = "employeeCountPrompt", o.promptBinding = u, u = "content.label", o.optionLabelPath = u, u = "content.value", o.optionValuePath = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n\n        "), i = e, s = "Em.Select", o = {}, u = "targetAudienceOptions", o.contentBinding = u, u = "targetAudienceResult", o.selectionBinding = u, u = "targetAudiencePrompt", o.promptBinding = u, u = "content.label", o.optionLabelPath = u, u = "content.value", o.optionValuePath = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n\n        "), i = e, s = "Em.Select", o = {}, u = "customerCountOptions", o.contentBinding = u, u = "customerCountResult", o.selectionBinding = u, u = "customerCountPrompt", o.promptBinding = u, u = "content.label", o.optionLabelPath = u, u = "content.value", o.optionValuePath = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n\n        "), i = e, s = "Em.Select", o = {}, u = "supportStructureOptions", o.contentBinding = u, u = "supportStructureResult", o.selectionBinding = u, u = "supportStructurePrompt", o.promptBinding = u, u = "content.label", o.optionLabelPath = u, u = "content.value", o.optionValuePath = u, l = r.view, u = l || e.view, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view", s, c) : i = u, t.buffer.push(m(i) + "\n\n        "), i = e, s = "views/launchpad/benchmark_survey_text_field", o = {}, u = "agents", o.category = u, u = "agent-count", o.id = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n        "), i = e, s = "views/launchpad/benchmark_survey_text_field", o = {}, u = "teams", o.category = u, u = "team-count", o.id = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n\n        "), i = e, s = "surveyCompleted", o = r["if"], c = h.program(2, y, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(4, b, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          <button "), i = e, s = "submitSurvey", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ' class="btn">\n            '), i = e, s = "txt.launchpad.benchmark_survey.update_survey", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n          </button>\n        "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          <button "), i = e, s = "submitSurvey", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ' class="btn btn-info">\n            '), i = e, s = "txt.launchpad.benchmark_survey.submit_survey", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n          </button>\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="benchmark">\n  <div class="survey clearfix">\n    <div class="selection clearfix">\n      '), u = n, a = "benchmarkSurveyController", f = r["with"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n\n    "), u = {}, a = "templates/launchpad/benchmark_industry_chart", u.templateName = a, l = r.view, a = l || n.view, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "view", c) : u = a, s.buffer.push(m(u) + '\n    <span class="vs">vs</span>\n    '), u = {}, a = "templates/launchpad/benchmark_global_chart", u.templateName = a, l = r.view, a = l || n.view, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "view", c) : u = a, s.buffer.push(m(u) + "\n\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/configure_email"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.settings.email._settings.learn_more_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        t.buffer.push('\n        <iframe src="//fast.wistia.com/embed/iframe/wbx72xdqz0?playerColor=030303&version=v1&videoHeight=540&videoWidth=960&volumeControl=true&plugin%5BpostRoll%5D%5Blink%5D=https%3A%2F%2Fsupport.zendesk.com%2Fentries%2F20519926-getting-started-with-email-in-zendesk&plugin%5BpostRoll%5D%5Bstyle%5D%5BbackgroundColor%5D=%23616161&plugin%5BpostRoll%5D%5Bstyle%5D%5Bcolor%5D=%23ffffff&plugin%5BpostRoll%5D%5Bstyle%5D%5BfontFamily%5D=Gill%20Sans%2C%20Helvetica%2C%20Arial%2C%20sans-serif&plugin%5BpostRoll%5D%5Bstyle%5D%5BfontSize%5D=48px&plugin%5BpostRoll%5D%5Btext%5D=Click%20to%20learn%20more%20about%20email%20in%20Zendesk&plugin%5BpostRoll%5D%5Bversion%5D=v1" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="960" height="540"></iframe>\n      ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon email"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.configureEmail.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.admin.views.settings.email.show.email_description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(5, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/configure_web_portal"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.settings.portal._settings.learn_more_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding =
            u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        t.buffer.push('\n        <img alt="Sample_web_portal" src="https://assets.zendesk.com/agent/assets/launchpad/sample_web_portal-99cf1257da17e0fc39b2113461abc9a3.png" />\n      ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon portal"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.configureWebPortal.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.admin.views.settings.portal.show.portal_description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(5, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/create_macro"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.voice.settings.index.learn_more", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        t.buffer.push('\n        <img alt="Sample_macro" src="https://assets.zendesk.com/agent/assets/launchpad/sample_macro-79ebf3876098b485313410be5cd63c27.png" />\n      ')
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon macro"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.createMacro.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.launchpad.create_macro.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSample", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n      "), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/create_view"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.voice.settings.index.learn_more", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        t.buffer.push('\n        <img alt="Sample_view" src="https://assets.zendesk.com/agent/assets/launchpad/sample_view-34d7661994102231ee6a22dfcb9d6e29.png" />\n      ')
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon view"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.createView.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.launchpad.create_view.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSample", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n      "), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/launchpad/launchpad_menu_section"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="title">'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</div>"), u = n, a = "TaskCollectionView", c = r.collection, f = c || n.collection, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "collection", a, h) : u = f, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/launchpad/launchpad_task_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="status"></div>'), u = n, a = "label", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/launchpad/learn_more_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "label", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/launchpad/test_ticket"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.launchpad.learn_more.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "shouldGoToSettings", o = r.unless, h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <button "), i = e, s = "create", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn btn-info" id="test_ticket_button">\n          '), i = e, s = "txt.launchpad.test_ticket.action_button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n        </button>\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <button "), i = e, s = "goToNextIncompleteTask", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' class="btn">\n        '), i = e, s = "date.datepicker.close_text", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon ticket"></div>\n  <h3>'), u = n, a = "txt.launchpad.test_ticket.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n      "), u = n, a = "txt.launchpad.test_ticket.description2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n    "), u = n, a = "shouldShowSample", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    "), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(6, S, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    <div class="content">\n      <div class="triangle-up"></div>\n      <iframe src="//fast.wistia.net/embed/iframe/n4a3fsvgq2?playerColor=030303&plugin%5BpostRoll-v1%5D=%7B%22text%22%3A%22Click%20to%20learn%20more%20about%20managing%20tickets%22%2C%22link%22%3A%22https%3A%2F%2Fsupport.zendesk.com%2Fentries%2F21222511-managing-your-tickets%22%2C%22style%22%3A%7B%22backgroundColor%22%3A%22%23616161%22%2C%22color%22%3A%22%23ffffff%22%2C%22fontSize%22%3A%2248px%22%2C%22fontFamily%22%3A%22Gill%20Sans%2C%20Helvetica%2C%20Arial%2C%20sans-serif%22%7D%7D&version=v1&videoHeight=540&videoWidth=960&volumeControl=true" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="960" height="540"></iframe>\n    </div>\n</div>\n'), o
}), Ember.Handlebars.registerPartial("launchpad.tour.apps", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 3, o.index = u, u = "admin", o.section = u, l = r.collection_module, u = l || e.collection_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "collection_module", s, c) : i = u, t.buffer.push(m(i) + "\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 4, o.index = u, u = "admin", o.section = u, l = r.collection_module, u = l || e.collection_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "collection_module", s, c) : i = u, t.buffer.push(m(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <button "), i = e, s = "goToApps", o = {}, u = "Zd.launchpadViewStates", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="btn">\n        '), i = e, s = "txt.launchpad.tour.apps.button", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      </button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return s.buffer.push('<div class="zapps">\n  '), u = n, a = "helpCenterOnboardingEnabled", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(3, b, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="content clearfix">\n\n    <h3>'), u = n, a = "txt.launchpad.tour.apps.heading", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.apps.copy", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</p>\n\n    "), u = n, a = "Zd.currentUser.isAdmin", l = r.unboundIf, f = l || n.unboundIf, c = h.program(5, w, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, l && typeof f === p ? u = f.call(n, a, c) : u = g.call(n, f, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n</div>\n"), o
})), Ember.Handlebars.registerPartial("launchpad.tour.benchmark", Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="benchmark">\n  '), u = n, a = "views/launchpad/carousel_buttons", f = {}, l = 2, f.index = l, l = "admin", f.section = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n  <div class="content clearfix">\n    <h3>'), u = n, a = "txt.launchpad.tour.benchmark.heading", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.benchmark.copy", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n    <button "), u = n, a = "goToBenchmark", f = {}, l = "Zd.launchpadViewStates", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">\n      '), u = n, a = "txt.launchpad.tour.benchmark.button", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </button>\n\n    <div class="industry">\n        <div class="category"><div class="dim">'), u = n, a = "txt.launchpad.tour.benchmark.industry_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>"), u = n, a = "txt.launchpad.tour.benchmark.travel_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        <div class="data">\n          '), u = n, a = "txt.launchpad.tour.benchmark.91_percent", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '<br/>\n          <div class="description">'), u = n, a = "txt.launchpad.tour.benchmark.customer_satisfaction_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        </div>\n        <div class="data">\n          '), u = n, a = "txt.launchpad.tour.benchmark.14_7_hrs", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '<br/>\n          <div class="description">'), u = n, a = "txt.launchpad.tour.benchmark.response_time_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        </div>\n        <div class="data">\n          1495<br/>\n          <div class="description">'), u = n, a = "txt.launchpad.tour.benchmark.tickets_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        </div>\n    </div>\n\n    <div class="global">\n        <div class="category">'), u = n, a = "txt.launchpad.tour.benchmark.global_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        <div class="data">\n          '), u = n, a = "txt.launchpad.tour.benchmark.86_percent", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '<br/>\n          <div class="description">'), u = n, a = "txt.launchpad.tour.benchmark.customer_satisfaction_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        </div>\n        <div class="data">\n          '), u = n, a = "txt.launchpad.tour.benchmark.23_6", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '<br/>\n          <div class="description">'), u = n, a = "txt.launchpad.tour.benchmark.response_time_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</div>\n        </div>\n        <div class="data">\n          631<br/>\n          <div class="description">'), u = n, a = "txt.launchpad.tour.benchmark.tickets_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</div>\n        </div>\n    </div>\n\n  </div>\n</div>\n"), o
})), Ember.Handlebars.registerPartial("launchpad.tour.configure_email", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <button "), i = e, s = "goToConfigureEmail", o = {}, u = "Zd.launchpadViewStates", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn">\n        '), i = e, s = "txt.launchpad.tour.engage_with_customers.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="configure_email">\n  '), u = n, a = "views/launchpad/carousel_buttons", f = {}, l = 1, f.index = l, l = "admin", f.section = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n  <div class="content clearfix">\n\n    <h3>'), u = n, a = "txt.launchpad.tour.engage_with_customers.heading", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.engage_with_customers.copy", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n    "), u = n, a = "Zd.currentUser.isAdmin", c = r.unboundIf, f = c || n.unboundIf, h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n</div>\n"), o
})), Ember.Handlebars.registerPartial("launchpad.tour.create_view", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "helpCenterOnboardingEnabled", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(4, w, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 6, o.index = u, u = "admin", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 7, o.index = u, u = "admin", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 3, o.index = u, u = "agent", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="crerate_view">\n'), u = n, a = "Zd.currentUser.isAdmin", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(6, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="content clearfix">\n\n    <h3>'), u = n, a = "txt.launchpad.tour.organize_tickets.heading", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.organize_tickets.copy", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n    <button "), u = n, a = "goToCreateView", f = {}, l = "Zd.launchpadViewStates", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">\n      '), u = n, a = "txt.launchpad.tour.organize_tickets.button", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </button>\n  </div>\n</div>\n"), o
})), Ember.Handlebars.registerPartial("launchpad.tour.macros", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "helpCenterOnboardingEnabled", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(4, w, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 4, o.index = u, u = "admin", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 5, o.index = u, u = "admin", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 1, o.index = u, u = "agent", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="macros">\n'), u = n, a = "Zd.currentUser.isAdmin", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(6, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="content clearfix">\n\n    <h3>'), u = n, a = "txt.launchpad.tour.macros.heading", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.macros.copy", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n    <button "), u = n, a = "goToMacros", f = {}, l = "Zd.launchpadViewStates", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">\n      '), u = n, a = "txt.launchpad.tour.macros.button", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </button>\n  </div>\n</div>\n"), o
})), Ember.Handlebars.registerPartial("launchpad.tour.test_ticket", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "helpCenterOnboardingEnabled", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(4, w, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 5, o.index = u, u = "admin", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 6, o.index = u, u = "admin", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/launchpad/carousel_buttons", o = {}, u = 2, o.index = u, u = "agent", o.section = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "collection_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="test_ticket">\n'), u = n, a = "Zd.currentUser.isAdmin", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(6, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="content clearfix">\n\n    <h3>'), u = n, a = "txt.launchpad.tour.first_ticket.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.first_ticket.copy", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n    <button "), u = n, a = "goToTestTicket", f = {}, l = "Zd.launchpadViewStates", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">\n      '), u = n, a = "txt.launchpad.menu.task.testTicket.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </button>\n  </div>\n</div>\n"), o
})), Ember.Handlebars.registerPartial("launchpad.tour.web_portal", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <button "), i = e, s = "goToConfigureWebPortal", o = {}, u = "Zd.launchpadViewStates", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn">\n        '), i = e, s = "txt.launchpad.tour.help_center.button", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="web_portal">\n  '), u = n, a = "views/launchpad/carousel_buttons", f = {}, l = 3, f.index = l, l = "admin", f.section = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n  <div class="content clearfix">\n\n    <h3>'), u = n, a = "txt.launchpad.tour.help_center.heading", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n\n    <p>"), u = n, a = "txt.launchpad.tour.help_center.copy", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n    "), u = n, a = "Zd.currentUser.isAdmin", c = r.unboundIf, f = c || n.unboundIf, h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n</div>\n"), o
})), Ember.TEMPLATES["templates/launchpad/tour/carousel"] = Handlebars.template(function (t, n, r, i, s) {
    function p(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "helpCenterOnboardingEnabled", o = r["if"], c = h.program(2, d, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(4, v, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function d(e, t) {
        var n = "",
            s;
        return t.buffer.push('\n      <div class="carousel-inner">\n        <div class="active item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.configure_email"], "launchpad.tour.configure_email", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.benchmark"], "launchpad.tour.benchmark", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.apps"], "launchpad.tour.apps", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.macros"], "launchpad.tour.macros", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.test_ticket"], "launchpad.tour.test_ticket", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.create_view"], "launchpad.tour.create_view", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n        </div>\n      </div>\n    "), n
    }

    function v(e, t) {
        var n = "",
            s;
        return t.buffer.push('\n      <div class="carousel-inner">\n        <div class="active item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.configure_email"], "launchpad.tour.configure_email", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.benchmark"], "launchpad.tour.benchmark", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.web_portal"], "launchpad.tour.web_portal", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.apps"], "launchpad.tour.apps", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.macros"], "launchpad.tour.macros", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.test_ticket"], "launchpad.tour.test_ticket", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n        </div>\n        <div class="item">\n          '), s = e, s = h.invokePartial(i["launchpad.tour.create_view"], "launchpad.tour.create_view", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n        </div>\n      </div>\n    "), n
    }

    function m(e, t) {
        var n = "",
            s;
        return t.buffer.push('\n    <div class="carousel-inner">\n      <div class="active item">\n        '), s = e, s = h.invokePartial(i["launchpad.tour.macros"], "launchpad.tour.macros", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n      </div>\n      <div class="item">\n        '), s = e, s = h.invokePartial(i["launchpad.tour.test_ticket"], "launchpad.tour.test_ticket", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push('\n      </div>\n      <div class="item">\n        '), s = e, s = h.invokePartial(i["launchpad.tour.create_view"], "launchpad.tour.create_view", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n      </div>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h = this;
    return s.buffer.push('<div id="tour-carousel" class="carousel slide tour_page">\n  '), u = n, a = "Zd.currentUser.isAdmin", f = r["if"], c = h.program(1, p, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(6, m, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <a class="carousel-control left" href="#tour-carousel" data-slide="prev">&lsaquo;</a>\n  <a class="carousel-control right" href="#tour-carousel" data-slide="next">&rsaquo;</a>\n</div>\n'), o
}), Ember.TEMPLATES["templates/launchpad/update_profile"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "txt.admin.views.settings.portal._settings.learn_more_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function w(e, t) {
        t.buffer.push('\n        <img alt="Sample_profile" src="https://assets.zendesk.com/agent/assets/launchpad/sample_profile-af987bf6e73ba18787b89b3b9521d9ff.png" />\n      ')
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "lib/views/iframe_view", o = {}, u = "iFrameSrc", o.srcBinding = u, u = "lotus-launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="launchpad-task">\n  <div class="icon profile"></div>\n  <h3>'), u = n, a = "txt.launchpad.menu.task.updateProfile.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h3>\n  <hr />\n  <p>\n    "), u = n, a = "txt.launchpad.update_profile.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    "), u = n, a = "learnMoreURL", f = {}, l = "_blank", f.target = l, c = r.linkTo, l = c || n.linkTo, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  "), u = {}, a = "jetpackTask", u.taskBinding = a, c = r["launchpad-action"], a = c || n["launchpad-action"], h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "launchpad-action", h) : u = a, s.buffer.push(g(u) + '\n    <div class="content">\n      <div class="triangle-up"></div>\n      '), u = n, a = "shouldShowSample", f = r["if"], h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n      "), u = n, a = "shouldShowSettings", f = r["if"], h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </div>\n</div>\n"), o
}), Ember.Handlebars.registerPartial("layouts.branding_header", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/tabs", o = {}, u = "column", o["class"] = u, u = "Zd.workspaces.tabController", o.controllerBinding = u, c = r.collection_module, u = c || e.collection_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === g ? i = m.call(e, "collection_module", s, h) : i = u, t.buffer.push(y(i) + '\n\n  <div id="user_options" class="column">\n    '), i = e, s = "views/current_user/face_box_view", o = {}, u = "div", o.tagName = u, u = "face_box", o.id = u, u = "dropdown pull-right", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === g ? i = m.call(e, "view_module", s, h) : i = u, t.buffer.push(y(i) + "\n\n    "), i = e, s = "view.showDialer", o = r["if"], h = p.program(2, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    "), i = e, s = "view.voiceState.hasVoiceEnabled", o = r["if"], h = p.program(10, C, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n\n    "), i = e, s = "views/branding_header_button_toolbar_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === g ? i = m.call(e, "view_module", s, h) : i = o, t.buffer.push(y(i) + "\n  </div>\n\n  "), i = e, s = "view.showDialer", o = r["if"], h = p.program(12, k, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n  <div class="clear"></div>\n\n'), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <button "), i = e, s = "toggleDialer", o = {}, u = "view.dialerController", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === g ? i = m.call(e, "action", s, h) : i = u, t.buffer.push(y(i) + ' class="channels-control" tabindex="-1">\n        '), i = e, s = "ChatLotus.Service.hasChatEnabled", o = r["if"], h = p.program(3, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n        "), i = e, s = "view.voiceState.hasVoiceEnabled", o = r["if"], h = p.program(7, T, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </button>\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n          "), i = {}, s = "div", i.tagName = s, s = "chat-control", i.id = s, s = "channel-header pull-right", i["class"] = s, s = "ChatLotus.Service.Availability.availabilityClass parentView.voiceState.hasVoiceEnabled", i.classNameBindings = s, c = r.view, s = c || e.view, h = p.program(4, S, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = v.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "views/channels/chat_icon_view", c = r.view_module, o = c || e.view_module, h = p.program(5, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof o === d ? i = o.call(e, s, h) : i = v.call(e, o, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          "), n
    }

    function x(e, t) {
        t.buffer.push('\n              <div class="indicator"></div>\n            ')
    }

    function T(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n          "), i = {}, s = "div", i.tagName = s, s = "voice-control", i.id = s, s = "channel-header pull-right", i["class"] = s, s = "parentView.voiceState.availability ChatLotus.Service.hasChatEnabled", i.classNameBindings = s, c = r.view, s = c || e.view, h = p.program(8, N, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = v.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "views/channels/voice_icon_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === g ? i = m.call(e, "view_module", s, h) : i = o, t.buffer.push(y(i) + "\n          "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/channels/call_timer_view", o = {}, u = "pull-right", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === g ? i = m.call(e, "view_module", s, h) : i = u, t.buffer.push(y(i) + "\n    "), n
    }

    function k(e, t) {
        var n = "",
            s;
        return t.buffer.push("\n    "), s = e, s = p.invokePartial(i["channels.dialer_view"], "channels.dialer_view", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.blockHelperMissing,
        m = r.helperMissing,
        g = void 0,
        y = this.escapeExpression;
    return u = n, a = "views/branding_header", f = {}, l = "header", f.tagName = l, l = "branding_header", f.id = l, l = "split_pane", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = v.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("layouts.main_navigation", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n\n  <a "), i = e, s = "showDashboard", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="dashboard toolbar_link" '), i = {}, s = "txt.keyboard_shortcuts.nav.home", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n  <a "), i = e, s = "showTicketFilters", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="filters toolbar_link"   '), i = {}, s = "txt.filters.title", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n\n  "), i = e, s = "controller.shouldShowUserViews", o = r["if"], h = p.program(2, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  <a "), i = e, s = "showSearch", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="search toolbar_link"    '), i = {}, s = "txt.search.title", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n\n  "), i = e, s = "views/apps/nav_bar/nav_bar_app_container_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + '\n\n  <div class="icons">\n    '), i = e, s = "controller.shouldShowHelpCenter", o = r["if"], h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    "), i = e, s = "controller.shouldShowReporting", o = r["if"], h = p.program(6, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    <a "), i = e, s = "showAdmin", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="admin toolbar_link" '), i = {}, s = "txt.admin.title.admin", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n  </div>\n\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <a "), i = e, s = "showUserFilters", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="user_filters toolbar_link" '), i = {}, s = "txt.user_filters.title", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <a "), i = e, s = "showHelpCenter", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="helpcenter toolbar_link" '), i = {}, s = "txt.users.edit.agent_moderation_hc", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <a "), i = e, s = "showReporting", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="reporting toolbar_link" '), i = {}, s = "txt.reporting_tutorial.tooltip_title", i.title = s, c = r.translateAttr, s = c || e.translateAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "translateAttr", h) : i = s, t.buffer.push(g(i) + "></a>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "views/nav_bar/nav_bar_view", f = {}, l = "nav", f.tagName = l, l = "main_navigation", f.id = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("layouts.modals", Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div id="modals">\n  '), u = n, u = h.invokePartial(i["modals.welcome"], "modals.welcome", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  "), u = n, u = h.invokePartial(i["modals.bootstrap_image_gallery"], "modals.bootstrap_image_gallery", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div id=\'screencast_preview\' class=\'modal\' style="display: none;">\n    <div id="video_wrapper">\n      <iframe frameborder="0" '), u = {}, a = "screencastController.screencast.url", u.src = a, l = r.bindAttr, a = l || n.bindAttr, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "bindAttr", c) : u = a, s.buffer.push(m(u) + ' id="screenr_iframe"></iframe>\n    </div>\n    <div id="screencast_comment">\n      '), u = n, a = "screencastController.screencast.comment.value", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    </div>\n  </div>\n\n  <div id="nonexistent_ticket" class="modal error" style="display: none;">\n    <div class="modal-header">\n      <a class="close" data-dismiss="modal">×</a>\n      <h3>'), u = n, a = "txt.modal.error.header", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</h3>\n    </div>\n    <div class="modal-body">'), u = n, a = "txt.modal.error.body.nonexistent_ticket", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</div>\n    <div class="modal-footer">\n      <button class="btn" data-dismiss="modal">'), u = n, a = "txt.modal.edit.close", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</button>\n    </div>\n  </div>\n\n  <div id="reload_notice" class="modal" style="display: none;">\n    <div class="modal-header">\n      <a class="close" data-dismiss="modal">×</a>\n      <h3>'), u = n, a = "txt.modal.reload.title", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</h3>\n    </div>\n    <div class="modal-body">\n      <p>'), u = n, a = "txt.modal.reload.message", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('</p>\n    </div>\n    <div class="modal-footer">\n      <a class="btn btn-inverse" href="/agent">'), u = n, a = "txt.modal.reload.button.reload", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</a>\n    </div>\n  </div>\n\n  <div id="ticket-merge" class="modal merge-holder" style="display: none;">\n    <div class="modal-header">\n      <a class="close" data-dismiss="modal">×</a>\n      <h3>'), u = n, a = "txt.modal.ticket_merge.header", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</h3>\n    </div>\n    <div class="modal-body"></div>\n    <div class="modal-footer">\n      <button class="btn" data-dismiss="modal">'), u = n, a = "txt.modal.edit.cancel", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</button>\n      <button class="btn btn-inverse" id="btn-ticket-confirm-and-merge" style="display:none">'), u = n, a = "txt.modal.ticket_merge.confirm", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</button>\n    </div>\n  </div>\n\n  <div id="user-merge" class="modal merge-holder" style="display: none;">\n    <div class="modal-header">\n      <a class="close" data-dismiss="modal">×</a>\n      <h3>'), u = n, a = "txt.modal.user_merge.header", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</h3>\n    </div>\n    <div class="modal-body"></div>\n    <div class="modal-footer">\n      <button class="btn" data-dismiss="modal">'), u = n, a = "txt.modal.edit.cancel", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</button>\n      <button class="btn btn-inverse" id="btn-user-confirm-and-merge" style="display:none">'), u = n, a = "txt.modal.user_merge.confirm", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</button>\n    </div>\n  </div>\n\n</div>\n"), o
})), Ember.TEMPLATES["templates/layouts/alert"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <a "), i = {}, s = "currentAlert.linkUrl", i.href = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = e, s = "trackAlertLinkClick", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' target="_blank" tabindex="-1">'), i = e, s = "txt.alert.learn_more", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <div class="pagination">\n    <ul>\n      <li '), i = {}, s = "hasPrevAlert:enabled", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + "><a "), i = e, s = "goToPrevAlert", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' tabindex="-1">&lt;</a></li>\n      <li class="disabled"><a>'), i = e, s = "currentAlertPage", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "/"), i = e, s = "sortedAlerts.length", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</a></li>\n      <li "), i = {}, s = "hasNextAlert:enabled", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + "><a "), i = e, s = "goToNextAlert", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' tabindex="-1">&gt;</a></li>\n    </ul>\n  </div>\n'), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<p>\n  <b>"), u = n, a = "txt.alert.zendesk_alert", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</b>\n  "), u = n, a = "currentAlert.value", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n  "), u = n, a = "currentAlert.linkUrl", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</p>\n"), u = n, a = "showPagination", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n<a class="close" '), u = n, a = "dismissAlerts", c = r.action, f = c || n.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "action", a, h) : u = f, s.buffer.push(g(u) + ' tabindex="-1">×</a>\n'), o
}), Ember.TEMPLATES["templates/layouts/onboarding_tooltip"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <a "), i = e, s = "closeTooltip", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="close-tooltip">✕</a>\n\n    <h4>'), i = e, s = "title", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</h4>\n    <p>"), i = e, s = "body", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</p>\n\n    <div class='navigation'>\n      <span class='page'>"), i = e, s = "steps", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</span>\n      <button "), i = e, s = "next", o = {}, u = "controller", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ' class="btn btn-inverse">\n        '), i = e, s = "controller.whatsNext", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n      </button>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<div class='tooltip-mask'></div>\n\n<div id='onboarding-tooltip'>\n  <div class='diamond'></div>\n  "), u = n, a = "controller", f = r["with"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n</div>\n"), o
}), Ember.TEMPLATES["templates/main_pane/admin"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="pane left section">\n  '), u = n, a = "views/admin/admin_menu_view", l = r.view_module, f = l || n.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view_module", a, c) : u = f, s.buffer.push(m(u) + '\n</div>\n<div class="pane right section">\n  '), u = n, a = "view.RootView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n  "), u = n, a = "views/contextual_help/contextual_help_view", l = r.view_module, f = l || n.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view_module", a, c) : u = f, s.buffer.push(m(u) + "\n</div>\n"), o
}), Ember.TEMPLATES["templates/main_pane/dashboard"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n    "), i = {}, s = "templates/dashboard/launchpad_header", i.templateName = s, c = r.view, s = c || e.view, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "view", h) : i = s, t.buffer.push(g(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "txt.dashboard.title", o = {}, u = "h1", o.tagName = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "lib/lotus/swappable_view", o = {}, u = "updates", o.name = u, c = r.view_module, u = c || e.view_module, h = p.program(6, S, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), i = e, s = "launchpadController.shouldShowUser", c = r.unboundIf, o = c || e.unboundIf, h = p.program(8, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof o === d ? i = o.call(e, s, h) : i = y.call(e, o, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="activities">\n      '), i = e, s = "txt.dashboard.activities.title", o = {}, u = "h4", o.tagName = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n      "), i = e, s = "views/dashboard/activities_view", o = {}, u = "wrapper", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    </div>\n  "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "lib/lotus/swappable_view", o = {}, u = "launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = p.program(9, T, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/launchpad/menu_view", o = {}, u = "stacked_menu", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "lib/lotus/swappable_view", o = {}, u = "updates", o.name = u, c = r.view_module, u = c || e.view_module, h = p.program(12, C, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), i = e, s = "launchpadController.shouldShowUser", c = r.unboundIf, o = c || e.unboundIf, h = p.program(19, M, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof o === d ? i = o.call(e, s, h) : i = y.call(e, o, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = {}, s = "templates/dashboard/indicators", i.templateName = s, c = r.view, s = c || e.view, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "view", h) : i = s, t.buffer.push(g(i) + "\n    "), i = e, s = "views/play/play_start_view", o = {}, u = "origin", o["class"] = u, u = "controller.filter", o.filterBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + '\n    <h4 class="list-heading" '), i = {}, s = "controller.filter.tickets.isFetching:working", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ">\n      "), i = e, s = "controller.isIncomingTicketsActive", o = r["if"], h = p.program(13, k, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(16, A, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n      <i class="icon-loading-spinner"></i>\n    </h4>\n\n    '), i = e, s = "views/filters/ticket_list_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "txt.dashboard.tickets.title", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " ("), i = e, s = "controller.filter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ")\n        "), i = e, s = "lib/views/popover_view", o = {}, u = "span", o.tagName = u, u = "link", o["class"] = u, u = "bottom", o.placement = u, u = "help.incoming.title", o.titleI18n = u, u = "help.incoming.content", o.contentI18n = u, c = r.view_module, u = c || e.view_module, h = p.program(14, L, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function L(e, t) {
        var n, i, s;
        n = e, i = "help.what_is_this_title", c = r.t, s = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(n), h.data = t, typeof s === d ? n = s.call(e, i, h) : s === m ? n = v.call(e, "t", i, h) : n = s, t.buffer.push(g(n))
    }

    function A(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/dashboard/ticket_list_title_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(17, O, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          "), i = e, s = "title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ")\n        "), n
    }

    function M(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "lib/lotus/swappable_view", o = {}, u = "launchpad", o.name = u, c = r.view_module, u = c || e.view_module, h = p.program(20, _, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function _(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "views/launchpad/view_states_root_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<header>\n  "), u = n, a = "launchpadController.shouldShowUser", c = r.unboundIf, f = c || n.unboundIf, h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(3, w, s), h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</header>\n\n"), u = n, a = "views/dashboard/launchpad_swappable_view", f = {}, l = "pane left section aux-content", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(5, E, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/dashboard/launchpad_swappable_view", f = {}, l = "pane right section", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(11, N, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/main_pane/filters"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="dropdown object_options">\n        '), i = e, s = "controller.currentFilter.isSuspendedFilter", o = r["if"], h = p.program(2, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(4, E, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </div>\n\n      "), i = e, s = "controller.currentFilter.hasUpdates", o = r["if"], h = p.program(6, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      "), i = e, s = "views/filters/original_filter_view", c = r.view_module, o = c || e.view_module, h = p.program(8, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof o === d ? i = o.call(e, s, h) : i = y.call(e, o, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n      <i class="icon-loading-spinner"></i>\n    '), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          "), i = e, s = "controller.currentFilter.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.currentFilter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ")\n        "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n            '), i = e, s = "controller.currentFilter.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.currentFilter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n            <b class="caret"></b>\n          </span>\n\n          <ul class="menu dropdown-menu">\n            <li><a tabindex="-1" class="table_mode_option switch_mode" '), i = e, s = "toggleFilterMode", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + '>Show as table</a></li>\n            <li><a tabindex="-1" class="feed_mode_option switch_mode" '), i = e, s = "toggleFilterMode", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + '>Show as feed</a></li>\n            <li><a tabindex="-1"  '), i = e, s = "exportAsCsv", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.filters.export_as_csv_option", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '</a></li>\n            <li class="divider"></li>\n            <li><a tabindex="-1" class="edit_filter" '), i = e, s = "goToEditFilter", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.filters.edit_option", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '</a></li>\n            <li><a tabindex="-1" class="clone_filter" '), i = e, s = "goToCloneFilter", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.filters.clone_option", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n          </ul>\n        "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <button "), i = e, s = "refreshCurrentFilterContentAndGoToPageOne", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="refresh" tabindex="-1">\n          '), i = e, s = "txt.views.filters.current_filter.button.show_updates", o = {}, u = "controller.currentFilter.updatesCount", o.updatesCountBinding = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n        </button>\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <span "), i = e, s = "resetSortOrder", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' class="link_light reset_order">'), i = e, s = "txt.filters.reset_sort_order", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span>\n      "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "views/filters/feed_filter_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/filters/filter_content_view", o = {}, u = "controller.listFilterController", o.controllerBinding = u, u = "controller.uiController", o.uiControllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<div class='pane left section'>\n  "), u = n, u = p.invokePartial(i["general.collapsible_sidebar_toggle"], "general.collapsible_sidebar_toggle", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  <header "), u = {}, a = "view.controller.isFetching:working :hide_when_collapsed", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <h1>\n      <button "), u = n, a = "refreshFiltersWithDefinitions", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' tabindex="-1" class="action_button">\n        <i class="icon-refresh"></i>\n      </button>\n      '), u = n, a = "txt.filters.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push(' <i class="icon-loading-spinner"></i>\n    </h1>\n  </header>\n\n  <div class="hide_when_collapsed scroll_content">\n    '), u = n, a = "views/filters/ticket_filter_index_view", f = {}, l = "content.selected content.hasZeroTicketCount", f.itemClassBinding = l, l = "controller.uiController", f.uiControllerBinding = l, l = "controller.filters", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n    <div class="filters more">\n      <a href="#/admin/views">'), u = n, a = "txt.filters.more", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</a>\n    </div>\n  </div>\n</div>\n\n<div class="pane right section">\n  <header '), u = {}, a = "view.controller.currentFilter.tickets.isFetching:working :play", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    "), u = n, a = "views/play/play_start_view", f = {}, l = "origin", f["class"] = l, l = "view.controller.currentFilter", f.filterBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    "), u = {}, a = "h1", u.tagName = a, a = "view.controller", u.controllerBinding = a, a = "controller.currentFilter.feedMode:feed_mode controller.permissions.can_edit:can_edit controller.permissions.can_switch_mode:can_switch_mode", u.classBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </header>\n\n  "), u = n, a = "view.controller.currentFilter.feedMode", f = r["if"], h = p.program(10, T, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(12, N, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/main_pane/reporting"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return u = n, a = "Zendesk.Reporting.Views.App", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n"), o
}), Ember.TEMPLATES["templates/main_pane/search"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <a>"), i = e, s = "view.content.displayText", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</a>\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <a>"), i = e, s = "view.content.displayText", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</a>\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <span class="show_tips">'), i = e, s = "txt.search.show_tips", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '</span>\n      <span class="hide_tips">'), i = e, s = "txt.search.hide_tips", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span>\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <div id="search_results_summary">\n        <h1 class="result_count">'), i = e, s = "view.controller.resultSummary", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</h1>\n        <span>\n          <span "), i = {}, s = "view.controller.sortingByActivity:link", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = e, s = "sortByRelevance", o = {}, u = "view.controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.search.sort.by_relevance", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span> |\n          <span "), i = {}, s = "view.controller.sortingByRelevance:link", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = e, s = "sortByActivity", o = {}, u = "view.controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.search.sort.by_activity", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span>\n        </span>\n      </div>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<header>\n  <h1>"), u = n, a = "txt.search.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h1>\n</header>\n\n<div class='pane left section text'>\n  <div class=\"search_filter\">\n    "), u = n, a = "views/search/search_filter_collection", f = {}, l = "view.controller.searchFilters.type", f.contentBinding = l, l = "type", f.category = l, l = "type", f.itemFilterCategory = l, c = r.collection_module, l = c || n.collection_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n    "), u = n, a = "views/search/search_filter_collection", f = {}, l = "view.controller.searchFilters.time", f.contentBinding = l, l = "time", f.category = l, l = "time", f.itemFilterCategory = l, c = r.collection_module, l = c || n.collection_module, h = p.program(3, w, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  </div>\n</div>\n\n<div class="pane right section">\n  <div class="search_bar">\n    <div class="search_wrapper">\n      '), u = n, a = "views/search/search_field_view", f = {}, l = "view.controller", f.controllerBinding = l, l = "view.controller.query", f.valueBinding = l, l = "search_input", f["class"] = l, l = "view.working", f.workingBinding = l, l = "view.errored", f.erroredBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n      <span class="search_icon"></span>\n    </div>\n\n    '), u = n, a = "views/search/search_tips_toggle", c = r.view_module, f = c || n.view_module, h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n    <div class="help">\n      <h1>'), u = n, a = "txt.search.examples_header", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</h1>\n\n      <table>\n        <tr>\n          <td>\n            <pre>\n              printer fire assignee:me\n              assignee:none\n              requester:me@zendesk.com\n              requester:Joe Doe\n              group:support\n              group:none\n              status:solved\n            </pre>\n          </td>\n          <td>\n            <pre>\n              priority>normal ticket_type:problem\n              hardware tags:printer\n              updated>2011-08-01\n              Smith type:ticket\n              name:mikkel\n            </pre>\n            <p>\n              <a href="'), u = n, a = "view.searchReferenceURL", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '" target="_blank" tabindex="-1">'), u = n, a = "txt.search.examples_more", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n            </p>\n          </td>\n        </tr>\n      </table>\n\n    </div>\n\n    "), u = n, a = "view.controller.resultsAvailable", f = r["if"], h = p.program(7, S, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  </div>\n\n  <div id="search_results_container" '), u = {}, a = "view.working:working", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    "), u = n, a = "SearchResultsView", f = {}, l = "view.controller.searchResults", f.contentBinding = l, l = "ul", f.tagName = l, l = "items", f["class"] = l, l = "li", f.itemTagName = l, c = r.collection, l = c || n.collection, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/main_pane/user_filters"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <button "), i = e, s = "refreshFiltersWithDefinitions", o = {}, u = "view.controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' tabindex="-1" class="action_button">\n          <i class="icon-refresh"></i>\n        </button>\n      '), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          <span>"), i = e, s = "txt.user_filters.title", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</span>\n        "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n            '), i = e, s = "txt.user_filters.title", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push('\n            <b class="caret"></b>\n          </span>\n        '), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <div "), i = {}, s = "view.controller.currentFilter.content.isFetching:working", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ">\n        <h1>\n          <div "), i = e, s = "editFilter", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="dropdown object_options editor-toggle">\n            <span class="dropdown-toggle" tabindex="-1">\n              '), i = e, s = "controller.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + '\n              <b class="caret"></b>\n            </span>\n            <i class="icon-loading-spinner"></i>\n          </div>\n        </h1>\n        '), i = e, s = "views/filters/editor/actions_view", o = {}, u = "controller.editorController", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n        "), i = e, s = "view.controller.shouldShowCSVexport", o = r["if"], h = p.program(8, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </div>\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n          <a class="filter-export" '), i = e, s = "exportAsCsv", o = {}, u = "view.controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">"), i = e, s = "txt.filters.export_as_csv_option", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n        "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/filters/filter_editor_view", f = {}, l = "controller.editorController.modalEditorController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n<div class='pane left section'>\n  "), u = n, u = p.invokePartial(i["general.collapsible_sidebar_toggle"], "general.collapsible_sidebar_toggle", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  <header "), u = {}, a = "view.controller.isFetching:working :hide_when_collapsed", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <h1>\n      "), u = n, a = "controller.isPreviewing", f = r.unless, h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n      <div class="dropdown object_options">\n        '), u = n, a = "controller.isPreviewing", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(5, w, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n        <ul class="menu dropdown-menu">\n          <li><a '), u = n, a = "addFilter", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' tabindex="-1">'), u = n, a = "txt.user_filters.create_view", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a></li>\n          <li><a "), u = n, a = "editFilterList", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' tabindex="-1">'), u = n, a = "txt.user_filters.manage_views", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</a></li>\n        </ul>\n      </div>\n      <i class="icon-loading-spinner"></i>\n    </h1>\n  </header>\n\n  <div class="hide_when_collapsed scroll_content">\n    '), u = n, a = "views/filters/user_filter_index_view", f = {}, l = "controller.isPreviewing", f.disabledBinding = l, l = "content.selected content.isEmpty", f.itemClassBinding = l, l = "controller.uiController", f.uiControllerBinding = l, l = "controller.filters", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n</div>\n\n<div "), u = {}, a = ":pane :right :section controller.shouldShowColumnEditor:has-column-editor", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n  <header>\n    "), u = n, a = "view.controller.shouldShowViewHeader", f = r["if"], h = p.program(7, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </header>\n\n  "), u = n, a = "views/filters/user_filter_content_view", f = {}, l = "controller.listFilterController", f.controllerBinding = l, l = "controller.uiController", f.uiControllerBinding = l, l = "controller.editorController", f.editorControllerBinding = l, l = "controller.columnEditorController", f.columnEditorControllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n   <div class="column-editor-base" '), u = n, a = "toggleColumnEditor", f = {}, l = "view.controller.editorController", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + "></div>\n  "), u = n, a = "views/filters/column_editor_view", f = {}, l = "controller.columnEditorController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n</div>\n"), o
}), Ember.Handlebars.registerPartial("modals.bootstrap_image_gallery", Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('  <!-- modal-gallery is the modal dialog used for the image gallery -->\n  <!-- re-insert "fade" when updated to the latest bootstrap -->\n  <div id="modal-gallery" class="modal modal-gallery hide" tabindex="-1">\n      <div class="modal-header">\n          <a class="close" data-dismiss="modal">&times;</a>\n          <h3 class="modal-title"></h3>\n      </div>\n      <div class="modal-body"><div class="modal-image"></div></div>\n      <div class="modal-footer">\n        <a class="btn modal-download" target="_blank"><i class="icon-download"></i> '), u = n, a = "txt.image_gallery.download", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</a>\n          <a class="btn btn-primary modal-prev"><i class="icon-arrow-left icon-white"></i> '), u = n, a = "txt.image_gallery.previous", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</a>\n          <a class="btn btn-primary modal-next">'), u = n, a = "txt.image_gallery.next", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + ' <i class="icon-arrow-right icon-white"></i></a>\n          <!-- <a class="btn btn-success modal-play modal-slideshow" data-slideshow="5000"><i class="icon-play icon-white"></i> Slideshow</a> -->\n      </div>\n  </div>\n'), o
})), Ember.Handlebars.registerPartial("modals.welcome", Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div id="welcome" class="modal" style="display:none;">\n  <div class="modal-header">\n    <a class="close" data-dismiss="modal">×</a>\n    <h3>'), u = n, a = "txt.modal.welcome.title", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</h3>\n  </div>\n\n  <div class="modal-body">\n\n    <p>\n      '), u = n, a = "Zd.welcomeModalController.lookForEmailMsg", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    </p>\n\n    <p>\n      "), u = n, a = "txt.modal.welcome.now_is_also_a_good_time", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n    </p>\n\n    <p>\n      "), u = n, a = "txt.modal.welcome.lets_get_started", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '\n    </p>\n\n  </div>\n\n  <div class="modal-footer">\n    <button class="btn btn-inverse" data-dismiss="modal">'), u = n, a = "txt.modal.welcome.get_started_button", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</button>\n  </div>\n</div>\n"), o
})), Ember.TEMPLATES["templates/modals/audit_notification"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <table class="table table-condensed">\n    <tr>\n      <th><strong>'), i = e, s = "txt.modal.audit_notification.subject", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</strong></th>\n      <td>"), i = e, s = "subject", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</td>\n    </tr>\n  </table>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n<div class="modal-body">\n  '), u = n, a = "subject", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  <div class="body">\n    '), u = n, a = "body", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/base"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <button "), i = e, s = "userDidCancel", o = {}, u = "target", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="btn">'), i = e, s = "cancelLabel", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</button>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  '), u = n, a = "body", c = r._triageMustache, f = c || n._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "_triageMustache", a, h) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="modal-footer">\n  '), u = n, a = "cancelLabel", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/bulk_edit"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n        '), i = e, s = "txt.ticket.actions.ticket_options", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '\n        <b class="caret"></b>\n      </span>\n\n      <ul class="menu dropdown-menu">\n        '), i = e, s = "controller.mergeButtonVisible", o = r["if"], h = p.program(2, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), i = e, s = "controller.deleteButtonVisible", o = r["if"], h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </ul>\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "bulkTicketMerge", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">\n            <a>"), i = e, s = "txt.ticket.actions.merge_tickets_link", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n          </li>\n        "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "bulkTicketDelete", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ">\n            <a>"), i = e, s = "txt.delete_asset", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n          </li>\n        "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n\n      <button "), i = e, s = "save", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + " "), i = {}, s = "disabled", i.disabled = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ' class="save btn btn-inverse">\n        '), i = e, s = "controller.ticket.statusName", o = r["if"], h = p.program(7, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(9, T, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </button>\n\n      <button "), i = {}, s = "disabled", i.disabled = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ' data-toggle="dropdown" class="btn btn-inverse dropdown-toggle">\n        <span class="caret"></span>\n      </button>\n\n      <ul class="menu dropdown-menu pull-right">\n        '), i = e, s = "views/tickets/bulk_edit_submit_view", o = {}, u = "open", o.status = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n        "), i = e, s = "views/tickets/bulk_edit_submit_view", o = {}, u = "pending", o.status = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n        "), i = e, s = "views/tickets/bulk_edit_submit_view", o = {}, u = "hold", o.status = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n        "), i = e, s = "views/tickets/bulk_edit_submit_view", o = {}, u = "solved", o.status = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      </ul>\n    "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          "), i = e, s = "txt.ticket.actions.save_as_status_with_formatting", o = {}, u = "controller.ticket.statusDisplayName", o.statusBinding = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n        "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          "), i = e, s = "txt.ticket.actions.save", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "controller.modalTitle", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class='pane left section ticket'>\n    "), u = n, a = "views/tickets/ticket_fields/bulk_ticket_property_collection_view", f = {}, l = "controller.ticket", f.ticketBinding = l, l = "workspace", f.workspaceBinding = l, l = "controller", f.controllerBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n\n  <div class='pane right section'>\n    <label class=\"subject-field\">\n      "), u = n, a = "ticket_fields.subject.label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      "), u = n, a = "Zendesk.BulkTextField", f = {}, l = "field title", f["class"] = l, l = "controller.ticket", f.ticketBinding = l, l = "controller.ticket.subject", f.valueBinding = l, l = "controller.isSubjectActive", f.isVisibleBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n    </label>\n\n    "), u = n, a = "views/tickets/add_bulk_comment_view", f = {}, l = "content.comment.is_public:is-public", f.classBinding = l, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n  "), u = n, a = "views/tickets/bulk_edit_progress_view", f = {}, l = "controller.shouldShowProgressPane", f.isVisibleBinding = l, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n</div>\n\n<div class="modal-footer footer">\n  <div id="bulk_footer_controls">\n\n    '), u = {}, a = "dropup object_options", u["class"] = a, a = "controller.bulkTicketOptionsVisible", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n    "), u = n, a = "views/tickets/macro_view", f = {}, l = "macro-selector", f["class"] = l, l = "controller", f.controllerBinding = l, l = "controller.ticket", f.ticketBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    <!-- TODO use views/tickets/ticket_fields/status_view instead for the following -->\n\n    "), u = n, a = "lib/split_button_menu", f = {}, l = "btn-group dropup ticket_submit_buttons", f["class"] = l, l = "controller.submitButtonDisabled:disabled", f.classBinding = l, l = "controller.submitButtonDisabled", f.disabledBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(6, S, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/filter_list_editor"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "view.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n\n  <ul class="nav nav-pills">\n    <li '), u = {}, a = ":shared-filters-pill view.controller.shouldShowSharedPanel:active view.controller.canManageSharedViews:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      <a "), u = n, a = "showSharedPanel", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">"), u = n, a = "txt.user_filters.shared", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n    </li>\n    <li "), u = {}, a = "view.controller.shouldShowPersonalPanel:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      <a "), u = n, a = "showPersonalPanel", f = {}, l = "view.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">"), u = n, a = "txt.user_filters.personal", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>\n    </li>\n  </ul>\n\n  <div "), u = {}, a = ":panel :shared-filters-panel view.controller.shouldShowSharedPanel:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <h3>"), u = n, a = "txt.user_filters.active_views", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " ("), u = n, a = "view.controller.activeSharedFilters.length", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + ")</h3>\n\n    "), u = n, a = "views/filters/list_editor/active_filters_view", f = {}, l = "shared", f.filterType = l, l = "active-filters", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.controller.activeSharedFilters", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    <div "), u = {}, a = ":empty-list view.controller.isActiveSharedFiltersEmpty:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      "), u = n, a = "txt.user_filters.no_active_shared", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </div>\n\n    <h3>"), u = n, a = "txt.user_filters.inactive_views", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " ("), u = n, a = "view.controller.inactiveSharedFilters.length", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + ")</h3>\n\n    "), u = n, a = "views/filters/list_editor/inactive_filters_view", f = {}, l = "shared", f.filterType = l, l = "inactive-filters", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.controller.inactiveSharedFilters", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    <div "), u = {}, a = ":empty-list view.controller.isInactiveSharedFiltersEmpty:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      "), u = n, a = "txt.user_filters.no_active_shared", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </div>\n\n  </div>\n\n  <div "), u = {}, a = ":panel :personal-filters-panel view.controller.shouldShowPersonalPanel:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <h3>"), u = n, a = "txt.user_filters.active_views", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " ("), u = n, a = "view.controller.activePersonalFilters.length", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + ")</h3>\n\n    "), u = n, a = "views/filters/list_editor/active_filters_view", f = {}, l = "personal", f.filterType = l, l = "active-filters", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.controller.activePersonalFilters", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    <div "), u = {}, a = ":empty-list view.controller.isActivePersonalFiltersEmpty:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      "), u = n, a = "txt.user_filters.no_active_personal", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </div>\n\n    <h3>"), u = n, a = "txt.user_filters.inactive_views", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " ("), u = n, a = "view.controller.inactivePersonalFilters.length", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + ")</h3>\n\n    "), u = n, a = "views/filters/list_editor/inactive_filters_view", f = {}, l = "personal", f.filterType = l, l = "inactive-filters", f["class"] = l, l = "view.controller", f.controllerBinding = l, l = "view.controller.inactivePersonalFilters", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    <div "), u = {}, a = ":empty-list view.controller.isInactivePersonalFiltersEmpty:show", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      "), u = n, a = "txt.user_filters.no_inactive_personal", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </div>\n\n  </div>\n\n</div>\n\n<div class="modal-footer">\n  <button class="btn" data-dismiss="modal">'), u = n, a = "txt.modal.edit.close", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/forwarding_number"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <div class="fowarding_number_wrapper">\n    '), u = n, a = "views/channels/agent_forwarding_number_code_view", f = {}, l = "span", f.tagName = l, l = "country-select", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "views/channels/agent_forwarding_text_field_view", f = {}, l = "controller.forwardingNumberValue", f.valueBinding = l, l = "numberPlaceholder", f.placeholderBinding = l, l = "dialed-number", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n  &nbsp; "), u = n, a = "txt.modal.agent_forwarding.extension_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " &nbsp;\n  "), u = n, a = "views/channels/agent_forwarding_text_field_view", f = {}, l = "controller.forwardingExtensionValue", f.valueBinding = l, l = "extensionPlaceholder", f.placeholderBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/group_memberships"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <span class="icon group"></span>\n      <i class="checkmark icon-ok-sign" />\n      <div class="title">'), i = e, s = "content.name", o = {}, u = "30", o.length = u, c = r.truncateAndTrim, u = c || e.truncateAndTrim, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "truncateAndTrim", s, h) : i = u, t.buffer.push(g(i) + "</div>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "view.controller.modalTitle", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <p class="secondary">'), u = n, a = "txt.modal.group_management.intro", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</p>\n  <div class="clearfix">\n    '), u = n, a = "Zendesk.GroupMembershipsView", f = {}, l = "view.controller.user", f.userBinding = l, c = r.collection, l = c || n.collection, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    <div class="tile new">\n      <div class="fake_link">\n        <p><a>'), u = n, a = "txt.modal.group_management.add_new_group", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</a></p>\n      </div>\n      <div class="real_input">\n        '), u = n, a = "lib/lotus/labeled_text_field", f = {}, l = "view.controller.newGroup.name", f.valueBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n        <button "), u = n, a = "addNewGroup", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-inverse btn-small">+</button>\n      </div>\n    </div>\n  </div>\n\n  <div class="options">\n    <label>'), u = n, a = "txt.modal.group_management.default_group_title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</label>\n    "), u = n, a = "views/users/properties/groups/member_default_view", f = {}, l = "view.controller.user", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n    <p>\n      "), u = n, a = "txt.modal.group_management.default_group_help", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </p>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn" data-dismiss="modal">'), u = n, a = "txt.modal.group_management.close_window", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/ipm/feature_notifications"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <div>\n      <span>\n        "), i = e, s = "txt.ipm.feature_notifications.pagination.current_of_total", o = {}, u = "view.currentPage", o.currentBinding = u, u = "view.totalCount", o.totalBinding = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n      </span>\n      <span>\n        <a "), i = e, s = "goToPrev", o = {}, u = "view", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' tabindex="-1">&lt; '), i = e, s = "txt.ipm.feature_notifications.pagination.previous", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n      </span>\n      |\n      <span>\n        <a "), i = e, s = "goToNext", o = {}, u = "view", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' tabindex="-1">'), i = e, s = "txt.ipm.feature_notifications.pagination.next", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " &gt;</a>\n      </span>\n      </ul>\n    </div>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <a "), i = {}, s = "view.current.learnMoreUrl", i.href = s, s = ":learn-more view.current.learnMoreUrl:visible", i["class"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + ' target="_blank">\n        '), i = e, s = "txt.ipm.feature_notifications.learn_more", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </a>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <h4>'), u = n, a = "view.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</h4>\n  "), u = n, a = "view.showPagination", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n<div class="modal-body">\n  <div class="left">\n    <img '), u = {}, a = "view.current.imageUrl", u.src = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + '></img>\n  </div>\n  <div class="right">\n    <h4 class="title">'), u = n, a = "view.current.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h4>\n    <p class="body">'), u = n, a = "view.current.body", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</p>\n    "), u = n, a = "view.current.learnMoreUrl", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    <div class="actions">\n      <a '), u = {}, a = "view.current.callToActionUrl", u.href = a, a = ":call-to-action :btn :btn-primary view.current.hasCallToAction:visible", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n        "), u = n, a = "view.current.callToActionText", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n      </a>\n      <a "), u = n, a = "toggleFeatureNotifications", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="feature-notifications-toggle">\n        '), u = n, a = "controller.toggleFeatureNotificationsText", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n      </a>\n    </div>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/keyboard_shortcuts"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n<div class="modal-body row">\n  <div class="span5">\n    <h4>'), u = n, a = "txt.keyboard_shortcuts.nav.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h4>\n    <h5>"), u = n, a = "txt.keyboard_shortcuts.nav.title_anywhere", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n    <ul>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>h</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.home", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>v</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.views", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>t</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.current_ticket", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>r</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.current_requester", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>f</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.search", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>n</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.new_ticket", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n    </ul>\n    <h5>"), u = n, a = "txt.keyboard_shortcuts.nav.title_lists", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n    <ul>\n      <li>\n        <dt><kbd>▲</kbd><kbd>▼</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.move_vertical", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>◀</kbd><kbd>▶</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.move_horizontally", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.enter", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.drill", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.space", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.select", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>x</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.nav.toggle_preview", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</dd>\n      </li>\n    </ul>\n  </div>\n  <div class="span5">\n    <h4>'), u = n, a = "txt.keyboard_shortcuts.tickets.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h4>\n    <h5>"), u = n, a = "txt.keyboard_shortcuts.tickets.title_viewing", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n    <ul>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>c</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.comment", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>x</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.note", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>m</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.macro", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>a</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.apps", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n    </ul>\n    <h5>"), u = n, a = "txt.keyboard_shortcuts.tickets.title_saving", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n    <ul>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>o</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.open", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>p</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.pending", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>d</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.hold", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>s</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.solved", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n    </ul>\n    <h5>"), u = n, a = "txt.keyboard_shortcuts.tickets.title_moving", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h5>\n    <ul>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>w</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.close_workspace", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>▼</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.next", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</dd>\n      </li>\n      <li>\n        <dt><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.ctrl", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>"), u = n, a = "txt.keyboard_shortcuts.key.alt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</kbd><kbd>j</kbd></dt><dd>"), u = n, a = "txt.keyboard_shortcuts.tickets.next", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</dd>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<div class="modal-footer">\n\n  <div class="left">\n    <label>'), u = n, a = "Em.Checkbox", f = {}, l = "controller.keyboardShortcutsEnabled", f.checkedBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n\n    <!-- TODO: Change this to: `txt.keyboard_shortcuts.enabled` when the translation is available. -->\n    "), u = n, a = "txt.apps.admin.installations.index.enabled", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</label>\n  </div>\n\n  <a href=\"https://assets.zendesk.com/agent/assets/keyboard-shortcut-cheatsheet-ace2611cf40fdd7e05ac05ba7b75c79e.pdf\" target='_blank' class='btn btn-inverse'>\n    "), u = n, a = "txt.keyboard_shortcuts.download.pdf", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </a>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/make_public_comment_private"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "txt.modal.make_public_comment_private_notice.title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <p>\n    '), u = n, a = "txt.modal.make_public_comment_private_notice.preamble", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </p>\n  <p>\n    "), u = n, a = "txt.modal.make_public_comment_private_notice.list", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </p>\n  <p>\n    "), u = n, a = "txt.modal.make_public_comment_private_notice.prompt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n  </p>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">\n    '), u = n, a = "txt.modal.make_public_comment_private_notice.cancel", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">\n    '), u = n, a = "txt.modal.make_public_comment_private_notice.confirm", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/mark_ticket_as_spam"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <p>\n    '), u = n, a = "txt.modal.mark_as_spam_notice.preamble", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </p>\n  <p>\n    "), u = n, a = "detailsLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n  </p>\n  <p>\n    "), u = n, a = "txt.modal.mark_as_spam_notice.prompt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n  </p>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/modal_basic"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">'), u = n, a = "view.titleView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + '</div>\n<div class="modal-body">'), u = n, a = "view.bodyView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + '</div>\n<div class="modal-footer">'), u = n, a = "view.footerView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "</div>\n"), o
}), Ember.TEMPLATES["templates/modals/modal_body"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0;
    return u = n, a = "parentView.body", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/modals/modal_footer"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<button class="btn" data-dismiss="modal">'), u = n, a = "txt.modal.edit.close", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</button>\n"), o
}), Ember.TEMPLATES["templates/modals/modal_footer_2btns"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<button class="btn" '), u = n, a = "modalCancel", f = {}, l = "parentView.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n  "), u = n, a = "parentView.cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n</button>\n\n<button class="btn btn-primary" '), u = n, a = "modalConfirm", f = {}, l = "parentView.controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n  "), u = n, a = "parentView.confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n</button>\n"), o
}), Ember.TEMPLATES["templates/modals/modal_title"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0;
    return s.buffer.push('<a class="close" data-dismiss="modal">×</a><h3>'), u = n, a = "parentView.title", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("</h3>\n"), o
}), Ember.TEMPLATES["templates/modals/name_attachment_modal_body"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="name_attachment_wrapper">\n  '), u = n, a = "txt.modal.name_attachment.description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  <br>\n  "), u = n, a = "Em.TextField", f = {}, l = "parentView.controller.fileName", f.valueBinding = l, l = "parentView.fileNamePlaceholder", f.placeholderBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/new_filter"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n<div class="modal-body">\n  '), u = n, a = "TitleView", c = r.view, f = c || n.view, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view", a, h) : u = f, s.buffer.push(g(u) + "\n  "), u = n, a = "view.VisibilityView", c = r.view, f = c || n.view, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view", a, h) : u = f, s.buffer.push(g(u) + "\n  "), u = n, a = "ConditionsView", c = r.view, f = c || n.view, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view", a, h) : u = f, s.buffer.push(g(u) + '\n</div>\n<div class="modal-footer filter-actions">\n  <span '), u = n, a = "userDidPreview", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="link">'), u = n, a = "previewLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</span>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/new_organization"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "Em.TextField", o = {}, u = "organization.name", o.valueBinding = u, c = r.view, u = c || e.view, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "Em.TextField", o = {}, u = "organization.domains", o.valueBinding = u, c = r.view, u = c || e.view, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view", s, h) : i = u, t.buffer.push(g(i) + "\n    <p>"), i = e, s = "txt.organizations.edit.help.domains", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</p>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  '), u = n, a = "lib/views/label_view", f = {}, l = "organization", f.organizationBinding = l, l = "txt.name_organization.label", f.i18nLabel = l, l = "clearfix", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/label_view", f = {}, l = "organization", f.organizationBinding = l, l = "txt.organizations.edit.domains_short", f.i18nLabel = l, l = "clearfix", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(3, w, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/new_user"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "Em.TextField", o = {}, u = "user.name", o.valueBinding = u, c = r.view, u = c || e.view, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "Em.TextField", o = {}, u = "user.email", o.valueBinding = u, c = r.view, u = c || e.view, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <div>\n      <label>"), i = e, s = "txt.users.edit.role", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "views/users/properties/role_view", o = {}, u = "input", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  '), u = n, a = "lib/views/label_view", f = {}, l = "user", f.userBinding = l, l = "txt.name_user.label", f.i18nLabel = l, l = "clearfix", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/label_view", f = {}, l = "user", f.userBinding = l, l = "txt.email.label", f.i18nLabel = l, l = "clearfix", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(3, w, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "canEditRole", f = r["if"], h = p.program(5, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/password_form"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="field-wrapper clearfix">\n      <div class="field-label">'), i = e, s = "view.currentPasswordLabel", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + '</div>\n      <div class="field-holder">\n        '), i = e, s = "lib/views/password_field", o = {}, u = "currentPassword", o.valueBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + '\n        <div class="field-note">'), i = e, s = "view.currentPasswordDescription", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</div>\n      </div>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "view.title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <div class="description">\n    '), u = n, a = "view.description", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n\n  "), u = n, a = "view.isChangingPassword", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <div class="field-wrapper clearfix">\n    <div class="field-label">'), u = n, a = "view.newPasswordLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n    <div class="field-holder">\n      '), u = n, a = "lib/views/password_field", f = {}, l = "newPassword", f.valueBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n      <div class="field-note">'), u = n, a = "view.newPasswordDescription", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n    </div>\n  </div>\n\n  <div class="field-wrapper clearfix">\n    <div class="field-label">'), u = n, a = "view.verifyPasswordLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n    <div class="field-holder">\n      '), u = n, a = "lib/views/password_field", f = {}, l = "verifyPassword", f.valueBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n      <div class="field-note">'), u = n, a = "view.verifyPasswordDescription", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</div>\n    </div>\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/problem_solve_notice"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a>\n  <h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <p>\n    '), u = n, a = "txt.modal.problem_solve_notice.preamble", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </p>\n  <p>\n    "), u = n, a = "txt.modal.problem_solve_notice.list", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n  </p>\n  <p>\n    "), u = n, a = "txt.modal.problem_solve_notice.prompt", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n  </p>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/remove_organization_membership_body"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<p>\n  "), u = n, a = "txt.modal.remove_organization_membership.body_header", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n</p>\n<ol>\n  <li>"), u = n, a = "txt.modal.remove_organization_membership.body_consequence_one", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</li>\n  <li>"), u = n, a = "txt.modal.remove_organization_membership.body_consequence_two", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</li>\n</ol>\n<p>\n  "), u = n, a = "txt.modal.remove_organization_membership.body_footer", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n</p>\n"), o
}), Ember.TEMPLATES["templates/modals/suspended_account"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <h3>"), i = e, s = "txt.modal.suspended_account.expired.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h3>\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <h3>"), i = e, s = "txt.modal.suspended_account.payment.title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</h3>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "controller.isAccountOwner", o = r["if"], c = h.program(6, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(8, E, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <p>"), i = e, s = "txt.modal.suspended_account.expired.admin.days_ago", o = {}, u = "controller.daysSinceTrialExpired", o.numberBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + " "), i = e, s = "txt.modal.suspended_account.expired.admin.until_subscribe", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</p>\n      <p>"), i = e, s = "txt.modal.suspended_account.expired.admin.any_questions_v2", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</p>\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <p>"), i = e, s = "txt.modal.suspended_account.expired.admin.days_ago", o = {}, u = "controller.daysSinceTrialExpired", o.numberBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + " "), i = e, s = "txt.modal.suspended_account.expired.agent.until_subscribe", o = {}, u = "controller.ownerName", o.owner_nameBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + "</p>\n      <p>"), i = e, s = "txt.modal.suspended_account.expired.agent.ask_owner_v2", o = {}, u = "controller.ownerName", o.owner_nameBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + "</p>\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "controller.isAccountOwner", o = r["if"], c = h.program(11, x, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(13, T, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <p>"), i = e, s = "txt.modal.suspended_account.payment.owner.suspended_because", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + " "), i = e, s = "txt.modal.suspended_account.payment.owner.to_reactivate", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</p>\n      <p>"), i = e, s = "txt.modal.suspended_account.payment.owner.contact", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</p>\n    "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <p>"), i = e, s = "txt.modal.suspended_account.payment.agent.suspended_because", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</p>\n      <p>"), i = e, s = "txt.modal.suspended_account.payment.agent.ask_owner", o = {}, u = "controller.ownerName", o.owner_nameBinding = u, l = r.t, u = l || e.t, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "t", s, c) : i = u, t.buffer.push(m(i) + "</p>\n    "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <button class="btn" '), i = e, s = "continue", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ">\n      "), i = e, s = "txt.modal.suspended_account.expired.admin.continue", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n    </button>\n    "), i = e, s = "controller.isAccountOwner", o = r["if"], c = h.program(16, C, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <button class="btn btn-inverse" '), i = e, s = "goToSubscriptions", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ">\n        "), i = e, s = "txt.modal.suspended_account.expired.admin.find_plan", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      </button>\n    "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <button class="btn" '), i = e, s = "continue", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ">\n      "), i = e, s = "txt.modal.suspended_account.payment.owner.continue", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n    </button>\n    "), i = e, s = "controller.isAccountOwner", o = r["if"], c = h.program(19, L, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <button class="btn btn-inverse" '), i = e, s = "goToSubscriptions", l = r.action, o = l || e.action, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "action", s, c) : i = o, t.buffer.push(m(i) + ">\n        "), i = e, s = "txt.modal.suspended_account.payment.owner.update_cc", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      </button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  '), u = n, a = "controller.isTrialAccount", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(3, y, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="modal-body">\n  '), u = n, a = "controller.isTrialAccount", f = r["if"], c = h.program(5, b, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(10, S, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="modal-footer">\n  '), u = n, a = "controller.isTrialAccount", f = r["if"], c = h.program(15, N, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(18, k, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/suspended_ticket_modal"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <tr>\n      <th>"), i = e, s = "txt.admin.views.suspended_tickets.show.from_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + ":</th>\n      <td>"), i = e, s = "from", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</td>\n    </tr>\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <tr>\n      <th>"), i = e, s = "txt.suspended_ticket.to_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + ":</th>\n      <td>"), i = e, s = "to", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</td>\n    </tr>\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <tr>\n      <th>"), i = e, s = "txt.suspended_ticket.attachments_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + ":</th>\n      <td>\n      "), i = e, s = "attachments", o = r.each, h = p.program(6, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </td>\n    </tr>\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <a href="'), i = e, s = "url", c = r.u, o = c || e.u, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "u", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push('" target="_blank">'), i = e, s = "filename", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</a><br />\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <a class="close" data-dismiss="modal">×</a><h3>'), u = n, a = "title", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n<div class="modal-body">\n  <table class="table table-condensed">\n    '), u = n, a = "showFrom", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    "), u = n, a = "to", f = r["if"], h = p.program(3, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n    <tr>\n      <th>"), u = n, a = "txt.admin.views.suspended_tickets.show.subject_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ":</th>\n      <td>"), u = n, a = "subject", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</td>\n    </tr>\n    <tr>\n      <th>"), u = n, a = "txt.admin.views.suspended_tickets.show.received_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ":</th>\n      <td>"), u = n, a = "receivedAt", f = {}, l = "true", f.full = l, c = r.timestamp, l = c || n.timestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "timestamp", a, h) : u = l, s.buffer.push(g(u) + "</td>\n    </tr>\n    <tr>\n      <th>"), u = n, a = "txt.suspended_ticket.cause_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ":</th>\n      <td>\n        "), u = n, a = "cause", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + ' (<a href="https://support.zendesk.com/entries/20512557" target="_blank">'), u = n, a = "help.what_is_this_title", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a>)\n      </td>\n    </tr>\n    <tr>\n      <th>"), u = n, a = "txt.suspended_ticket.email_id_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ":</th>\n      <td>"), u = n, a = "emailId", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</td>\n    </tr>\n    "), u = n, a = "showAttachments", f = r["if"], h = p.program(5, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n  </table>\n  <div class="body">\n    '), u = n, a = "body", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button class="btn cancel" data-dismiss="modal">'), u = n, a = "txt.modal.edit.cancel", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</button>\n  <div class="btn-group dropup">\n    <button '), u = n, a = "recoverTicket", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-inverse btn-inner-left">\n      '), u = n, a = "txt.suspended_ticket.recover_automatically.button_label_weak", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </button>\n    <button class="btn btn-inverse dropdown-toggle" data-toggle="dropdown">\n      <span class="caret"></span>\n    </button>\n\n    <ul class="menu dropdown-menu pull-right">\n      <li '), u = n, a = "deleteTicket", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + "><a>"), u = n, a = "txt.admin.helpers.tickets_helper.delete_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a></li>\n      <li "), u = n, a = "recoverTicketManually", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + "><a>"), u = n, a = "txt.suspended_ticket.recover_manually.button_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a></li>\n      <li "), u = n, a = "recoverTicket", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + "><a>"), u = n, a = "txt.suspended_ticket.recover_automatically.button_label", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "></a></li>\n    </ul>\n  </div>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/user_assume"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <h3>'), u = n, a = "view.titleLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <div class="user_assume_photo">\n    <img class="profile" '), u = {}, a = "view.profileImageUrl", u.src = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + " />\n  </div>\n\n  <div style>\n    "), u = n, a = "view.detailsLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "view.confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/user_assume_tutorial"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="modal-header">\n  <h3>'), u = n, a = "view.titleLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '</h3>\n</div>\n\n<div class="modal-body">\n  <div class="user_assume_photo">\n    <img class="profile" '), u = {}, a = "view.profileImageUrl", u.src = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + " />\n  </div>\n\n  <div style>\n    "), u = n, a = "view.detailsLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n  </div>\n</div>\n\n<div class="modal-footer">\n  <button '), u = n, a = "userDidCancel", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn">'), u = n, a = "view.cancelLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n  <button "), u = n, a = "userDidConfirm", f = {}, l = "target", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-primary">'), u = n, a = "view.confirmLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "</button>\n</div>\n"), o
}), Ember.TEMPLATES["templates/modals/voice_webrtc_settings_instructions"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="message">\n  <span class="icon error"></span>\n  '), u = n, a = "txt.voice.webrtc_settings.needs_access.message", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '\n</div>\n<div class="clear"></div>\n<p>\n  '), u = n, a = "txt.voice.webrtc_settings.needs_access.instructions", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n  <ol>\n    <li>"), u = n, a = "txt.voice.webrtc_settings.needs_access.instructions_option1", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</li>\n    <li>"), u = n, a = "txt.voice.webrtc_settings.needs_access.instructions_option2", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</li>\n  </ol>\n</p>\n"), o
}), Ember.TEMPLATES["templates/modals/voice_webrtc_settings_success"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="message">\n  <span class="icon success"></span>\n  '), u = n, a = "txt.voice.webrtc_settings.has_access.message", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '\n</div>\n<div class="clear"></div>\n<p>\n  '), u = n, a = "txt.voice.webrtc_settings.has_access.instructions", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n</p>\n\n"), o
}), Ember.Handlebars.registerPartial("organizations.mast", Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <img alt="Icon_org" class="profile organization" src="https://assets.zendesk.com/agent/assets/icons/objects/icon_org-28ccd8681881f66ecd9a2483d4002321.png" />\n\n  <div class="editable">\n    '), i = e, s = "lib/views/text_field_editable_view", o = {}, u = "delegate.organization.name", o.valueBinding = u, u = "delegate.organization", o.modelBinding = u, u = "delegate.organization.permissions.can_not_edit_properties", o.disabledBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n  </div>\n\n  "), i = e, s = "delegate.navigationItemsForOrganization", o = {}, u = "sub_nav", o["class"] = u, f = r.navbar, u = f || e.navbar, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "navbar", s, l) : i = u, t.buffer.push(v(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression,
        m = r.blockHelperMissing;
    return s.buffer.push("\n"), u = {}, a = "parentView.delegate", u.delegateBinding = a, a = "mast", u["class"] = a, f = r.view, a = f || n.view, l = c.program(1, g, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("organizations.show_properties", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "lib/views/popover_view", o = {}, u = "property", o["class"] = u, u = "help.organization.tags.title", o.titleI18n = u, u = "help.organization.tags.content", o.contentI18n = u, u = "organization", o.organizationBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(2, w, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.users.edit.tags", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "views/organizations/properties/tags_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.organizations.edit.domains", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = e, s = "views/organizations/properties/text_area_view", o = {}, u = "organization.domains", o.valueBinding = u, u = "domains", o.property = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.organizations.edit.group", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = e, s = "views/organizations/properties/groups_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "lib/views/popover_view", o = {}, u = "property", o["class"] = u, u = "help.organization.shared.title", o.titleI18n = u, u = "help.organization.shared.content", o.contentI18n = u, u = "organization", o.organizationBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(9, T, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.organization.section.users", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "views/organizations/properties/is_shared_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.users.edit.details", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = e, s = "views/organizations/properties/text_area_view", o = {}, u = "organization.details", o.valueBinding = u, u = "details", o.property = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.users.edit.notes", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = e, s = "views/organizations/properties/text_area_view", o = {}, u = "organization.notes", o.valueBinding = u, u = "notes", o.property = u, u = "organization.permissions.can_not_edit_notes", o.disabledBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "addUser", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.organizations.add_user", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n        "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "deleteOrganization", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.delete_asset", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n        "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="property_box details">\n\n  '), u = n, a = "settings.has_user_tags", f = r["if"], h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/popover_view", f = {}, l = "property", f["class"] = l, l = "help.organization.domains.title", f.titleI18n = l, l = "help.organization.domains.content", f.contentI18n = l, l = "organization", f.organizationBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(4, E, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/popover_view", f = {}, l = "property", f["class"] = l, l = "help.organization.group.title", f.titleI18n = l, l = "help.organization.group.content", f.contentI18n = l, l = "organization", f.organizationBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(6, S, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "view.shouldShowOrgSharing", f = r["if"], h = p.program(8, x, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  <div "), u = {}, a = "organization.shared_tickets:is_shared :property :shared_comments", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    <label>&nbsp;</label>\n    "), u = n, a = "views/organizations/properties/is_shared_comments_view", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + "\n  </div>\n\n  "), u = n, a = "lib/views/popover_view", f = {}, l = "property", f["class"] = l, l = "help.people.details.title", f.titleI18n = l, l = "help.people.details.content2", f.contentI18n = l, l = "organization", f.organizationBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(11, N, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/popover_view", f = {}, l = "property", f["class"] = l, l = "help.people.notes.title", f.titleI18n = l, l = "help.people.notes.content2", f.contentI18n = l, l = "organization", f.organizationBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(13, C, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n\n"), u = n, a = "views/custom_fields/custom_field_collection", f = {}, l = "organization", f.targetBinding = l, l = "organization", f.kind = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n<div class="log">\n  '), u = n, a = "txt.users.show.created", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " "), u = n, a = "organization.created_at", f = {}, l = "true", f.full = l, c = r.boundTimestamp, l = c || n.boundTimestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "boundTimestamp", a, h) : u = l, (u || u === 0) && s.buffer.push(u), s.buffer.push("</br>\n  "), u = n, a = "txt.users.show.updated", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " "), u = n, a = "organization.updated_at", f = {}, l = "true", f.full = l, c = r.boundTimestamp, l = c || n.boundTimestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "boundTimestamp", a, h) : u = l, (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<footer>\n  <div class=\'pane left section\'>\n    <div class="dropup object_options">\n      <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n        '), u = n, a = "txt.organization.actions.organization_options", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n        <b class="caret"></b>\n      </span>\n\n      <ul class="menu dropdown-menu">\n        '), u = n, a = "Zendesk.currentUser.canCreateUser", f = r["if"], h = p.program(15, k, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n        "), u = n, a = "Zd.globalPermissions.organizationEditing", f = r["if"], h = p.program(17, L, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n      </ul>\n    </div>\n  </div>\n</footer>\n"), o
})), Ember.Handlebars.registerPartial("organizations.tickets", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "controller.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.filter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = e, s = "views/filters/ticket_list_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "tickets", f.name = l, l = "pane_body section", f["class"] = l, l = "controller.filter.content.isFetching:working", f.classBinding = l, l = "parentView.controller.submittedTicketsController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("organizations.users", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "controller.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.filter.totalCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = e, s = "views/filters/user_list_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "users", f.name = l, l = "pane_body section", f["class"] = l, l = "controller.filter.content.isFetching:working", f.classBinding = l, l = "parentView.controller.usersController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.TEMPLATES["templates/organizations/main_pane"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            s;
        return t.buffer.push("\n  "), s = e, s = p.invokePartial(i["organizations.mast"], "organizations.mast", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["organizations.tickets"], "organizations.tickets", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["organizations.users"], "organizations.users", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n"), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<header>\n  <div class='pane left'>\n    "), u = n, a = "views/section_toolbar/section_toolbar_view", f = {}, l = "delegate", f.delegateBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n</header>\n\n<div class='pane left section'>\n  "), u = n, u = p.invokePartial(i["organizations.show_properties"], "organizations.show_properties", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n\n"), u = {}, a = "pane right section", u["class"] = a, a = "controller.section", u.activeChildNameBinding = a, a = "controller", u.controllerBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/organizations/organization_workspace"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/organizations/organization_view", f = {}, l = "workspace.organizationController", f.controllerBinding = l, l = "workspace", f.delegateBinding = l, l = "organizationWorkspace.organization", f.name = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/reporting/reporting_tooltip"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<div class='tooltip-mask'></div>\n\n<div id='reporting-tooltip'>\n  <div class='diamond'></div>\n\n  <a "), u = n, a = "closeTooltip", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="close-tooltip">✕</a>\n\n  <h4>'), u = n, a = "view.title", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + "</h4>\n  <p>"), u = n, a = "view.body", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + "</p>\n\n  <div class='navigation'>\n    <button "), u = n, a = "showVideo", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="btn btn-inverse">\n      '), u = n, a = "view.playButtonText", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + "\n    </button>\n  </div>\n\n</div>\n"), o
}), Ember.TEMPLATES["templates/reporting/reporting_tutorial"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<div id='reporting-video-tutorial'>\n  <a "), u = n, a = "closeTooltip", f = {}, l = "Em.View.views.reporting_tooltip", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' class="close-video">✕</a>\n  <iframe src="'), u = n, a = "videoSrc", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="960" height="540"></iframe>\n</div>\n'), o
}), Ember.Handlebars.registerPartial("tickets.events", Handlebars.template(function (e, t, n, r, i) {
    function v(e, t) {
        var r = "",
            i, s;
        r += '\n    <div class="comment">\n       ', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.value, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "comment.value", {
            hash: {}
        }));
        if (i || i === 0) r += i;
        r += "\n    </div>\n    ", a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.canMakePrivate, s = n["if"], f = l.programWithDepth(m, t, e), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n  ", r
    }

    function m(e, t, r) {
        var i = "",
            s;
        return i += '\n      <div class="link_light make-private">\n        <em data-action="make-private" data-audit-id="', a = n.id, s = a || r.id, typeof s === c ? s = s.call(e, {
            hash: {}
        }) : s === p && (s = h.call(e, "...id", {
            hash: {}
        })), i += d(s) + '">', a = n.comment, s = a || e.comment, s = s === null || s === undefined || s === !1 ? s : s.makePrivateActionLabel, typeof s === c ? s = s.call(e, {
            hash: {}
        }) : s === p && (s = h.call(e, "comment.makePrivateActionLabel", {
            hash: {}
        })), i += d(s) + "</em>\n      </div>\n    ", i
    }

    function g(e, t) {
        var i = "",
            s;
        i += "\n    ", s = e, s = l.invokePartial(r["tickets.events.voice"], "tickets.events.voice", s, n, r);
        if (s || s === 0) i += s;
        return i += "\n  ", i
    }

    function y(e, t) {
        var i = "",
            s;
        i += "\n    ", s = e, s = l.invokePartial(r["tickets.events.facebook"], "tickets.events.facebook", s, n, r);
        if (s || s === 0) i += s;
        return i += "\n  ", i
    }

    function b(e, t) {
        var r = "",
            i;
        return r += '\n        <li class="image">\n          <a href="', a = n.contentUrl, i = a || e.contentUrl, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "contentUrl", {
            hash: {}
        })), r += d(i) + '" title="', a = n.fileName, i = a || e.fileName, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "fileName", {
            hash: {}
        })), r += d(i) + '" rel="gallery" tabindex="-1" class="attachment">\n            <img src="', a = n.thumbnailContentUrl, i = a || e.thumbnailContentUrl, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "thumbnailContentUrl", {
            hash: {}
        })), r += d(i) + '"/>\n            <div class="file_name">', a = n.displayName, i = a || e.displayName, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "displayName", {
            hash: {}
        })), r += d(i) + "</div>\n          </a>\n        </li>\n      ", r
    }

    function w(e, t) {
        var r = "",
            i;
        return r += '\n      <li>\n        <a href="', a = n.contentUrl, i = a || e.contentUrl, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "contentUrl", {
            hash: {}
        })), r += d(i) + '" target="_blank" class="attachment" type="', a = n.contentType, i = a || e.contentType, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "contentType", {
            hash: {}
        })), r += d(i) + '" tabindex="-1">\n          <i class="icon-file"></i> ', a = n.displayName, i = a || e.displayName, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "displayName", {
            hash: {}
        })), r += d(i) + "\n        </a>\n      </li>\n    ", r
    }

    function E(e, t) {
        var r = "",
            i, s;
        r += '\n    <ul class="audit-events">\n      ', a = n.events, i = a || e.events, s = n.each, f = l.program(13, S, t), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n    </ul>\n  ", r
    }

    function S(e, t) {
        var r = "",
            i, s;
        r += '\n        <li class="', a = n.type, i = a || e.type, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "type", {
            hash: {}
        })), r += d(i) + '">\n          <i class="event_share icon-share-alt"></i>\n          <i class="event_change ', a = n.iconClass, i = a || e.iconClass, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "iconClass", {
            hash: {}
        })), r += d(i) + '"></i>\n\n          <div class="info">\n            <label>\n              ', a = n.label, i = a || e.label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "label", {
            hash: {}
        })), r += d(i) + "\n            </label>\n\n            ", a = n.value, i = a || e.value, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "value", {
            hash: {}
        })), r += d(i) + " ", a = n.showLink, i = a || e.showLink, s = n["if"], f = l.program(14, x, t), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n            <del> ", a = n.previous_value, i = a || e.previous_value, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "previous_value", {
            hash: {}
        })), r += d(i) + ' </del>\n\n            <div class="via">\n              ', a = n.via, i = a || e.via, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "via", {
            hash: {}
        })), r += d(i) + "\n            </div>\n          </div>\n\n\n        </li>\n      ", r
    }

    function x(e, t) {
        var r = "",
            i;
        return r += '<span class="link_light" data-action="show-notification" data-notification-type="', a = n.type, i = a || e.type, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "type", {
            hash: {}
        })), r += d(i) + '" data-notification-id="', a = n.id, i = a || e.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "id", {
            hash: {}
        })), r += d(i) + '">#', a = n.id, i = a || e.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "id", {
            hash: {}
        })), r += d(i), r
    }

    function T(e, t) {
        var r = "",
            i;
        return r += '\n      (<a href="#" onclick="window.open(\'/audits/', a = n.id, i = a || e.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "id", {
            hash: {}
        })), r += d(i) + "/email.html','emailWindow','toolbar=0, menubar=0, width=620, height=594, location=0, status=0, directories=0, scrollbars=1'); return false;\">", a = n.rawEmailLabel, i = a || e.rawEmailLabel, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "rawEmailLabel", {
            hash: {}
        })), r += d(i) + "</a>)\n    ", r
    }

    function N(e, t) {
        var r = "",
            i, s;
        r += '\n  <ul id="screencasts_list">\n    ', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.screencasts, s = n.each, f = l.program(19, C, t), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n  </ul>\n", r
    }

    function C(e, t) {
        var r = "",
            i;
        return r += '\n      <li style="background: url(', a = n.thumbnail, i = a || e.thumbnail, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "thumbnail", {
            hash: {}
        })), r += d(i) + ') no-repeat;" class="screencast-thumb" data-screencast-id="', a = n.id, i = a || e.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "id", {
            hash: {}
        })), r += d(i) + '" ></li>\n    ', r
    }

    function k(e, t) {
        var r = "",
            i;
        r += '\n  <div class="tweet-footer-left">\n    <a class="twitter-timestamp"data-action="timestamp" data-comment-id="', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "comment.id", {
            hash: {}
        })), r += d(i) + '">', a = n.created_at, i = a || e.created_at, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "created_at", {
            hash: {}
        }));
        if (i || i === 0) r += i;
        r += "</a>\n    ", a = n.attribution, i = a || e.attribution, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "attribution", {
            hash: {}
        }));
        if (i || i === 0) r += i;
        return r += '\n  </div>\n  <div class="tweet-footer-right">\n    <div class="actions">\n\n      <a href="#" class="twitter-action favorite"\n         data-action="favorite"\n         data-comment-id="', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "comment.id", {
            hash: {}
        })), r += d(i) + '">\n        <span class="favorite-mode">\n          <i></i><label>', a = n.favorite_label, i = a || e.favorite_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "favorite_label", {
            hash: {}
        })), r += d(i) + '</label>\n        </span>\n        <span class="unfavorite-mode">\n          <i></i><label>', a = n.favorited_label, i = a || e.favorited_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "favorited_label", {
            hash: {}
        })), r += d(i) + '</label>\n        </span>\n      </a>\n\n      <a href="#" class="twitter-action retweet"\n         data-action="retweet"\n         data-comment-id="', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "comment.id", {
            hash: {}
        })), r += d(i) + '">\n        <span class="retweet-mode">\n          <i></i><label>', a = n.retweet_label, i = a || e.retweet_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "retweet_label", {
            hash: {}
        })), r += d(i) + '</label>\n        </span>\n        <span class="unretweet-mode">\n          <i></i><label>', a = n.retweeted_label, i = a || e.retweeted_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "retweeted_label", {
            hash: {}
        })), r += d(i) + '</label>\n        </span>\n      </a>\n\n      <a href="#" class="twitter-action reply"\n         data-action="reply"\n         data-comment-id="', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "comment.id", {
            hash: {}
        })), r += d(i) + '">\n        <i></i><label>', a = n.reply_label, i = a || e.reply_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "reply_label", {
            hash: {}
        })), r += d(i) + "</label>\n      </a>\n\n    </div>\n  </div>\n", r
    }
    n = n || e.helpers, r = r || e.partials;
    var s = "",
        o, u, a, f, l = this,
        c = "function",
        h = n.helperMissing,
        p = void 0,
        d = this.escapeExpression;
    s += '<div class="body">\n  ', a = n.comment, o = a || t.comment, u = n["if"], f = l.program(1, v, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n  ", a = n.voiceComment, o = a || t.voiceComment, u = n["if"], f = l.program(4, g, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n  ", a = n.facebookComment, o = a || t.facebookComment, u = n["if"], f = l.program(6, y, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += '\n\n  <ul class="attachments">\n    <div id="gallery" data-toggle="modal-gallery" data-target="#modal-gallery">\n      ', a = n.comment, o = a || t.comment, o = o === null || o === undefined || o === !1 ? o : o.imageAttachments, u = n.each, f = l.program(8, b, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n    </div>\n\n    ", a = n.comment, o = a || t.comment, o = o === null || o === undefined || o === !1 ? o : o.nonImageAttachments, u = n.each, f = l.program(10, w, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n  </ul>\n\n  ", a = n.events, o = a || t.events, u = n["if"], f = l.program(12, E, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += '\n\n  <div class="via">\n    ', a = n.via, o = a || t.via, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "via", {
        hash: {}
    })), s += d(o) + "\n    ", a = n.hasRawEmail, o = a || t.hasRawEmail, u = n["if"], f = l.program(16, T, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += '\n  </div>\n\n  <div class="client">\n    <ul>\n      <li>', a = n.system, o = a || t.system, o = o === null || o === undefined || o === !1 ? o : o.message_id, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "system.message_id", {
        hash: {}
    })), s += d(o) + "</li>\n      <li>", a = n.system, o = a || t.system, o = o === null || o === undefined || o === !1 ? o : o.client, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "system.client", {
        hash: {}
    })), s += d(o) + "<li/>\n      <li>", a = n.system, o = a || t.system, o = o === null || o === undefined || o === !1 ? o : o.ip_address, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "system.ip_address", {
        hash: {}
    })), s += d(o) + "<li/>\n      <li>", a = n.system, o = a || t.system, o = o === null || o === undefined || o === !1 ? o : o.location, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "system.location", {
        hash: {}
    })), s += d(o) + "<li/>\n    </ul>\n  </div>\n</div>\n\n", a = n.comment, o = a || t.comment, o = o === null || o === undefined || o === !1 ? o : o.screencasts, u = n["if"], f = l.program(18, N, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n", a = n.tweet, o = a || t.tweet, u = n["if"], f = l.program(21, k, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    return s += "\n", s
})), Ember.TEMPLATES["templates/tickets/add_bulk_comment_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/users/photo_view", f = {}, l = "Zendesk.currentUser", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n<div class="content">\n  <div class="header clearfix">\n\n    '), u = n, a = "replyButton", f = {}, l = "Zd.bulkEditController.publicCommentOptionsVisible", f.isVisibleBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n    "), u = n, a = "noteButton", c = r.view, f = c || n.view, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view", a, h) : u = f, s.buffer.push(g(u) + '\n\n    <span class="hint reply">\n      '), u = n, a = "txt.ticket.actions.public_hint", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </span>\n\n    <span class="hint note">\n      '), u = n, a = "txt.ticket.actions.private_hint", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n    </span>\n  </div>\n\n  <div class="body">\n    '), u = n, a = "views/tickets/comment_text_area", f = {}, l = "Zd.bulkEditController", f.controllerBinding = l, l = "content.comment.body", f.valueBinding = l, l = "autoresize", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n    <div class="options"></div>\n\n    <div class="clear"></div>\n  </div>\n</div>\n'), o
}), Ember.Handlebars.registerPartial("tickets.add_comment.attachment_buttons", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <span class="fileinput-button">\n      '), i = e, s = "views/tickets/comments/record_screencast_button", o = {}, u = "-1", o.tabindex = u, l = r.view_module, u = l || e.view_module, c = h.program(2, b, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </span>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.ticket.actions.record_screencast", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return s.buffer.push("<div class='add_comment_attachment_buttons'>\n  "), u = n, a = "currentAccount.settings.screencastsForTicketsEnabled", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  <div "), u = {}, a = "controller.attachmentTooltipClass", u["class"] = a, l = r.bindAttr, a = l || n.bindAttr, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "bindAttr", c) : u = a, s.buffer.push(m(u) + " "), u = {}, a = "controller.attachmentTooltipTitle", u.title = a, l = r.bindAttr, a = l || n.bindAttr, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "bindAttr", c) : u = a, s.buffer.push(m(u) + '>\n    <span class="fileinput-button-text">'), u = n, a = "txt.ticket.actions.attach_file", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</span>\n    <input type="file" name="uploaded_data" tabindex="-1"/>\n  </div>\n</div>\n'), o
})), Ember.Handlebars.registerPartial("tickets.add_comment.attachments", Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n\n    <a "), i = {}, s = "content.contentUrl", i.href = s, s = "content.contentType", i.type = s, f = r.bindAttr, s = f || e.bindAttr, l = {}, l.hash = i, l.contexts = [], l.data = t, typeof s === h ? i = s.call(e, l) : s === d ? i = p.call(e, "bindAttr", l) : i = s, t.buffer.push(v(i) + ' target="_blank" class="attachment">\n      '), i = e, s = "content.uploading", o = r["if"], l = c.program(2, y, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.program(4, b, t), l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "content.label", o = {}, u = "true", o.escaped = u, f = r._triageMustache, u = f || e._triageMustache, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "_triageMustache", s, l) : i = u, t.buffer.push(v(i) + "\n    </a>\n\n    <button "), i = e, s = "deleteAttachment", o = {}, u = "controller", o.target = u, f = r.actionWithEvent, u = f || e.actionWithEvent, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "actionWithEvent", s, l) : i = u, t.buffer.push(v(i) + ' class="delete ui-state-default" tabindex="-1">\n      <span class="ui-icon ui-icon-close">&nbsp;</span>\n    </button>\n\n    '), i = e, s = "content.deleting", o = r["if"], l = c.program(6, w, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.noop, l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function y(e, t) {
        t.buffer.push('\n        <span class="ui-icon uploading">&nbsp;</span>\n      ')
    }

    function b(e, t) {
        t.buffer.push('\n        <i class="icon-file"></i>\n      ')
    }

    function w(e, t) {
        t.buffer.push('\n      <span class="ui-icon deleting">&nbsp;</span>\n    ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression,
        m = r.blockHelperMissing;
    return s.buffer.push('<div class="add_comment_attachments">\n  '), u = {}, a = "content.comment.uploadSet.attachments", u.contentBinding = a, a = "ul", u.tagName = a, a = "li", u.itemTagName = a, a = "content.uploading", u.itemClassBinding = a, a = "attachments", u["class"] = a, a = "parentView.controller", u.controllerBinding = a, f = r.collection, a = f || n.collection, l = c.program(1, g, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
})), Ember.Handlebars.registerPartial("tickets.add_comment.screencasts", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="add_comment_screencasts">\n    <ul class="attachments screencasts">\n    '), i = e, s = "content.comment.recordedScreencasts", o = r.each, c = h.program(2, b, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </ul>\n  </div>\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <li data-screencast-id="'), i = e, s = "id", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '">\n        <a '), i = e, s = "showPreviewForRecorded", o = {}, u = "parentView.screencastController", o.target = u, l = r.actionWithEvent, u = l || e.actionWithEvent, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "actionWithEvent", s, c) : i = u, t.buffer.push(m(i) + ' class="attachment" tabindex="-1">\n          <span class="screencast-icon"></span>'), i = e, s = "txt.ticket.actions.preview_screencast_title", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + " "), i = e, s = "position", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n        </a>\n        "), i = e, s = "views/tickets/comments/remove_screencast_from_list", o = {}, u = "this", o.contentBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(3, w, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </li>\n    "), n
    }

    function w(e, t) {
        t.buffer.push('\n          <span class="ui-icon ui-icon-close">&nbsp;</span>\n        ')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return u = n, a = "currentAccount.settings.screencastsForTicketsEnabled", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("tickets.add_comment.shared_content", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "view.controller.twitterChannelsVisible", o = r["if"], h = p.program(2, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      "), i = e, s = "view.controller.facebookChannelVisible", o = r["if"], h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      "), i = e, s = "view.controller.facebookPrivateMessageVisible", o = r["if"], h = p.program(6, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      "), i = e, s = "view.controller.shouldShowEmailOnlyOption", o = r["if"], h = p.program(8, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      "), i = e, s = "view.controller.shouldShowPublicReplyOption", o = r["if"], h = p.program(10, T, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/tickets/comments/twitter_mention_channel", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n        "), i = e, s = "views/tickets/comments/twitter_dm_channel", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/tickets/comments/facebook_wall_channel", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/tickets/comments/fb_private_message_channel", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/tickets/comments/email_button", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        "), i = e, s = "views/tickets/comments/reply_button", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="toggle">\n        <div class="icon"></div>\n        <b class="caret"></b>\n      </div>\n      <div class="dropdown">\n        '), i = e, s = "user.phoneIdentities", o = r.each, h = p.program(13, C, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n\n        <button class="enter option" '), i = e, s = "openDialerWithTicketContext", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ">\n          "), i = e, s = "txt.views.tickets.add_comment_shared_content.enter_a_number", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n        </button>\n      </div>\n    "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <button "), i = e, s = "selectNumber", o = {}, u = "view", o.target = u, c = r.actionWithEvent, u = c || e.actionWithEvent, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "actionWithEvent", s, h) : i = u, t.buffer.push(g(i) + ' class="number option">'), i = e, s = "value", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</button>\n        "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/tickets/markdown_preview_view", o = {}, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/tickets/comments/twitter_char_counter", o = {}, u = "view.controller.ticket", o.ticketBinding = u, u = "view.controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      "), i = e, s = "views/tickets/comment_text_area", o = {}, u = "view.controller", o.controllerBinding = u, u = "content.comment.body", o.valueBinding = u, u = "autoresize", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    "), n
    }

    function A(e, t) {
        var n = "",
            s;
        return t.buffer.push("\n        "), s = e, s = p.invokePartial(i["tickets.add_comment.attachment_buttons"], "tickets.add_comment.attachment_buttons", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n        "), s = e, s = p.invokePartial(i["tickets.add_comment.attachments"], "tickets.add_comment.attachments", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n        "), s = e, s = p.invokePartial(i["tickets.add_comment.screencasts"], "tickets.add_comment.screencasts", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n      "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <label>\n          "), i = e, s = "views/tickets/comments/short_url_comment_option", o = {}, u = "view.controller", o.controllerBinding = u, u = "checkbox-field", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n          "), i = e, s = "txt.ticket.actions.twitter.append_ticket_link", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n        </label>\n      "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="content">\n  <div class="header clearfix">\n\n    '), u = n, a = "view.controller.publicCommentOptionsVisible", f = r["if"], h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n    "), u = n, a = "views/tickets/comments/note_button", f = {}, l = "view.controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n    "), u = n, a = "views/channels/call_back_view", f = {}, l = "pull-right call-back", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(12, N, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n    "), u = n, a = "views/tickets/markdown_toggle_view", f = {}, l = "view.controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n    <div class="hint reply">\n      '), u = n, a = "view.controller.commentHint", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n    </div>\n  </div>\n\n  <div "), u = {}, a = "controller.isGenerating:working :body", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n    "), u = n, a = "view.controller.isPreviewing", f = r["if"], h = p.program(15, k, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(17, L, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    <div class="options">\n      '), u = n, a = "view.controller.shouldShowAttachment", f = r["if"], h = p.program(19, A, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n      "), u = {}, a = "view.controller.commentOptionsVisible", u.isVisibleBinding = a, a = "view.controller", u.controllerBinding = a, a = "clearfix channel_options", u["class"] = a, c = r.view, a = c || n.view, h = p.program(21, O, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n    </div>\n\n    <div class="clear"></div>\n  </div>\n</div>\n'), o
})), Ember.TEMPLATES["templates/tickets/audits"] = Handlebars.template(function (e, t, n, r, i) {
    function v(e, t, i) {
        var s = "",
            o, u;
        s += "\n\n", a = n.isNew, o = a || e.isNew, u = n["if"], f = l.program(2, m, t), f.hash = {}, f.fn = f, f.inverse = l.program(4, g, t), o = u.call(e, o, f);
        if (o || o === 0) s += o;
        s += '\n    <div data-comment-id="', a = n.comment, o = a || e.comment, o = o === null || o === undefined || o === !1 ? o : o.id, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "comment.id", {
            hash: {}
        })), s += d(o) + '" class="content">\n      <div class="user_photo ', a = n.systemUser, o = a || e.systemUser, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "systemUser", {
            hash: {}
        })), s += d(o) + " ", a = n.author, o = a || e.author, o = o === null || o === undefined || o === !1 ? o : o.metaInfo, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "author.metaInfo", {
            hash: {}
        })), s += d(o) + '">\n        <a href="', a = n.author, o = a || e.author, o = o === null || o === undefined || o === !1 ? o : o.href, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "author.href", {
            hash: {}
        })), s += d(o) + '" tabindex="-1"><img class="profile" src=', a = n.author, o = a || e.author, o = o === null || o === undefined || o === !1 ? o : o.profileImageUrl, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "author.profileImageUrl", {
            hash: {}
        })), s += d(o) + '></a>\n        <i class="photo_badge"></i>\n      </div>\n\n      <div class="header clearfix">\n        <div class="title">\n          <span class="name">\n            ', a = n.author, o = a || e.author, o = o === null || o === undefined || o === !1 ? o : o.href, u = n["if"], f = l.program(6, y, t), f.hash = {}, f.fn = f, f.inverse = l.program(8, b, t), o = u.call(e, o, f);
        if (o || o === 0) s += o;
        s += "\n          </span>\n          ", a = n.tweet, o = a || e.tweet, u = n["if"], f = l.program(10, w, t), f.hash = {}, f.fn = f, f.inverse = l.programWithDepth(E, t, i), o = u.call(e, o, f);
        if (o || o === 0) s += o;
        s += "\n\n          <span>", a = n.created_at, o = a || e.created_at, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "created_at", {
            hash: {}
        }));
        if (o || o === 0) s += o;
        s += '</span>\n          <span class="link_light assign_to for_save"><span data-action="assign-ticket" data-author-id="', a = n.author, o = a || e.author, o = o === null || o === undefined || o === !1 ? o : o.id, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "author.id", {
            hash: {}
        })), s += d(o) + '">', a = n.author, o = a || e.author, o = o === null || o === undefined || o === !1 ? o : o.assignToText, typeof o === c ? o = o.call(e, {
            hash: {}
        }) : o === p && (o = h.call(e, "author.assignToText", {
            hash: {}
        })), s += d(o) + '</span></span>\n        </div>\n\n        <div class="channel"></div>\n        ', a = n.tweet, o = a || e.tweet, u = n["if"], f = l.program(14, S, t), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(e, o, f);
        if (o || o === 0) s += o;
        s += "\n\n      </div>\n\n      ", o = e, o = l.invokePartial(r["tickets.events"], "tickets.events", o, n, r);
        if (o || o === 0) s += o;
        return s += "\n\n    </div>\n\n  </div>\n\n", s
    }

    function m(e, t) {
        var r = "",
            i;
        return r += '\n  <div class="event ', a = n.metaInfo, i = a || e.metaInfo, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "metaInfo", {
            hash: {}
        })), r += d(i) + ' is-new">\n', r
    }

    function g(e, t) {
        var r = "",
            i;
        return r += '\n  <div class="event ', a = n.metaInfo, i = a || e.metaInfo, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "metaInfo", {
            hash: {}
        })), r += d(i) + '">\n', r
    }

    function y(e, t) {
        var r = "",
            i;
        return r += '\n              <a href="', a = n.author, i = a || e.author, i = i === null || i === undefined || i === !1 ? i : i.href, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "author.href", {
            hash: {}
        })), r += d(i) + '" tabindex="-1">', a = n.author, i = a || e.author, i = i === null || i === undefined || i === !1 ? i : i.name, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "author.name", {
            hash: {}
        })), r += d(i) + "</a>\n            ", r
    }

    function b(e, t) {
        var r = "",
            i;
        return r += "\n              ", a = n.author, i = a || e.author, i = i === null || i === undefined || i === !1 ? i : i.name, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "author.name", {
            hash: {}
        })), r += d(i) + "\n            ", r
    }

    function w(e, t) {
        var r = "",
            i;
        return r += '\n            (<a href="', a = n.viaSource, i = a || e.viaSource, i = i === null || i === undefined || i === !1 ? i : i.source, i = i === null || i === undefined || i === !1 ? i : i.from, i = i === null || i === undefined || i === !1 ? i : i.profile_url, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "viaSource.source.from.profile_url", {
            hash: {}
        })), r += d(i) + '" tabindex="-1">@', a = n.viaSource, i = a || e.viaSource, i = i === null || i === undefined || i === !1 ? i : i.source, i = i === null || i === undefined || i === !1 ? i : i.from, i = i === null || i === undefined || i === !1 ? i : i.username, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "viaSource.source.from.username", {
            hash: {}
        })), r += d(i) + "</a>)\n          ", r
    }

    function E(e, t, r) {
        var i = "",
            s;
        i += '\n            <span class="via_submitter">', a = n.viaSubmitter, s = a || r.viaSubmitter, typeof s === c ? s = s.call(e, {
            hash: {}
        }) : s === p && (s = h.call(e, "......viaSubmitter", {
            hash: {}
        }));
        if (s || s === 0) i += s;
        return i += "</span>\n          ", i
    }

    function S(e, t) {
        var r = "",
            i;
        return r += '\n          <a href="#" tabindex="-1" class="twitter-action follow"\n             data-action="follow"\n             data-comment-id="', a = n.comment, i = a || e.comment, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "comment.id", {
            hash: {}
        })), r += d(i) + '"\n             data-author="', a = n.viaSource, i = a || e.viaSource, i = i === null || i === undefined || i === !1 ? i : i.source, i = i === null || i === undefined || i === !1 ? i : i.from, i = i === null || i === undefined || i === !1 ? i : i.username, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "viaSource.source.from.username", {
            hash: {}
        })), r += d(i) + '"\n             data-receiver="', a = n.viaSource, i = a || e.viaSource, i = i === null || i === undefined || i === !1 ? i : i.source, i = i === null || i === undefined || i === !1 ? i : i.to, i = i === null || i === undefined || i === !1 ? i : i.username, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "viaSource.source.to.username", {
            hash: {}
        })), r += d(i) + '">\n            <span class="follow-mode">\n              <i></i><label>', a = n.follow_label, i = a || e.follow_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "follow_label", {
            hash: {}
        })), r += d(i) + '</label>\n            </span>\n            <span class="unfollow-mode">\n              <label class="following-label">', a = n.following_label, i = a || e.following_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "following_label", {
            hash: {}
        })), r += d(i) + '</label>\n              <label class="unfollow-label">', a = n.unfollow_label, i = a || e.unfollow_label, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "unfollow_label", {
            hash: {}
        })), r += d(i) + "</label>\n            </span>\n          </a>\n        ", r
    }
    n = n || e.helpers, r = r || e.partials;
    var s = "",
        o, u, a, f, l = this,
        c = "function",
        h = n.helperMissing,
        p = void 0,
        d = this.escapeExpression;
    a = n.content, o = a || t.content, u = n.each, f = l.programWithDepth(v, i, t), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    return s += "\n", s
}), Ember.TEMPLATES["templates/tickets/bulk_edit_progress"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "controller.jobStatusController.hasErrors", o = r.unless, l = c.program(2, y, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.noop, l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    "), i = e, s = "controller.jobStatusController.hasErrors", o = r["if"], l = c.program(4, b, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.noop, l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <div class="bulk_edit_success_header">\n        '), i = e, s = "txt.ticket.bulk_modal.done", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + "\n      </div>\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "controller.jobStatusController.hasSuccesses", o = r["if"], l = c.program(5, w, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.noop, l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n\n      <div class="bulk_edit_header">\n        '), i = e, s = "txt.ticket.bulk_modal.failed_header", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + "\n      </div>\n\n      "), i = {}, s = "controller.jobStatusController.errors", i.contentBinding = s, s = "bulk_edit_errors", i["class"] = s, f = r.collection, s = f || e.collection, l = c.program(7, E, t), l.hash = i, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = t, f && typeof s === h ? i = s.call(e, l) : i = m.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n      <button "), i = e, s = "hideProgressForm", o = {}, u = "controller", o.target = u, f = r.action, u = f || e.action, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "action", s, l) : i = u, t.buffer.push(v(i) + ' class="btn btn-inverse">\n        '), i = e, s = "txt.modal.edit.close", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + "\n      </button>\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div class="bulk_edit_header">\n          '), i = e, s = "txt.ticket.bulk_modal.succes", o = {}, u = "controller.jobStatusController.successes.length", o.ticketsBinding = u, f = r.t, u = f || e.t, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "t", s, l) : i = u, t.buffer.push(v(i) + "\n        </div>\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        #"), i = e, s = "content.id", o = {}, u = "true", o.escaped = u, f = r._triageMustache, u = f || e._triageMustache, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "_triageMustache", s, l) : i = u, t.buffer.push(v(i) + " <em>"), i = e, s = "content.errors", o = {}, u = "true", o.escaped = u, f = r._triageMustache, u = f || e._triageMustache, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "_triageMustache", s, l) : i = u, t.buffer.push(v(i) + "</em>\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="progress-description-header">'), i = e, s = "txt.ticket.bulk_modal.progress_heading", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + '</div>\n    <div class="progress">\n      <div class="bar" '), i = {}, s = "controller.jobStatusController.progressStyle", i.style = s, f = r.bindAttr, s = f || e.bindAttr, l = {}, l.hash = i, l.contexts = [], l.data = t, typeof s === h ? i = s.call(e, l) : s === d ? i = p.call(e, "bindAttr", l) : i = s, t.buffer.push(v(i) + '></div>\n    </div>\n    <div class="progress-description">'), i = e, s = "controller.jobStatusController.description", o = {}, u = "true", o.escaped = u, f = r._triageMustache, u = f || e._triageMustache, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "_triageMustache", s, l) : i = u, t.buffer.push(v(i) + "</div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression,
        m = r.blockHelperMissing;
    return s.buffer.push('<div id="bulk_edit_progress_pane">\n  '), u = {}, a = "controller.jobStatusController.isCompleteDelayed", u.isVisibleBinding = a, f = r.view, a = f || n.view, l = c.program(1, g, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = {}, a = "controller.jobStatusController.isNotCompleteDelayed", u.isVisibleBinding = a, f = r.view, a = f || n.view, l = c.program(9, S, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/tickets/empty_view_class"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<img src="https://assets.zendesk.com/agent/assets/icons/apps/plus-062c32823f9a6ff2a120d00689b5f2a3.png"/>\n<p>'), u = n, a = "apps.empty", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</p>\n<a href="#/admin/apps" class="btn" tabindex="-1">'), u = n, a = "apps.button.browse_market", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</a>\n"), o
}), Ember.Handlebars.registerPartial("tickets.events.facebook", Handlebars.template(function (e, t, n, r, i) {
    function v(e, t) {
        var r = "",
            i, s;
        r += '\n  <div class="comment">\n    ', a = n.facebookComment, i = a || e.facebookComment, i = i === null || i === undefined || i === !1 ? i : i.value, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "facebookComment.value", {
            hash: {}
        }));
        if (i || i === 0) r += i;
        r += "\n\n    ", a = n.facebookComment, i = a || e.facebookComment, i = i === null || i === undefined || i === !1 ? i : i.attachment, s = n["if"], f = l.program(2, m, t), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n  </div>\n", r
    }

    function m(e, t) {
        var r = "",
            i;
        r += "\n      <p>", a = n.facebookComment, i = a || e.facebookComment, i = i === null || i === undefined || i === !1 ? i : i.attachment, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "facebookComment.attachment", {
            hash: {}
        }));
        if (i || i === 0) r += i;
        return r += "</p>\n    ", r
    }

    function g(e, t) {
        var r = "",
            i, s;
        r += "\n  ", a = n.facebookComment, i = a || e.facebookComment, i = i === null || i === undefined || i === !1 ? i : i.shares, s = n.each, f = l.program(5, y, t), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n", r
    }

    function y(e, t) {
        var r = "",
            i;
        r += "\n    ", a = n.link, i = a || e.link, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "link", {
            hash: {}
        }));
        if (i || i === 0) r += i;
        return r += "\n    ", a = n.description, i = a || e.description, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "description", {
            hash: {}
        })), r += d(i) + "\n    ", a = n.picture, i = a || e.picture, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "picture", {
            hash: {}
        })), r += d(i) + "\n  ", r
    }

    function b(e, t) {
        var r = "",
            i, s;
        r += "\n  ", a = n.facebookComment, i = a || e.facebookComment, i = i === null || i === undefined || i === !1 ? i : i.attachments, s = n.each, f = l.program(8, w, t), f.hash = {}, f.fn = f, f.inverse = l.noop, i = s.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "\n", r
    }

    function w(e, t) {
        var n = "",
            r;
        n += "\n    ", r = e, typeof r === c ? r = r.call(e, {
            hash: {}
        }) : r === p && (r = h.call(e, "this", {
            hash: {}
        }));
        if (r || r === 0) n += r;
        return n += "\n  ", n
    }
    n = n || e.helpers;
    var s = "",
        o, u, a, f, l = this,
        c = "function",
        h = n.helperMissing,
        p = void 0,
        d = this.escapeExpression;
    a = n.facebookComment, o = a || t.facebookComment, o = o === null || o === undefined || o === !1 ? o : o.value, u = n["if"], f = l.program(1, v, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n", a = n.facebookComment, o = a || t.facebookComment, o = o === null || o === undefined || o === !1 ? o : o.shares, u = n["if"], f = l.program(4, g, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n", a = n.facebookComment, o = a || t.facebookComment, o = o === null || o === undefined || o === !1 ? o : o.attachments, u = n["if"], f = l.program(7, b, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    return s += "\n", s
})), Ember.Handlebars.registerPartial("tickets.events.voice", Handlebars.template(function (e, t, n, r, i) {
    function v(e, t) {
        var r = "",
            i;
        r += '\n  <div class="comment">\n    ', a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined ||
            i === !1 ? i : i.value, typeof i === c ? i = i.call(e, {
                hash: {}
            }) : i === p && (i = h.call(e, "voiceComment.value", {
                hash: {}
            }));
        if (i || i === 0) r += i;
        return r += "\n  </div>\n", r
    }

    function m(e, t) {
        var r = "",
            i;
        return r += "\n<div class='audio player' id='audio_player_", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.id", {
            hash: {}
        })), r += d(i) + "_events' data-recording-url='", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.recordingURL, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.recordingURL", {
            hash: {}
        })), r += d(i) + "'></div>\n", r
    }

    function g(e, t) {
        var r = "",
            i;
        return r += "\n      <dt>", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.locationLabel, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.locationLabel", {
            hash: {}
        })), r += d(i) + "</dt>\n      <dd>", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.location, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.location", {
            hash: {}
        })), r += d(i) + "</dd>\n    ", r
    }

    function y(e, t) {
        var r = "",
            i;
        return r += "\n      <dt>", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.lengthOfPhoneCallLabel, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.lengthOfPhoneCallLabel", {
            hash: {}
        })), r += d(i) + "</dt>\n      <dd>", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.lengthOfPhoneCall, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.lengthOfPhoneCall", {
            hash: {}
        })), r += d(i) + "</dd>\n    ", r
    }

    function b(e, t) {
        var r = "",
            i;
        return r += "\n    <h4>\n      ", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.transcriptionLabel, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.transcriptionLabel", {
            hash: {}
        })), r += d(i) + "\n    </h4>\n    <p>", a = n.voiceComment, i = a || e.voiceComment, i = i === null || i === undefined || i === !1 ? i : i.transcription, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "voiceComment.transcription", {
            hash: {}
        })), r += d(i) + "</p>\n  ", r
    }
    n = n || e.helpers;
    var s = "",
        o, u, a, f, l = this,
        c = "function",
        h = n.helperMissing,
        p = void 0,
        d = this.escapeExpression;
    a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.value, u = n["if"], f = l.program(1, v, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.recordingURL, u = n["if"], f = l.program(3, m, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n<div class='call_statistics'>\n  <h4>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.headerLabel, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.headerLabel", {
        hash: {}
    })), s += d(o) + "</h4>\n  <dl class='call_info'>\n    <dt>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.callFromLabel, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.callFromLabel", {
        hash: {}
    })), s += d(o) + "</dt>\n    <dd>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.callFrom, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.callFrom", {
        hash: {}
    })), s += d(o) + "</dd>\n\n    <dt>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.callToLabel, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.callToLabel", {
        hash: {}
    })), s += d(o) + "</dt>\n    <dd>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.callTo, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.callTo", {
        hash: {}
    })), s += d(o) + "</dd>\n\n    <dt>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.formattedStartedAtLabel, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.formattedStartedAtLabel", {
        hash: {}
    })), s += d(o) + "</dt>\n    <dd>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.formattedStartedAt, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.formattedStartedAt", {
        hash: {}
    })), s += d(o) + "</dd>\n\n    ", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.location, u = n["if"], f = l.program(5, g, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n    <dt>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.agentLabel, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.agentLabel", {
        hash: {}
    })), s += d(o) + "</dt>\n    <dd>", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.agentName, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "voiceComment.agentName", {
        hash: {}
    })), s += d(o) + "</dd>\n\n    ", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.lengthOfPhoneCall, u = n["if"], f = l.program(7, y, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n  </dl>\n\n  ", a = n.voiceComment, o = a || t.voiceComment, o = o === null || o === undefined || o === !1 ? o : o.transcriptionVisible, u = n["if"], f = l.program(9, b, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    return s += "\n</div>\n", s
})), Ember.TEMPLATES["templates/tickets/incidents"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<header>\n  <div class='pane left'>\n    "), u = n, a = "views/section_toolbar/section_toolbar_view", f = {}, l = "workspace", f.delegateBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n</header>\n\n<div class='pane left section text'>\n  <h1>"), u = n, a = "txt.ticket.incidents.header", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</h1>\n\n  <p>"), u = n, a = "txt.ticket.incidents.text1", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</p>\n  <p>"), u = n, a = "txt.ticket.incidents.text2", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</p>\n</div>\n\n<div class="pane right section">\n  '), u = n, a = "views/filters/ticket_list_view", f = {}, l = "pane_body section incidents", f["class"] = l, l = "workspace.incidentsController", f.controllerBinding = l, l = "controller.filter", f.filterBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n</div>\n"), o
}), Ember.TEMPLATES["templates/tickets/markdown_preview"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="comment markdown_preview">\n  '), u = n, a = "view.formattedMarkdown", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<div class="markdown_info">\n  '), u = n, a = "txt.markdown.help", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n</div>\n"), o
}), Ember.TEMPLATES["templates/tickets/mast/receiver"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0;
    return u = n, a = "view.receiverIdentity", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/tickets/mast/sender"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "txt.admin.views.tickets._requester_header.via_v2", o = {}, u = "view.submitterName", o.user_nameBinding = u, c = r.t, u = c || e.t, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "t", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "view.requester.name", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + " "), u = n, a = "view.senderIdentity", c = r._triageMustache, f = c || n._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "_triageMustache", a, h) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "view.requesterIsNotSubmitter", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/tickets/change_requester_view", f = {}, l = "controller", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/tickets/next_ticket_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<span class="btn btn-inverse _tooltip next_option" '), u = {}, a = "title", u["data-original-title"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + " "), u = n, a = "gotoNextTicket", f = {}, l = "view", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + '>\n  <i class="next_icon icon-chevron-right icon-white"></i>\n  <i class="play_icon icon-forward icon-white"></i>\n</span>\n'), o
}), Ember.TEMPLATES["templates/tickets/pane"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            s, o, u, a;
        return t.buffer.push("\n  "), s = e, o = "views/tickets/collision_notification_view", u = {}, a = "notification collisionnotification-viewing", u["class"] = a, a = "workspace.ticket.moreThanTwoViewersDetailMessage", u.titleBinding = a, a = "top", u["data-placement"] = a, a = "workspace.ticket.hasMoreThanTwoViewers:_tooltip", u.classBinding = a, c = r.view_module, a = c || e.view_module, h = p.program(2, w, t), h.hash = u, h.contexts = [], h.contexts.push(s), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof a === d ? s = a.call(e, o, h) : s = y.call(e, a, o, h), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n\n  "), s = e, o = "views/tickets/update_collision_view", c = r.view_module, u = c || e.view_module, h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(s), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? s = u.call(e, o, h) : s = y.call(e, u, o, h), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n\n  "), s = e, o = "workspace.ticket.errors", u = r["if"], h = p.program(6, S, t), h.hash = {}, h.contexts = [], h.contexts.push(s), h.fn = h, h.inverse = p.noop, h.data = t, s = u.call(e, o, h), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n\n  "), s = e, s = p.invokePartial(i["tickets.pane.properties"], "tickets.pane.properties", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "workspace.ticket.otherViewersMessage", c = r._triageMustache, o = c || e._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "_triageMustache", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "otherUpdatersMessage", c = r._triageMustache, o = c || e._triageMustache, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "_triageMustache", s, h) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push('\n    <br/>\n    <p class="btn">'), i = e, s = "txt.ticket.collision.reload", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</p>\n  "), n
    }

    function S(e, t) {
        var n = "",
            i, s;
        return t.buffer.push('\n    <ul class="notification error">\n      '), i = {}, s = "workspace.ticket.errors", i.contentBinding = s, c = r.collection, s = c || e.collection, h = p.program(7, x, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </ul>\n  "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        <li>"), i = e, s = "content", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</li>\n      "), n
    }

    function T(e, t) {
        var n = "",
            s, o, u, a;
        return t.buffer.push("\n\n  "), s = e, s = p.invokePartial(i["tickets.pane.new"], "tickets.pane.new", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["tickets.pane.conversation"], "tickets.pane.conversation", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, o = "ChatLotus.ChatView", u = {}, a = "chat-section", u["class"] = a, a = "workspace.chatController.isActive", u.isVisibleBinding = a, c = r.view, a = c || e.view, h = {}, h.hash = u, h.contexts = [], h.contexts.push(s), h.data = t, typeof a === d ? s = a.call(e, o, h) : a === m ? s = v.call(e, "view", o, h) : s = a, t.buffer.push(g(s) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<header>\n  <div class='pane left'>\n    "), u = n, a = "views/section_toolbar/section_toolbar_view", f = {}, l = "workspace", f.delegateBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n  </div>\n  <div class="pane right">\n    <button '), u = n, a = "toggleApps", f = {}, l = "Zendesk.appsController", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":origin :btn Zd.appsController.isActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ' tabindex="-1">\n      '), u = n, a = "apps.button.toggle", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </button>\n    "), u = n, a = "views/tickets/next_ticket_view", f = {}, l = "workspace", f.workspaceBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n</header>\n\n"), u = n, a = "views/tickets/sidebar", f = {}, l = "workspace.ticketController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = {}, a = "pane right section", u["class"] = a, a = "appsActive:with_apps_pane", u.classBinding = a, a = "Zendesk.appsController.isActive", u.appsActiveBinding = a, a = "workspace.ticketController", u.controllerBinding = a, c = r.view, a = c || n.view, h = p.program(9, T, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/tickets/ticket_app_container_view", f = {}, l = "apps", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n<footer>"), u = n, u = p.invokePartial(i["tickets.pane.footer"], "tickets.pane.footer", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("</footer>\n"), o
}), Ember.Handlebars.registerPartial("tickets.pane.add_comment", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            s, o, u, a;
        return t.buffer.push("\n\n  "), s = e, o = "views/users/photo_view", u = {}, a = "Zendesk.currentUser", u.userBinding = a, c = r.view_module, a = c || e.view_module, h = {}, h.hash = u, h.contexts = [], h.contexts.push(s), h.data = t, typeof a === d ? s = a.call(e, o, h) : a === m ? s = v.call(e, "view_module", o, h) : s = a, t.buffer.push(g(s) + "\n  "), s = e, s = p.invokePartial(i["tickets.add_comment.shared_content"], "tickets.add_comment.shared_content", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n\n"), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "views/tickets/add_comment", f = {}, l = "controller", f.controllerBinding = l, l = "controller.ticket", f.contentBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("tickets.pane.conversation", Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            s, o, u, a;
        return t.buffer.push("\n  "), s = e, s = c.invokePartial(i["tickets.pane.mast"], "tickets.pane.mast", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, o = "views/tickets/call_console_ticket_view", u = {}, a = "controller.ticket", u.ticketBinding = a, f = r.view_module, a = f || e.view_module, l = {}, l.hash = u, l.contexts = [], l.contexts.push(s), l.data = t, typeof a === h ? s = a.call(e, o, l) : a === d ? s = p.call(e, "view_module", o, l) : s = a, t.buffer.push(v(s) + '\n  <div class="pane_body section">\n    '), s = e, s = c.invokePartial(i["tickets.pane.notices"], "tickets.pane.notices", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n    "), s = e, s = c.invokePartial(i["tickets.pane.add_comment"], "tickets.pane.add_comment", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n\n    "), s = e, o = "workspace.auditsController.isContentFetched", u = r["if"], l = c.program(2, y, t), l.hash = {}, l.contexts = [], l.contexts.push(s), l.fn = l, l.inverse = c.program(8, S, t), l.data = t, s = u.call(e, o, l), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n\n  </div>\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n      <nav class="conversation_mode">\n        '), i = e, s = "workspace.auditsController.showAllEvents", o = r["if"], l = c.program(3, b, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.program(6, E, t), l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </nav>\n      "), i = e, s = "views/tickets/mustache_audits_view", o = {}, u = "workspace.auditsController", o.auditsControllerBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          "), i = e, s = "workspace.ticketController.ticket", o = {}, u = "-1", o.tabindex = u, f = r.linkTo, u = f || e.linkTo, l = c.program(4, w, t), l.hash = o, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.noop, l.data = t, f && typeof u === h ? i = u.call(e, s, l) : i = m.call(e, u, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n        "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.ticket.events.show_comments_toggle", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + "\n          "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          <a "), i = {}, s = "workspace.ticketController.ticket.eventsHref", i.href = s, f = r.bindAttr, s = f || e.bindAttr, l = {}, l.hash = i, l.contexts = [], l.data = t, typeof s === h ? i = s.call(e, l) : s === d ? i = p.call(e, "bindAttr", l) : i = s, t.buffer.push(v(i) + ' tabindex="-1">'), i = e, s = "txt.ticket.events.show_all_toggle", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + "</a>\n        "), n
    }

    function S(e, t) {
        t.buffer.push('\n      <i class="audits icon-loading-spinner"></i>\n    ')
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression,
        m = r.blockHelperMissing;
    return u = {}, a = "ticket section", u["class"] = a, a = "workspace.ticket.isNotNew", u.isVisibleBinding = a, f = r.view, a = f || n.view, l = c.program(1, g, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("tickets.pane.footer", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n    <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n      '), i = e, s = "txt.ticket.actions.ticket_options", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + '\n      <b class="caret"></b>\n    </span>\n\n    <ul class="menu dropdown-menu">\n      '), i = e, s = "controller.showCopyToForums", o = r["if"], h = p.program(2, w, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "Zendesk.globalPermissions.manageMacros", o = r["if"], h = p.program(4, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "workspace.ticketController.mergeButtonVisible", o = r["if"], h = p.program(6, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "workspace.ticketController.markSpamButtonVisible", o = r["if"], h = p.program(8, x, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "workspace.ticketController.deleteButtonVisible", o = r["if"], h = p.program(10, T, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      <li>\n        "), i = e, s = "controller.printTicketUrl", o = {}, u = "_blank", o.target = u, c = r.linkTo, u = c || e.linkTo, h = p.program(12, N, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </li>\n    </ul>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <li "), i = e, s = "toForum", o = {}, u = "target", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.ticket.actions.to_forums", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <li "), i = e, s = "toMacro", o = {}, u = "target", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.ticket.create_as_macro", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <li "), i = e, s = "mergeTicket", o = {}, u = "target", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.ticket.actions.merge_ticket_link", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <li "), i = e, s = "markTicketAsSpam", o = {}, u = "target", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.ticket.actions.mark_as_spam.action", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n        <li "), i = e, s = "deleteTicket", o = {}, u = "target", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.delete_asset", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n      "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n          "), i = e, s = "txt.admin.views.tickets.print.print_ticket", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n        "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="ticket_submit_buttons followup">\n      '), i = e, s = "txt.ticket.is_closed", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      <button "), i = e, s = "createFollowupTicket", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + ' class="followup btn btn-inverse">\n        '), i = e, s = "txt.admin.helpers.tickets_helper.create_follow_up_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </button>\n    </div>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<div class='pane left section'>\n  "), u = {}, a = "dropup object_options", u["class"] = a, a = "parentView.workspace.ticketController", u.controllerBinding = a, a = "parentView.workspace.ticketController", u.targetBinding = a, a = "parentView.workspace.ticketController.ticket", u.ticketBinding = a, a = "parentView.workspace.ticketController.ticket.isNotNew", u.isVisibleBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n\n<div class='pane right section'>\n  <div class=\"action_buttons\">\n    "), u = n, a = "views/tickets/macro_view", f = {}, l = "macro-selector", f["class"] = l, l = "workspace.ticketController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n\n  "), u = n, a = "view.StatusView", f = {}, l = "workspace", f.workspaceBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + '\n\n  <div class="ticket_chat_buttons">\n    '), u = n, a = "ChatLotus.EndChatButton", f = {}, l = "workspace", f.workspaceBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n  </div>\n\n  "), u = n, a = "workspace.ticket.isClosed", f = r["if"], h = p.program(14, C, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
})), Ember.Handlebars.registerPartial("tickets.pane.mast", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n  <div class="profile ticket"><div class="channel"></div></div>\n\n  <div class="editable">\n    '), i = e, s = "views/tickets/subject_mast_view", o = {}, u = "workspace.ticketController.ticket.subject", o.valueBinding = u, u = "workspace.ticketController", o.focusManagerBinding = u, u = "workspace.ticketController.ticket", o.modelBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + '\n  </div>\n\n  <div class="source delimited_items">\n    '), i = e, s = "workspace.ticketController.ticket.created_at", o = {}, u = "true", o.full = u, u = "true", o.relative = u, u = "span", o.tagName = u, u = "created_at", o["class"] = u, c = r.boundTimestamp, u = c || e.boundTimestamp, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "boundTimestamp", s, h) : i = u, t.buffer.push(g(i) + "\n\n    "), i = e, s = "views/tickets/sender_identity_view", o = {}, u = "workspace.ticketController", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n\n    "), i = e, s = "views/tickets/receiver_identity_view", o = {}, u = "workspace.ticketController", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  </div>\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "views/tickets/mast", f = {}, l = "header pane_header mast clearfix", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("tickets.pane.new", Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "lib/lotus/labeled_text_field", o = {}, u = "subject", o.name = u, u = "field title", o["class"] = u, u = "ticket_fields.subject.label", o.i18nLabel = u, u = "workspace.ticket.subject", o.valueBinding = u, u = "workspace.shouldShowSubject", o.isVisibleBinding = u, u = "workspace.ticketController", o.focusManagerBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n\n  "), i = e, s = "views/tickets/add_comment", o = {}, u = "controller.ticket", o.contentBinding = u, u = "is-public", o["class"] = u, u = "workspace.ticketController", o.focusManagerBinding = u, f = r.view_module, u = f || e.view_module, l = c.program(2, y, t), l.hash = o, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.noop, l.data = t, f && typeof u === h ? i = u.call(e, s, l) : i = m.call(e, u, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function y(e, t) {
        var n = "",
            s, o, u, a;
        return t.buffer.push("\n    "), s = e, o = "views/tickets/markdown_toggle_view", u = {}, a = "controller", u.controllerBinding = a, f = r.view_module, a = f || e.view_module, l = {}, l.hash = u, l.contexts = [], l.contexts.push(s), l.data = t, typeof a === h ? s = a.call(e, o, l) : a === d ? s = p.call(e, "view_module", o, l) : s = a, t.buffer.push(v(s) + "\n    "), s = e, o = "parentView.controller.isWriting", u = r["if"], l = c.program(3, b, t), l.hash = {}, l.contexts = [], l.contexts.push(s), l.fn = l, l.inverse = c.program(5, w, t), l.data = t, s = u.call(e, o, l), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n    "), s = e, s = c.invokePartial(i["tickets.add_comment.attachment_buttons"], "tickets.add_comment.attachment_buttons", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n    "), s = e, s = c.invokePartial(i["tickets.add_comment.attachments"], "tickets.add_comment.attachments", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n    "), s = e, s = c.invokePartial(i["tickets.add_comment.screencasts"], "tickets.add_comment.screencasts", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/tickets/comments/labeled_comment_text_area", o = {}, u = "ticket_fields.description.label", o.i18nLabel = u, u = "content.comment.body", o.valueBinding = u, u = "controller", o.controllerBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n    "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <label>"), i = e, s = "ticket_fields.description.label", f = r.t, o = f || e.t, l = {}, l.hash = {}, l.contexts = [], l.contexts.push(i), l.data = t, typeof o === h ? i = o.call(e, s, l) : o === d ? i = p.call(e, "t", s, l) : i = o, t.buffer.push(v(i) + "</label>\n      "), i = e, s = "views/tickets/markdown_preview_view", o = {}, u = "parentView.controller", o.controllerBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n    "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression,
        m = r.blockHelperMissing;
    return u = {}, a = "ticket section new_ticket", u["class"] = a, a = "workspace.ticket.isNew", u.isVisibleBinding = a, a = "controller", u.controllerBinding = a, f = r.view, a = f || n.view, l = c.program(1, g, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("tickets.pane.notices", Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="notice archived">\n    <p>'), i = e, s = "txt.ticket.archived.notice", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</p>\n  </div>\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="notice followup">\n    <p>'), i = e, s = "workspace.ticket.related.followupSourceNotice", l = r._triageMustache, o = l || e._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "_triageMustache", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</p>\n  </div>\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="notice followup">\n    <p>'), i = e, s = "workspace.ticket.related.followupTicketNotice", l = r._triageMustache, o = l || e._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "_triageMustache", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</p>\n  </div>\n"), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="notice shared">\n    '), i = e, s = "workspace.ticket.related.sharedNotice", l = r._triageMustache, o = l || e._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "_triageMustache", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  </div>\n"), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/tickets/satisfaction_notice_view", o = {}, u = "notice satisfaction", o["class"] = u, u = "workspace.ticket.related.satisfaction", o.satisfactionBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(10, x, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "txt.satisfaction.score.current", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + " <span "), i = {}, s = "ratingClassName", i["class"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">"), i = e, s = "ratingLabel", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + '</span>\n    <p class="pre">'), i = e, s = "comment", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</p>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return u = n, a = "workspace.ticket.related.fromArchive", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "workspace.ticket.related.followupSourceNotice", f = r["if"], c = h.program(3, b, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "workspace.ticket.related.followupTicketNotice", f = r["if"], c = h.program(5, w, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "workspace.ticket.related.sharedNotice", f = r["if"], c = h.program(7, E, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "workspace.ticket.related.satisfaction.offered", f = r["if"], c = h.program(9, S, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("tickets.pane.properties", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <label for="'), i = e, s = "fieldID", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">\n      '), i = e, s = "hintedLabelText", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "\n      "), i = e, s = "views/tickets/ticket_fields/cc_me_view", o = {}, u = "info", o["class"] = u, u = "workspace.ticket", o.ticketBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(2, w, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </label>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n        "), i = e, s = "txt.ticket_cc_me", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/tickets/ticket_fields/organizations_select_view", o = {}, u = "form_field", o["class"] = u, u = "workspace.ticketController", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(5, S, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <label for="'), i = e, s = "fieldID", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">\n        '), i = e, s = "txt.users.edit.organization", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </label>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="property_box">\n\n  '), u = n, a = "views/tickets/ticket_fields/requester_view", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + "\n\n  "), u = n, a = "views/tickets/ticket_fields/assignee/assignee_view", f = {}, l = "form_field", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n  "), u = n, a = "views/tickets/ticket_fields/collaborators_view", f = {}, l = "form_field", f["class"] = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "view.shouldShowOrganizationField", f = r["if"], h = p.program(4, E, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/tickets/ticket_fields/linked_agreements_view", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + "\n\n</div>\n\n"), u = n, a = "views/tickets/ticket_fields/ticket_property_collection_view", f = {}, l = "ticketFields", f.contentBinding = l, c = r.collection_module, l = c || n.collection_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "collection_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
})), Ember.TEMPLATES["templates/tickets/reload_apps"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="action_buttons">\n  <button '), u = n, a = "reloadApps", f = {}, l = "parentView", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ' tabindex="-1" class="action_button reload_apps">\n    '), u = n, a = "apps.button.reload", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '<i class="icon-refresh"></i>\n  </button>\n</div>\n'), o
}), Ember.TEMPLATES["templates/tickets/section_toolbar"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/organizations/nav_item_view", o = {}, u = "organization", o.name = u, l = r.view_module, u = l || e.view_module, c = h.program(2, b, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "label", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/users/user_nav_item_view", o = {}, u = "user", o.name = u, l = r.view_module, u = l || e.view_module, c = h.program(5, E, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "label", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n  "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/section_toolbar/section_nav_item_view", o = {}, u = "ticket", o.name = u, u = "ticket.href", o.hrefBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(8, x, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = {}, s = "ticket_status_label toolbar", i["class"] = s, s = "workspace.ticket.statusName", i.classBinding = s, s = "span", i.tagName = s, s = "workspace.ticket", i.contentBinding = s, l = r.view, s = l || e.view, c = h.program(9, T, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n     "), i = e, s = "parentView.ticketName", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "\n  "), n
    }

    function T(e, t) {
        var n, i, s;
        n = e, i = "content.statusDisplayName", l = r.uppercase, s = l || e.uppercase, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(n), c.data = t, typeof s === p ? n = s.call(e, i, c) : s === v ? n = d.call(e, "uppercase", i, c) : n = s, t.buffer.push(m(n))
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/section_toolbar/section_nav_item_view", o = {}, u = "chat", o.name = u, u = "workspace.chatController.chatHref", o.hrefBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(12, C, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "type.via.chat", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n  "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/section_toolbar/section_nav_item_view", o = {}, u = "incidents", o.name = u, u = "ticket.incidentsUrl", o.hrefBinding = u, u = "incidents", o["class"] = u, l = r.view_module, u = l || e.view_module, c = h.program(15, L, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function L(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "txt.ticket.incidents.label", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + " ("), i = e, s = "parentView.incidentsTotalHeader", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + ")\n  "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="msg">'), i = e, s = "workspace.ticket.incidentNotice", l = r._triageMustache, o = l || e._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "_triageMustache", s, c) : i = o, (i || i === 0) && t.buffer.push(i), t.buffer.push("</div>\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return u = n, a = "shouldShowOrganization", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "shouldShowUser", f = r["if"], c = h.program(4, w, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "shouldShowTicket", f = r["if"], c = h.program(7, S, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "shouldShowChat", f = r["if"], c = h.program(11, N, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "shouldShowIncidents", f = r["if"], c = h.program(14, k, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "shouldShowProblem", f = r["if"], c = h.program(17, A, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/tickets/suspended_recovery_fail_notification"] = Handlebars.template(function (e, t, n, r, i) {
    function m(e, t) {
        var r = "",
            i;
        r += "\n    <li>\n      <em><strong>", a = n.subject, i = a || e.subject, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "subject", {
            hash: {}
        })), r += d(i) + "</strong></em>\n      <div>", a = n.error_messages, i = a || e.error_messages, f = l.program(2, g, t), f.hash = {}, f.fn = f, f.inverse = l.noop, a && typeof i === c ? i = i.call(e, f) : i = v.call(e, i, f);
        if (i || i === 0) r += i;
        return r += "</div>\n    </li>\n  ", r
    }

    function g(e, t) {
        var n = "",
            r;
        return n += "<p>", r = e, typeof r === c ? r = r.call(e, {
            hash: {}
        }) : r === p && (r = h.call(e, "this", {
            hash: {}
        })), n += d(r) + "</p>", n
    }

    function y(e, t) {
        var r = "",
            i;
        return r += "\n    <li><em><strong>", a = n.othersMessage, i = a || e.othersMessage, typeof i === c ? i = i.call(e, {
            hash: {}
        }) : i === p && (i = h.call(e, "othersMessage", {
            hash: {}
        })), r += d(i) + "</strong></em></li>\n  ", r
    }
    n = n || e.helpers;
    var s = "",
        o, u, a, f, l = this,
        c = "function",
        h = n.helperMissing,
        p = void 0,
        d = this.escapeExpression,
        v = n.blockHelperMissing;
    s += "<p><strong>", a = n.headerMessage, o = a || t.headerMessage, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "headerMessage", {
        hash: {}
    })), s += d(o) + '</strong></p>\n\n<ul class="unstyled recovery_notification">\n  ', a = n.tickets, o = a || t.tickets, f = l.program(1, m, i), f.hash = {}, f.fn = f, f.inverse = l.noop, a && typeof o === c ? o = o.call(t, f) : o = v.call(t, o, f);
    if (o || o === 0) s += o;
    s += "\n\n  ", a = n.othersMessage, o = a || t.othersMessage, u = n["if"], f = l.program(4, y, i), f.hash = {}, f.fn = f, f.inverse = l.noop, o = u.call(t, o, f);
    if (o || o === 0) s += o;
    return s += "\n</ul>\n\n<p><strong>", a = n.footerMessage, o = a || t.footerMessage, typeof o === c ? o = o.call(t, {
        hash: {}
    }) : o === p && (o = h.call(t, "footerMessage", {
        hash: {}
    })), s += d(o) + "</strong></p>\n", s
}), Ember.TEMPLATES["templates/tickets/ticket_fields/add_to_calendar_link"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<a "), u = {}, a = "ticketLink", u.href = a, l = r.bindAttr, a = l || n.bindAttr, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "bindAttr", c) : u = a, s.buffer.push(m(u) + ' target="_blank"> '), u = n, a = "txt.views.tickets._sub_header.add_to_calendar", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + " </a>\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/assignee_view"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "txt.ticket_assign_to_me", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<label for="'), u = n, a = "fieldID", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '">\n  '), u = n, a = "hintedLabelText", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n  "), u = n, a = "views/tickets/ticket_fields/assignee/take_it_view", f = {}, l = "info", f["class"] = l, l = "workspace.ticket", f.ticketBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</label>\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/due_date_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<label for="'), u = n, a = "fieldID", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '">'), u = n, a = "hintedLabelText", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + " "), u = n, a = "addToCalendarView", c = r.view, f = c || n.view, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view", a, h) : u = f, s.buffer.push(g(u) + " </label>\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/labeled_ticket_checkbox_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return u = n, a = "view.FieldView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u)), u = n, a = "view.LabelView", l = r.view, f = l || n.view, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view", a, c) : u = f, s.buffer.push(m(u) + "\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/status_dropdown_menu_item_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0;
    return u = n, a = "view.escapedLabel", l = r._triageMustache, f = l || n._triageMustache, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "_triageMustache", a, c) : u = f, (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/status_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push("<button "), u = n, a = "save", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = "disabled", u.disabled = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ' class="save btn btn-inverse">\n  '), u = n, a = "view.buttonLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n  <span class="next_on">\n    <i class="play_icon icon-forward icon-white"></i>\n    <i class="next_icon icon-chevron-right icon-white"></i>\n  </span>\n</button>\n\n<button '), u = {}, a = "disabledDropdown", u.disabled = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ' data-toggle="dropdown" class="btn btn-inverse dropdown-toggle">\n  <span class="caret"></span>\n</button>\n\n'), u = n, a = "view.DropdownMenuView", f = {}, l = "statusController", f.contentBinding = l, c = r.view, l = c || n.view, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/ticket_date_view"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<label for="'), u = n, a = "fieldID", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '">'), u = n, a = "hintedLabelText", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + " </label>\n"), o
}), Ember.TEMPLATES["templates/tickets/ticket_fields/ticket_property_field"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<label for="'), u = n, a = "fieldID", c = r.unbound, f = c || n.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "unbound", a, h) : u = f, s.buffer.push(g(u) + '">\n  '), u = n, a = "hintedLabelText", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + "\n</label>\n"), o
}), Ember.TEMPLATES["templates/tickets/workspace"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n  "), i = e, s = "views/tickets/incidents_view", o = {}, u = "ticketWorkspace.incidents", o.name = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/tickets/ticket_view", f = {}, l = "workspace.ticketController", f.controllerBinding = l, l = "workspace", f.delegateBinding = l, l = "ticketWorkspace.ticket", f.name = l, l = "ticket", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = n, a = "views/users/user_view", f = {}, l = "workspace.userController", f.controllerBinding = l, l = "workspace", f.delegateBinding = l, l = "ticketWorkspace.requester", f.name = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), u = n, a = "views/organizations/organization_view", f = {}, l = "workspace.organizationController", f.controllerBinding = l, l = "workspace", f.delegateBinding = l, l = "ticketWorkspace.organization", f.name = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = n, a = "workspace.ticket.hasIncidents", f = r["if"], h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/users/devices_view"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <tr class="empty_set">\n      <td>\n        '), i = e, s = "lib/views/text_field_editable_view", o = {}, u = "name", o.valueBinding = u, u = "this", o.modelBinding = u, u = "editable", o["class"] = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n      </td>\n      <td>"), i = e, s = "location", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</td>\n      <td>"), i = e, s = "lastActiveAt", o = {}, u = "true", o.relative = u, u = "true", o.live = u, c = r.timestamp, u = c || e.timestamp, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "timestamp", s, h) : i = u, t.buffer.push(g(i) + "</td>\n      <td>\n        "), i = e, s = "current", o = r["if"], h = p.program(2, b, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(4, w, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      </td>\n    </tr>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <span class="disabled _tooltip" '), i = {}, s = "this.removeTooltip", i.title = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = {}, s = "title", i["data-original-title"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " >"), i = e, s = "txt.user.section.devices_list_remove", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span>\n        "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n          <a class="_tooltip" '), i = {}, s = "this.removeTooltip", i.title = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = {}, s = "title", i["data-original-title"] = s, c = r.bindAttr, s = c || e.bindAttr, h = {}, h.hash = i, h.contexts = [], h.data = t, typeof s === d ? i = s.call(e, h) : s === m ? i = v.call(e, "bindAttr", h) : i = s, t.buffer.push(g(i) + " "), i = e, s = "removeDevice", c = r.actionWithEvent, o = c || e.actionWithEvent, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "actionWithEvent", s, h) : i = o, t.buffer.push(g(i) + ">"), i = e, s = "txt.user.section.devices_list_remove", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a>\n        "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <tr class="no_devices_message">\n      <td colspan="4">'), i = e, s = "txt.user.section.devices_list_no_remembered_devices", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</td>\n    </tr>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return s.buffer.push('<div class="heading">\n  <h4 class="list-heading">'), u = n, a = "txt.user.section.devices", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + ' <i class="icon-loading-spinner"></i></h4>\n  <p>'), u = n, a = "txt.user.section.devices_description", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</p>\n</div>\n\n<div class="email_notifications">\n  <h4 class="list-heading">'), u = n, a = "txt.user.section.devices_email_notifications", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '</h4>\n\n  <div class="btn-group">\n    <a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#" '), u = {}, a = "controller.working", u.disabled = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ">\n      "), u = n, a = "view.deviceNotificationLabel", f = {}, l = "true", f.escaped = l, c = r._triageMustache, l = c || n._triageMustache, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "_triageMustache", a, h) : u = l, s.buffer.push(g(u) + '\n      <span class="caret"></span>\n    </a>\n\n    <ul class="dropdown-menu pull-right">\n      <li><a '), u = n, a = "turnOnDeviceNotification", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n        "), u = n, a = "txt.user.section.devices_email_notifications_dropdown_on", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n      </a></li>\n      <li><a "), u = n, a = "turnOffDeviceNotification", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + ">\n        "), u = n, a = "txt.user.section.devices_email_notifications_dropdown_off", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n      </a></li>\n    </ul>\n  </div>\n</div>\n\n<div class="clear"></div>\n\n<table class="filter_tickets">\n  <thead>\n    <tr class="empty_set"><th>'), u = n, a = "txt.user.section.devices_list_name", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</th><th>"), u = n, a = "txt.user.section.devices_list_location", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</th><th>"), u = n, a = "txt.user.section.devices_list_activity", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</th><th>&nbsp;</th></tr>\n  </thead>\n  <tbody>\n  "), u = n, a = "controller.content", f = r.each, h = p.program(1, y, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(6, E, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </tbody>\n</table>\n"), o
}), Ember.TEMPLATES["templates/users/pane"] = Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            s, o, u, a;
        return t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.mast"], "users.pane.mast", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.assigned_tickets"], "users.pane.assigned_tickets", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.tickets"], "users.pane.tickets", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.ccs"], "users.pane.ccs", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.topics"], "users.pane.topics", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.topic_comments"], "users.pane.topic_comments", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.votes"], "users.pane.votes", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, s = p.invokePartial(i["users.pane.subscriptions"], "users.pane.subscriptions", s, r, i, t), (s || s === 0) && t.buffer.push(s), t.buffer.push("\n  "), s = e, o = "views/users/devices_view", u = {}, a = "controller.devicesController", u.controllerBinding = a, c = r.view_module, a = c || e.view_module, h = {}, h.hash = u, h.contexts = [], h.contexts.push(s), h.data = t, typeof a === d ? s = a.call(e, o, h) : a === m ? s = v.call(e, "view_module", o, h) : s = a, t.buffer.push(g(s) + "\n  "), s = e, o = "views/users/tokens_view", u = {}, a = "controller.tokensController", u.controllerBinding = a, c = r.view_module, a = c || e.view_module, h = {}, h.hash = u, h.contexts = [], h.contexts.push(s), h.data = t, typeof a === d ? s = a.call(e, o, h) : a === m ? s = v.call(e, "view_module", o, h) : s = a, t.buffer.push(g(s) + "\n\n"), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("<header>\n  <div class='pane left'>\n    "), u = n, a = "views/section_toolbar/section_toolbar_view", f = {}, l = "delegate", f.delegateBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n  </div>\n  <div class="pane right">\n    <button '), u = n, a = "toggleApps", f = {}, l = "Zendesk.appsController", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + " "), u = {}, a = ":origin :btn Zd.appsController.isActive:active", u["class"] = a, c = r.bindAttr, a = c || n.bindAttr, h = {}, h.hash = u, h.contexts = [], h.data = s, typeof a === d ? u = a.call(n, h) : a === m ? u = v.call(n, "bindAttr", h) : u = a, s.buffer.push(g(u) + ' tabindex="-1">\n    '), u = n, a = "apps.button.toggle", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "\n    </button>\n  </div>\n</header>\n\n<div class='pane left section'>\n  "), u = n, u = p.invokePartial(i["users.pane.properties"], "users.pane.properties", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n\n"), u = {}, a = "pane right section", u["class"] = a, a = "Zendesk.appsController.isActive:with_apps_pane", u.classBinding = a, a = "controller.section", u.activeChildNameBinding = a, a = "controller", u.controllerBinding = a, c = r.view, a = c || n.view, h = p.program(1, b, s), h.hash = u, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = s, c && typeof a === d ? u = a.call(n, h) : u = y.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/users/user_app_container_view", f = {}, l = "apps", f["class"] = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
}), Ember.Handlebars.registerPartial("users.pane.assigned_tickets", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "controller.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.filter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = e, s = "views/filters/ticket_list_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "assigned_tickets", f.name = l, l = "pane_body section", f["class"] = l, l = "controller.filter.tickets.isFetching:working", f.classBinding = l, l = "parentView.controller.assignedTicketsController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.ccs", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "controller.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.filter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = e, s = "views/filters/ticket_list_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "ccs", f.name = l, l = "pane_body section", f["class"] = l, l = "controller.filter.tickets.isFetching:working", f.classBinding = l, l = "parentView.controller.ccdTicketsController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.identities", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.email", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = {}, s = "user.emailIdentities", i.contentBinding = s, s = "content.primary:primary content.verified", i.itemClassBinding = s, s = "value", i["class"] = s, s = "item email", i.itemClass = s, c = r.collection, s = c || e.collection, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <span data-identity-id="'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" title="'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span>\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.google", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = {}, s = "user.googleIdentities", i.contentBinding = s, s = "content.primary:primary content.verified", i.itemClassBinding = s, s = "value", i["class"] = s, s = "item email", i.itemClass = s, c = r.collection, s = c || e.collection, h = p.program(5, S, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <span data-identity-id="'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" title="'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span>\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.twitter", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = {}, s = "user.twitterIdentities", i.contentBinding = s, s = "value", i["class"] = s, s = "item", i.itemClass = s, c = r.collection, s = c || e.collection, h = p.program(8, T, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <span data-identity-id="'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" title="@'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">@'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span>\n      "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.facebook", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = {}, s = "user.facebookIdentities", i.contentBinding = s, s = "value", i["class"] = s, s = "item", i.itemClass = s, s = "user", i.userBinding = s, c = r.collection, s = c || e.collection, h = p.program(11, C, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <span data-identity-id="'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" title="'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "parentView.user.name", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span>\n      "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.openid", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = {}, s = "user.openIdIdentities", i.contentBinding = s, s = "value", i["class"] = s, s = "item", i.itemClass = s, c = r.collection, s = c || e.collection, h = p.program(14, L, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n  "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <span data-identity-id="'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" title="'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span>\n      "), n
    }

    function A(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property identities">\n      <label>&nbsp;</label>\n      <span class="command">'), i = e, s = "txt.identities.action.add_contact", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</span>\n    </div>\n  "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "newContactLabel", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "twitterType", o = r["if"], h = p.program(19, M, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), i = e, s = "views/users/identities/add_identity_text_field_view", o = {}, u = "controller.value", o.valueBinding = u, u = "identity-field", o["class"] = u, u = "controller.isTwitter:twitter", o.classBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    </div>\n  "), n
    }

    function M(e, t) {
        t.buffer.push('<span class="identity-twitter-label">@</span>')
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push('<div class="property identities delim">\n  '), u = n, a = "views/users/identities/identity_view", f = {}, l = "user.emailIdentities", f.identitiesBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/users/identities/identity_view", f = {}, l = "user.googleIdentities", f.identitiesBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(4, E, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/users/identities/identity_view", f = {}, l = "user.twitterIdentities", f.identitiesBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(7, x, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/users/identities/identity_view", f = {}, l = "user.facebookIdentities", f.identitiesBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(10, N, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/users/identities/identity_view", f = {}, l = "user.openIdIdentities", f.identitiesBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(13, k, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  <!-- Phone should be part of identities -->\n  "), u = n, a = "views/users/identities/phone_identity_view", c = r.view_module, f = c || n.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "view_module", a, h) : u = f, s.buffer.push(g(u) + "\n\n  "), u = n, a = "views/users/identities/command_view", f = {}, l = "addContact", f.commandId = l, c = r.view_module, l = c || n.view_module, h = p.program(16, A, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/users/identities/add_identity_form_view", c = r.view_module, f = c || n.view_module, h = p.program(18, O, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n</div>\n"), o
})), Ember.Handlebars.registerPartial("users.pane.mast", Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n\n  "), i = e, s = "parentView.controller.userPhotoController.canEditPhoto", o = r["if"], l = c.program(2, y, t), l.hash = {}, l.contexts = [], l.contexts.push(i), l.fn = l, l.inverse = c.program(4, b, t), l.data = t, i = o.call(e, s, l), (i || i === 0) && t.buffer.push(i), t.buffer.push('\n\n  <div class="editable">\n    '), i = e, s = "lib/views/text_field_editable_view", o = {}, u = "controller.user.name", o.valueBinding = u, u = "controller.user", o.modelBinding = u, u = "controller.user.userPermissions.notEditProperties", o.disabledBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n  </div>\n\n  "), i = e, s = "delegate.navigationItems", o = {}, u = "sub_nav", o["class"] = u, f = r.navbar, u = f || e.navbar, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "navbar", s, l) : i = u, t.buffer.push(v(i) + "\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/users/editable_photo_view", o = {}, u = "parentView.controller", o.controllerBinding = u, u = "controller.user", o.userBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/users/photo_view", o = {}, u = "controller.user", o.userBinding = u, f = r.view_module, u = f || e.view_module, l = {}, l.hash = o, l.contexts = [], l.contexts.push(i), l.data = t, typeof u === h ? i = u.call(e, s, l) : u === d ? i = p.call(e, "view_module", s, l) : i = u, t.buffer.push(v(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression,
        m = r.blockHelperMissing;
    return s.buffer.push("\n"), u = {}, a = "parentView.controller", u.controllerBinding = a, a = "parentView.delegate", u.delegateBinding = a, a = "mast", u["class"] = a, f = r.view, a = f || n.view, l = c.program(1, g, s), l.hash = u, l.contexts = [], l.fn = l, l.inverse = c.noop, l.data = s, f && typeof a === h ? u = a.call(n, l) : u = m.call(n, a, l), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.properties", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n  <div class="property_alert alert alert-error">\n    '), i = e, s = "txt.admin.javascripts.users_show.user_suspended_banner", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n  </div>\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.users.edit.agent_forwarding", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = {}, s = "agentForwardingIdentities", i.contentBinding = s, s = "value", i["class"] = s, s = "item", i.itemClass = s, c = r.collection, s = c || e.collection, h = p.program(4, E, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), i = e, s = "agentForwardingIdentities", o = r.unless, h = p.program(6, S, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "content.value", c = r.getFlagByPhoneNumber, o = c || e.getFlagByPhoneNumber, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "getFlagByPhoneNumber", s, h) : i = o, t.buffer.push(g(i) + '\n      <span class="number" data-identity-id="'), i = e, s = "content.id", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '" title="'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + '">'), i = e, s = "content.value", c = r.unbound, o = c || e.unbound, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "unbound", s, h) : i = o, t.buffer.push(g(i) + "</span>\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <a class="link" href="#" '), i = e, s = "addForwardingNumber", c = r.action, o = c || e.action, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "action", s, h) : i = o, t.buffer.push(g(i) + ' onclick="return false;">\n        '), i = e, s = "txt.users.edit.add_forwarding_number", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n      </a>\n    "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "lib/views/popover_view", o = {}, u = "property", o["class"] = u, u = "help.user.tags.title", o.titleI18n = u, u = "help.user.tags.content", o.contentI18n = u, u = "user", o.userBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(9, T, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.users.edit.tags", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "views/users/properties/tags_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "views/users/properties/multiple_organizations_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }

    function C(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "views/users/properties/single_organization_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }

    function k(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "lib/views/popover_view", o = {}, u = "property", o["class"] = u, u = "help.user.language.title", o.titleI18n = u, u = "help.user.language.content", o.contentI18n = u, c = r.view_module, u = c || e.view_module, h = p.program(16, L, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function L(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.users.edit.language", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "views/users/properties/locales_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function A(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n    "), i = {}, s = "property", i["class"] = s, s = "user", i.userBinding = s, c = r.view, s = c || e.view, h = p.program(19, O, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function O(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.users.edit.timezone", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n      "), i = e, s = "views/users/properties/time_zones_view", c = r.view_module, o = c || e.view_module, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "view_module", s, h) : i = o, t.buffer.push(g(i) + "\n    "), n
    }

    function M(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.users.edit.details", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = e, s = "views/users/properties/user_text_area", o = {}, u = "details", o.property = u, u = "user.details", o.valueBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function _(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <label>"), i = e, s = "txt.users.edit.notes", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</label>\n    "), i = e, s = "views/users/properties/user_text_area", o = {}, u = "notes", o.property = u, u = "user.notes", o.valueBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function D(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "txt.users.edit.external_id", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " "), i = e, s = "user.external_id", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</br>\n  "), n
    }

    function P(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "mergeUser", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.users.merge_user_link", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n        "), n
    }

    function H(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "resetUserPassword", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.users.reset_password.menu", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n        "), n
    }

    function B(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <a>"), i = e, s = "label", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + "</a>\n        "), n
    }

    function j(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li>\n          "), i = e, s = "views/users/suspension_button", o = {}, u = "controller", o.targetBinding = u, u = "unsuspendUser", o.action = u, u = "delegate.user", o.userBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(34, F, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          </li>\n        "), n
    }

    function F(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.admin.javascrips.users_show.unsusped_access_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          "), n
    }

    function I(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li>\n          "), i = e, s = "views/users/suspension_button", o = {}, u = "controller", o.targetBinding = u, u = "suspendUser", o.action = u, u = "delegate.user", o.userBinding = u, c = r.view_module, u = c || e.view_module, h = p.program(37, q, t), h.hash = o, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.noop, h.data = t, c && typeof u === d ? i = u.call(e, s, h) : i = y.call(e, u, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n          </li>\n        "), n
    }

    function q(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n            "), i = e, s = "txt.admin.javascrips.users_show.suspend_access_label", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n          "), n
    }

    function R(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li>\n            <a "), i = e, s = "assumeIdentity", o = {}, u = "controller", o.target = u, c = r.actionWithEvent, u = c || e.actionWithEvent, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "actionWithEvent", s, h) : i = u, t.buffer.push(g(i) + ">\n              "), i = e, s = "txt.users.assume_identity", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n            </a>\n          </li>\n        "), n
    }

    function U(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n          <li "), i = e, s = "deleteUser", o = {}, u = "controller", o.target = u, c = r.action, u = c || e.action, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "action", s, h) : i = u, t.buffer.push(g(i) + "><a>"), i = e, s = "txt.delete_asset", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "</a></li>\n        "), n
    }
    r = r || Ember.Handlebars.helpers, i = i || Ember.Handlebars.partials;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return s.buffer.push("\n"), u = n, a = "delegate.user.suspended", f = r["if"], h = p.program(1, b, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n"), u = n, a = "views/users/properties_role_view", f = {}, l = "user", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n<div class="property_box details">\n  '), u = n, u = p.invokePartial(i["users.pane.identities"], "users.pane.identities", u, r, i, s), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "views/users/identities/agent_forwarding_view", c = r.view_module, f = c || n.view_module, h = p.program(3, w, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof f === d ? u = f.call(n, a, h) : u = y.call(n, f, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "settings.has_user_tags", f = r["if"], h = p.program(8, x, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "view.features.hasMultipleOrganizations", f = r["if"], h = p.program(11, N, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(13, C, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "user.hasLanguageSelection", f = r["if"], h = p.program(15, k, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "settings.has_time_zone_selection", f = r["if"], h = p.program(18, A, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/popover_view", f = {}, l = "property", f["class"] = l, l = "help.people.details.title", f.titleI18n = l, l = "help.people.details.content2", f.contentI18n = l, l = "user", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(21, M, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "lib/views/popover_view", f = {}, l = "property", f["class"] = l, l = "help.people.notes.title", f.titleI18n = l, l = "help.people.notes.content2", f.contentI18n = l, l = "user", f.userBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(23, _, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n\n"), u = n, a = "views/custom_fields/custom_field_collection", f = {}, l = "user", f.targetBinding = l, l = "user", f.kind = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + '\n\n<div class="log">\n  '), u = n, a = "user.external_id", f = r["if"], h = p.program(25, D, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  "), u = n, a = "txt.users.show.created", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " "), u = n, a = "user.created_at", f = {}, l = "true", f.full = l, c = r.boundTimestamp, l = c || n.boundTimestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "boundTimestamp", a, h) : u = l, (u || u === 0) && s.buffer.push(u), s.buffer.push("</br>\n  "), u = n, a = "txt.users.show.updated", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " "), u = n, a = "user.updated_at", f = {}, l = "true", f.full = l, c = r.boundTimestamp, l = c || n.boundTimestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "boundTimestamp", a, h) : u = l, (u || u === 0) && s.buffer.push(u), s.buffer.push("</br>\n  "), u = n, a = "txt.users.show.last_login", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + " "), u = n, a = "user.last_login_at", f = {}, l = "true", f.full = l, c = r.boundTimestamp, l = c || n.boundTimestamp, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "boundTimestamp", a, h) : u = l, (u || u === 0) && s.buffer.push(u), s.buffer.push('\n</div>\n\n<footer>\n  <div class=\'pane left section\'>\n    <div class="dropup object_options">\n      <span class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n        '), u = n, a = "txt.user.actions.user_options", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + '\n        <b class="caret"></b>\n      </span>\n\n      <ul class="menu dropdown-menu">\n        <li '), u = n, a = "openNewTicket", f = {}, l = "controller", f.target = l, c = r.action, l = c || n.action, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "action", a, h) : u = l, s.buffer.push(g(u) + "><a>"), u = n, a = "txt.ticket.new", c = r.t, f = c || n.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(u), h.data = s, typeof f === d ? u = f.call(n, a, h) : f === m ? u = v.call(n, "t", a, h) : u = f, s.buffer.push(g(u) + "</a></li>\n        "), u = n, a = "delegate.user.userPermissions.mergeUser", f = r["if"], h = p.program(27, P, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n        "), u = n, a = "delegate.user.userPermissions.resetPassword", f = r["if"], h = p.program(29, H, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n        "), u = n, a = "views/users/update_password_button", f = {}, l = "controllerView.controller", f.target = l, l = "updatePassword", f.action = l, l = "controller", f.controllerBinding = l, l = "true", f.propagateEvents = l, l = "controller.canUpdatePassword", f.isVisibleBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(31, B, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n        "), u = n, a = "delegate.user.suspended", f = r["if"], h = p.program(33, j, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.program(36, I, s), h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n        "), u = n, a = "controller.shouldAllowAssumeIdentity", f = r["if"], h = p.program(39, R, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n        "), u = n, a = "delegate.user.userPermissions.deleteUser", f = r["if"], h = p.program(41, U, s), h.hash = {}, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, u = f.call(n, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n      </ul>\n    </div>\n  </div>\n</footer>\n"), o
})), Ember.Handlebars.registerPartial("users.pane.subscriptions", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "txt.user.section.subscriptions", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " ("), i = e, s = "controller.subscriptions.length", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = {}, s = "controller.subscriptions", i.contentBinding = s, s = "items", i["class"] = s, s = "ul", i.tagName = s, s = "li", i.itemTagName = s, c = r.collection, s = c || e.collection, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), i = {}, s = "controller.subscriptionsIsEmpty", i.isVisibleBinding = s, s = "empty_set", i["class"] = s, c = r.view, s = c || e.view, h = p.program(7, x, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "content.isForum", o = r["if"], h = p.program(3, E, t), h.hash = {}, h.contexts = [], h.contexts.push(i), h.fn = h, h.inverse = p.program(5, S, t), h.data = t, i = o.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/users/forum", o = {}, u = "content.forum", o.contentBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/users/topics", o = {}, u = "content.topic", o.contentBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n    "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "txt.user.section.subscriptions_none_full", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "subscriptions", f.name = l, l = "pane_body section", f["class"] = l, l = "parentView.controller", f.controllerBinding = l, l = "controller.subscriptions.isFetching:working", f.classBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.tickets", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "controller.title", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + " ("), i = e, s = "controller.filter.ticketCount", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = e, s = "views/filters/ticket_list_view", o = {}, u = "controller", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "tickets", f.name = l, l = "pane_body section", f["class"] = l, l = "controller.filter.tickets.isFetching:working", f.classBinding = l, l = "parentView.controller.requestedTicketsController", f.controllerBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.topic_comments", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "txt.user.section.topic_comments", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " ("), i = e, s = "controller.topicComments.total", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = {}, s = "controller.topicComments", i.contentBinding = s, s = "items", i["class"] = s, s = "ul", i.tagName = s, s = "li", i.itemTagName = s, c = r.collection, s = c || e.collection, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), i = {}, s = "controller.topicCommentsIsEmpty", i.isVisibleBinding = s, s = "empty_set", i["class"] = s, c = r.view, s = c || e.view, h = p.program(4, E, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), i = e, s = "lib/views/pagination", o = {}, u = "controller.topicCommentsController", o.controllerBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/users/topic_comments", o = {}, u = "content", o.contentBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "txt.user.section.topic_comments_none_full", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "topic_comments", f.name = l, l = "pane_body section", f["class"] = l, l = "parentView.controller", f.controllerBinding = l, l = "controller.topicComments.isFetching:working", f.classBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.topics", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "txt.user.section.topics", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " ("), i = e, s = "controller.topics.length", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = {}, s = "controller.topics", i.contentBinding = s, s = "items", i["class"] = s, s = "ul", i.tagName = s, s = "li", i.itemTagName = s, s = "content.forum.type.label", i.itemClassBinding = s, c = r.collection, s = c || e.collection, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), i = {}, s = "controller.topicsIsEmpty", i.isVisibleBinding = s, s = "empty_set", i["class"] = s, c = r.view, s = c || e.view, h = p.program(4, E, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/users/topics", o = {}, u = "content", o.contentBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "txt.user.section.topics_none_full", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "topics", f.name = l, l = "pane_body section", f["class"] = l, l = "parentView.controller", f.controllerBinding = l, l = "controller.topics.isFetching:working", f.classBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.Handlebars.registerPartial("users.pane.votes", Handlebars.template(function (t, n, r, i, s) {
    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n\n  <h4 class="list-heading">\n    '), i = e, s = "txt.user.section.votes", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + " ("), i = e, s = "controller.votes.length", o = {}, u = "true", o.escaped = u, c = r._triageMustache, u = c || e._triageMustache, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "_triageMustache", s, h) : i = u, t.buffer.push(g(i) + ')\n    <i class="icon-loading-spinner"></i>\n  </h4>\n\n  '), i = {}, s = "controller.votes", i.contentBinding = s, s = "items", i["class"] = s, s = "ul", i.tagName = s, s = "li", i.itemTagName = s, s = "content.forum.type.label", i.itemClassBinding = s, c = r.collection, s = c || e.collection, h = p.program(2, w, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n  "), i = {}, s = "controller.votesIsEmpty", i.isVisibleBinding = s, s = "empty_set", i["class"] = s, c = r.view, s = c || e.view, h = p.program(4, E, t), h.hash = i, h.contexts = [], h.fn = h, h.inverse = p.noop, h.data = t, c && typeof s === d ? i = s.call(e, h) : i = y.call(e, s, h), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n"), n
    }

    function w(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    "), i = e, s = "views/users/topic_votes", o = {}, u = "content", o.contentBinding = u, c = r.view_module, u = c || e.view_module, h = {}, h.hash = o, h.contexts = [], h.contexts.push(i), h.data = t, typeof u === d ? i = u.call(e, s, h) : u === m ? i = v.call(e, "view_module", s, h) : i = u, t.buffer.push(g(i) + "\n  "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "txt.user.section.votes_none_full", c = r.t, o = c || e.t, h = {}, h.hash = {}, h.contexts = [], h.contexts.push(i), h.data = t, typeof o === d ? i = o.call(e, s, h) : o === m ? i = v.call(e, "t", s, h) : i = o, t.buffer.push(g(i) + "\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression,
        y = r.blockHelperMissing;
    return u = n, a = "lib/lotus/swappable_view", f = {}, l = "votes", f.name = l, l = "pane_body section", f["class"] = l, l = "parentView.controller", f.controllerBinding = l, l = "controller.votes.isFetching:working", f.classBinding = l, c = r.view_module, l = c || n.view_module, h = p.program(1, b, s), h.hash = f, h.contexts = [], h.contexts.push(u), h.fn = h, h.inverse = p.noop, h.data = s, c && typeof l === d ? u = l.call(n, a, h) : u = y.call(n, l, a, h), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
})), Ember.TEMPLATES["templates/users/phone_identity_view"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div>\n      <span class="display_phone">'), i = e, s = "user.phone", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</span>\n    </div>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n    "), i = e, s = "user.hasDirectLine", o = r["if"], c = h.program(4, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.program(7, S, t), c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s;
        return t.buffer.push("\n      "), i = {}, s = "view.phoneIdentities", i.contentBinding = s, s = "value", i["class"] = s, s = "item", i.itemClass = s, l = r.collection, s = l || e.collection, c = h.program(5, E, t), c.hash = i, c.contexts = [], c.fn = c, c.inverse = h.noop, c.data = t, l && typeof s === p ? i = s.call(e, c) : i = g.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <span data-identity-id="'), i = e, s = "content.id", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + '" title="'), i = e, s = "content.value", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + '">\n          '), i = e, s = "content.label", l = r.unbound, o = l || e.unbound, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "unbound", s, c) : i = o, t.buffer.push(m(i) + "\n        </span>\n      "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      "), i = e, s = "views/users/identities/command_view", o = {}, u = "managePhone", o.commandId = u, u = "view", o["class"] = u, l = r.view_module, u = l || e.view_module, c = h.program(8, x, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div class="item">\n          <span class="command">'), i = e, s = "user.phone", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</span>\n        </div>\n      "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return s.buffer.push('<div class="property clearfix">\n  <label>'), u = n, a = "txt.users.edit.phone", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</label>\n\n  "), u = n, a = "view.displayPhoneNumber", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(3, b, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/users/photo"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c = this,
        h = "function",
        p = r.helperMissing,
        d = void 0,
        v = this.escapeExpression;
    return s.buffer.push('<img class="profile" '), u = {}, a = "view.user.profileImageUrl", u.src = a, f = r.bindAttr, a = f || n.bindAttr, l = {}, l.hash = u, l.contexts = [], l.data = s, typeof a === h ? u = a.call(n, l) : a === d ? u = p.call(n, "bindAttr", l) : u = a, s.buffer.push(v(u) + '/><i class="photo_badge"></i>\n'), o
}), Ember.TEMPLATES["templates/users/photo_editable"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <button "), i = e, s = "removePhoto", o = {}, u = "controller.userPhotoController", o.target = u, l = r.action, u = l || e.action, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "action", s, c) : i = u, t.buffer.push(m(i) + ">"), i = e, s = "help.user.photo_upload.menu_remove", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</button>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<a href="" class="dropdown-toggle" data-toggle="dropdown" tabindex="-1">\n  <img class="profile" '), u = {}, a = "controller.userPhotoController.user.profileImageUrl", u.src = a, l = r.bindAttr, a = l || n.bindAttr, c = {}, c.hash = u, c.contexts = [], c.data = s, typeof a === p ? u = a.call(n, c) : a === v ? u = d.call(n, "bindAttr", c) : u = a, s.buffer.push(m(u) + ' />\n\n  <span class="editable-indicator">\n    <span class="editable-background"></span>\n    <span class="editable-icon"></span>\n  </span>\n\n  <span class="loading-indicator" style="display:none">\n    <span class="loading-background"></span>\n    <span class="loading-icon"></span>\n  </span>\n  <i class="photo_badge"></i>\n</a>\n\n<ul class="dropdown-menu">\n  <li>\n    <div class="button">\n      <input type="file" name="user[photo][uploaded_data]" tabindex="-1"/>\n      '), u = n, a = "help.user.photo_upload.menu_upload", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "\n    </div>\n  </li>\n  <li>\n    "), u = n, a = "controller.userPhotoController.isNormalPhoto", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </li>\n</ul>\n"), o
}), Ember.TEMPLATES["templates/users/properties/multiple_organizations_view"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n    <div "), i = {}, s = ":item default:primary", i["class"] = s, s = "id", i["data-org-membership-id"] = s, l = r.bindAttr, s = l || e.bindAttr, c = {}, c.hash = i, c.contexts = [], c.data = t, typeof s === p ? i = s.call(e, c) : s === v ? i = d.call(e, "bindAttr", c) : i = s, t.buffer.push(m(i) + ">\n      <span>"), i = e, s = "organization.name", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</span>\n    </div>\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "views/users/properties/multiple_organizations_search_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n    "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n      <a class="link" href="#" '), i = e, s = "startAddingOrganization", l = r.actionWithEvent, o = l || e.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "actionWithEvent", s, c) : i = o, t.buffer.push(m(i) + ">\n        "), i = e, s = "txt.users.edit.add_organizationr", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "\n      </a>\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<label>"), u = n, a = "txt.users.edit.organization_abbreviated", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</label>\n<div class="organization-memberships value">\n  '), u = n, a = "view.organizationMemberships", f = r.each, c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push('\n\n  <span class="add-organization">\n    '), u = n, a = "view.addingOrganization", f = r["if"], c = h.program(3, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(5, b, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </span>\n</div>\n"), o
}), Ember.TEMPLATES["templates/users/properties/single_organization_view"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "views/users/properties/organizations_search_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n"), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n  "), i = e, s = "views/users/properties/organizations_select_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n"), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push("<label>"), u = n, a = "txt.users.edit.organization_abbreviated", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</label>\n"), u = n, a = "view.organizations.isPaginated", f = r["if"], c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(3, y, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n"), o
}), Ember.TEMPLATES["templates/users/properties_role"] = Handlebars.template(function (t, n, r, i, s) {
    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.access", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</label>\n      "), i = e, s = "views/users/properties/access/end_user_access_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n    </div>\n  "), n
    }

    function b(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <div class="property">\n      <label>'), i = e, s = "txt.users.edit.group", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</label>\n      "), i = e, s = "Zendesk.AgentGroupsView", l = r.collection, o = l || e.collection, c = h.program(4, w, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof o === p ? i = o.call(e, s, c) : i = g.call(e, o, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    </div>\n\n    "), i = e, s = "user.isAgentNotAdmin", o = r["if"], c = h.program(6, E, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    "), i = e, s = "lib/views/popover_view", o = {}, u = "property", o["class"] = u, u = "help.user.alias.title", o.titleI18n = u, u = "help.user.alias.content", o.contentI18n = u, u = "user", o.userBinding = u, u = "user.userPermissions.setAlias", o.isVisibleBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(10, T, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n\n    "), i = e, s = "lib/views/popover_view", o = {}, u = "property", o["class"] = u, u = "help.user.signature.title", o.titleI18n = u, u = "help.user.signature.content", o.contentI18n = u, u = "user", o.userBinding = u, l = r.view_module, u = l || e.view_module, c = h.program(12, N, t), c.hash = o, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, l && typeof u === p ? i = u.call(e, s, c) : i = g.call(e, u, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n  "), n
    }

    function w(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n         "), i = e, s = "content.name", l = r.u, o = l || e.u, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "u", s, c) : i = o, t.buffer.push(m(i) + "<br/>\n      "), n
    }

    function E(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push("\n      "), i = e, s = "view.showLegacyAgentAccessDropdown", o = r["if"], c = h.program(7, S, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n    "), n
    }

    function S(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n        <div class="property">\n          <label>'), i = e, s = "txt.users.edit.access", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</label>\n          "), i = e, s = "views/users/properties/access/agent_access_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + '\n        </div>\n\n        <div class="property">\n          <label>'), i = e, s = "txt.users.edit.agent_commenting", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</label>\n          "), i = e, s = "views/users/properties/access/agent_commenting_access_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n        </div>\n\n        "), i = e, s = "view.showAgentModerationAccessDropdown", o = r["if"], c = h.program(8, x, t), c.hash = {}, c.contexts = [], c.contexts.push(i), c.fn = c, c.inverse = h.noop, c.data = t, i = o.call(e, s, c), (i || i === 0) && t.buffer.push(i), t.buffer.push("\n      "), n
    }

    function x(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n        <div class="property">\n          <label>'), i = e, s = "view.agentModerationLabel", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</label>\n          "), i = e, s = "views/users/properties/access/agent_moderation_access_view", l = r.view_module, o = l || e.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "view_module", s, c) : i = o, t.buffer.push(m(i) + "\n        </div>\n        "), n
    }

    function T(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.users.edit.alias", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</label>\n      "), i = e, s = "views/users/properties/user_text_area", o = {}, u = "alias", o.property = u, u = "user.alias", o.valueBinding = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n    "), n
    }

    function N(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push("\n      <label>"), i = e, s = "txt.users.edit.signature", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</label>\n      "), i = e, s = "views/users/properties/user_text_area", o = {}, u = "signature", o.property = u, u = "user.signature", o.valueBinding = u, l = r.view_module, u = l || e.view_module, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "view_module", s, c) : i = u, t.buffer.push(m(i) + "\n    "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression,
        g = r.blockHelperMissing;
    return s.buffer.push('<div class="property_box details">\n  <div class="property delim">\n    <label>'), u = n, a = "txt.users.edit.role", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</label>\n    "), u = n, a = "views/users/properties/role_view", l = r.view_module, f = l || n.view_module, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "view_module", a, c) : u = f, s.buffer.push(m(u) + "\n  </div>\n\n  "), u = n, a = "view.showEndUserAccessRestriction", f = r["if"], c = h.program(1, y, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n\n  "), u = n, a = "user.isAgent", f = r["if"], c = h.program(3, b, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.noop, c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n</div>\n"), o
}), Ember.TEMPLATES["templates/users/tokens_view"] = Handlebars.template(function (t, n, r, i, s) {
    function g(e, t) {
        var n = "",
            i, s, o, u;
        return t.buffer.push('\n    <tr class="empty_set">\n      <td>'), i = e, s = "clientName", o = {}, u = "true", o.escaped = u, l = r._triageMustache, u = l || e._triageMustache, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "_triageMustache", s, c) : i = u, t.buffer.push(m(i) + "</td>\n      <td>"), i = e, s = "createdAt", o = {}, u = "true", o.relative = u, u = "true", o.live = u, l = r.timestamp, u = l || e.timestamp, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "timestamp", s, c) : i = u, t.buffer.push(m(i) + "</td>\n      <td>"), i = e, s = "usedAt", o = {}, u = "true", o.relative = u, u = "true", o.live = u, l = r.timestamp, u = l || e.timestamp, c = {}, c.hash = o, c.contexts = [], c.contexts.push(i), c.data = t, typeof u === p ? i = u.call(e, s, c) : u === v ? i = d.call(e, "timestamp", s, c) : i = u, t.buffer.push(m(i) + "</td>\n      <td><a "), i = e, s = "revokeToken", l = r.actionWithEvent, o = l || e.actionWithEvent, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "actionWithEvent", s, c) : i = o, t.buffer.push(m(i) + ">"), i = e, s = "txt.user.section.oauth_tokens_list_remove", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</a></td>\n    </tr>\n  "), n
    }

    function y(e, t) {
        var n = "",
            i, s, o;
        return t.buffer.push('\n    <tr class="no_tokens_message">\n      <td colspan="4">'), i = e, s = "txt.user.section.oauth_tokens_list_no_active_tokens", l = r.t, o = l || e.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(i), c.data = t, typeof o === p ? i = o.call(e, s, c) : o === v ? i = d.call(e, "t", s, c) : i = o, t.buffer.push(m(i) + "</td>\n    </tr>\n  "), n
    }
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h = this,
        p = "function",
        d = r.helperMissing,
        v = void 0,
        m = this.escapeExpression;
    return s.buffer.push('<div class="heading">\n  <h4 class="list-heading">'), u = n, a = "txt.user.section.oauth_tokens", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + ' <i class="icon-loading-spinner"></i></h4>\n  <p>'), u = n, a = "txt.user.section.oauth_tokens_description", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + '</p>\n</div>\n\n<table class="filter_tickets">\n  <thead>\n    <tr class="empty_set">\n      <th>'), u = n, a = "txt.user.section.oauth_tokens_list_name", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</th>\n      <th>"), u = n, a = "txt.user.section.oauth_tokens_list_created_at", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</th>\n      <th>"), u = n, a = "txt.user.section.oauth_tokens_list_activity", l = r.t, f = l || n.t, c = {}, c.hash = {}, c.contexts = [], c.contexts.push(u), c.data = s, typeof f === p ? u = f.call(n, a, c) : f === v ? u = d.call(n, "t", a, c) : u = f, s.buffer.push(m(u) + "</th>\n      <th>&nbsp;</th>\n    </tr>\n  </thead>\n  <tbody>\n  "), u = n, a = "controller.content", f = r.each, c = h.program(1, g, s), c.hash = {}, c.contexts = [], c.contexts.push(u), c.fn = c, c.inverse = h.program(3, y, s), c.data = s, u = f.call(n, a, c), (u || u === 0) && s.buffer.push(u), s.buffer.push("\n  </tbody>\n</table>\n"), o
}), Ember.TEMPLATES["templates/users/user_workspace"] = Handlebars.template(function (t, n, r, i, s) {
    r = r || Ember.Handlebars.helpers;
    var o = "",
        u, a, f, l, c, h, p = this,
        d = "function",
        v = r.helperMissing,
        m = void 0,
        g = this.escapeExpression;
    return u = n, a = "views/users/user_view", f = {}, l = "view.workspace.userController", f.controllerBinding = l, l = "view.workspace", f.delegateBinding = l, l = "userWorkspace.user", f.name = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n\n"), u = n, a = "views/organizations/organization_view", f = {}, l = "view.workspace.organizationController", f.controllerBinding = l, l = "view.workspace", f.delegateBinding = l, l = "userWorkspace.organization", f.name = l, c = r.view_module, l = c || n.view_module, h = {}, h.hash = f, h.contexts = [], h.contexts.push(u), h.data = s, typeof l === d ? u = l.call(n, a, h) : l === m ? u = v.call(n, "view_module", a, h) : u = l, s.buffer.push(g(u) + "\n"), o
});