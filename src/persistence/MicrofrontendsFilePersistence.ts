import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { MicrofrontendsMemoryPersistence } from './MicrofrontendsMemoryPersistence';
import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';

export class MicrofrontendsFilePersistence extends MicrofrontendsMemoryPersistence {
	protected _persister: JsonFilePersister<MicrofrontendV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<MicrofrontendV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}