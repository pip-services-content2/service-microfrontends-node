"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const MicrofrontendsCommandSet_1 = require("./MicrofrontendsCommandSet");
class MicrofrontendsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(MicrofrontendsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new MicrofrontendsCommandSet_1.MicrofrontendsCommandSet(this);
        return this._commandSet;
    }
    getMicrofrontends(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getMicrofrontendById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    createMicrofrontend(correlationId, microfrontend) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.create(correlationId, microfrontend);
        });
    }
    updateMicrofrontend(correlationId, microfrontend) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.update(correlationId, microfrontend);
        });
    }
    deleteMicrofrontendById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.deleteById(correlationId, id);
        });
    }
}
exports.MicrofrontendsController = MicrofrontendsController;
MicrofrontendsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-microfrontends:persistence:*:*:1.0');
//# sourceMappingURL=MicrofrontendsController.js.map