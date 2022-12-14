import { ConfigParams } from 'pip-services3-commons-nodex';

import { MicrofrontendsFilePersistence } from '../../src/persistence/MicrofrontendsFilePersistence';
import { MicrofrontendsPersistenceFixture } from './MicrofrontendsPersistenceFixture';

suite('MicrofrontendsFilePersistence', ()=> {
    let persistence: MicrofrontendsFilePersistence;
    let fixture: MicrofrontendsPersistenceFixture;
    
    setup(async () => {
        persistence = new MicrofrontendsFilePersistence('./data/microfrontends.test.json');

        fixture = new MicrofrontendsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});