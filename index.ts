import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as github from "@pulumi/github";
import * as fs from "fs";
import * as yaml from "js-yaml";

// 🔥 GitHub Provider (IMPORTANT)
const githubProvider = new github.Provider("github", {
    owner: "pulumi-org",
});

// Load users.yaml
const file = fs.readFileSync("users.yaml", "utf8");
const data: any = yaml.load(file);

const users = data.users;

// 🔥 Create GitHub Teams
const backendTeam = new github.Team("backend", {
    name: "backend",
}, { provider: githubProvider });

const frontendTeam = new github.Team("frontend", {
    name: "frontend",
}, { provider: githubProvider });

// 🔥 Create AWS IAM Groups
const devGroup = new aws.iam.Group("dev-group");
const prodGroup = new aws.iam.Group("prod-group");

// 🔥 Attach ReadOnly policy
new aws.iam.GroupPolicyAttachment("dev-policy", {
    group: devGroup.name,
    policyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess",
});

new aws.iam.GroupPolicyAttachment("prod-policy", {
    group: prodGroup.name,
    policyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess",
});

// 🔥 Loop through users
users.forEach((user: any) => {

    // Create AWS IAM User
    const iamUser = new aws.iam.User(user.name);

    // Assign user to IAM group
    new aws.iam.UserGroupMembership(`${user.name}-group`, {
        user: iamUser.name,
        groups: [
            user.aws_account === "dev" ? devGroup.name : prodGroup.name
        ],
    });

    // Assign user to GitHub team
    new github.TeamMembership(`${user.name}-team`, {
        teamId: user.github_team === "backend" ? backendTeam.id : frontendTeam.id,
        username: user.name,
        role: "member",
    }, { provider: githubProvider });

});
