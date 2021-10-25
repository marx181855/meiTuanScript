import options from "./options";

for(const [k, v] of options) {
  k.test(location.href) && v();
}




