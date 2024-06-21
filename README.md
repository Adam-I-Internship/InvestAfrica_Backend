# Adam-i Backend (Internship)

## Development Workflow

- Run `npm run postinstall` before opening a PR for eslinting and prettier checks.
- PRs should strictly be made to the `dev` branch.
- Meaningful commit messages are required for every change.
- Regularly pull from the branch to avoid merge conflicts.
- Update the PR title and body to reflect the summary and details of the changes.

## Local Development

- Start the backend with `npm run dev`, which will listen on `localhost:9000`.
- Perform API checks and health checks using the Insomnia app at `localhost:9000/api/health`.
- Follow the Airbnb ESLint style guideline for React JSX in the frontend.
- The backend utilizes TypeScript, Prisma ORM, and PostgreSQL.
- Run `npx prisma studio` to access the web dashboard for the database.

## Cloud Deployment

- The backend service on the cloud can be updated via CI/CD by pushing to the `azure-main` branch.
- In the event the backend service is offline, use `npm run pm2` within the backend workspace to bring it back online.

## Guidelines and Configurations

- Configure Git for case sensitivity, automatic rebasing, and current branch as the default push behavior.
- Document any changes in configuration or environment variables clearly in the PRs.

## Additional Notes

- Be vigilant about not exposing sensitive information such as database credentials or secret keys in the public repository.
