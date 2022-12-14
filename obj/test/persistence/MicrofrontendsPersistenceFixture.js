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
exports.MicrofrontendsPersistenceFixture = void 0;
let assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
let MICROFRONTEND1 = {
    id: "1",
    name: "Microfrontend 1",
    description: "Main module",
    path_prefix: "md1",
    icon: "icon1",
    type: "vue",
    remote_entry: "/remote",
    exposed_module: "module1",
    element_name: "main_module",
    params: {}
};
let MICROFRONTEND2 = {
    id: '2',
    name: "Microfrontend 2",
    description: "Second module",
    path_prefix: "md2",
    icon: "icon2",
    type: "vue",
    remote_entry: "/remote",
    exposed_module: "module2",
    element_name: "second_module",
    params: {}
};
let MICROFRONTEND3 = {
    id: '3',
    name: "Microfrontend 3",
    description: "N module",
    path_prefix: "md1",
    icon: "icon3",
    type: "react",
    remote_entry: "/remote",
    exposed_module: "module3",
    element_name: "n_module",
    params: {}
};
class MicrofrontendsPersistenceFixture {
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
    testCreateMicrofrontends() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create one microfrontend
            let microfrontend = yield this._persistence.create(null, MICROFRONTEND1);
            assert.isObject(microfrontend);
            assert.equal(microfrontend.name, MICROFRONTEND1.name);
            assert.equal(microfrontend.description, MICROFRONTEND1.description);
            assert.equal(microfrontend.path_prefix, MICROFRONTEND1.path_prefix);
            assert.equal(microfrontend.icon, MICROFRONTEND1.icon);
            assert.equal(microfrontend.type, MICROFRONTEND1.type);
            assert.equal(microfrontend.remote_entry, MICROFRONTEND1.remote_entry);
            assert.equal(microfrontend.exposed_module, MICROFRONTEND1.exposed_module);
            assert.equal(microfrontend.element_name, MICROFRONTEND1.element_name);
            // Create another microfrontend
            microfrontend = yield this._persistence.create(null, MICROFRONTEND2);
            assert.isObject(microfrontend);
            assert.equal(microfrontend.name, MICROFRONTEND2.name);
            assert.equal(microfrontend.description, MICROFRONTEND2.description);
            assert.equal(microfrontend.path_prefix, MICROFRONTEND2.path_prefix);
            assert.equal(microfrontend.icon, MICROFRONTEND2.icon);
            assert.equal(microfrontend.type, MICROFRONTEND2.type);
            assert.equal(microfrontend.remote_entry, MICROFRONTEND2.remote_entry);
            assert.equal(microfrontend.exposed_module, MICROFRONTEND2.exposed_module);
            assert.equal(microfrontend.element_name, MICROFRONTEND2.element_name);
            // Create yet another microfrontend
            microfrontend = yield this._persistence.create(null, MICROFRONTEND3);
            assert.isObject(microfrontend);
            assert.equal(microfrontend.name, MICROFRONTEND3.name);
            assert.equal(microfrontend.description, MICROFRONTEND3.description);
            assert.equal(microfrontend.path_prefix, MICROFRONTEND3.path_prefix);
            assert.equal(microfrontend.icon, MICROFRONTEND3.icon);
            assert.equal(microfrontend.type, MICROFRONTEND3.type);
            assert.equal(microfrontend.remote_entry, MICROFRONTEND3.remote_entry);
            assert.equal(microfrontend.exposed_module, MICROFRONTEND3.exposed_module);
            assert.equal(microfrontend.element_name, MICROFRONTEND3.element_name);
        });
    }
    testCrudOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            let microfrontend1;
            // Create items
            yield this.testCreateMicrofrontends();
            // Get all microfrontends
            let page = yield this._persistence.getPageByFilter(null, new pip_services3_commons_nodex_1.FilterParams(), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 3);
            microfrontend1 = page.data[0];
            // Update the microfrontend
            microfrontend1.name = 'Updated Name 1';
            let microfrontend = yield this._persistence.update(null, microfrontend1);
            assert.isObject(microfrontend);
            assert.equal(microfrontend.name, 'Updated Name 1');
            assert.equal(microfrontend.id, microfrontend1.id);
            // Delete microfrontend
            yield this._persistence.deleteById(null, microfrontend1.id);
            // Try to get delete microfrontend
            microfrontend = yield this._persistence.getOneById(null, microfrontend1.id);
            assert.isNull(microfrontend || null);
        });
    }
    testGetWithFilter() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create microfrontends
            yield this.testCreateMicrofrontends();
            // Get microfrontends filtered by product
            let microfrontends = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromValue({
                type: 'vue'
            }), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(microfrontends);
            assert.lengthOf(microfrontends.data, 2);
            // Get microfrontends filtered by search
            microfrontends = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromValue({
                search: 'Microfrontend'
            }), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(microfrontends);
            assert.lengthOf(microfrontends.data, 3);
        });
    }
}
exports.MicrofrontendsPersistenceFixture = MicrofrontendsPersistenceFixture;
//# sourceMappingURL=MicrofrontendsPersistenceFixture.js.map