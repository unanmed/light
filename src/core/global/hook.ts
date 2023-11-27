import { EmitableEvent, EventEmitter } from '../common/eventEmitter';

interface GlobalEvent extends EmitableEvent {
    login: () => void;
}

export const hook = new EventEmitter<GlobalEvent>();
