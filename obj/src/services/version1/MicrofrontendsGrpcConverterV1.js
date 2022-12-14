"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsGrpcConverterV1 = void 0;
let messages = require('../../../../src/protos/microfrontends_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
class MicrofrontendsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_2.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        MicrofrontendsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: MicrofrontendsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_3.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject === 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (typeof map.set === 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        MicrofrontendsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromMicrofrontend(microfrontend) {
        if (microfrontend == null)
            return null;
        let obj = new messages.Microfrontend();
        obj.setId(microfrontend.id);
        obj.setName(microfrontend.name);
        obj.setDescription(microfrontend.description);
        obj.setPathPrefix(microfrontend.path_prefix);
        obj.setIcon(microfrontend.icon);
        obj.setType(microfrontend.type);
        obj.setRemoteEntry(microfrontend.remote_entry);
        obj.setExposedModule(microfrontend.exposed_module);
        obj.setElementName(microfrontend.element_name);
        MicrofrontendsGrpcConverterV1.setMap(obj.getParamsMap(), microfrontend.params);
        return obj;
    }
    static toMicrofrontend(obj) {
        if (obj == null)
            return null;
        let microfrontend = {
            id: obj.getId(),
            name: obj.getName(),
            description: obj.getDescription(),
            path_prefix: obj.getPathPrefix(),
            icon: obj.getIcon(),
            type: obj.getType(),
            remote_entry: obj.getRemoteEntry(),
            exposed_module: obj.getExposedModule(),
            element_name: obj.getElementName(),
            params: {},
        };
        MicrofrontendsGrpcConverterV1.setMap(microfrontend.params, obj.getParamsMap());
        return microfrontend;
    }
    static fromMicrofrontendPage(page) {
        if (page == null)
            return null;
        let obj = new messages.MicrofrontendPage();
        obj.setTotal(page.total);
        let data = page.data.map(MicrofrontendsGrpcConverterV1.fromMicrofrontend);
        obj.setDataList(data);
        return obj;
    }
    static toMicrofrontendPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(MicrofrontendsGrpcConverterV1.toMicrofrontend);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.MicrofrontendsGrpcConverterV1 = MicrofrontendsGrpcConverterV1;
//# sourceMappingURL=MicrofrontendsGrpcConverterV1.js.map