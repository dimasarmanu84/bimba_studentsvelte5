import type { Check } from '..';
import type QueryHandler from '../handlers/QueryHandler.svelte';
export default class QueryBuilder<Row> {
    value: unknown;
    private id;
    private queryHandler;
    private path;
    private key;
    private check;
    constructor(queryHandler: QueryHandler<Row>, key: string);
    where(check: Check): this;
    from(path: string[]): this;
    set(value?: unknown): void;
    clear(): void;
    private cleanup;
}
