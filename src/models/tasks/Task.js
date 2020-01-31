import { Model } from "@nozbe/watermelondb";
import {
    field,
    date
} from "@nozbe/watermelondb/decorators";


export default class Task extends Model {

    static table = 'tasks';

    @field('taskName') taskName;
    @date('date') date;
}
