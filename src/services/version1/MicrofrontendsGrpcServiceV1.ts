let services = require('../../../../src/protos/microfrontends_v1_grpc_pb');
let messages = require('../../../../src/protos/microfrontends_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { MicrofrontendV1 } from '../../data/version1/MicrofrontendV1';
import { MicrofrontendV1Schema } from '../../data/version1/MicrofrontendV1Schema';
import { IMicrofrontendsController } from '../../logic/IMicrofrontendsController';
import { MicrofrontendsGrpcConverterV1 } from './MicrofrontendsGrpcConverterV1';

export class MicrofrontendsGrpcServiceV1 extends GrpcService {
    private _controller: IMicrofrontendsController;
	
    public constructor() {
        super(services.MicrofrontendsService);
        this._dependencyResolver.put('controller', new Descriptor("service-microfrontends", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IMicrofrontendsController>('controller');
    }
    
    private async getMicrofrontends(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        MicrofrontendsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = MicrofrontendsGrpcConverterV1.toPagingParams(call.request.getPaging());        

        let response = new messages.MicrofrontendPageReply();
        
        try {
            let result = await this._controller.getMicrofrontends(correlationId, filter, paging);
            let page = MicrofrontendsGrpcConverterV1.fromMicrofrontendPage(result);
            response.setPage(page);
        } catch (err) {
            let error = MicrofrontendsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getMicrofrontendById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let microfrontendId = call.request.getMicrofrontendId();

        let response = new messages.MicrofrontendObjectReply();

        try {
            let result = await this._controller.getMicrofrontendById(correlationId, microfrontendId);
            let microfrontend = MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
            response.setMicrofrontend(microfrontend);
        } catch (err) {
            let error = MicrofrontendsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async createMicrofrontend(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let microfrontend = MicrofrontendsGrpcConverterV1.toMicrofrontend(call.request.getMicrofrontend());

        let response = new messages.MicrofrontendObjectReply();

        try {
            let result = await this._controller.createMicrofrontend(correlationId, microfrontend);
            let grpcMicrofrontend = MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);

            if (result)
                response.setMicrofrontend(grpcMicrofrontend);
        } catch (err) {
            let error = MicrofrontendsGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async updateMicrofrontend(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let microfrontend = MicrofrontendsGrpcConverterV1.toMicrofrontend(call.request.getMicrofrontend());

        let response = new messages.MicrofrontendObjectReply();

        try {
            let result = await this._controller.updateMicrofrontend(correlationId, microfrontend);
            let grpcMicrofrontend = MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
            if (result)
                response.setMicrofrontend(grpcMicrofrontend);
        } catch (err) {
            let error = MicrofrontendsGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async deleteMicrofrontendById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let microfrontendId = call.request.getMicrofrontendId();

        let response = new messages.MicrofrontendObjectReply();
        
        try {
            let result = await this._controller.deleteMicrofrontendById(correlationId, microfrontendId);
            let grpcMicrofrontend = MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
            if (result)
                response.setMicrofrontend(grpcMicrofrontend);
        } catch (err) {
            let error = MicrofrontendsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    
        
    public register() {
        this.registerMethod(
            'get_microfrontends', 
            null,
            this.getMicrofrontends
        );

        this.registerMethod(
            'get_microfrontend_by_id', 
            null,
            this.getMicrofrontendById
        );

        this.registerMethod(
            'create_microfrontend', 
            null,
            this.createMicrofrontend
        );

        this.registerMethod(
            'update_microfrontend', 
            null,
            this.updateMicrofrontend
        );

        this.registerMethod(
            'delete_microfrontend_by_id',
            null, 
            this.deleteMicrofrontendById
        );
    }
}
