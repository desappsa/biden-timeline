var script = {
  data() {
    return {
      endTime: new Date(2025, 0, 20),
      currentDate: new Date().toLocaleDateString(),
      currentYear: new Date().getFullYear(),
      countdown: {
        Years: 0,
        Months: 0,
        Days: 0,
        Hours: 0,
        Minutes: 0,
        Seconds: 0,
      },
      scrollY: 0
    };
  },
  methods: {
    updateCountdown() {
      const now = new Date();
      const remaining = this.endTime.getTime() - now.getTime();

      const totalSeconds = Math.floor(remaining / 1000);
      const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60));
      const months = Math.floor((totalSeconds % (365.25 * 24 * 60 * 60)) / (30.44 * 24 * 60 * 60));
      const days = Math.floor((totalSeconds % (30.44 * 24 * 60 * 60)) / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      this.countdown = {
        Years: years,
        Months: months,
        Days: days,
        Hours: hours,
        Minutes: minutes,
        Seconds: seconds,
      };
    },
    supportSite() {
      alert('¡Gracias por tu apoyo! Puedes contribuir vía Bitcoin.');
    },
    updateDate() {
      this.currentDate = new Date().toLocaleDateString();
      this.currentYear = new Date().getFullYear();
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    }
  },
  created() {
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
    setInterval(this.updateDate, 86400000);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "app" } }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "main",
      [
        _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [
          _c("section", { key: "timeline" }, [
            _c("h2", [_vm._v("Cuenta Regresiva del Mandato")]),
            _vm._v(" "),
            _c("div", { staticClass: "timeline-container" }, [
              _c(
                "div",
                {
                  staticClass: "timeline-item",
                  style: {
                    transform: "translateY(" + _vm.scrollY * 0.3 + "px)"
                  }
                },
                [
                  _c("h3", [_vm._v("Inicio del Mandato")]),
                  _vm._v(" "),
                  _c("p", [_vm._v("20 de enero de 2021")])
                ]
              ),
              _vm._v(" "),
              _c("img", {
                staticClass: "flag-image",
                style: { transform: "translateY(" + _vm.scrollY * 0.1 + "px)" },
                attrs: {
                  src:
                    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
                  alt: "Bandera de Estados Unidos"
                }
              }),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "timeline-item",
                  style: {
                    transform: "translateY(" + _vm.scrollY * 0.3 + "px)"
                  }
                },
                [
                  _c("h3", [_vm._v("Fin del Mandato")]),
                  _vm._v(" "),
                  _c("p", [_vm._v("20 de enero de 2025")])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "calculation" }, [
              _c("h2", [_vm._v("Cálculo del Tiempo Restante")]),
              _vm._v(" "),
              _c("p", [_vm._v("Año de Inicio: 2021")]),
              _vm._v(" "),
              _c("p", [_vm._v("Año de Fin: 2025")]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "countdown" },
                _vm._l(_vm.countdown, function(value, label) {
                  return _c(
                    "div",
                    { key: label, staticClass: "countdown-item" },
                    [
                      _c("span", { staticClass: "countdown-value" }, [
                        _vm._v(_vm._s(value))
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "countdown-label" }, [
                        _vm._v(_vm._s(label))
                      ])
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _c("p", [
                _c("strong", [
                  _vm._v(
                    "Tiempo Restante: " +
                      _vm._s(_vm.countdown.Years) +
                      " años, " +
                      _vm._s(_vm.countdown.Months) +
                      " meses, " +
                      _vm._s(_vm.countdown.Days) +
                      " días, " +
                      _vm._s(_vm.countdown.Hours) +
                      " horas, " +
                      _vm._s(_vm.countdown.Minutes) +
                      " minutos, y " +
                      _vm._s(_vm.countdown.Seconds) +
                      " segundos"
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "summary" }, [
              _c("p", [
                _vm._v(
                  "El presidente Joe Biden de Estados Unidos comenzó su mandato el 20 de enero de 2021. Su mandato actual está programado para finalizar el 20 de enero de 2025."
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "support" }, [
          _c("button", { on: { click: _vm.supportSite } }, [
            _vm._v("Apoyar el Mantenimiento del Sitio Web")
          ]),
          _vm._v(" "),
          _vm._m(1)
        ])
      ],
      1
    ),
    _vm._v(" "),
    _vm._m(2)
  ])
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("header", [
      _c("h1", [_vm._v("Gobierno del Presidente Joe Biden")])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "bitcoin-support" }, [
      _c("p", [_vm._v("Apoyo vía Bitcoin:")]),
      _vm._v(" "),
      _c("img", {
        attrs: {
          src:
            "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa&choe=UTF-8",
          alt: "Código QR Bitcoin"
        }
      })
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("footer", [
      _c("p", [
        _vm._v(
          "© 2024 Gobierno del Presidente Joe Biden | Creado por: Alex Macoy"
        )
      ])
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-58c75e0e_0", { source: "\nbody {\n  font-family: 'Roboto', sans-serif;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: linear-gradient(135deg, #3C3B6E, #FFF, #B22234); /* Colores de la bandera de Estados Unidos */\n  color: #000;\n  transition: background 0.5s;\n  animation: gradient 10s infinite;\n}\n@keyframes gradient {\n0% {\n    background: linear-gradient(135deg, #3C3B6E, #FFF, #B22234);\n}\n50% {\n    background: linear-gradient(135deg, #B22234, #FFF, #3C3B6E);\n}\n100% {\n    background: linear-gradient(135deg, #3C3B6E, #FFF, #B22234);\n}\n}\nheader {\n  background-color: #3C3B6E; /* Azul de la bandera de Estados Unidos */\n  color: #FFF;\n  text-align: center;\n  padding: 2rem;\n  font-size: 2.5rem;\n  letter-spacing: 0.1rem;\n  transition: background-color 0.5s, color 0.5s;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n  animation: headerAnim 10s infinite;\n}\n@keyframes headerAnim {\n0%, 100% {\n    background-color: #3C3B6E;\n}\n50% {\n    background-color: #B22234;\n}\n}\nmain {\n  flex: 1;\n  padding: 2rem 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  transition: padding 0.5s;\n  background: rgba(255, 255, 255, 0.9);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n  margin: 2rem;\n  animation: mainAnim 10s infinite;\n}\n@keyframes mainAnim {\n0%, 100% {\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n}\n50% {\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);\n}\n}\n.timeline-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.timeline-item {\n  background-color: #FFF; /* Blanco */\n  color: #B22234; /* Rojo */\n  margin: 1rem 0;\n  padding: 1rem;\n  border-radius: 20px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  width: 80%;\n  text-align: center;\n  transition: transform 0.3s;\n  animation: timelineItemAnim 10s infinite;\n}\n@keyframes timelineItemAnim {\n0%, 100% {\n    transform: scale(1);\n}\n50% {\n    transform: scale(1.1);\n}\n}\n.timeline-item:hover {\n  transform: scale(1.2);\n}\n.flag-image {\n  width: 150px;\n  height: auto;\n  margin: 20px;\n  animation: flagAnim 5s infinite;\n}\n@keyframes flagAnim {\n0%, 100% {\n    transform: rotate(0deg);\n}\n50% {\n    transform: rotate(360deg);\n}\n}\n.calculation {\n  background-color: #B22234; /* Rojo */\n  color: #FFF;\n  padding: 2rem;\n  border-radius: 20px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  margin: 2rem 0;\n  text-align: center;\n  animation: calculationAnim 10s infinite;\n}\n@keyframes calculationAnim {\n0%, 100% {\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n}\n50% {\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);\n}\n}\n.countdown {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n.countdown-item {\n  background-color: #3C3B6E; /* Azul */\n  padding: 1rem;\n  border-radius: 10px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  min-width: 100px;\n  text-align: center;\n  transition: transform 0.3s;\n  font-size: 2rem;\n  color: #FFF;\n  animation: countdownItemAnim 10s infinite;\n}\n@keyframes countdownItemAnim {\n0%, 100% {\n    transform: scale(1);\n}\n50% {\n    transform: scale(1.1);\n}\n}\n.countdown-item:hover {\n  transform: scale(1.2);\n}\n.countdown-value {\n  font-size: 3rem;\n  font-weight: bold;\n}\n.countdown-label {\n  font-size: 1.5rem;\n}\n.summary {\n  background-color: #FFF; /* Blanco */\n  color: #3C3B6E; /* Azul */\n  padding: 2rem;\n  border-radius: 20px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  text-align: justify;\n  animation: summaryAnim 10s infinite;\n}\n@keyframes summaryAnim {\n0%, 100% {\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n}\n50% {\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);\n}\n}\n.support {\n  margin-top: 2rem;\n}\n.support button {\n  padding: 1rem 2rem;\n  background-color: #B22234; /* Rojo */\n  color: white;\n  border: none;\n  cursor: pointer;\n  border-radius: 10px;\n  transition: background-color 0.3s, transform 0.3s;\n  font-size: 1rem;\n  animation: supportButtonAnim 10s infinite;\n}\n@keyframes supportButtonAnim {\n0%, 100% {\n    transform: scale(1);\n}\n50% {\n    transform: scale(1.1);\n}\n}\n.support button:hover {\n  background-color: #8b0000;\n  transform: scale(1.2);\n}\n.bitcoin-support {\n  text-align: center;\n  margin-top: 1rem;\n}\n.bitcoin-support img {\n  width: 150px;\n  height: auto;\n  animation: bitcoinAnim 5s infinite;\n}\n@keyframes bitcoinAnim {\n0%, 100% {\n    transform: scale(1);\n}\n50% {\n    transform: scale(1.1);\n}\n}\nfooter {\n  background-color: #3C3B6E; /* Azul */\n  color: #FFF;\n  text-align: center;\n  padding: 2rem;\n  font-size: 1rem;\n  letter-spacing: 0.1rem;\n  transition: background-color 0.5s, color 0.5s;\n  animation: footerAnim 10s infinite;\n}\n@keyframes footerAnim {\n0%, 100% {\n    background-color: #3C3B6E;\n}\n50% {\n    background-color: #B22234;\n}\n}\n@media (max-width: 768px) {\nmain {\n    padding: 1rem;\n}\n.timeline-item, .calculation, .summary {\n    width: 100%;\n}\n}\n.fade-enter-active, .fade-leave-active {\n  transition: opacity 1s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue"],"names":[],"mappings":";AAmHA;EACA,iCAAA;EACA,SAAA;EACA,UAAA;EACA,aAAA;EACA,sBAAA;EACA,iBAAA;EACA,2DAAA,EAAA,4CAAA;EACA,WAAA;EACA,2BAAA;EACA,gCAAA;AACA;AAEA;AACA;IACA,2DAAA;AACA;AACA;IACA,2DAAA;AACA;AACA;IACA,2DAAA;AACA;AACA;AAEA;EACA,yBAAA,EAAA,yCAAA;EACA,WAAA;EACA,kBAAA;EACA,aAAA;EACA,iBAAA;EACA,sBAAA;EACA,6CAAA;EACA,yCAAA;EACA,kCAAA;AACA;AAEA;AACA;IACA,yBAAA;AACA;AACA;IACA,yBAAA;AACA;AACA;AAEA;EACA,OAAA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,oCAAA;EACA,yCAAA;EACA,mBAAA;EACA,YAAA;EACA,gCAAA;AACA;AAEA;AACA;IACA,yCAAA;AACA;AACA;IACA,0CAAA;AACA;AACA;AAEA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;AACA;AAEA;EACA,sBAAA,EAAA,WAAA;EACA,cAAA,EAAA,SAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,yCAAA;EACA,UAAA;EACA,kBAAA;EACA,0BAAA;EACA,wCAAA;AACA;AAEA;AACA;IACA,mBAAA;AACA;AACA;IACA,qBAAA;AACA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,YAAA;EACA,YAAA;EACA,YAAA;EACA,+BAAA;AACA;AAEA;AACA;IACA,uBAAA;AACA;AACA;IACA,yBAAA;AACA;AACA;AAEA;EACA,yBAAA,EAAA,SAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,yCAAA;EACA,cAAA;EACA,kBAAA;EACA,uCAAA;AACA;AAEA;AACA;IACA,yCAAA;AACA;AACA;IACA,0CAAA;AACA;AACA;AAEA;EACA,aAAA;EACA,uBAAA;EACA,eAAA;EACA,SAAA;EACA,gBAAA;AACA;AAEA;EACA,yBAAA,EAAA,SAAA;EACA,aAAA;EACA,mBAAA;EACA,yCAAA;EACA,gBAAA;EACA,kBAAA;EACA,0BAAA;EACA,eAAA;EACA,WAAA;EACA,yCAAA;AACA;AAEA;AACA;IACA,mBAAA;AACA;AACA;IACA,qBAAA;AACA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,eAAA;EACA,iBAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,sBAAA,EAAA,WAAA;EACA,cAAA,EAAA,SAAA;EACA,aAAA;EACA,mBAAA;EACA,yCAAA;EACA,mBAAA;EACA,mCAAA;AACA;AAEA;AACA;IACA,yCAAA;AACA;AACA;IACA,0CAAA;AACA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;EACA,kBAAA;EACA,yBAAA,EAAA,SAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,mBAAA;EACA,iDAAA;EACA,eAAA;EACA,yCAAA;AACA;AAEA;AACA;IACA,mBAAA;AACA;AACA;IACA,qBAAA;AACA;AACA;AAEA;EACA,yBAAA;EACA,qBAAA;AACA;AAEA;EACA,kBAAA;EACA,gBAAA;AACA;AAEA;EACA,YAAA;EACA,YAAA;EACA,kCAAA;AACA;AAEA;AACA;IACA,mBAAA;AACA;AACA;IACA,qBAAA;AACA;AACA;AAEA;EACA,yBAAA,EAAA,SAAA;EACA,WAAA;EACA,kBAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EACA,6CAAA;EACA,kCAAA;AACA;AAEA;AACA;IACA,yBAAA;AACA;AACA;IACA,yBAAA;AACA;AACA;AAEA;AACA;IACA,aAAA;AACA;AAEA;IACA,WAAA;AACA;AACA;AAEA;EACA,sBAAA;AACA;AAEA;EACA,UAAA;AACA","file":"pen.vue","sourcesContent":["<template>\n  <div id=\"app\">\n    <header>\n      <h1>Gobierno del Presidente Joe Biden</h1>\n    </header>\n    <main>\n      <transition name=\"fade\" mode=\"out-in\">\n        <section key=\"timeline\">\n          <h2>Cuenta Regresiva del Mandato</h2>\n          <div class=\"timeline-container\">\n            <div class=\"timeline-item\" v-bind:style=\"{ transform: `translateY(${scrollY * 0.3}px)` }\">\n              <h3>Inicio del Mandato</h3>\n              <p>20 de enero de 2021</p>\n            </div>\n            <img src=\"https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg\" alt=\"Bandera de Estados Unidos\" class=\"flag-image\" v-bind:style=\"{ transform: `translateY(${scrollY * 0.1}px)` }\"/>\n            <div class=\"timeline-item\" v-bind:style=\"{ transform: `translateY(${scrollY * 0.3}px)` }\">\n              <h3>Fin del Mandato</h3>\n              <p>20 de enero de 2025</p>\n            </div>\n          </div>\n          <div class=\"calculation\">\n            <h2>Cálculo del Tiempo Restante</h2>\n            <p>Año de Inicio: 2021</p>\n            <p>Año de Fin: 2025</p>\n            <div class=\"countdown\">\n              <div v-for=\"(value, label) in countdown\" :key=\"label\" class=\"countdown-item\">\n                <span class=\"countdown-value\">{{ value }}</span>\n                <span class=\"countdown-label\">{{ label }}</span>\n              </div>\n            </div>\n            <p><strong>Tiempo Restante: {{ countdown.Years }} años, {{ countdown.Months }} meses, {{ countdown.Days }} días, {{ countdown.Hours }} horas, {{ countdown.Minutes }} minutos, y {{ countdown.Seconds }} segundos</strong></p>\n          </div>\n          <div class=\"summary\">\n            <p>El presidente Joe Biden de Estados Unidos comenzó su mandato el 20 de enero de 2021. Su mandato actual está programado para finalizar el 20 de enero de 2025.</p>\n          </div>\n        </section>\n      </transition>\n      <div class=\"support\">\n        <button @click=\"supportSite\">Apoyar el Mantenimiento del Sitio Web</button>\n        <div class=\"bitcoin-support\">\n          <p>Apoyo vía Bitcoin:</p>\n          <img src=\"https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa&choe=UTF-8\" alt=\"Código QR Bitcoin\"/>\n        </div>\n      </div>\n    </main>\n    <footer>\n      <p>&copy; 2024 Gobierno del Presidente Joe Biden | Creado por: Alex Macoy</p>\n    </footer>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      endTime: new Date(2025, 0, 20),\n      currentDate: new Date().toLocaleDateString(),\n      currentYear: new Date().getFullYear(),\n      countdown: {\n        Years: 0,\n        Months: 0,\n        Days: 0,\n        Hours: 0,\n        Minutes: 0,\n        Seconds: 0,\n      },\n      scrollY: 0\n    };\n  },\n  methods: {\n    updateCountdown() {\n      const now = new Date();\n      const remaining = this.endTime.getTime() - now.getTime();\n\n      const totalSeconds = Math.floor(remaining / 1000);\n      const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60));\n      const months = Math.floor((totalSeconds % (365.25 * 24 * 60 * 60)) / (30.44 * 24 * 60 * 60));\n      const days = Math.floor((totalSeconds % (30.44 * 24 * 60 * 60)) / (24 * 60 * 60));\n      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));\n      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);\n      const seconds = totalSeconds % 60;\n\n      this.countdown = {\n        Years: years,\n        Months: months,\n        Days: days,\n        Hours: hours,\n        Minutes: minutes,\n        Seconds: seconds,\n      };\n    },\n    supportSite() {\n      alert('¡Gracias por tu apoyo! Puedes contribuir vía Bitcoin.');\n    },\n    updateDate() {\n      this.currentDate = new Date().toLocaleDateString();\n      this.currentYear = new Date().getFullYear();\n    },\n    handleScroll() {\n      this.scrollY = window.scrollY;\n    }\n  },\n  created() {\n    this.updateCountdown();\n    setInterval(this.updateCountdown, 1000);\n    setInterval(this.updateDate, 86400000);\n    window.addEventListener('scroll', this.handleScroll);\n  },\n  beforeDestroy() {\n    window.removeEventListener('scroll', this.handleScroll);\n  }\n};\n</script>\n\n<style>\nbody {\n  font-family: 'Roboto', sans-serif;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: linear-gradient(135deg, #3C3B6E, #FFF, #B22234); /* Colores de la bandera de Estados Unidos */\n  color: #000;\n  transition: background 0.5s;\n  animation: gradient 10s infinite;\n}\n\n@keyframes gradient {\n  0% {\n    background: linear-gradient(135deg, #3C3B6E, #FFF, #B22234);\n  }\n  50% {\n    background: linear-gradient(135deg, #B22234, #FFF, #3C3B6E);\n  }\n  100% {\n    background: linear-gradient(135deg, #3C3B6E, #FFF, #B22234);\n  }\n}\n\nheader {\n  background-color: #3C3B6E; /* Azul de la bandera de Estados Unidos */\n  color: #FFF;\n  text-align: center;\n  padding: 2rem;\n  font-size: 2.5rem;\n  letter-spacing: 0.1rem;\n  transition: background-color 0.5s, color 0.5s;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n  animation: headerAnim 10s infinite;\n}\n\n@keyframes headerAnim {\n  0%, 100% {\n    background-color: #3C3B6E;\n  }\n  50% {\n    background-color: #B22234;\n  }\n}\n\nmain {\n  flex: 1;\n  padding: 2rem 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  transition: padding 0.5s;\n  background: rgba(255, 255, 255, 0.9);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n  margin: 2rem;\n  animation: mainAnim 10s infinite;\n}\n\n@keyframes mainAnim {\n  0%, 100% {\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);\n  }\n  50% {\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);\n  }\n}\n\n.timeline-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.timeline-item {\n  background-color: #FFF; /* Blanco */\n  color: #B22234; /* Rojo */\n  margin: 1rem 0;\n  padding: 1rem;\n  border-radius: 20px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  width: 80%;\n  text-align: center;\n  transition: transform 0.3s;\n  animation: timelineItemAnim 10s infinite;\n}\n\n@keyframes timelineItemAnim {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n\n.timeline-item:hover {\n  transform: scale(1.2);\n}\n\n.flag-image {\n  width: 150px;\n  height: auto;\n  margin: 20px;\n  animation: flagAnim 5s infinite;\n}\n\n@keyframes flagAnim {\n  0%, 100% {\n    transform: rotate(0deg);\n  }\n  50% {\n    transform: rotate(360deg);\n  }\n}\n\n.calculation {\n  background-color: #B22234; /* Rojo */\n  color: #FFF;\n  padding: 2rem;\n  border-radius: 20px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  margin: 2rem 0;\n  text-align: center;\n  animation: calculationAnim 10s infinite;\n}\n\n@keyframes calculationAnim {\n  0%, 100% {\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  }\n  50% {\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);\n  }\n}\n\n.countdown {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\n.countdown-item {\n  background-color: #3C3B6E; /* Azul */\n  padding: 1rem;\n  border-radius: 10px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  min-width: 100px;\n  text-align: center;\n  transition: transform 0.3s;\n  font-size: 2rem;\n  color: #FFF;\n  animation: countdownItemAnim 10s infinite;\n}\n\n@keyframes countdownItemAnim {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n\n.countdown-item:hover {\n  transform: scale(1.2);\n}\n\n.countdown-value {\n  font-size: 3rem;\n  font-weight: bold;\n}\n\n.countdown-label {\n  font-size: 1.5rem;\n}\n\n.summary {\n  background-color: #FFF; /* Blanco */\n  color: #3C3B6E; /* Azul */\n  padding: 2rem;\n  border-radius: 20px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  text-align: justify;\n  animation: summaryAnim 10s infinite;\n}\n\n@keyframes summaryAnim {\n  0%, 100% {\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  }\n  50% {\n    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);\n  }\n}\n\n.support {\n  margin-top: 2rem;\n}\n\n.support button {\n  padding: 1rem 2rem;\n  background-color: #B22234; /* Rojo */\n  color: white;\n  border: none;\n  cursor: pointer;\n  border-radius: 10px;\n  transition: background-color 0.3s, transform 0.3s;\n  font-size: 1rem;\n  animation: supportButtonAnim 10s infinite;\n}\n\n@keyframes supportButtonAnim {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n\n.support button:hover {\n  background-color: #8b0000;\n  transform: scale(1.2);\n}\n\n.bitcoin-support {\n  text-align: center;\n  margin-top: 1rem;\n}\n\n.bitcoin-support img {\n  width: 150px;\n  height: auto;\n  animation: bitcoinAnim 5s infinite;\n}\n\n@keyframes bitcoinAnim {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n\nfooter {\n  background-color: #3C3B6E; /* Azul */\n  color: #FFF;\n  text-align: center;\n  padding: 2rem;\n  font-size: 1rem;\n  letter-spacing: 0.1rem;\n  transition: background-color 0.5s, color 0.5s;\n  animation: footerAnim 10s infinite;\n}\n\n@keyframes footerAnim {\n  0%, 100% {\n    background-color: #3C3B6E;\n  }\n  50% {\n    background-color: #B22234;\n  }\n}\n\n@media (max-width: 768px) {\n  main {\n    padding: 1rem;\n  }\n\n  .timeline-item, .calculation, .summary {\n    width: 100%;\n  }\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity 1s;\n}\n\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;