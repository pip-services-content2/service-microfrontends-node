import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class MicrofrontendV1 implements IStringIdentifiable {
    public id: string;
    public name: string;
    public description?: string;
    public path_prefix: string;
    public icon?: string;
    public type?: string;
    public remote_entry: string;
    public exposed_module: string;
    public element_name: string;
    public params?: { [key: string]: string };
}