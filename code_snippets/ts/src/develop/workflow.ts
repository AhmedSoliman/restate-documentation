/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate examples,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/
 */

// <start_here>
import * as restate from "@restatedev/restate-sdk";

const myWorkflow = restate.workflow({
    name: "MyWorkflow",
    handlers: {
        run: async (ctx: restate.WorkflowContext, req: string) => {

            // implement workflow logic here

            return "success";
        },

        interactWithWorkflow: async (ctx: restate.WorkflowSharedContext) => {
            // implement interaction logic here
        },
    },
});

export const MyWorkflow: typeof myWorkflow = { name: "MyWorkflow" };

restate
    .endpoint()
    .bind(myWorkflow)
    .listen();
// <end_here>