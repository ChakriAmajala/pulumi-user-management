# Pulumi GitHub & AWS User Management

## About Project

This project is created using Pulumi to manage GitHub users and AWS IAM users.

Based on a config file, it will:

* Create GitHub teams
* Assign users to teams
* Create AWS IAM users
* Assign users to groups with read-only access

---

## Files

* index.ts → main code
* users.yaml → user data
* Pulumi.yaml → project config

---

## Requirements

* Node.js
* Pulumi installed
* AWS CLI configured
* GitHub token

---

## How to Run

1. Install dependencies
   npm install

2. Set GitHub token
   export GITHUB_TOKEN=your_token

3. Run project
   pulumi up

---

## users.yaml Example

users:

* name: alice
  github_team: backend
  aws_account: dev
* name: bob
  github_team: frontend
  aws_account: prod

---

## Add New User

Just update users.yaml and run:
pulumi up

---

## Notes

* GitHub organization is required for teams
* AWS credentials should be configured before running

---

## Conclusion

This project shows how we can automate user management in GitHub and AWS using Pulumi in a simple and scalable way.

