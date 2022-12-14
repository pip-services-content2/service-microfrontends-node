import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class MicrofrontendV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('description', TypeCode.String);
        this.withRequiredProperty('path_prefix', TypeCode.String);
        this.withOptionalProperty('icon', TypeCode.String);
        this.withOptionalProperty('type', TypeCode.String);
        this.withRequiredProperty('remote_entry', TypeCode.String);
        this.withRequiredProperty('exposed_module', TypeCode.String);
        this.withRequiredProperty('element_name', TypeCode.String);
        this.withOptionalProperty('params', TypeCode.Map);
    }
}
