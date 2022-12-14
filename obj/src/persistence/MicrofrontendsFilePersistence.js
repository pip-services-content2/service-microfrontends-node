"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const MicrofrontendsMemoryPersistence_1 = require("./MicrofrontendsMemoryPersistence");
class MicrofrontendsFilePersistence extends MicrofrontendsMemoryPersistence_1.MicrofrontendsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.MicrofrontendsFilePersistence = MicrofrontendsFilePersistence;
//# sourceMappingURL=MicrofrontendsFilePersistence.js.map