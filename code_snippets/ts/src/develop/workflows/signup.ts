// <start_here>
import * as restate from "@restatedev/restate-sdk";
import userManagement from "./service";
import {WorkflowContext} from "@restatedev/restate-sdk";

const signUpWorkflow = restate.workflow({
    name: "signup",
    handlers: {
        run: async (ctx: WorkflowContext, req: { email: string }) => {
            const secret = ctx.rand.uuidv4();
            ctx.set("status", "Generated secret");

            await ctx.run("send email", () =>
                sendEmailWithLink({ email: req.email, secret }));
            ctx.set("status", "Sent email");

            const clickSecret = await ctx.promise<string>("email.clicked");
            ctx.set("status", "Clicked email");

            return clickSecret == secret;
        },

        click: (ctx: restate.WorkflowSharedContext, secret: string) =>
            ctx.promise<string>("email.clicked").resolve(secret),

        getStatus: (ctx: restate.WorkflowSharedContext) =>
            ctx.get("status"),
    },
});

export type SignUpWorkflow = typeof signUpWorkflow;
// <end_here>

function sendEmailWithLink(param: { email: string, secret: string}){
    console.log(`Sending email to ${param.email} with secret ${param.secret}`);
}

restate
    .endpoint()
    .bind(userManagement)
    .bind(signUpWorkflow)
    .listen(9088);