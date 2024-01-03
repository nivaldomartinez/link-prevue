(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode('@import"https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600";.wrapper[data-v-5727b4dc]{overflow:auto;border-radius:7px;background-color:#fff;-webkit-box-shadow:0px 14px 32px 0px rgba(0,0,0,.15);-moz-box-shadow:0px 14px 32px 0px rgba(0,0,0,.15);box-shadow:0 14px 32px #00000026}.card-img[data-v-5727b4dc]{width:100%}.card-img img[data-v-5727b4dc]{width:100%;border-radius:7px 7px 0 0}img[data-v-5727b4dc]{vertical-align:middle;border-style:none}.card-info[data-v-5727b4dc]{border-radius:0 0 7px 7px;background-color:#fff}.card-text[data-v-5727b4dc]{width:80%;margin:0 auto;text-align:justify}.card-text h1[data-v-5727b4dc]{text-align:center;font-size:24px;color:#474747;margin:5px 0;font-family:Hind Siliguri,sans-serif}.card-text p[data-v-5727b4dc]{font-family:Hind Siliguri,sans-serif;color:#8d8d8d;font-size:15px;overflow:hidden;margin:0;text-align:center}.card-btn[data-v-5727b4dc]{margin:1em 0;position:relative;text-align:center}.card-btn a[data-v-5727b4dc]{border-radius:2em;font-family:Hind Siliguri,sans-serif;font-size:14px;letter-spacing:.1em;color:#fff;background-color:#ffa9be;padding:10px 20px;text-align:center;display:inline-block;text-decoration:none!important;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-ms-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.card-btn a[data-v-5727b4dc]:hover{background-color:#ff8fab}.spinner[data-v-5727b4dc]{margin-top:40%;margin-left:45%;height:28px;width:28px;animation:rotate-5727b4dc .8s infinite linear;border:5px solid #868686;border-right-color:transparent;border-radius:50%}@keyframes rotate-5727b4dc{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')),document.head.appendChild(a)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
function h(n, e, t, c, o, a, l, p) {
  var i = typeof n == "function" ? n.options : n;
  e && (i.render = e, i.staticRenderFns = t, i._compiled = !0), c && (i.functional = !0), a && (i._scopeId = "data-v-" + a);
  var r;
  if (l ? (r = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), o && o.call(this, s), s && s._registeredComponents && s._registeredComponents.add(l);
  }, i._ssrRegister = r) : o && (r = p ? function() {
    o.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), r)
    if (i.functional) {
      i._injectStyles = r;
      var _ = i.render;
      i.render = function(f, u) {
        return r.call(u), _(f, u);
      };
    } else {
      var d = i.beforeCreate;
      i.beforeCreate = d ? [].concat(d, r) : [r];
    }
  return {
    exports: n,
    options: i
  };
}
const v = {
  name: "link-prevue",
  props: {
    url: {
      type: String,
      default: ""
    },
    cardWidth: {
      type: String,
      default: "400px"
    },
    onButtonClick: {
      type: Function,
      default: void 0
    },
    showButton: {
      type: Boolean,
      default: !0
    },
    apiUrl: {
      type: String,
      default: "https://link-preview-api.nivaldo.workers.dev/preview"
    }
  },
  watch: {
    url: function() {
      this.response = null, this.getLinkPreview();
    }
  },
  created() {
    this.getLinkPreview();
  },
  data: function() {
    return {
      response: null,
      validUrl: !1
    };
  },
  methods: {
    viewMore: function() {
      this.onButtonClick !== void 0 ? this.onButtonClick(this.response) : window.open(this.url, "_blank").focus();
    },
    isValidUrl: function(n) {
      const e = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      return this.validUrl = e.test(n), this.validUrl;
    },
    getLinkPreview: function() {
      this.isValidUrl(this.url) && this.httpRequest(
        (n) => {
          this.response = n;
        },
        () => {
          this.response = null, this.validUrl = !1;
        }
      );
    },
    httpRequest: function(n, e) {
      fetch(`${this.apiUrl}?url=${this.url}`).then((t) => t.json()).then((t) => n(t)).catch(() => e());
    }
  }
};
var w = function() {
  var e = this, t = e._self._c;
  return t("div", [!e.response && e.validUrl ? t("div", { style: { width: e.cardWidth }, attrs: { id: "loader-container" } }, [e._t("loading", function() {
    return [t("div", { staticClass: "spinner" })];
  })], 2) : e._e(), e.response ? t("div", [e._t("default", function() {
    return [t("div", { staticClass: "wrapper", style: { width: e.cardWidth } }, [t("div", { staticClass: "card-img" }, [t("img", { attrs: { src: e.response.image } })]), t("div", { staticClass: "card-info" }, [t("div", { staticClass: "card-text" }, [t("h1", [e._v(e._s(e.response.title))]), t("p", [e._v(e._s(e.response.description))])]), t("div", { staticClass: "card-btn" }, [e.showButton ? t("a", { attrs: { href: "javascript:;" }, on: { click: e.viewMore } }, [e._v("View More")]) : e._e()])])])];
  }, { img: e.response.image, title: e.response.title, description: e.response.description, url: e.url })], 2) : e._e()]);
}, C = [], g = /* @__PURE__ */ h(
  v,
  w,
  C,
  !1,
  null,
  "5727b4dc",
  null,
  null
);
const k = g.exports;
export {
  k as default
};
