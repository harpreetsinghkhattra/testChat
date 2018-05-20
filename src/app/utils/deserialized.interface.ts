export interface Deserialized<T> {
    deserialized(input: any): T;
}