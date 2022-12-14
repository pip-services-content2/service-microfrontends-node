import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Schema } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
import { MicrofrontendV1Schema } from '../data/version1/MicrofrontendV1Schema';
import { IMicrofrontendsController } from './IMicrofrontendsController';

export class MicrofrontendsCommandSet extends CommandSet {
    private _logic: IMicrofrontendsController;

    constructor(logic: IMicrofrontendsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetMicrofrontendsCommand());
		this.addCommand(this.makeGetMicrofrontendByIdCommand());
		this.addCommand(this.makeCreateMicrofrontendCommand());
		this.addCommand(this.makeUpdateMicrofrontendCommand());
		this.addCommand(this.makeDeleteMicrofrontendByIdCommand());
    }

	private makeGetMicrofrontendsCommand(): ICommand {
		return new Command(
			"get_microfrontends",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getMicrofrontends(correlationId, filter, paging);
            }
		);
	}

	private makeGetMicrofrontendByIdCommand(): ICommand {
		return new Command(
			"get_microfrontend_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('microfrontend_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let microfrontend_id = args.getAsString("microfrontend_id");
				return await this._logic.getMicrofrontendById(correlationId, microfrontend_id);
            }
		);
	}

	private makeCreateMicrofrontendCommand(): ICommand {
		return new Command(
			"create_microfrontend",
			new ObjectSchema(true)
				.withRequiredProperty('microfrontend', new MicrofrontendV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let microfrontend = args.get("microfrontend");
				return await this._logic.createMicrofrontend(correlationId, microfrontend);
            }
		);
	}

	private makeUpdateMicrofrontendCommand(): ICommand {
		return new Command(
			"update_microfrontend",
			new ObjectSchema(true)
				.withRequiredProperty('microfrontend', new MicrofrontendV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let microfrontend = args.get("microfrontend");
				return await this._logic.updateMicrofrontend(correlationId, microfrontend);
            }
		);
	}
	
	private makeDeleteMicrofrontendByIdCommand(): ICommand {
		return new Command(
			"delete_microfrontend_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('microfrontend_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let microfrontendId = args.getAsNullableString("microfrontend_id");
				return await this._logic.deleteMicrofrontendById(correlationId, microfrontendId);
			}
		);
	}

}