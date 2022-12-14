# AWS Lambda Protocol (version 1) <br/> Microfrontends Microservice

Pip.Services Template microservice implements AWS Lambda compatible API. 

The entire microservice is wrapped into a single lambda function.
Selection of specific operation is done via special **cmd** parameter.
The rest parameters are passed to the operation.

The input and output parameters shall be serialized as JSON string.

The protocol is identical to the one used by [Seneca](./SenecaProtocolV1.md)   

First get reference to AWS SDK, set connection parameters and get reference to Lambda:

```javascript
let aws = require('aws-sdk')();

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
});

let lambda = new aws.Lambda();
```

Then you can start calling Lambda function:

```javascript
let params = {
    cmd: ...operation name...,
    ... the rest params ...
};

let response = await lambda.invoke(
    {
        FunctionName: arn,
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify(params)
    }
);

let result = JSON.parse(response.Payload);
...
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
- result: Microfrontend - retrieved microfrontend, null if object wasn't found 

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

 