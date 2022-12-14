"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class MicrofrontendV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('description', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('path_prefix', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('icon', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('remote_entry', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('exposed_module', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('element_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('params', pip_services3_commons_nodex_2.TypeCode.Map);
    }
}
exports.MicrofrontendV1Schema = MicrofrontendV1Schema;
//# sourceMappingURL=MicrofrontendV1Schema.js.map