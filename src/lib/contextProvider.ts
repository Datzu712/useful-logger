export class ContextProvider {
    constructor(private context: string) {}

    public getContext(): string {
        return this.context;
    }
}
