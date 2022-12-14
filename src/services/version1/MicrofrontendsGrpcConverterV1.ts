let messages = require('../../../../src/protos/microfrontends_v1_pb');

import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { MicrofrontendV1 } from '../../data/version1/MicrofrontendV1';

export class MicrofrontendsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: MicrofrontendsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject === 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (typeof map.set === 'function' ) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        MicrofrontendsGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromMicrofrontend(microfrontend: MicrofrontendV1): any {
        if (microfrontend == null) return null;

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

    public static toMicrofrontend(obj: any): MicrofrontendV1 {
        if (obj == null) return null;

        let microfrontend: MicrofrontendV1 = {
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

    public static fromMicrofrontendPage(page: DataPage<MicrofrontendV1>): any {
        if (page == null) return null;

        let obj = new messages.MicrofrontendPage();

        obj.setTotal(page.total);
        let data = page.data.map(MicrofrontendsGrpcConverterV1.fromMicrofrontend);
        obj.setDataList(data);

        return obj;
    }

    public static toMicrofrontendPage(obj: any): DataPage<MicrofrontendV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(MicrofrontendsGrpcConverterV1.toMicrofrontend);
        let page: DataPage<MicrofrontendV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}