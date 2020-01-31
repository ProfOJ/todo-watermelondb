import { appSchema, tableSchema } from "@nozbe/watermelondb";

import taskSchema from "../tasks/taskSchema";

export default appSchema({
    version: 1,
    tables: [
        tableSchema(taskSchema),
    ]
});
