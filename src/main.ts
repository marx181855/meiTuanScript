import options from "./matchOptions";

for(const k in options) {
  new RegExp(k).test(location.href) && options[k]();
};


