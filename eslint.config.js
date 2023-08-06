import foxkit from "eslint-config-foxkit/configs/base.js";
import prettier from "eslint-config-prettier";

export default [foxkit.configure({ strict: true }), prettier];
