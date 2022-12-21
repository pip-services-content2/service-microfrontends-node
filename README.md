# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Microfrontends microservice

This is microfrontends microservice from Pip.Services library. 
It keeps a list of supported microfrontends that are referenced from other content microservices.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-microfrontends-node)
  - [Java SDK](https://github.com/pip-services-content2/client-microfrontends-java)
  - [.NET SDK](https://github.com/pip-services-content2/client-microfrontends-dotnet)
  - [Go SDK](https://github.com/pip-services-content2/client-microfrontends-go)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class MicrofrontendV1 implements IStringIdentifiable {
    public id: string;
    public name: string;
    public description?: string;
    public path_prefix: string;
    public icon?: string;
    public type?: string;
    public remote_entry: string;
    public exposed_module: string;
    public element_name: string;
    public params?: { [key: string]: any };
}

interface IMicrofrontendsV1 {
    getMicrofrontends(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>>;

    getMicrofrontendById(correlationId: string, microfrontend_id: string): Promise<MicrofrontendV1>;

    createMicrofrontend(correlationId: string, microfrontend: MicrofrontendV1): Promise<MicrofrontendV1>;

    updateMicrofrontend(correlationId: string, microfrontend: MicrofrontendV1): Promise<MicrofrontendV1>;

    deleteMicrofrontendById(correlationId: string, microfrontend_id: string): Promise<MicrofrontendV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-microfrontends-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "service-microfrontends"
  description: "Microfrontends microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-microfrontends:persistence:file:default:1.0"
  path: "./data/microfrontends.json"

- descriptor: "service-microfrontends:controller:default:default:1.0"

- descriptor: "service-microfrontends:service:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-microfrontends-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-microfrontends-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.MicrofrontendsHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch (err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new microfrontend
let microfrontend = {
    id: 'my_app',
    name: 'My Microfrontend',
    product: 'My Samples'
};

let microfrontend = await client.createMicrofrontend(null, microfrontend);
```

```javascript
// Get the list of microfrontends for 'My Samples' product
let page = await client.getMicrofrontends(
    null,
    {
        product: 'My Samples'
    },
    {
        total: true,
        skip: 0,
        take: 10
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
