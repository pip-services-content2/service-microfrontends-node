import { ConfigParams } from 'pip-services3-commons-nodex';

import { MicrofrontendsMemoryPersistence } from '../../src/persistence/MicrofrontendsMemoryPersistence';
import { MicrofrontendsPersistenceFixture } from './MicrofrontendsPersistenceFixture';

suite('MicrofrontendsMemoryPersistence', ()=> {
    let persistence: MicrofrontendsMemoryPersistence;
    let fixture: MicrofrontendsPersistenceFixture;
    
    setup(async () => {
        persistence = new MicrofrontendsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new MicrofrontendsPersistenceFixture(persistence);
        
        await persistence.open(null);
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