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
const MicrofrontendsFilePersistence_1 = require("../../src/persistence/MicrofrontendsFilePersistence");
const MicrofrontendsPersistenceFixture_1 = require("./MicrofrontendsPersistenceFixture");
suite('MicrofrontendsFilePersistence', () => {
    let persistence;
    let fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new MicrofrontendsFilePersistence_1.MicrofrontendsFilePersistence('./data/microfrontends.test.json');
        fixture = new MicrofrontendsPersistenceFixture_1.MicrofrontendsPersistenceFixture(persistence);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetWithFilter();
    }));
});
//# sourceMappingURL=MicrofrontendsFilePersistence.test.js.map