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
exports.MicrofrontendsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const MicrofrontendV1Schema_1 = require("../data/version1/MicrofrontendV1Schema");
class MicrofrontendsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetMicrofrontendsCommand());
        this.addCommand(this.makeGetMicrofrontendByIdCommand());
        this.addCommand(this.makeCreateMicrofrontendCommand());
        this.addCommand(this.makeUpdateMicrofrontendCommand());
        this.addCommand(this.makeDeleteMicrofrontendByIdCommand());
    }
    makeGetMicrofrontendsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_microfrontends", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getMicrofrontends(correlationId, filter, paging);
        }));
    }
    makeGetMicrofrontendByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_microfrontend_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('microfrontend_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let microfrontend_id = args.getAsString("microfrontend_id");
            return yield this._logic.getMicrofrontendById(correlationId, microfrontend_id);
        }));
    }
    makeCreateMicrofrontendCommand() {
        return new pip_services3_commons_nodex_2.Command("create_microfrontend", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('microfrontend', new MicrofrontendV1Schema_1.MicrofrontendV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let microfrontend = args.get("microfrontend");
            return yield this._logic.createMicrofrontend(correlationId, microfrontend);
        }));
    }
    makeUpdateMicrofrontendCommand() {
        return new pip_services3_commons_nodex_2.Command("update_microfrontend", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('microfrontend', new MicrofrontendV1Schema_1.MicrofrontendV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let microfrontend = args.get("microfrontend");
            return yield this._logic.updateMicrofrontend(correlationId, microfrontend);
        }));
    }
    makeDeleteMicrofrontendByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_microfrontend_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('microfrontend_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let microfrontendId = args.getAsNullableString("microfrontend_id");
            return yield this._logic.deleteMicrofrontendById(correlationId, microfrontendId);
        }));
    }
}
exports.MicrofrontendsCommandSet = MicrofrontendsCommandSet;
//# sourceMappingURL=MicrofrontendsCommandSet.js.map