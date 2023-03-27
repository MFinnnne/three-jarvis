import ObjectObserver from './ObjectObserver';

class ObjectSubject {
    private observers: ObjectObserver[] = [];

    public attach(observer: ObjectObserver): void {
        this.observers.push(observer);
    }

    detach(observer: ObjectObserver): void {}

    public notify() {}
}
