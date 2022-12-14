# HTTP Protocol (version 1) <br/> Microfrontends Microservice

Microfrontends microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [MicrofrontendV1 class](#class1)
* [DataPage<MicrofrontendV1> class](#class2)
* [POST /microfrontends/get_microfrontends](#operation1)
* [POST /microfrontends/get_microfrontend_by_id](#operation2)
* [POST /microfrontends/create_microfrontend](#operation3)
* [POST /microfrontends/update_microfrontend](#operation4)
* [POST /microfrontends/delete_microfrontend_id](#operation5)

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
- data: [Microfrontend] - array of retrieved Microfrontend page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Method: 'POST', route '/microfrontends/get_microfrontends'

Retrieves a collection of microfrontends according to specified criteria

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: Object
  - tags: string - (optional) a comma-separated list of tags with topic names
  - status: string - (optional) microfrontend editing status
  - author: string - (optional) author name in any language 
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Array of Microfrontend objects, DataPage<MicrofrontendV1> object is paging was requested or error

### <a name="operation2"></a> Method: 'POST', route '/microfrontends/get\_microfrontend\_by_id'

Retrieves a single microfrontend specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend_id: string - unique microfrontend id

**Response body:**
Microfrontend object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/microfrontends/create_microfrontend'

Creates a new microfrontend

**Request body:**
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend: MicrofrontendV1 - Microfrontend object to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created Microfrontend object or error

### <a name="operation4"></a> Method: 'POST', route '/microfrontends/update_microfrontend'

Updates microfrontend specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend: MicrofrontendV1 - Microfrontend object with new values. Partial updates are supported

**Response body:**
Updated Microfrontend object or error 
 
### <a name="operation5"></a> Method: 'POST', route '/microfrontends/delete\_microfrontend\_by_id'

Deletes microfrontend specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- microfrontend_id: string - unique microfrontend id

**Response body:**
Occured error or null for success
 
