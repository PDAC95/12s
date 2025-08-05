# Branch Strategy - GitFlow

## Main Branches
- **master**: Production-ready code. Only accepts merges from release and hotfix branches.
- **develop**: Integration branch for features. Default branch for development.

## Supporting Branches

### Feature Branches
- **Naming**: eature/SOI-XXX-short-description
- **Branch from**: develop
- **Merge back to**: develop
- **Example**: eature/SOI-310-api-endpoints

### Release Branches  
- **Naming**: elease/vX.X.X
- **Branch from**: develop
- **Merge back to**: master and develop
- **Example**: elease/v1.0.0

### Hotfix Branches
- **Naming**: hotfix/vX.X.X-issue-description
- **Branch from**: master
- **Merge back to**: master and develop
- **Example**: hotfix/v1.0.1-auth-fix

## Workflow
1. All feature development happens in feature branches from develop
2. Features merge to develop via Pull Request
3. Release branches created from develop for version preparation
4. Releases merge to master (production) and back to develop
5. Hotfixes branch from master for urgent production fixes
