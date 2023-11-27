import { reactive } from 'vue';
import { EmitableEvent, EventEmitter } from '../common/eventEmitter';
import { mainCard } from '../view/init';

interface DataSetEvent extends EmitableEvent {}

interface SetData<T> {
    data: T;
    num: number;
}

export class DataSet<T> extends EventEmitter<DataSetEvent> {
    static dataSets: DataSet<any>[] = reactive([]);

    component: string = 'unknown';
    data: SetData<T>[] = reactive([]);
    id: string;

    constructor(id: string) {
        super();
        this.id = id;
        DataSet.dataSets.push(this);
    }

    /**
     * 添加数据
     * @param data 要添加的数据
     */
    add(...data: T[]) {
        const toPush = data.map(v => {
            const num = mainCard.open(this.component, { light: v });
            return {
                data: v,
                num
            };
        });
        this.data.push(...toPush);
    }

    /**
     * 删除数据
     * @param data 要删除的数据
     */
    remove(...data: T[]) {
        data.forEach(v => {
            const index = this.data.findIndex(v => v.data === data);
            if (index === -1) return;
            this.data.splice(index, 1);
        });
    }

    use(com: string) {
        this.component = com;
    }

    static get<T>(id: string): DataSet<T> | undefined {
        return this.dataSets.find(v => id === v.id);
    }
}
