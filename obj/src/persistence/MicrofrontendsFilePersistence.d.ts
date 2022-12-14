import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { MicrofrontendsMemoryPersistence } from './MicrofrontendsMemoryPersistence';
import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
export declare class MicrofrontendsFilePersistence extends MicrofrontendsMemoryPersistence {
    protected _persister: JsonFilePersister<MicrofrontendV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
