import { CommandSet } from 'pip-services3-commons-nodex';
import { IMicrofrontendsController } from './IMicrofrontendsController';
export declare class MicrofrontendsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IMicrofrontendsController);
    private makeGetMicrofrontendsCommand;
    private makeGetMicrofrontendByIdCommand;
    private makeCreateMicrofrontendCommand;
    private makeUpdateMicrofrontendCommand;
    private makeDeleteMicrofrontendByIdCommand;
}
