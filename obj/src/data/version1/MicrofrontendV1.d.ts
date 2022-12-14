import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class MicrofrontendV1 implements IStringIdentifiable {
    id: string;
    name: string;
    description?: string;
    path_prefix: string;
    icon?: string;
    type?: string;
    remote_entry: string;
    exposed_module: string;
    element_name: string;
    params?: {
        [key: string]: string;
    };
}
