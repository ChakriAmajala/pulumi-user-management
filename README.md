# Pulumi GitHub & AWS User Management....

This project is built using Pulumi to automate user management in GitHub and AWS.

Based on a configuration file, it:

 Creates GitHub teams
 Assigns users to teams
 Creates AWS IAM users
 Assigns users to groups with required permissions

---

# How to Run the Project #

1. Install dependencies
   npm install

2. Configure AWS
   aws configure

3. Set GitHub token
   export GITHUB_TOKEN=your_token

4. Run Pulumi
   pulumi up

---

# How to Add / Remove Users #

All users are defined in `users.yaml`

Example:

users:

* name: alice
  github_team: backend
  aws_account: dev

To add a user:

* Add new entry in users.yaml

To remove a user:

* Delete entry from users.yaml

Then run:

pulumi up

---

## Assumptions Made

 GitHub organization is already created
 Users exist in GitHub (for team assignment)
 AWS credentials are configured
 Basic ReadOnly policy is sufficient

---

## CI/CD to Deploy Changes

We can integrate this project with GitHub .

On every code change:

* Workflow runs `pulumi up`
* Automatically updates infrastructure


We can create reusable components for:

GitHub user management
AWS IAM user creation

### Naming Conventions

Used consistent naming like:

* dev-group
* prod-group
* user-team mapping

## Least Privilege Policy

Instead of full access, used:

* ReadOnlyAccess policy

### Multi-Environment Support

i can use:

* Pulumi.dev.yaml
* Pulumi.prod.yaml

This allows separate environments like dev, staging, prod

---

## Conclusion

This project shows how to use Pulumi for real-world DevOps tasks like automating user management across multiple platforms in a scalable and maintainable way.
