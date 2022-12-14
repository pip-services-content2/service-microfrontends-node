# Configuration Guide <br/> Microfrontends Microservice

Configuration structure used by this module follows the 
[standard configuration](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md) 
structure.

Example **config.yaml** file:

```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "service-microfrontends"
  description: "Microfrontends microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-microfrontends:persistence:file:default:1.0"
  path: "./data/microfrontends.json"

- descriptor: "service-microfrontends:controller:default:default:1.0"

- descriptor: "service-microfrontends:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```
