import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "./schema";
import Task from "../tasks/Task";

const adapter = new LokiJSAdapter({
    schema
});

export default new Database({
    adapter,
    modelClasses: [Task],
    actionsEnabled: true
});
