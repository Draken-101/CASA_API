import ActionRepository from "../../Domain/Ports/ActionRepository";

export default class GetActionsUseCase {
    constructor(private readonly actionRepository: ActionRepository) { };

    async execute() {
        return await this.actionRepository.GetActions();
    }
}