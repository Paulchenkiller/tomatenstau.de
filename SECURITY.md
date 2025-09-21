# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of tomatenstau.de seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them by email to:

📧 **security@tomatenstau.de**

If you prefer to encrypt your email, you can use the following PGP key: [Contact for PGP key]

### What to Include

Please include the following information in your report:

- Type of issue (e.g. XSS, CSRF, SQL injection, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

### Response Timeline

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 7 days
- **Regular Updates**: We will keep you informed of our progress every 7 days
- **Resolution**: We aim to resolve critical vulnerabilities within 30 days

### What to Expect

After you submit a report, here's what will happen:

1. We'll acknowledge your report and begin investigating
2. We'll keep you updated on our progress
3. If the vulnerability is accepted, we'll:
   - Develop and test a fix
   - Prepare a security advisory
   - Release the fix in the next patch version
   - Publicly disclose the vulnerability after the fix is released

### Responsible Disclosure

We ask that you:

- Give us reasonable time to investigate and fix the issue before public disclosure
- Do not access or modify data that doesn't belong to you
- Do not perform testing that could harm our systems or users
- Do not use social engineering, physical attacks, or DoS attacks

### Recognition

We appreciate security researchers who help keep our project safe. If you report a valid security vulnerability, we will:

- Acknowledge your contribution in our security advisories (if desired)
- Include you in our acknowledgments section
- Work with you on a reasonable disclosure timeline

## Security Measures

### Development Security

- **Dependency Scanning**: Automated vulnerability scanning with Dependabot
- **Code Analysis**: Static code analysis with ESLint security rules
- **Secure Headers**: Implementation of security headers (CSP, HSTS, etc.)
- **Input Validation**: Proper sanitization and validation of user inputs
- **Authentication**: Secure authentication mechanisms where applicable

### Infrastructure Security

- **HTTPS Only**: All traffic is encrypted in transit
- **Secure Deployment**: Automated deployment with security checks
- **Access Control**: Limited access to production systems
- **Monitoring**: Security event monitoring and logging

### Content Security

- **CSP Headers**: Content Security Policy to prevent XSS
- **Subresource Integrity**: SRI for external resources
- **Sanitization**: Proper sanitization of user-generated content
- **Access Controls**: Appropriate access controls for sensitive areas

## Security Best Practices for Contributors

When contributing to this project, please follow these security guidelines:

### Code Security

- Never commit secrets, API keys, or passwords
- Use parameterized queries to prevent injection attacks
- Validate and sanitize all user inputs
- Use secure random number generators
- Follow principle of least privilege

### Dependencies

- Keep dependencies up to date
- Review security advisories for dependencies
- Use npm audit to check for known vulnerabilities
- Consider alternative packages for vulnerable dependencies

### Angular Security

- Use Angular's built-in XSS protection
- Avoid bypassing Angular's sanitization
- Use HTTPS for all external requests
- Implement proper CSRF protection
- Validate data on both client and server side

## Security Checklist for PRs

Before submitting a pull request, please ensure:

- [ ] No secrets or sensitive information in code
- [ ] Input validation for all user inputs
- [ ] Proper error handling (no information leakage)
- [ ] Security headers properly configured
- [ ] Dependencies checked for vulnerabilities
- [ ] Authentication/authorization properly implemented
- [ ] XSS prevention measures in place
- [ ] CSRF protection where needed

## Known Security Considerations

### Current Implementations

- **XSS Protection**: Angular's built-in sanitization
- **CSRF Protection**: Configured for state-changing operations
- **Secure Headers**: CSP, HSTS, X-Frame-Options implemented
- **Input Validation**: Client-side and server-side validation
- **Dependency Security**: Regular Dependabot updates

### Areas of Focus

- Client-side security in Angular applications
- Secure handling of user preferences and localStorage
- Protection against common web vulnerabilities
- Secure communication with external APIs

## Contact

For security-related questions or concerns:

- **Email**: security@tomatenstau.de
- **General Issues**: Use GitHub issues for non-security bugs
- **General Questions**: See our [Contributing Guide](CONTRIBUTING.md)

---

Last updated: December 2025
