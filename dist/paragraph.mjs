(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-paragraph[data-placeholder]:empty:before{content:attr(data-placeholder);color:#707684;font-weight:400;opacity:0}.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:before{opacity:1}.codex-editor--toolbox-opened .ce-block:first-child .ce-paragraph[data-placeholder]:empty:before,.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:focus:before{opacity:0}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const l = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
function c(r) {
  const e = document.createElement("div");
  e.innerHTML = r.trim();
  const t = document.createDocumentFragment();
  return t.append(...Array.from(e.childNodes)), t;
}
const h = {
  tool: "header",
  regex: /^(#{1,6}) $/g,
  convert: (r, e) => {
    const t = e.match(r);
    return t && t.length > 0 ? { text: "", level: t[0].trim().length } : null;
  }
}, d = {
  tool: "delimiter"
};
/**
 * Base Paragraph Block for the Editor.js.
 * Represents a regular text block
 *
 * @author CodeX (team@codex.so)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 */
class a {
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }
  constructor({ data: e, config: t, api: n, readOnly: s }) {
    this.api = n, this.readOnly = s, this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph"
    }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : a.DEFAULT_PLACEHOLDER, this._data = e != null ? e : {}, this._element = null, this._preserveBlank = t.preserveBlank !== void 0 ? t.preserveBlank : !1, this.commands = t.commands || [];
  }
  onKeyUp(e) {
    if (e.code !== "Backspace" && e.code !== "Delete") {
      try {
        this.dispatcherCommand(this._element.innerHTML);
      } catch (n) {
        console.warn("auto convert failed", n);
      }
      return;
    }
    const { textContent: t } = this._element;
    t === "" && (this._element.innerHTML = "");
  }
  dispatcherCommand(e) {
    e = e.replaceAll(/&nbsp;/g, " ");
    for (let t = 0; t < this.commands.length; t++) {
      const n = this.commands[t];
      if (n.regex.test(e)) {
        const o = (n == null ? void 0 : n.convert(n.regex, e)) || {}, i = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.insert(n.tool, o, {}, i, !0, !0), this.api.caret.setToBlock(i);
        break;
      }
    }
  }
  drawView() {
    const e = document.createElement("DIV");
    return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = !1, e.dataset.placeholder = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = !0, e.addEventListener("keyup", this.onKeyUp)), e;
  }
  render() {
    return this._element = this.drawView(), this._element;
  }
  merge(e) {
    this._data.text += e.text;
    const t = c(e.text);
    this._element.appendChild(t), this._element.normalize();
  }
  validate(e) {
    return !(e.text.trim() === "" && !this._preserveBlank);
  }
  save(e) {
    return {
      text: e.innerHTML
    };
  }
  onPaste(e) {
    const t = {
      text: e.detail.data.innerHTML
    };
    this._data = t, window.requestAnimationFrame(() => {
      this._element.innerHTML = this._data.text || "";
    });
  }
  static get conversionConfig() {
    return {
      export: "text",
      import: "text"
    };
  }
  static get sanitize() {
    return {
      text: {
        br: !0
      }
    };
  }
  static get isReadOnlySupported() {
    return !0;
  }
  static get pasteConfig() {
    return {
      tags: ["P"]
    };
  }
  static get toolbox() {
    return {
      icon: l,
      title: "Text"
    };
  }
}
const m = h, p = d;
export {
  p as DELIMITER_RULE,
  m as HEAD_RULE,
  a as default
};
