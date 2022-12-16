import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { MicrofrontendsMongoDbPersistence } from '../persistence/MicrofrontendsMongoDbPersistence';
import { MicrofrontendsFilePersistence } from '../persistence/MicrofrontendsFilePersistence';
import { MicrofrontendsMemoryPersistence } from '../persistence/MicrofrontendsMemoryPersistence';
import { MicrofrontendsController } from '../logic/MicrofrontendsController';
import { MicrofrontendsCommandableHttpServiceV1 } from '../services/version1/MicrofrontendsCommandableHttpServiceV1';
import { MicrofrontendsCommandableGrpcServiceV1 } from '../services/version1/MicrofrontendsCommandableGrpcServiceV1';
import { MicrofrontendsGrpcServiceV1 } from '../services/version1/MicrofrontendsGrpcServiceV1';

export class MicrofrontendsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-microfrontends", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-microfrontends", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-microfrontends", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-microfrontends", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-microfrontends", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-microfrontends", "service", "commandable-http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-microfrontends", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-microfrontends", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(MicrofrontendsServiceFactory.MemoryPersistenceDescriptor, MicrofrontendsMemoryPersistence);
		this.registerAsType(MicrofrontendsServiceFactory.FilePersistenceDescriptor, MicrofrontendsFilePersistence);
		this.registerAsType(MicrofrontendsServiceFactory.MongoDbPersistenceDescriptor, MicrofrontendsMongoDbPersistence);
		this.registerAsType(MicrofrontendsServiceFactory.ControllerDescriptor, MicrofrontendsController);
		this.registerAsType(MicrofrontendsServiceFactory.HttpServiceDescriptor, MicrofrontendsCommandableHttpServiceV1);
		this.registerAsType(MicrofrontendsServiceFactory.CommandableGrpcServiceDescriptor, MicrofrontendsCommandableGrpcServiceV1);
		this.registerAsType(MicrofrontendsServiceFactory.GrpcServiceDescriptor, MicrofrontendsGrpcServiceV1);
	}
	
}
