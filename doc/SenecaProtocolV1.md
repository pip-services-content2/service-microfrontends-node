# Seneca Protocol (version 1) <br/> Microfrontends Microservice

Microfrontends microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        type: 'tcp', // Microservice seneca protocol
        localhost: '0.0.0.0', // Microservice localhost
        port: 9002, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'microfrontends',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [MicrofrontendV1 class](#class1)
* [DataPage<MicrofrontendV1> class](#class2)
* [cmd: 'get_microfrontends'](#operation1)
* [cmd: 'get_microfrontend_by_id'](#operation2)
* [cmd: 'create_microfrontend'](#operation3)
* [cmd: 'update_microfrontend'](#operation4)
* [cmd: 'delete_microfrontend_by_id'](#operation5)

## Data types

### <a name="class1"></a> MicrofrontendV1 class

Represents an microfrontend

**Properties:**
- id: string - unique microfrontend id
- name: string - microfrontend name
- description: string - microfrontend description
- product: string - product name
- copyrights: string - copyrights
- min_ver: number - minimum version
- max_ver: number - maximum version

### <a name="class2"></a> DataPage<MicrofrontendV1> class

Represents a paged result with subset of requested microfrontends

**Properties:**
- data: [MicrofrontendV1] - array of retrieved Microfrontend page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_microfrontends'

Retrieves a collection of microfrontends according to specified criteria

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - tags: [string] - (optional) list tags with topic names
  - status: string - (optional) microfrontend editing status
  - author: string - (optional) author name in any language 
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<MicrofrontendV1> - retrieved microfrontends in page format

### <a name="operation2"></a> Cmd: 'get\_microfrontend\_by\_id'

Retrieves a single microfrontend specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend_id: string - unique Microfrontend object id

**Returns:**
- err: Error - occured error or null for success
- result: MicrofrontendV1 - retrieved microfrontend, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'create_microfrontend'

Creates a new microfrontend

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend: MicrofrontendV1 - Microfrontend object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: MicrofrontendV1 - created microfrontend object

### <a name="operation4"></a> Cmd: 'update_microfrontend'

Updates microfrontend specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend_id: string - unique microfrontend id
- microfrontend: MicrofrontendV1 - microfrontend object with new values. Partial updates are supported

**Returns:**
- err: Error - occured error or null for success
- result: MicrofrontendV1 - updated microfrontend object 
 
### <a name="operation5"></a> Cmd: 'delete\_microfrontend\_by_id'

Deletes microfrontend specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend_id: string - unique microfrontend id

**Returns:**
- err: Error - occured error or null for success

 