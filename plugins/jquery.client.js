import jQuery from "jquery";
import "select2";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    window.$ = window.jQuery = jQuery;
  }
});
