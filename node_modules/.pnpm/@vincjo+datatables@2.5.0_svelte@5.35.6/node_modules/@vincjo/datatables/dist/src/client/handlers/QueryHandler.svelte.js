import { isNotNull } from '../core';
export default class QueryHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(path, key, value, check, id) {
        this.table.setPage(1);
        this.table.queries = this.table.queries.filter(query => query.id !== id);
        if (isNotNull(value)) {
            this.table.queries.push({ path, key, value, check, id });
        }
    }
    unset(id) {
        this.table.setPage(1);
        this.table.queries = this.table.queries.filter(query => query.id !== id);
    }
}
