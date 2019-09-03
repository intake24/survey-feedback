export class FlattenArray {

    static flatten<T>(array: Array<T>): Array<T> {
        return [].concat.apply([], array);
    }

}
