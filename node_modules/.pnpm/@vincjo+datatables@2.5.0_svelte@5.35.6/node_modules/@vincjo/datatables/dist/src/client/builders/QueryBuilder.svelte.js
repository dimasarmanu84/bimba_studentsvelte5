import { check as comparator } from '../core';
export default class QueryBuilder {
    value = $state('');
    id = Math.random().toString(36).substring(2, 15);
    queryHandler;
    path;
    key;
    check;
    constructor(queryHandler, key) {
        this.queryHandler = queryHandler;
        this.key = key;
        this.cleanup();
    }
    where(check) {
        this.check = check;
        return this;
    }
    from(path) {
        this.path = path;
        return this;
    }
    set(value) {
        if (value)
            this.value = value;
        this.queryHandler.set(this.path, this.key, this.value, this.check ?? comparator.isLike, this.id);
    }
    clear() {
        this.value = '';
        this.queryHandler.unset(this.id);
    }
    cleanup() {
        this.queryHandler['table'].on('clearFilters', () => this.clear());
    }
}
