# Analysis of Framework Usage: "Tomatenstaude"

## 1. Current State
The application has been simplified by removing the "Code Examples" section. It is now effectively a single-page personal portfolio with the following features:
- **Home Page**: Static content with text, images, and links.
- **Internationalization (i18n)**: English and German support.
- **Accessibility**: High standards (WCAG 2.1 AA).
- **Tech Stack**: Angular 20, Server-Side Rendering (SSR), SCSS.

## 2. Analysis: Is Angular the best choice?

**Short Answer: No.**

### Why Angular is Overkill
1.  **Complexity**: Angular is a robust framework designed for complex, dynamic enterprise applications. Using it for a static portfolio adds unnecessary layers of abstraction (Modules/Standalone Components, Dependency Injection, RxJS, Zone.js).
2.  **Performance Overhead**: Even with optimizations, an Angular app ships a significant amount of JavaScript (Runtime, Polyfills, Framework core) just to render static text. The initial bundle size is relatively large (~400KB+ raw) compared to a static site (0KB JS required).
3.  **Maintenance**: Keeping Angular, SSR, and related dependencies updated requires regular effort.
4.  **Hosting**: SSR (Server-Side Rendering) requires a Node.js environment (or complex edge setup), whereas a static site can be hosted on any static file host (GitHub Pages, Netlify, Vercel) without server-side logic.

## 3. Recommended Alternatives

### Option A: Astro (Highly Recommended)
[Astro](https://astro.build) is a modern web framework designed for content-driven websites.
*   **Pros**:
    *   **Zero JavaScript by Default**: It strips away all JavaScript unless explicitly requested, leading to perfect performance.
    *   **Component Model**: You can write components (similar to Angular/React/Vue) but they compile to HTML.
    *   **i18n Support**: Built-in, robust internationalization routing.
    *   **Easy Migration**: You can reuse your existing HTML and SCSS.
*   **Suitability**: Perfect for this portfolio.

### Option B: Static Site Generators (11ty / Hugo)
Tools like [Eleventy (11ty)](https://www.11ty.dev/) take templates and output HTML.
*   **Pros**: Extremely fast build times, simple output.
*   **Cons**: Might feel less "modern" if you are used to component-based workflows.

### Option C: Plain HTML/CSS
Since the site is now just one page, you could maintain it as a simple `index.html` file.
*   **Pros**: Zero dependencies, zero maintenance, lasts forever.
*   **Cons**: Duplication of code (Header/Footer) if you add more pages later. Harder to manage complex i18n without a build step.

## 4. Conclusion
The current Angular setup is functional but disproportionately heavy for the reduced scope of the project.

**Recommendation:**
1.  **Immediate Term**: The application has been cleaned up and is lighter than before. You can continue running it as is.
2.  **Long Term**: Plan a migration to **Astro**. This will drastically reduce complexity, improve performance (Lighthouse scores), and simplify hosting.
